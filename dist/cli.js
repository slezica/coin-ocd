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
const commander = require("commander");
const storage = require("./storage");
function parseArgs(argv) {
    commander
        .option('-c, --coin <symbol>', "Cryptocurrency symbol", "BTC")
        .parse(argv);
    if (commander.args.length > 1) {
        commander.help();
    }
    return {
        symbol: commander.coin ? commander.coin.toUpperCase() : 'BTC',
        fetch: commander.fetch
    };
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length < 2) {
            process.argv.push('coin-ocd'); // fix 'node -e' bug with commander
        }
        const args = parseArgs(process.argv);
        const dataset = storage.loadDataset();
        if (dataset != null && dataset.isRecent()) {
            const coin = dataset.getCoin(args.symbol);
            console.log(`${coin.symbol} ${coin.priceUsd.toFixed(0)}`);
        }
        else {
            console.log(`${args.symbol} ?`);
        }
    });
}
exports.run = run;
//# sourceMappingURL=cli.js.map