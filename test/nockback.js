'use strict';

var nock = require('nock');
var sanitize = require('sanitize-filename');

module.exports = function (fixtures) {
  var filenames = [];

  return {
    beforeEach: function (done) {
      var filename = sanitize(this.currentTest.parent.title + this.currentTest.title + '.json');

      console.log('filename', filename)
      console.log('filenames', filenames)
      console.log('filename indexOf', filenames.indexOf(filename) !== -1)
      // make sure we're not reusing the nock file
      if (filenames.indexOf(filename) !== -1) {
        return done(new Error('nock-back-mocha does not support multiple tests with the same name. ' + filename + ' cannot be reused.'));
      }

      filenames.push(filename);

      var previousFixtures = nock.back.fixtures;
      console.log('previousFixtures', previousFixtures)
      nock.back.fixtures = fixtures;
      console.log('fixtures', fixtures)

      nock.back.setMode('record')

      nock.back(filename, function (nockDone) {
        this.currentTest.nockDone = function () {
          nockDone();
          nock.back.fixtures = previousFixtures;
        };
        done();
      }.bind(this));
    },
    afterEach: function () {
      this.currentTest.nockDone();
    }
  };
};
