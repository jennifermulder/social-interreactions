const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removefromFriendList
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users. Provide name of controller as callback
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/<id>
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//api/users/<userId>/friends/<friendId>
router
  .route('/:userId/friends/:friendId')
  .post(addToFriendList);

//api/users/<userId>/friends/<friendId>
router
  .route('/:userId/friends/:friendId')
  .delete(removefromFriendList);

module.exports = router;