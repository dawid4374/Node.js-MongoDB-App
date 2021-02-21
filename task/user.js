const fetch = require('node-fetch')
const QRCode = require('qrcode')

class User {
    constructor(url) {
        this.url = url
    }
    get userData() {
        return this.getUserData()
    }
    getUserData = () => {
        const data = fetch(this.url, { method: "Get" })
        .then(res => res.json())
        .then((json) => {
            return json
        })
        return data
    }
    getDomain = (userData) => {
        const domain = userData.email.slice(userData.email.lastIndexOf("@")+1);
        return domain
    }
}

module.exports = {
    getPersonData (userData) {

        console.log(userData)

        QRdata = JSON.stringify(userData)
    
        QRCode.toString(QRdata,{type:'terminal'}, function (err, userQRCode) {
            console.log(userQRCode)
        })
    },

    User: User
}

    