const validator = require('validator');

const isValidUser = (user) => {
    return validator.isEmail(user.email)
    && validator.isAlphanumeric(user.full_name)
    && validator.isAlphanumeric(user.username)
    && validator.isAlphanumeric(user.password)
}

module.exports = { isValidUser }