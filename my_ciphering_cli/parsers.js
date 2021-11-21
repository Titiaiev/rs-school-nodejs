const errors = require('./errors.js')

/**
 *
 * @param {Array<string>} args array of cli options
 * @returns {{configString: string, inputFile?: string, outputFile?: string}} Settings oblect
 */
function parseArgs (args = []) {
  const argsMap = {
    '-c': 'configString',
    '--config': 'configString',
    '-i': 'inputFile',
    '--input': 'inputFile',
    '-o': 'outputFile',
    '--output': 'outputFile'

  }

  const flags = {}
  let isFlag = true
  let currentFlag = ''
  for (const a of args) {
    if (isFlag) {
      if (!argsMap[a]) throw new errors.InvalidOption(a) // code 1
      if (flags[argsMap[a]] !== undefined) throw new errors.OptionDuplication(a) // code 5
      currentFlag = argsMap[a]
    } else {
      flags[currentFlag] = a
    }
    isFlag = !isFlag
  }

  if (flags.configString === undefined) throw new errors.MissingConfigOption() // code 6
  return flags
}

function parseConfigString (configString = '') {
  // C0|1 A R0|1
  // code 7
  const emptyString = /^\s*$/
  if (emptyString.test(configString)) throw new errors.InvalidConfig('Строка конфигурации не может быть пустой')

  const space = /\s/g
  if (space.test(configString)) throw new errors.InvalidConfig(`В конфигурации не должно быть пробелов: "${configString}"`)

  const invalidEnd = /[^A01]$/g
  if (invalidEnd.test(configString)) throw new errors.InvalidConfig('Конфигурационная строка может заканчиваться только такими символами 0|1|A')

  const invalidChars = /[^ACR01-]/g
  if (invalidChars.test(configString)) throw new errors.InvalidConfig(`Недопустимые символы в конфигурации: "${configString}"`)

  const configParts = configString.split('-')

  const validParts = ['A', 'C0', 'C1', 'R0', 'R1']
  for (const part of configParts) {
    if ((part.length > 2) || !validParts.includes(part)) throw new errors.InvalidConfig(`Невалидная часть конфигурации: "${part}"`)
  }

  return configParts
}

module.exports = {
  parseArgs,
  parseConfigString
}
