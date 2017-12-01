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
const fs = require("fs");
const api = require("./api");
const storage = require("./storage");
const lockfile = require('proper-lockfile');
const LOCK_FILE = "/tmp/coin-ocd-lock";
function acquireLock() {
    fs.openSync(LOCK_FILE, 'a+'); // ensure it exists
    lockfile.lockSync(LOCK_FILE);
}
function updateDataset() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataset = yield api.fetchDataset();
        storage.saveDataset(dataset);
    });
}
function run() {
    process
        .once('SIGINT', () => process.exit(1))
        .once('SIGTERM', () => process.exit(1));
    try {
        acquireLock();
    }
    catch (error) {
        process.exit(1);
    }
    updateDataset();
    setInterval(updateDataset, 60 * 1000);
}
exports.run = run;
//# sourceMappingURL=daemon.js.map