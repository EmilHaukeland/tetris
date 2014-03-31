module.exports = function (grunt) {

    grunt.config('watch', {
        development: {
            files: [
                'src/**/*.ts',
                'tests/**/*.ts'
            ],

            tasks: [
                'ts:development'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};

