// const Journal = require('../models/user').JournalModel;
//
// function journalsIndex(req, res) {
//   Journal.find((err, journals) => {
//     if (err) return res.status(500).json({ error: err});
//     return res.json(journals);
//   });
// }
//
// function journalsCreate(req, res) {
//   Journal.create(req.body, (err, journal) => {
//     if (err) return res.status(500).json({ error: err});
//     return res.json(journal);
//   });
// }
//
// function journalsShow(req, res) {
//   Journal.findById(req.params.id, (err, journal) => {
//     if (err) return res.status(500).json({ error: err});
//     if(!journal) return res.status(404).json({ error: 'Not Found'});
//     return res.json(journal);
//   });
// }
//
// function journalsUpdate(req, res) {
//   Journal.findById(req.params.id, (err, journal) => {
//     if(err) return res.status(500).json({ error: err});
//     if(!journal) return res.status(404).json({ error: 'Not Found'});
//
//     for(const key in req.body) {
//       journal[key] = req.body[key];
//     }
//
//     journal.save((err, journal) => {
//       if(err) return res.status(400).json({ error: err});
//       res.json(journal);
//     });
//   });
// }
//
// function journalsDelete(req, res) {
//   Journal.findById(req.params.id, (err, journal) => {
//     if(err) return res.status(500).json({ error: err});
//     if(!journal) return res.status(404).json({ error: 'Not Found'});
//
//     journal.remove(err => {
//       if(err) return res.status(500).json({ error: err});
//       res.status(204).send();
//     });
//   });
// }
//
// module.exports = {
//   index: journalsIndex,
//   create: journalsCreate,
//   show: journalsShow,
//   update: journalsUpdate,
//   delete: journalsDelete
// };
