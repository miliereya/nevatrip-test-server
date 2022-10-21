const VoyageModel = require('../models/voyage-model')
const cityService = require('./city-service')

class VoyageService {
    async getVoyages(from, to, date, quantity) {
        from = new RegExp(`${from}`)
        to = new RegExp(`${to}`)

        const voyagesData = await VoyageModel.find({
            $and: [
                {from: {
                    $regex: from
                }},
                {to: {
                    $regex: to
                }}
            ]
        })

        return {voyagesData, date, quantity}
    }

    async getVoyage(id) {
        try {
            const voyageData = await VoyageModel.find({_id: id})
            return voyageData
        } catch(e) {
            return false
        }
    }

    async addVoyage(from, to, price, timeStart, timeEnd, timeTravel) {
        if (from === to) {
            return 'You are trying to add the same cities'
        }

        //Проверяем наличие данных городов в списке
        const citiesData = await cityService.getCities('')
        const cityCheck = []
        citiesData.map(city => {
            cityCheck.push(city.title)
        })

        if (!cityCheck.includes(from)) return `${from} is not avaliable`
        if (!cityCheck.includes(to)) return `${to} is not avaliable`

        const newVoyage = new VoyageModel({
            from,
            to,
            price,
            timeStart,
            timeEnd,
            timeTravel
        })
        await newVoyage.save()
        return `Success! Added (${from} - ${to})`
    }
}

module.exports = new VoyageService()