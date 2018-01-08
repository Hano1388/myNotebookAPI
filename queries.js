var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/notebookdb';
var db = pgp(connectionString);

// add query functions
function _getNotes(req, res, next) {
  db.any('select * from notes')
    .then(data => {
      res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all notes'
          });
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = {
  getAllNotes: _getNotes
}
