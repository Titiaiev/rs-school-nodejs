const { Transform, pipeline } = require('stream')
const util = require('util')

const { Atbash, Caesar, ROT8 } = require('./ciphers.js')
const { isEnglishCharCode } = require('./helpers.js')
const asyncPipeline = util.promisify(pipeline)

class Job extends Transform {
  constructor (alg, opts) {
    super(opts)
    this.alg = alg
  }

  /**
     *
     * @param {Buffer} chunk
     * @param {*} encoding
     * @param {*} cb
     */
  _transform (chunk, encoding, cb) {
    function processAlgForLetter (code, alg) {
      if (!isEnglishCharCode(code)) return code

      const [letter, delta] = code < 91 ? [code - 64, 64] : [code - 96, 96]
      const processedLetter = alg(letter)
      return processedLetter + delta
    }

    try {
      chunk = chunk.map((char) => processAlgForLetter(char, this.alg))
      cb(null, chunk)
    } catch (error) {
      cb(error)
    }
  }
}

class JobManager {
  constructor () {
    /** @private */
    this.jobs = []
  }

  /**
     *
     * @param {Array<string>} config
     * @returns {this}
     */
  createPiplineFromCofig (config = []) {
    const handlers = { A: Atbash, C0: Caesar.decode, C1: Caesar.encode, R0: ROT8.decode, R1: ROT8.encode }

    for (const job of config) {
      this.jobs.push(new Job(handlers[job]))
    }
    return this
  }

  /**
     *
     * @param {NodeJS.ReadStream} input
     * @param {NodeJS.WriteStream} output
     */
  async run (input, output) {
    await asyncPipeline(input, ...this.jobs, output)
    return this
  }
}

module.exports = {
  JobManager
}
