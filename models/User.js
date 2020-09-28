//import the dependencies. ONLY Schema constructor, model function ( rather than entire lib)
const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    //required: 'You need to provide a username'
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'User email address required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      //tells User model which documents to search for to find the right thoughts
      ref: 'Thought'
    }
  ],
  //updated
  friends: [
    {
      type: Schema.Types.ObjectId,
      //tells User model which documents to search for to find the right friends
      ref: 'User'
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;