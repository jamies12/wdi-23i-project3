const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/users')
  .get(userController.index)
  .post(userController.create);


module.exports = router;
