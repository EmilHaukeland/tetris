/// <reference path="../definitions/lib.d.ts" />
/// <reference path="Piece" />
/// <reference path="PiecePosition" />

enum GameState {
    Idle,
    Running,
    GameOver
}

class Tetris
{
    public static SPEED_MANUAL = -1;
    public static SPEED_REALTIME = 0;
    public static SPEED_SLOW = 1000;

    private board:string[][] = [];
    private renderedBoard:string[][];

    private gameLoop:number;
    private gameState:GameState;
    private currentPiece:Piece;
    private currentPosition:PiecePosition;
    private isRendering:boolean;

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
        this.isRendering = false;
    }

    public getGameState():GameState
    {
        return this.gameState;
    }

    public startGame(speed:number):void
    {
        if(speed > Tetris.SPEED_MANUAL)
        {
            this.gameLoop = window.setInterval(this.tick(), speed);
        }

        this.gameState = GameState.Running;
    }

    public addPiece(piece:Piece)
    {
        this.currentPosition = new PiecePosition(-1, Math.ceil(this.board[0].length / 2) - 1);
        this.currentPiece = piece;
    }

    public toString():string
    {
        var board:string[][] = typeof this.currentPiece != 'undefined' ? this.render() : this.board;
        //console.log(this.board);//, this.renderedBoard);
        var result:string = '';
        for(var row = 0; row < board.length; row++)
        {
            result += board[row].join('');
            if(row + 1 < board.length)
            {
                result += "\n";
            }
        }
        return result.replace('+', '*');
    }

    public tick():void
    {
        if(this.isRendering)
        {
            return;
        }

        this.currentPosition.row++;
        this.renderedBoard = this.render();
    }

    private render():string[][]
    {
        if(typeof this.currentPiece == 'undefined')
        {
            return this.board;
        }

        this.isRendering = true;
        var board:string[][] = [];
        for(var key = 0; key < this.board.length; key++)
        {
            board.push(this.board[key].concat());
        }

        var keyPosition:PiecePosition = this.currentPiece.getKeyPosition();
        var shape:string[] = this.currentPiece.getShape();

        for(var row = keyPosition.row; row < shape.length; row++)
        {
            var boardRow = this.currentPosition.row + (row - keyPosition.row);
            for(var column = keyPosition.column; column < shape[row].length; column++)
            {
                if(shape[row][column] == ' ')
                {
                    continue;
                }

                var boardColumn = this.currentPosition.column + (column - keyPosition.column);
                if(board && board[boardRow] && board[boardRow][boardColumn])
                {
                    board[boardRow][boardColumn] = shape[row][column];
                }
                else
                {
                    throw new Error("Out of bounds");
                }
            }

            for(var column = keyPosition.column; column >= 0; column--)
            {
                for(var column = keyPosition.column; column >= 0; column--)
                {
                    if(shape[row][column] == ' ')
                    {
                        continue;
                    }

                    var boardColumn = this.currentPosition.column + (column - keyPosition.column);
                    if(board && board[boardRow] && board[boardRow][boardColumn])
                    {
                        board[boardRow][boardColumn] = shape[row][column];
                    }
                    else
                    {
                        throw new Error("Out of bounds");
                    }
                }
            }
        }

        for(var row = keyPosition.row; row >= 0; row--)
        {
            var boardRow = this.currentPosition.row + (row - keyPosition.row);
            if(boardRow < 0)
            {
                continue;
            }

            for(var column = keyPosition.column; column < shape[row].length; column++)
            {
                if(shape[row][column] == ' ')
                {
                    continue;
                }

                var boardColumn = this.currentPosition.column + (column - keyPosition.column);
                if(board && board[boardRow] && board[boardRow][boardColumn])
                {
                    board[boardRow][boardColumn] = shape[row][column];
                    if(this.currentPosition.row == 1 && boardColumn == 0)
                    {
                        console.log('bad', row, column);
                    }
                }
                else
                {
                    throw new Error("Out of bounds");
                }
            }

            for(var column = keyPosition.column; column >= 0; column--)
            {
                for(var column = keyPosition.column; column >= 0; column--)
                {
                    if(shape[row][column] == ' ')
                    {
                        continue;
                    }

                    var boardColumn = this.currentPosition.column + (column - keyPosition.column);
                    if(board && board[boardRow] && board[boardRow][boardColumn])
                    {
                        board[boardRow][boardColumn] = shape[row][column];

                        if(this.currentPosition.row == 1 && boardColumn == 0)
                        {
                            console.log('bad', row, column);
                        }
                    }
                    else
                    {
                        throw new Error("Out of bounds");
                    }
                }
            }
        }

        this.isRendering = false;
        return board;
    }
}
