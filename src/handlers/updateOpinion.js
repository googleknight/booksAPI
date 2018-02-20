const Models = require('../../models');


function updateOpinion(id, opinion) {
  return Models.booklikes.findOrCreate({
    where: {
      bookid: id,
    },
    defaults: {
      bookid: id,
      opinion: opinion === 'like',
    },
  }).then(([bookLike, created]) => {
    if (!created) {
      bookLike.updateAttributes({
        opinion: opinion === 'like',
      });
    }
  });
}


module.exports = updateOpinion;
