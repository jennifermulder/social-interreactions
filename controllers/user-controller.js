const { User } = require('../models');

const userController = {
  getAllUsers(req, res) {
    //mongoose method similar to sequelize .findall()
    User.find({})
      .populate({
        path: 'thoughts',
        //dont care about __v field "-" means don't want. Otherwise ONLY
        select: '-__v'
      })
      .select('-__v')
      // sort by descending order by the _id value
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  addToFriendList({ params, body }, res) {
    console.log(body);
    User.create(body)
      //grab id, use to add comment
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          //use push method to add comment id, add data to array
          { $push: { friends: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  },
  removefromFriendList({ params }, res) {
    User.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedFriend => {
        if (!deletedFriend) {
          return res.status(404).json({ message: 'No friend with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { comments: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
};

module.exports = userController;