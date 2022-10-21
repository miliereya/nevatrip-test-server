const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema ({
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    role:       { type: String, required: true, default: 'user' },
    tickets:    { type: Array, default: [] }
})

const User = mongoose.model('test-user', UserSchema)

module.exports = User