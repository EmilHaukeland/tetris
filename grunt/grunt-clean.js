module.exports = function (grunt) {

    grunt.config('clean', {

        development: {
            src: [
                'dev/*',
                '.tscache'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};
