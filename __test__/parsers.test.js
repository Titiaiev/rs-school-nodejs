/* eslint-disable no-undef */
const { parseArgs, parseConfigString } = require('../my_ciphering_cli/parsers.js')

const validArgs = ['-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '-i', './input.txt', '-o', './output.txt']
const invalidArgs = [
  ['-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '-d', './input.txt'],
  ['-i', './input.txt', '-o', './output.txt'],
  ['-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '-i', './input.txt', '-o', './output.txt', '--output', './output.txt']
]

const invalidConfigs = [
  '',
  'C2',
  'C1-A1',
  'C1- A1',
  'T1',
  'AR1',
  'C-A-R'
]

const validConfigs = [
  'C1-C1-R0-A',
  'C1-C0-A-R1-R0-A-R0-R0-C1-A',
  'A-A-A-R1-R0-R0-R0-C1-C1-A',
  'C1-R1-C0-C0-A-R0-R1-R1-A-C1'
]

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
