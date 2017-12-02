import * as commander from 'commander'
import * as storage from './storage'
import chalk from 'chalk'
import { Coin, Dataset } from './model'


type Arguments = {
  symbol: string
}


const HELP = `
Usage: coin-ocd [symbol=BTC]

Options:
    -h, --help: print usage information

Examples:
    $ coin-ocd     # print Bitcoin price
    $ coin-ocd eth # print Ethereum price
    $ coin-ocd bch # print BitcoinCash price
`


function parseArgs(argv: string[]): Arguments {
  commander
    .arguments("[symbol]")
    .parse(argv)

  commander.on('--help', () => console.log(HELP))

  if (commander.args.length > 1) {
    commander.help()
  }

  return {
    symbol: commander.args[0] ? commander.args[0].toUpperCase() : 'BTC'
  }
}


export async function run() {
  if (process.argv.length < 2) {
    process.argv.push('coin-ocd') // commander throws without this. Yeah
  }

  const args = parseArgs(process.argv)
  const dataset = storage.loadDataset()

  if (dataset != null && dataset.isRecent()) {
    const coin = dataset.getCoin(args.symbol)

    if (coin == null) {
      console.error("Unknown currency: " + args.symbol)
      process.exit(1)
    }

    let arrow
    let color: 'green' | 'red'

    if (coin.percentChange1h > 0) {
      arrow = '⭡'
      color = 'green'
    } else {
      arrow = '⭣'
      color = 'red'
    }

    const message = `${coin.symbol} ${arrow} ${coin.priceUsd.toFixed(0)}`

    console.log(chalk.bold[color](message))

  } else {
    console.log(chalk.bold.gray(`${args.symbol} ⭮`))
  }
}
