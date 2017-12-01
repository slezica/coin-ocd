"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class Dataset {
    constructor(props) {
        Object.assign(this, props);
    }
    isRecent() {
        const then = moment.utc(this.downloadedAt);
        const now = moment.utc();
        return then.isAfter(now.subtract(5, 'minutes'));
    }
    getCoin(symbol) {
        return this.coins.filter(coin => coin.symbol === symbol)[0] || null;
    }
}
exports.Dataset = Dataset;
//# sourceMappingURL=model.js.map