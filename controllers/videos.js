const Video = require('../models/video');

function videosIndex(req, res) {
  Video.find((err, videos) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(videos);
  });
}

function videosCreate(req, res) {
  Video.create((req.body), (err, video) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(video);
  });
}

function videosShow(req, res) {
  Video.findById((req.params.id), (err, video) => {
    if (err) return res.status(500).json({ error: err });
    if (!video) return res.status(404).json({ error: 'Not Found!'});
    return res.json(video);
  });
}

module.exports = {
  index: videosIndex,
  create: videosCreate,
  show: videosShow
};
