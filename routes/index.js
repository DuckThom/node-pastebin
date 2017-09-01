var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

const modes = require('../modelist');
const fonts = require('../fonts');
const fontsizes = require('../fontsizes');
const themes = require('../themes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    modes: modes,
    fonts: fonts,
    fontsizes: fontsizes,
    themes: themes
  });
});

router.get('/:paste', function(req, res, next) {
  var db = new sqlite3.Database('./db.sqlite');
  var stmt = db.prepare("SELECT data, mode FROM pastes WHERE url = ?");

  stmt.get(req.params.paste, function (err, row) {
    if (err) {
      debug(err);

      return res.redirect('/');
    }

    if (!row) {
      return res.redirect('/');
    }

    return res.render('view', { 
      modes: modes,
      fonts: fonts,
      fontsizes: fontsizes,
      themes: themes,
      content: row.data,
      modePreset: row.mode
    });
  });

  stmt.finalize();
  
  db.close();
});

module.exports = router;
