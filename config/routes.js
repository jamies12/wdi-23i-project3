const router = require('express').Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const picturesController = require('../controllers/pictures');

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

router.route('/pictures')
  .get(picturesController.index)
  .post(picturesController.create);

router.route('/pictures/:id')
  .get(picturesController.show);



module.exports = router;
