const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;



const userschms = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userschms.pre('save', function(next) {

     if (!this.isModified('password'))  {
       return next();
     }
          bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                return next(err);
              }
                  bcrypt.hash(this.password, salt, (err, hash) => {
                    if (err) {
                      return next(err);
                    }
                    this.password = hash;
                    next();
                  });

    });

});
userschms.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
          if (err) {
            return callback(err);
          }
    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userschms);

module.exports = User;