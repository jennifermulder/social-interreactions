//import the dependencies. ONLY Schema constructor, model function ( rather than entire lib)
const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    //required: 'You need to provide a pizza name'
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
      //tells Pizza model which documents to search for to find the right comments
      ref: 'Thought'
    }
  ],
  //updated
  friends: [
    {
      type: Schema.Types.ObjectId,
      //tells Pizza model which documents to search for to find the right comments
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

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
  //.reduce( accumulator, currentValue ) method used to tally total of every comment with its replies
  return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});


// create the User model using the PizzaSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;