class ErrorWithCode extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
    this.name = this.constructor.name
    this.isCustom = true
  }
}

class InvalidOption extends ErrorWithCode {
  constructor (optName) {
    super(1, `Недопустимая опция: "${optName}"`)
  }
}

class OptionDuplication extends ErrorWithCode {
  constructor (optName) {
    super(5, `Опция "${optName}" продублирована несколько раз`)
  }
}

class MissingConfigOption extends ErrorWithCode {
  constructor () {
    super(6, 'Отсутствует обязательная опция "--config"')
  }
}

class InvalidConfig extends ErrorWithCode {
  constructor (message = 'Невалидная конфигурация') {
    super(7, `${message}\nПример правильной конфигурации "C1-A-R0"`)
  }
}

class FileNotExist extends ErrorWithCode {
  constructor (file = '') {
    super(8, `"${file}" файл не обнаружен`)
  }
}

class PermitionsError extends ErrorWithCode {
  constructor (file = '') {
    super(9, `Нет прав на доступ к файлу или "${file}" не является файлом`)
  }
}

module.exports = {
  InvalidOption,
  OptionDuplication,
  MissingConfigOption,
  InvalidConfig,
  FileNotExist,
  PermitionsError
}
