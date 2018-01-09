var promise = require('bluebird');
var noteDate = require('current-date');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/notebookdb';
var db = pgp(connectionString);

// add query functions
// Get all notes
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
// Get one note
function _getNote(req, res, next) {
  var _id = parseInt(req.params.id);
  db.one('select * from notes where id=$1', _id)
    .then(data => {
      res.status(200)
         .json({
           status: 'success',
           data: data,
           messages: 'retrieved a note'
         });
    })
    .catch(err => {
      return next(err);
    });
}

// Post a note
function _createNote(req, res, next) {
  req.body.date = noteDate('full');
  db.none('insert into notes(title, body, date)' +
          'values(${title}, ${body}, ${date})', req.body)
    .then(() => {
      res.status(200)
         .json({
           status: 'success',
           message: 'Inserted a note'
         });
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = {
  getAllNotes: _getNotes,
  getAnote: _getNote,
  createAnote: _createNote
}
