/// <reference path="../definitions/jasmine.d.ts" />
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
            expect(tetris.toString()).toEqual(expectedGameOverBoard.join("\n"));
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

        tetris.tick();
        expect(tetris.toString()).toEqual(expectedFirstTick.join("\n"));
        tetris.tick();
        expect(tetris.toString()).toEqual(expectedLastTick.join("\n"));
    });

    it('Can rotate the current piece on the board', () =>
    {
        var expectedAfterRotateOnceFirstTick = [
            ' **  ',
            '  *  ',
            '     '
        ];
        var expectedAfterRotateOnceLastTick = [
            '  *  ',
            ' **  ',
            '  *  '
        ];

        var tetris:Tetris = new Tetris(5, 3);
        var piece:Piece = new Piece(PieceShape.T);
        tetris.addPiece(piece);

        tetris.tick();
        piece.rotate();
        expect(tetris.toString()).toEqual(expectedAfterRotateOnceFirstTick.join("\n"));

        tetris.tick();
        expect(tetris.toString()).toEqual(expectedAfterRotateOnceLastTick.join("\n"));
    });
});