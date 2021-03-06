const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
  findUserByEmail: async email => {
    const user = await User.findOne({ email })
    return user
  },
  
  addUser: userObject => {
    return new Promise((resolve, reject) => {
      const user = new User()
      Object.keys(userObject).forEach(field => {
        user[field] = userObject[field]
      });
      user.save((err, user) => {
        err ? reject(err) : resolve(user)
      })
    })
  },

  updateUser: (id, update) => {
    delete update._id
    delete update.email
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(id, update, { new: true }, (err, user) => {
        err ? reject(err) : resolve(user)
      })
    })
  }
}
