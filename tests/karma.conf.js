module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../dev/vendor/jquery/jquery.js',
      '../dev/vendor/jasmine/jasmine-jquery.js',
      '../dev/src/*.js',
      '../dev/tests/*.js'
    ],

    browsers: ['PhantomJS'],//process.env.TRAVIS ? ['Firefox'] : ['Chrome'],

    autoWatch: true
  });
};
