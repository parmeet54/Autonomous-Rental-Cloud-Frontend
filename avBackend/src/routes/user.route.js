const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// get all users
/**
 * GET /users
 */
router.get('/',userController.getUsersList);

// get user by username
/**
 * GET /users/{username}
 */
router.get('/:username', userController.getUser);

// create new user
/**
 * POST /users
 */
router.post('/', userController.createUser);

// delete user by username
/**
 * DELETE /{username}
 */
router.delete('/:username', userController.deleteUser);

// update user by username
/**
 * PUT /users/(username)
 */
 router.put("/:username", userController.updateUser);


module.exports = router;