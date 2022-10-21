const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TicketSchema = new Schema ({
    user:   { type: String, required: true },
    voyage: { type: String, required: true },
    date:   { type: String, required: true }
})

const Ticket = mongoose.model('Ticket', TicketSchema)

module.exports = Ticket