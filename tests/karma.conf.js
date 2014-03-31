module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../dev/src/*.js',
      '../dev/tests/*.js'
    ],

    browsers: ['PhantomJS'],//process.env.TRAVIS ? ['Firefox'] : ['Chrome'],

    autoWatch: true
  });
};
