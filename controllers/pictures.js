const Picture = require('../models/picture');

function picturesIndex(req, res) {
  Picture.find((err, pictures) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(pictures);
  });
}

function picturesCreate(req, res) {
  Picture.create(req.body, (err, picture) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(picture);
  });
}

function picturesShow(req, res) {
  Picture.findById(req.params.id, (err, picture) => {
    if (err) return res.status(500).json({ error: err });
    if(!picture) return res.status(404).json({ error: 'Not Found!'});
    return res.json(picture);
  });
}

module.exports = {
  index: picturesIndex,
  create: picturesCreate,
  show: picturesShow
};
