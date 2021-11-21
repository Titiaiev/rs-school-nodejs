/* eslint-disable no-undef */
const { parseArgs, parseConfigString } = require('../my_ciphering_cli/parsers.js')
const { invalidArgs, invalidConfigs, validArgs, validConfigs } = require('./stubs.js')

describe('Parser parseConfigString()', () => {
  it('should throw an exception if the configuration is incorrect ', () => {
    invalidConfigs.forEach(conf => {
      expect(() => {
        parseConfigString(conf)
      }).toThrow()
    })
  })

  it('should not throw an exception if the configuration is correct', () => {
    validConfigs.forEach(conf => {
      expect(() => {
        parseConfigString(conf)
      }).not.toThrow()
    })
  })

  it('should return array if the configuration is correct', () => {
    validConfigs.forEach(conf => {
      expect(parseConfigString(conf)).toBeInstanceOf(Array)
    })
  })
})

describe('Parser parseArgs()', () => {
  it('should return correct options object', () => {
    expect(parseArgs(validArgs)).toEqual({
      configString: 'A-A-A-R1-R0-R0-R0-C1-C1-A',
      inputFile: './input.txt',
      outputFile: './output.txt'
    })
  })

  it('should throw an exception if the args is incorrect', () => {
    invalidArgs.forEach(args => {
      expect(() => {
        parseArgs(args)
      }).toThrow()
    })
  })
})
