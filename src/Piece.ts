enum PieceShape
{
    T, J, L, O, I, S, Z
}

class Piece
{
    public static MARKER = '*';

    private shapes:number[][][][] = [
        [ // T-shape
            [[-1, 0], [0, 0], [1, 0], [0, 1]],
            [[0, -1], [-1, 0], [0, 0], [0, 1]],
            [[0, -1], [-1, 0], [0, 0], [1, 0]],
            [[0, -1], [0, 0], [0, 1], [1, 0]]
        ],
        [ // J-shape
            [[0, -1], [0, 0], [0, 1], [-1, 1]],
            [[-1, -1], [-1, 0], [0, 0], [1, 0]],
            [[1, -1], [0, -1], [0, 0], [0, 1]],
            [[-1, 0], [0, 0], [1, 0], [1, 1]]
        ],
        [ // L-shape
            [[0, -1], [0, 0], [0, 1], [1, 1]],
            [[-1, 0], [0, 0], [1, 0], [-1, 1]],
            [[-1, -1], [0, -1], [0, 0], [0, 1]],
            [[-1, 0], [0, 0], [1, 0], [1, -1]]
        ],
        [ // O-shape
            [[0, -1], [1, -1], [0, 0], [1, 0]]
        ],
        [ // I-shape
            [[0, -1], [0, 0], [0, 1], [0, 2]],
            [[-2, 0], [-1, 0], [0, 0], [1, 0]]
        ],
        [ // S-shape
            [[0, -1], [1, -1], [-1, 0], [0, 0]],
            [[-1, -1], [-1, 0], [0, 0], [0, 1]]
        ],
        [ // Z-shape
            [[-1, -1], [0, -1], [0, 0], [1, 0]],
            [[0, -1], [-1, 0], [0, 0], [-1, 1]]
        ]
    ];

    private shape:PieceShape;
    private orientation:number;

    constructor(shape:PieceShape)
    {
        this.setShape(shape);
    }

    public rotate():void
    {
        this.orientation++;

        if(this.orientation >= this.shapes[this.shape].length)
        {
            this.orientation = 0;
        }
    }

    public toString():string
    {
        var yMax:number = 0;
        var yMin:number = 0;
        var xMax:number = 0;
        var xMin:number = 0;

        var map:number[][] = this.shapes[this.shape][this.orientation];
        for(var i = 0; i < map.length; i++)
        {
            if(map[i][1] > yMax)
            {
                yMax = map[i][1];
            }

            if(map[i][1] < yMin)
            {
                yMin = map[i][1];
            }

            if(map[i][0] > xMax)
            {
                xMax = map[i][0];
            }

            if(map[i][0] < xMin)
            {
                xMin = map[i][0];
            }
        }

        var newMap:number[][] = [];
        for (var i = 0; i < map.length; i++)
        {
            var cell:number[] = [];

            if (map[i][0] == xMin)
            {
                cell.push(0);
            }
            else
            {
                cell.push(map[i][0] - xMin);
            }

            if (map[i][1] == yMin)
            {
                cell.push(0);
            }
            else
            {
                cell.push(map[i][1] - yMin);
            }

            newMap.push(cell);
        }

        var rows = (yMax - yMin) + 1;
        var columns = (xMax - xMin) + 1;

        var piece:string = '';
        for(var row = 0; row < rows; row++)
        {
            for(var column = 0; column < columns; column++)
            {
                var marker = ' ';
                for(var i = 0; i < newMap.length; i++)
                {
                    if(newMap[i][1] == row && newMap[i][0] == column)
                    {
                        marker = Piece.MARKER;
                        break;
                    }
                }
                piece += marker;
            }
            piece += row + 1 < rows ? "\n" : '';
        }

        return piece;
    }

    public getShape():number[][]
    {
        return this.shapes[this.shape][this.orientation];
    }

    private setShape(shape:PieceShape)
    {
        this.shape = shape;
        this.orientation = 0;
    }
}