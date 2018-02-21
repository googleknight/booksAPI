const { handleAllBooksRequest } = require('../handlers/handleAllBooksRequest');
const insertDB = require('../handlers/insertBooksInDB');
const updateOpinion = require('../handlers/updateOpinion');
const handlebookswithlikes = require('../handlers/handleBooksWithLikes');

module.exports = [
  {
    method: 'GET',
    path: '/mylibrary',
    handler: (request, response) => {
      handleAllBooksRequest().then((allBooksData) => {
        response({
          data: allBooksData,
          statusCode: 200,
        });
      })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve books.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    method: 'POST',
    path: '/mylibrary',
    handler: (request, response) => {
      insertDB.insertBooksinDB()
        .then((booksEntered) => {
          if (booksEntered) {
            response({
              data: booksEntered,
              statusCode: 200,
            });
          } else {
            throw new Error('Could not update books information');
          }
        })
        .catch((reason) => {
          response({
            data: {
              reason: reason.message,
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    method: 'PUT',
    path: '/mylibrary/{opinion}',
    handler: (request, response) => {
      updateOpinion(request.payload.id, request.params.opinion)
        .then(() => {
          response({
            message: `Book ${request.payload.id} ${request.params.opinion}d`,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            message: `Unable to ${request.params.opinion} Book ${request.payload.id}`,
            statusCode: 500,
          });
        });
    },
  },
  {
    method: 'GET',
    path: '/mylibrary/bookswithlikes',
    handler: (request, response) => {
      handlebookswithlikes().then((allBooksData) => {
        response({
          data: allBooksData,
          statusCode: 200,
        });
      })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve books.',
            },
            statusCode: 500,
          });
        });
    },
  },
  {
    method: 'POST',
    path: '/mylibrary/bookswithlikes',
    handler: (request, response) => {
      insertDB.insertBooksinDBWithoutCheck()
        .then(message => handlebookswithlikes())
        .then((allBooksData) => {
          response({
            data: allBooksData,
            statusCode: 200,
          });
        })
        .catch(() => {
          response({
            data: {
              reason: 'Unable to retrieve books.',
            },
            statusCode: 500,
          });
        });
    },
  },
];
