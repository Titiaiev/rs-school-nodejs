const CAESAR_SHIFT = 1
const ROT_SHIFT = 8

/**
 * 
 * @param {Number} code the position of the letter in the alphabet
 * @returns {Number}
 */
const Atbash = (code) => 26 - code + 1;

const Caesar = {
    encode: commonCipher(CAESAR_SHIFT),
    decode: commonCipher(-CAESAR_SHIFT)
}

const ROT8 = {
    encode: commonCipher(ROT_SHIFT),
    decode: commonCipher(-ROT_SHIFT)
}

function commonCipher(shift) {
    /** 
     * @param {Number} code the position of the letter in the alphabet
     * @returns {Number}
    */
    return (code) => {
        const res = code + shift
        if (res > 0 && res <= 26) return res
        if (res > 26) return res - 26
        if (res <= 0) return 26 + res
    }
}

module.exports = {
    Atbash,
    Caesar,
    ROT8
}
