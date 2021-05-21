const validator = require('validator');

const isValidUser = (user) => {

    return validator.isEmail(user.email)
    && /[0-9a-zA-Z ]/.test(user.full_name)
    && validator.isAlphanumeric(user.username)
    && validator.isAlphanumeric(user.password);
}

module.exports = { isValidUser }