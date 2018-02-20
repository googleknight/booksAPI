const supertest = require('supertest');
const models = require('../../models');
const server = require('../../src/server/server');
const CONSTANT = require('../constants');

describe('/mylibrary should return', () => {
  it('response 200 for successful GET request', (done) => {
    supertest(server.listener)
      .get('/mylibrary')
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      });
  });
  it('books details grouped by author', (done) => {
    supertest(server.listener)
      .get('/mylibrary')
      .then((response) => {
        expect(JSON.stringify(response.body.data)).toBe(JSON.stringify(CONSTANT.APIONEOUTPUT));
        done();
      });
  });
});
describe('/mylibrary should return', () => {
  it('books details with ratings on first call and responseCode 200 on POST request', (done) => {
    supertest(server.listener)
      .post('/mylibrary')
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        expect(response.body.data).toEqual(expect.arrayContaining(CONSTANT.APITWOOUTPUT));
        done();
      });
  });
  it('response 500 for unsuccessful POST request', (done) => {
    supertest(server.listener)
      .post('/mylibrary')
      .then((response) => {
        expect(response.body.statusCode).toBe(500);
        done();
      });
  });
});

describe('/mylibrary/like should return', () => {
  it('200 response code on succesful PUT request of like', (done) => {
    supertest(server.listener)
      .put('/mylibrary/like')
      .send({ id: 4 })
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      });
  });
  it('success message on PUT request of like', (done) => {
    supertest(server.listener)
      .put('/mylibrary/like')
      .send({ id: 4 })
      .then((response) => {
        expect(response.body.message).toBe('Book 4 liked');
        done();
      });
  });
});
describe('/mylibrary/unlike should return', () => {
  it('200 response code on succesful PUT request of unlike', (done) => {
    supertest(server.listener)
      .put('/mylibrary/unike')
      .send({ id: 4 })
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
        done();
      });
  });
  it('success message on PUT request of unlike', (done) => {
    supertest(server.listener)
      .put('/mylibrary/unlike')
      .send({ id: 4 })
      .then((response) => {
        expect(response.body.message).toBe('Book 4 unliked');
        done();
      });
  });
});
