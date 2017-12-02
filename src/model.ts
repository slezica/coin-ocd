import * as moment from 'moment'


export interface Coin {
  readonly id              : string
  readonly name            : string
  readonly symbol          : string
  readonly rank            : number
  readonly priceUsd        : number
  readonly priceBtc        : number
  readonly volumeUsd24h    : number
  readonly marketCapUsd    : number
  readonly availableSupply : number
  readonly totalSupply     : number
  readonly maxSupply       : number
  readonly percentChange1h : number
  readonly percentChange24h: number
  readonly percentChange7d : number
  readonly updatedAt       : string
}


export class Dataset {
  readonly coins       : Coin[]
  readonly downloadedAt: string

  constructor(props: Partial<Dataset>) {
    Object.assign(this, props)
  }

  isRecent() {
    const then = moment.utc(this.downloadedAt)
    const now = moment.utc()

    return then.isAfter(now.subtract(5, 'minutes'))
  }

  hasCoin(symbol: string) {
    return (this.getCoin(symbol) != null)
  }

  getCoin(symbol: string): Coin | null {
    return this.coins.filter(coin => coin.symbol === symbol)[0] || null
  }
}


