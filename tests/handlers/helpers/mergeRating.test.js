const mergeRating = require('../../../src/handlers/helpers/mergeRating');
const CONSTANT = require('../../constants');

describe('mergeRating', () => {
  test('should return a promise', () => {
    expect(Promise.resolve(mergeRating(JSON.stringify(CONSTANT.EXTERNALAPIONE)))
      .then(allPromises => Promise.all(allPromises))).toBeInstanceOf(Promise);
  });

  describe('should resolve to valid book objects', () => {
    test('when input is a valid array from external api1', (done) => {
      Promise.resolve(mergeRating(JSON.stringify(CONSTANT.EXTERNALAPIONE)))
        .then(allPromises => Promise.all(allPromises))
        .then((books) => {
          expect(books).toEqual(expect.arrayContaining(CONSTANT.APITWOOUTPUT));
          done();
        });
    });
  });
});
