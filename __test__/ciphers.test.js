/* eslint-disable no-undef */
const { Atbash, Caesar, ROT8 } = require('../my_ciphering_cli/ciphers.js')

describe('Ciphers ', () => {
  it('Atbash(26) should return 1', () => {
    expect(Atbash(26)).toBe(1)
  })

  it('Atbash(1) should return 26', () => {
    expect(Atbash(1)).toBe(26)
  })

  it('Caesar.encode(24) should return 25', () => {
    expect(Caesar.encode(24)).toBe(25)
  })

  it('Caesar.decode(24) should return 23', () => {
    expect(Caesar.decode(24)).toBe(23)
  })

  it('ROT8.encode(24) should return 6', () => {
    expect(ROT8.encode(24)).toBe(6)
  })

  it('ROT8.decode(24) should return 16', () => {
    expect(ROT8.decode(24)).toBe(16)
  })
})
