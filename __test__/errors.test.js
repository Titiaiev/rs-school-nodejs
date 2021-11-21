/* eslint-disable no-undef */
const { FileNotExist, InvalidConfig, InvalidOption, MissingConfigOption, OptionDuplication, PermitionsError } = require('../my_ciphering_cli/errors.js')

describe('Custom errors', () => {
  it('FileNotExist should have the correct message', () => {
    expect(() => {
      throw new FileNotExist('file.txt')
    }).toThrowError('"file.txt" файл не обнаружен')
  })

  it('InvalidConfig should have the correct message ', () => {
    expect(() => {
      throw new InvalidConfig('Невалидная конфигурация')
    }).toThrowError('Невалидная конфигурация\nПример правильной конфигурации "C1-A-R0"')
  })

  it('InvalidOption should have the correct message ', () => {
    expect(() => {
      throw new InvalidOption('--notValid')
    }).toThrowError('Недопустимая опция: "--notValid"')
  })

  it('MissingConfigOption should have the correct message ', () => {
    expect(() => {
      throw new MissingConfigOption()
    }).toThrowError('Отсутствует обязательная опция "--config"')
  })

  it('OptionDuplication should have the correct message ', () => {
    expect(() => {
      throw new OptionDuplication('--output')
    }).toThrowError('Опция "--output" продублирована несколько раз')
  })

  it('PermitionsError should have the correct message ', () => {
    expect(() => {
      throw new PermitionsError('file.txt')
    }).toThrowError('Нет прав на доступ к файлу или "file.txt" не является файлом')
  })
})
