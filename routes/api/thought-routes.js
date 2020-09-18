const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');
const { addToFriendList } = require('../../controllers/user-controller');

// /api/thoughts/
router.route('/').get(getAllThoughts);

router.route('/:thoughId').get(getThoughtById);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)


// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought)

// router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);





module.exports = router;