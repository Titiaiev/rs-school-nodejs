class ErrorWithCode extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

class InvalidOption extends ErrorWithCode {
    constructor(optName) {
        super(1, `Недопустимая опция: "${optName}"`)
    }
}

class OptionDuplication extends ErrorWithCode {
    constructor(optName) {
        super(5, `Опция "${optName}" продублирована несколько раз`)
    }
}

class MissingConfigOption extends ErrorWithCode {
    constructor() {
        super(6, `Отсутствует обязательная опция "--config"`)
    }
}

class InvalidConfig extends ErrorWithCode {
    constructor(message = 'Невалидная конфигурация') {
        super(7, `${message}\nПример правильной конфигурации "C1-A-R0"`)
    }
}

module.exports = {
    InvalidOption,
    OptionDuplication,
    MissingConfigOption,
    InvalidConfig
}