const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const ticketService = require('./ticket-service')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')

require('dotenv').config()

class UserService {
    async registr(email, password) {
        const candidate = await UserModel.find({email})
        if(candidate.length !== 0){
            throw ApiError.BadRequest(`User with the specified email ${ email } is already exist`)
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))
        const newUser = new UserModel({
            email,
            password: hashedPassword
        }) 
        newUser.save()
        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if(!user){
            throw ApiError.BadRequest(`No user was found with email ${email}`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Wrong password')
        }
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)

        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    async addToCart(email, voyage, quantity, date) {
        const user = await UserModel.findOne({ email })
        if(!user){
            return 'Invalid email'
        }

        const tickets = user.tickets

        //Создаем билеты
        for(let i = 0; i < parseInt(quantity); i++){
            const ticket = await ticketService.addTicket(email, voyage, date)
            tickets.push(ticket._id)
        }

        //Обновляем корзину пользователя
        user.tickets = tickets
        await user.save()
        return tickets
    }
    async deleteFromCart(email, ticket) {
        const user = await UserModel.findOne({ email })
        if(!user){
            return 'Invalid email'
        }

        await ticketService.deleteTicket(ticket)

        const tickets = user.tickets
        const updatedTickets = []

        for(let i = 0; i < tickets.length; i++) {
            if(tickets[i].toString() !== ticket){
                updatedTickets.push(tickets[i])
            }
        }

        user.tickets = updatedTickets
        await user.save()
        return user.tickets
    }
}

module.exports = new UserService()