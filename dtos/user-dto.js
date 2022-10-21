module.exports = class UserDto {
    email
    tickets
    id

    constructor(model) {
        this.email = model.email
        this.tickets = model.tickets
        this.id = model._id
    }
}