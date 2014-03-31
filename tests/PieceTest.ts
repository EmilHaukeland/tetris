/// <reference path="../definitions/jasmine.d.ts" />

describe('Piece tests', () =>
{
    it('Can construct a piece', () =>
    {
        var expectedShape:string[] = [
            '***',
            ' * '
        ];

        var piece = new Piece(PieceShape.T);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can rotate a piece', () =>
    {
        var expectedShape:string[] = [
            ' *',
            '**',
            ' *'
        ];

        var piece = new Piece(PieceShape.T);
        piece.rotate();
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct T piece', () =>
    {
        var expectedShape:string[] = [
            '***',
            ' * '
        ];

        var piece = new Piece(PieceShape.T);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct J piece', () =>
    {
        var expectedShape:string[] = [
            ' *',
            ' *',
            ' *',
            '**'
        ];

        var piece = new Piece(PieceShape.J);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct L piece', () =>
    {
        var expectedShape:string[] = [
            '* ',
            '* ',
            '* ',
            '**'
        ];

        var piece = new Piece(PieceShape.L);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct O piece', () =>
    {
        var expectedShape:string[] = [
            '**',
            '**'
        ];

        var piece = new Piece(PieceShape.O);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct I piece', () =>
    {
        var expectedShape:string[] = [
            '*',
            '*',
            '*',
            '*'
        ];

        var piece = new Piece(PieceShape.I);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct S piece', () =>
    {
        var expectedShape:string[] = [
            ' **',
            '** '
        ];

        var piece = new Piece(PieceShape.S);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });

    it('Can construct Z piece', () =>
    {
        var expectedShape:string[] = [
            '** ',
            ' **'
        ];

        var piece = new Piece(PieceShape.Z);
        expect(piece.toString()).toEqual(expectedShape.join("\n"));
    });
});