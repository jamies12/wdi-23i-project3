const router = require('express').Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const picturesController = require('../controllers/pictures');
const videosController = require('../controllers/videos');
const journalsController = require('../controllers/journals');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(usersController.index)
  .post(usersController.create);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

router.route('/journals')
  .get(journalsController.index)
  .post(journalsController.create);

router.route('/journals/:id')
  .get(journalsController.show)
  .put(journalsController.update)
  .delete(journalsController.delete);

router.route('/pictures')
  .get(picturesController.index)
  .post(picturesController.create);

router.route('/pictures/:id')
  .get(picturesController.show);

router.route('/videos')
  .get(videosController.index)
  .post(videosController.create);

router.route('/videos/:id')
  .get(videosController.show);



module.exports = router;
