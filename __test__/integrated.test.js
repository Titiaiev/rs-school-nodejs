/* eslint-disable no-undef */
const { main } = require('../my_ciphering_cli/index.js')
const { validArgs } = require('./stubs.js')

describe('Cli Error scenarios', () => {
  it('should 1', async () => {
    try {
      await main(['-c', 'C1-C1-A-R0', '-c', 'C0'])
    } catch (error) {
      expect(error.message).toMatch('Опция "-c" продублирована несколько раз')
    }
  })

  it('should 2', async () => {
    try {
      await main(['-i', './input.txt', '-o', './output.txt'])
    } catch (error) {
      expect(error.message).toMatch('Отсутствует обязательная опция "--config"')
    }
  })

  it('should 3', async () => {
    try {
      await main(['-c', 'C1-C1-A-R0', '-i', './notexist.txt', '-o', './output.txt'])
    } catch (error) {
      expect(error.message).toMatch('"./notexist.txt" файл не обнаружен')
    }
  })

  it('should 4', async () => {
    try {
      await main(['-c', 'C1-C1-A-R0', '-i', './input.txt', '-o', './notexist.txt'])
    } catch (error) {
      expect(error.message).toMatch('"./notexist.txt" файл не обнаружен')
    }
  })

  it('should 5', async () => {
    try {
      await main(['-c', 'C1-C1-T-R0', '-i', './input.txt', '-o', './output.txt'])
    } catch (error) {
      expect(error.message).toMatch('Недопустимые символы в конфигурации: "C1-C1-T-R0"\nПример правильной конфигурации "C1-A-R0"')
    }
  })
})

describe('Success scenarios', () => {
  it('should 1', async () => {
    try {
      await main(['-c', 'C1-C1-A-R0', '-i', './input.txt', '-o', './output.txt'])
    } catch (error) {
      expect(error).toBeUndefined()
    }
  })
})
