const { json } = require('express')
const TicketModel = require('../models/ticket-model')
const voyageService = require('./voyage-service')

class TicketService {
    async getTickets(idArr) {
        const ticketsData = await TicketModel.find({ 
            _id : { $in : idArr } 
        })
        if(!ticketsData){
            return 'Nothing was found'
        }

        //Получаем актуальные данные о рейсе
        const resData = ticketsData
        const voyagesData = []
        for(const v of resData){
            const voyage = await voyageService.getVoyage(v.voyage)
            voyagesData.push(voyage[0])
        }
        return {resData, voyagesData}
    }

    async addTicket(email, voyage, date) {
        //Проверяем наличе рейса
        const voyageCheck = await voyageService.getVoyage(voyage)
        if(!voyageCheck) {
            return `This voyage doesn't exist!`
        }

        const newTicket = new TicketModel({
            user: email,
            voyage,
            date
        })
        await newTicket.save()
        return newTicket._id
    }
    async deleteTicket(id) {
        await TicketModel.findByIdAndDelete(id)
        return 'Success'
    }
}

module.exports = new TicketService()