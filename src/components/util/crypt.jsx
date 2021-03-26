import CryptoJS from 'crypto-js'

class Crypt {
    constructor() {
        this.state = {
            key: process.env.REACT_APP_API_KEY
        }
    }

    decrypt(str) {
        return CryptoJS.AES.decrypt(str, this.state.key).toString(CryptoJS.enc.Utf8)
    }

    encrypt(str) {
        return CryptoJS.AES.encrypt(str, this.state.key).toString()
    }
}

export default Crypt;