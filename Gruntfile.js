module.exports = function (grunt) {
    grunt.initConfig({
        'pkg': require('./package.json'),

    });

    grunt.loadTasks('grunt');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('development',
        'Runs development mode',
        [
            'clean:development',
            'ts:development',
            'watch:development'
        ]
    );
};