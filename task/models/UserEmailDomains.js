const mongoose = require('mongoose')

const UserEmailDomainsSchema = new mongoose.Schema({
    domain: { 
        type: String 
    },
    count: { 
        type: Number,
        default: 1
    }
})

const UserEmailDomains = mongoose.model('UserEmailDomains', UserEmailDomainsSchema)

module.exports = UserEmailDomains;