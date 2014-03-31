enum PieceShape
{
    T, J, L, O, I, S, Z
}

class Piece
{
    private shapes = [
        [ // T-shape
            [
                '*+*',
                ' * '
            ],
            [
                ' *',
                '*+',
                ' *'
            ],
            [
                ' * ',
                '*+*'
            ],
            [
                '* ',
                '+*',
                '* '
            ]
        ],
        [ // J-shape
            [
                ' *',
                ' +',
                ' *',
                '**'
            ],
            [
                '*   ',
                '**+*'
            ],
            [
                '**',
                '* ',
                '+ ',
                '* '
            ],
            [
                '*+**',
                '   *'
            ]
        ],
        [ // L-shape
            [
                '* ',
                '+ ',
                '* ',
                '**'
            ],
            [
                '**+*',
                '*   '
            ],
            [
                '**',
                ' *',
                ' +',
                ' *'
            ],
            [
                '   *',
                '*+**'
            ]
        ],
        [ // O-shape
            [
                '**',
                '+*'
            ]
        ],
        [ // I-shape
            [
                '*',
                '+',
                '*',
                '*'
            ],
            [
                '**+*'
            ]
        ],
        [ // S-shape
            [
                ' **',
                '*+ '
            ],
            [
                '* ',
                '*+',
                ' *'
            ]
        ],
        [ // Z-shape
            [
                '** ',
                ' +*'
            ],
            [
                ' *',
                '*+',
                '* '
            ]
        ]
    ];

    private letter:PieceShape;
    private version:number;

    constructor(shape:PieceShape)
    {
        this.setShape(shape);
    }

    public toString():string
    {
        return this.getShape().join("\n").replace('+', '*');
    }

    public rotate():void
    {
        this.version++;

        if(this.version >= this.shapes[this.letter].length)
        {
            this.version = 0;
        }
    }

    public getShape():string[]
    {
        return this.shapes[this.letter][this.version];
    }

    public getKeyPosition():PiecePosition
    {
        var shape:string[] = this.getShape();
        for(var row = 0; row < shape.length; row++)
        {
            for(var column = 0; column < shape[row].length; column++)
            {
                if(shape[row][column] == '+')
                {
                    return new PiecePosition(row, column);
                }
            }
        }
    }

    private setShape(shape:PieceShape)
    {
        this.letter = shape;
        this.version = 0;
    }
}