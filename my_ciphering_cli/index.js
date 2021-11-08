#!/usr/bin/env node
const { parseArgs, parseConfigString } = require('./parsers.js')
const { tryCreateReadStreamForPath, tryCreateWriteStreamForPath } = require('./helpers.js')
const { JobManager } = require('./job-manager.js')


main(process.argv.slice(2))

function main(args = []) {

    try {
        const { configString, inputFile, outputFile } = parseArgs(args)

        const settings = {
            /** @type {Array<string>} */
            config: parseConfigString(configString),

            /**  @type {NodeJS.ReadStream} */
            input: inputFile ? tryCreateReadStreamForPath(inputFile) : process.stdin,

            /** @type {NodeJS.WriteStream} */
            output: outputFile ? tryCreateWriteStreamForPath(outputFile) : process.stdout
        }

        new JobManager()
            .createPiplineFromCofig(settings.config)
            .run(settings.input, settings.output)

    } catch (err) {
        process.stderr.write(`ERROR: ${err.message}\nexitCode: ${err.code}\n`)
        process.exit(err.code || 1)
    }
}