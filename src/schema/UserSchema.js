const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true}
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;