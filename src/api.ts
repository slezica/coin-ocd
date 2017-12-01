import 'isomorphic-fetch'
import * as moment from 'moment'
import { Coin, Dataset } from './model'


const ENDPOINT = 'https://api.coinmarketcap.com/v1/ticker?limit=100'


interface APICoinInfo {
  "id"                : string
  "name"              : string
  "symbol"            : string
  "rank"              : string
  "price_usd"         : string
  "price_btc"         : string
  "24h_volume_usd"    : string
  "market_cap_usd"    : string
  "available_supply"  : string
  "total_supply"      : string
  "max_supply"        : string
  "percent_change_1h" : string
  "percent_change_24h": string
  "percent_change_7d" : string
  "last_updated"      : string
}


export async function fetchDataset(): Promise<Dataset> {
  const res = await fetch(ENDPOINT)
  const items = await res.json() as APICoinInfo[]


  const downloadedAt = moment().utc().toISOString()

  const coins = items.map(item =>
    ({
      id              : item.id,
      name            : item.name,
      symbol          : item.symbol.toUpperCase(),
      rank            : parseInt(item.rank),
      priceUsd        : parseFloat(item.price_usd),
      priceBtc        : parseFloat(item.price_btc),
      volumeUsd24h    : parseInt(item['24h_volume_usd']),
      marketCapUsd    : parseInt(item.market_cap_usd),
      availableSupply : parseInt(item.available_supply),
      totalSupply     : parseInt(item.total_supply),
      maxSupply       : parseInt(item.max_supply),
      percentChange1h : parseFloat(item.percent_change_1h),
      percentChange24h: parseFloat(item.percent_change_24h),
      percentChange7d : parseFloat(item.percent_change_7d),
      updatedAt       : moment.unix(parseInt(item.last_updated)).utc().toISOString()
    })
  )

  return new Dataset({ downloadedAt, coins })
}
