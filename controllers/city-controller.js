const CityService = require('../service/city-service')

class CityController {
    async getCities(req, res, next) {
        try {
            const { title } = req.query
            const cities = await CityService.getCities(title)
            return res.json(cities)
        } catch (e) {
            console.log(e)
        }
    }
    async addCity(req, res, next) {
        try {
            const { title } = req.body
            const response = await CityService.addCity(title)
            return res.json(response)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CityController()