const VoyageService = require('../service/voyage-service')

class VoyageController {
    async getVoyages(req, res, next) {
        try {
            const { from, to, date, quantity } = req.query
            const voyages = await VoyageService.getVoyages(from, to, date, quantity)
            return res.json(voyages)
        } catch (e) {
            next(e)
        }
    }
    async addVoyage(req, res, next) {
        try {
            const { from, to, price, timeStart, timeEnd, timeTravel } = req.body
            const response = await VoyageService.addVoyage(from, to, price, timeStart, timeEnd, timeTravel)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new VoyageController()