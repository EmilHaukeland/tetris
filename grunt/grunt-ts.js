module.exports = function (grunt) {

    grunt.config('ts', {

        development: {
            src: [
                "src/**/*.ts",
                "tests/**/*.ts"
            ],

            outDir: 'dev/',


            options: {
                target: 'es3',
                module: 'amd',
                sourceMap: false,
                declaration: false,
                removeComments: true,
                fast: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
};