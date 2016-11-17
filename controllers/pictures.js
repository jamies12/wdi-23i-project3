const Picture = require('../models/picture');

function picturesIndex(req, res) {
  Picture.find((err, pictures) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(pictures);
  });
}

module.exports = {
  index: picturesIndex
};
