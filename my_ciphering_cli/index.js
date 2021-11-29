#!/usr/bin/env node
const { parseArgs, parseConfigString } = require('./parsers.js')
const { tryCreateReadStreamForPath, tryCreateWriteStreamForPath } = require('./helpers.js')
const { JobManager } = require('./job-manager.js')

if (require.main === module) main(process.argv.slice(2)).catch(errHandler)

async function main (args = []) {
  const { configString, inputFile, outputFile } = parseArgs(args)

  const settings = {
    /** @type {Array<string>} */
    config: parseConfigString(configString),

    /**  @type {NodeJS.ReadStream} */
    input: inputFile ? tryCreateReadStreamForPath(inputFile) : process.stdin,

    /** @type {NodeJS.WriteStream} */
    output: outputFile ? tryCreateWriteStreamForPath(outputFile) : process.stdout
  }

  await new JobManager()
    .createPiplineFromCofig(settings.config)
    .run(settings.input, settings.output)
}

function errHandler (err) {
  if (err.isCustom) {
    process.stderr.write(`${err.name}: ${err.message}\nexitCode: ${err.code}\n`)
    process.exit(err.code || 1)
  } else {
    throw err
  }
}

module.exports = {
  main
}
