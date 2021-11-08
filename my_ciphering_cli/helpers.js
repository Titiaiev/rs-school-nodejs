const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {fs.PathLike} filePath 
 * @returns 
 */
 function tryCreateReadStreamForPath(filePath) {
    if (typeof filePath === 'undefined') return null
    try {
        fs.accessSync(path.resolve(filePath), fs.constants.R_OK)
        return fs.createReadStream(path.resolve(filePath), { encoding: 'utf-8' })
    } catch (error) {
        throw error
    }
}

/**
 * 
 * @param {fs.PathLike} filePath 
 * @returns 
 */
function tryCreateWriteStreamForPath(filePath) {
    if (typeof filePath === 'undefined') return null
    try {
        fs.accessSync(path.resolve(filePath), fs.constants.W_OK)
        return fs.createWriteStream(path.resolve(filePath), { encoding: 'utf-8', flags: 'r+', start: fs.statSync(path.resolve(filePath)).size })
    } catch (error) {
        throw error
    }
}

const isEnglishCharCode = (code) => (((code > 96 && code < 123) || (code > 64 && code < 91)))

module.exports = {
    tryCreateReadStreamForPath,
    tryCreateWriteStreamForPath,
    isEnglishCharCode
}
