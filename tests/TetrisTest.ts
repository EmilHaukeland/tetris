/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../definitions/jasmine-jquery.d.ts" />
/// <reference path="../src/Tetris.ts" />
/// <reference path="../src/Piece.ts" />

describe("Tetris", function ()
{
    xit('Acceptance test', (done) =>
    {
        var expectedGameOverBoard:string[] = [
            '    *    ',
            '    *    ',
            '    *    ',
            '    **   ',
            '    *    ',
            '    *    ',
            '    *    ',
            '   **    ',
            '    *    ',
            '    *    ',
            '    *    ',
            '    *    '
        ];

        var tetris:Tetris = new Tetris(9, 12);
        tetris.startGame(Tetris.SPEED_REALTIME);

        addEventListener('tetris.gameOver', () =>
        {
            expect(tetris.toString(true)).toEqual(expectedGameOverBoard.join("\n"));
            done();
        });
    });

    it('Can create new instance', () =>
    {
        var tetris:Tetris = new Tetris(1, 1);
        expect(tetris instanceof Tetris).toBeTruthy();
    });

    it('Can get generated board', () =>
    {
        var expectedBoard:string[] = [
            '     ',
            '     ',
            '     '
        ];
        var tetris:Tetris = new Tetris(5, 3);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Can start game', () =>
    {
        var tetris:Tetris = new Tetris(0, 0);
        tetris.startGame(Tetris.SPEED_MANUAL);

        expect(tetris.getGameState()).toEqual(GameState.Running);
    });

    it('Can add piece to board', () =>
    {
        var expectedBoard = [
            ' *** ',
            '  *  '
        ];

        var tetris = new Tetris(5, 2);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Can move a piece downwards for each tick', () =>
    {
        var expectedFirstTick = [
            ' *** ',
            '  *  ',
            '     '
        ];

        var expectedLastTick = [
            '     ',
            ' *** ',
            '  *  '
        ];

        var tetris:Tetris = new Tetris(5, 3);
        tetris.addPiece(new Piece(PieceShape.T));

        expect(tetris.toString()).toEqual(expectedFirstTick.join("\n"));
        tetris.tick();
        expect(tetris.toString()).toEqual(expectedLastTick.join("\n"));
    });

    it('Can rotate the current piece on the board', () =>
    {
        var expectedBeforeRorate = [
            '     ',
            ' *** ',
            '  *  '
        ];
        var expectedAfterFirst = [
            '  *  ',
            ' **  ',
            '  *  '
        ];
        var expectedAfterSecond = [
            '  *  ',
            ' *** ',
            '     '
        ];
        var expectedAfterThird = [
            '  *  ',
            '  ** ',
            '  *  '
        ];

        var tetris:Tetris = new Tetris(5, 3);
        var piece:Piece = new Piece(PieceShape.T);
        tetris.addPiece(piece);

        tetris.tick();
        expect(tetris.toString()).toEqual(expectedBeforeRorate.join("\n"));
        tetris.rotatePiece();
        expect(tetris.toString()).toEqual(expectedAfterFirst.join("\n"));
        tetris.rotatePiece();
        expect(tetris.toString()).toEqual(expectedAfterSecond.join("\n"));
        tetris.rotatePiece();
        expect(tetris.toString()).toEqual(expectedAfterThird.join("\n"));
    });

    it('Detect collision at bottom', () => {
        var expectedBoard = [
            '     ',
            ' *** ',
            '  *  '
        ];

        var tetris:Tetris = new Tetris(5, 3);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();
        tetris.tick();

        expect(tetris.toString(true)).toEqual(expectedBoard.join("\n"));
    });

    it('Can move to the left', () =>
    {
        var expectedBoard = [
            '***  ',
            ' *   '
        ];

        var tetris:Tetris = new Tetris(5, 2);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.movePiece(Direction.Left);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Can move to the right', () =>
    {
        var expectedBoard = [
            '  ***',
            '   * '
        ];

        var tetris:Tetris = new Tetris(5, 2);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.movePiece(Direction.Right);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Will collide with other pieces', () => {
        var expectedBoard = [
            ' *** ',
            '  *  ',
            ' *** ',
            '  *  '
        ];

        var tetris:Tetris = new Tetris(5, 4);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();
        tetris.tick();
        tetris.tick();
        tetris.tick();
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();
        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Will collide on left wall', () =>
    {
        var expectedBoard = [
            '***  ',
            ' *   '
        ];

        var tetris:Tetris = new Tetris(5, 2);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.movePiece(Direction.Left);
        tetris.movePiece(Direction.Left);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Will collide with right wall', () => {
        var expectedBoard = [
            '  ***',
            '   * '
        ];

        var tetris:Tetris = new Tetris(5, 2);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.movePiece(Direction.Right);
        tetris.movePiece(Direction.Right);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Can move before fully revealed', () => {
        var expectedBoard = [
            '    *',
            '    *',
            '    *'
        ];

        var tetris:Tetris = new Tetris(5, 3);
        tetris.addPiece(new Piece(PieceShape.I));
        tetris.movePiece(Direction.Right);
        tetris.movePiece(Direction.Right);

        expect(tetris.toString()).toEqual(expectedBoard.join("\n"));
    });

    it('Clear completed lines', () => {
        var expectedBoard = [
            '   ',
            '   ',
            ' * '
        ];

        var tetris:Tetris = new Tetris(3, 3);
        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();
        tetris.tick();

        expect(tetris.toString(true)).toEqual(expectedBoard.join("\n"));
    });

    it('Will trigger Tetris.LineRemoved event when removing line', () => {
        var tetris:Tetris = new Tetris(3, 2);
        var event:jasmine.JQueryEventSpy = spyOnEvent(tetris, 'LinesRemoved');

        tetris.addPiece(new Piece(PieceShape.T));
        tetris.tick();
        tetris.tick();

        expect(event).toHaveBeenTriggered();
    });
});
