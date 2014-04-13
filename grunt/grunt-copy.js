module.exports = function (grunt) {

    grunt.config('copy', {

        development: {
            files: [
                {expand: true, flatten: true, src: ['vendor/jquery/dist/*'], dest: 'dev/vendor/jquery'},
                {expand: true, flatten: true, src: ['vendor/jasmine/lib/jasmine-core/*.js'], dest: 'dev/vendor/jasmine'},
                {expand: true, flatten: true, src: ['vendor/jasmine/lib/jasmine-core/*.css'], dest: 'dev/vendor/jasmine'},
                {expand: true, flatten: true, src: ['vendor/jasmine-jquery/lib/*.js'], dest: 'dev/vendor/jasmine'},
                {expand: true, flatten: true, src: ['tests/TestRunner.html'], dest: 'dev'},
                {expand: true, flatten: true, src: ['src/index.html'], dest: 'dev'}
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
