const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VoyageSchema = new Schema ({
    from:           { type: String, required: true },
    to:             { type: String, required: true },
    price:          { type: Number, required: true },
    timeStart:      { type: String, required: true },
    timeEnd:        { type: String, required: true },
    timeTravel:     { type: String, required: true } //min
})


const Voyage = mongoose.model('Voyage', VoyageSchema)

module.exports = Voyage