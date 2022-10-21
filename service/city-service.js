const CityModel = require('../models/city-model')

class CityService {
    async getCities(title) {
        title = new RegExp(`${title}`)
        const citiesData = await CityModel.find({
            title: {
                $regex: title
            }
        })
        return citiesData
    }

    async addCity(title) {
        const newCity = new CityModel({
            title
        })
        await newCity.save()
        return 'Succes! Added ' + title

    }
}

module.exports = new CityService()