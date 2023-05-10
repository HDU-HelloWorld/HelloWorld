#!/usr/bin/env node
// var name = process.argv[2];
// let shell = require("shelljs")
import shell from 'shelljs'

function usePrinter(file_name) {
    shell.exec(`lpr ${file_name}`)
}

export { usePrinter }
