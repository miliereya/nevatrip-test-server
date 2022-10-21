const ticketService = require("../service/ticket-service")


class TicketController {
    async addTicket(req, res, next) {
        try {
            const { email, voyage, date } = req.body
            const response = await ticketService.addTicket(email, voyage, date)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }
    async getTickets(req, res, next) {
        try {
            const { idArr } = req.body
            const response = await ticketService.getTickets(idArr)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TicketController()