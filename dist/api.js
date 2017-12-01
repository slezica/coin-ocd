"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
const moment = require("moment");
const model_1 = require("./model");
const ENDPOINT = 'https://api.coinmarketcap.com/v1/ticker?limit=100';
function fetchDataset() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(ENDPOINT);
        const items = yield res.json();
        const downloadedAt = moment().utc().toISOString();
        const coins = items.map(item => ({
            id: item.id,
            name: item.name,
            symbol: item.symbol.toUpperCase(),
            rank: parseInt(item.rank),
            priceUsd: parseFloat(item.price_usd),
            priceBtc: parseFloat(item.price_btc),
            volumeUsd24h: parseInt(item['24h_volume_usd']),
            marketCapUsd: parseInt(item.market_cap_usd),
            availableSupply: parseInt(item.available_supply),
            totalSupply: parseInt(item.total_supply),
            maxSupply: parseInt(item.max_supply),
            percentChange1h: parseFloat(item.percent_change_1h),
            percentChange24h: parseFloat(item.percent_change_24h),
            percentChange7d: parseFloat(item.percent_change_7d),
            updatedAt: moment.unix(parseInt(item.last_updated)).utc().toISOString()
        }));
        return new model_1.Dataset({ downloadedAt, coins });
    });
}
exports.fetchDataset = fetchDataset;
//# sourceMappingURL=api.js.map