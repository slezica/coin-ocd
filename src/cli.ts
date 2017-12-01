import * as commander from 'commander'
import * as storage from './storage'
import { Coin, Dataset } from './model'


type Arguments = {
  symbol: string,
  fetch : boolean
}


function parseArgs(argv: string[]): Arguments {
  commander
    .option('-c, --coin <symbol>', "Cryptocurrency symbol", "BTC")
    .parse(argv)

  if (commander.args.length > 1) {
    commander.help()
  }

  return {
    symbol: commander.coin ? commander.coin.toUpperCase() : 'BTC',
    fetch : commander.fetch
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
    console.log(`${coin.symbol} ${coin.priceUsd.toFixed(0)}`)

  } else {
    console.log(`${args.symbol} ?`)
  }
}
