const bcrypt = require('bcrypt')

const hash = async () => {
    const BCRYPT_SALT_ROUNDS = 12;
    const dateNow = new Date();

    return new Promise((resolve, reject) => {
        bcrypt.hash(dateNow.getTime().toString(), BCRYPT_SALT_ROUNDS, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

const encrypt = async (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            bcrypt.hash(data, salt, (err, hash) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash)
                }
            })
        })
    })
}

const checkCrypt = async (text, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(text, hash, (err, isMatch) => {
            if (err) {
                reject(err)
            } else {
                resolve(isMatch)
            }
        })
    })
}

module.exports = {
    encrypt,
    checkCrypt,
    hash
}