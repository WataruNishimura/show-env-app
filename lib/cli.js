#!/usr/bin/env node
const cac = require('cac')
const chalk = require('chalk')
const envinfo = require('envinfo')
const {version} = require('../package.json')
const figlet = require('figlet')
const asciifyImage = require('asciify-image')

const cli = cac('show-env-app')

const showEnvInfo = async () => {
  console.log(chalk.bold('Environment Info:'))
  const result = await envinfo.run({
    System: ['OS','CPU'],
    Binaries: ['Node','Yarn','Npm'],
    Browsers:['Chrome','Edge','Firefox','Safari']
  })
  console.log(result)
  process.exit(1)
}

const asciiOptions = {
  fit: 'box',
  width: '20',
  height: '20'
}

cli
  .command('','Print out debugging environment.')
  .option('--duck','Print out duck text.')
  .action((options) => {
    if(options.duck){
      return asciifyImage('lib/duck.jpeg',asciiOptions,(err, asciified)=>{
        if(err) throw err;
        console.log(asciified)
      })
    }

    return showEnvInfo()
  })

cli.help()

cli.version(version)
  
cli.parse()