/// <reference path="../definitions/lib.d.ts" />
/// <reference path="../definitions/jquery.d.ts" />
/// <reference path="Piece" />
/// <reference path="PiecePosition" />

enum GameState {
    Idle,
    Paused,
    Running,
    GameOver,
}

enum Direction
{
    Left,
    Right,
}

class Tetris
{
    public static SPEED_MANUAL = -1;
    public static SPEED_REALTIME = 0;
    public static SPEED_NORMAL = 500;
    public static SPEED_SLOW = 1000;

    private board:string[][] = [];

    private gameLoop:number;
    private gameState:GameState;
    private currentSpeed:number = -1;
    private currentPiece:Piece;
    private currentPiecePosition:PiecePosition;

    constructor(columns:number, rows:number)
    {
        for (var rowIndex = 0; rowIndex < rows; rowIndex++)
        {
            var column:string[] = [];
            for (var columnIndex = 0; columnIndex < columns; columnIndex++)
            {
                column.push(' ');
            }
            this.board.push(column);
        }

        this.gameState = GameState.Idle;
    }

    public startGame(speed:number = Tetris.SPEED_MANUAL):void
    {
        if(speed > Tetris.SPEED_MANUAL)
        {
            this.gameLoop = window.setInterval(this.tick.bind(this), speed);
        }

        this.currentSpeed = speed;
        this.gameState = GameState.Running;
    }

    public pauseGame():void
    {
        this.gameState = GameState.Paused;
        window.clearInterval(this.gameLoop);
        this.gameLoop = null;
    }

    public resumeGame():void
    {
        this.startGame(this.currentSpeed);
    }

    public getGameState():GameState
    {
        return this.gameState;
    }

    public addPiece(piece:Piece)
    {
        this.currentPiecePosition = new PiecePosition(0, Math.ceil(this.board[0].length / 2) - 1);
        this.currentPiece = piece;
    }

    public tick():void
    {

        if(!this.canMoveTo(0, 1))
        {
            this.insertPiece(this.currentPiece.getShape(), this.board);

            if(this.currentPiecePosition.row <= 0)
            {
                window.clearInterval(this.gameLoop);
                this.gameState = GameState.GameOver;
                $(this).trigger('GameOver');
            }
            else
            {
                $(this).trigger('NoPiece');
            }
            this.clearCompletedRows(this.board);
        }
        else
        {
            this.currentPiecePosition.row++;
        }

        $(this).trigger('Tick');
    }

    public movePiece(direction:Direction):void
    {
        if(direction == Direction.Left && this.canMoveTo(-1))
        {
            this.currentPiecePosition.column--;
        }
        else if(direction == Direction.Right && this.canMoveTo(1))
        {
            this.currentPiecePosition.column++;
        }
    }

    public rotatePiece():void
    {
        this.currentPiece.rotate();
        if(!this.canMoveTo())
        {
            this.currentPiece.rotate();
            this.currentPiece.rotate();
            this.currentPiece.rotate();
        }
    }

    private canMoveTo(columnModifier:number = 0, rowModifier:number = 0)
    {
        var position:PiecePosition = new PiecePosition(
            this.currentPiecePosition.row + rowModifier,
            this.currentPiecePosition.column + columnModifier
        );

        var shape = this.currentPiece.getShape();
        for(var i = 0; i < shape.length; i++)
        {
            var cell:number[] = [
                position.column + shape[i][0],
                position.row + shape[i][1]
            ];

            if(cell[1] >= this.board.length)
            {
                return false;
            }
            else if(cell[0] < 0 || cell[0] > this.board[0].length - 1)
            {
                return false;
            }

            if(cell[1] >= 0 && this.board[cell[1]][cell[0]] == Piece.MARKER)
            {
                return false;
            }
        }

        return true;
    }

    public toString(coreBoard:boolean = false):string
    {
        var board:string[][] = !coreBoard && typeof this.currentPiece != 'undefined' ? this.render() : this.board;
        var result:string = '';
        for(var row = 0; row < board.length; row++)
        {
            result += board[row].join('');
            if(row + 1 < board.length)
            {
                result += "\n";
            }
        }
        return result;
    }

    private render():string[][]
    {
        if(typeof this.currentPiece == 'undefined')
        {
            return this.board;
        }

        var board:string[][] = [];
        for(var key = 0; key < this.board.length; key++)
        {
            board.push(this.board[key].concat());
        }

        this.insertPiece(this.currentPiece.getShape(), board);
        return board;
    }

    private insertPiece(shape:number[][], board:string[][])
    {
        for (var i = 0; i < shape.length; i++)
        {
            var row = this.currentPiecePosition.row + shape[i][1];
            var column = this.currentPiecePosition.column + shape[i][0];

            if(row < 0)
            {
                continue;
            }
            if(board && board[row] && board[row][column])
            {
                board[row][column] = Piece.MARKER;
            }
            else
            {
                return false;
            }
        }

        return true;
    }

    private clearCompletedRows(board:string[][]):string[][]
    {
        var linesRemoved:number = 0;
        for(var row = board.length - 1; row >= 0; row--)
        {
            var shouldRemoveLine = true;
            for(var column = 0; column < board[row].length; column++)
            {
                if(board[row][column] == ' ')
                {
                    shouldRemoveLine = false;
                }
            }

            if(shouldRemoveLine)
            {
                board.splice(row, 1);
                var newColumn:string[] = [];
                for(var i = 0; i < this.board[0].length; i++)
                {
                    newColumn.push(' ');
                }
                this.board.unshift(newColumn);
                row++;
                linesRemoved++;
            }
        }

        if(linesRemoved)
        {
            $(this).trigger('LinesRemoved', linesRemoved);
        }

        return board;
    }
}
