"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const model_1 = require("./model");
const DATASET_FILE = '/tmp/coin-ocd.json';
function saveDataset(dataset) {
    fs_1.writeFileSync(DATASET_FILE, JSON.stringify(dataset), 'utf-8');
}
exports.saveDataset = saveDataset;
function loadDataset() {
    try {
        return new model_1.Dataset(JSON.parse(fs_1.readFileSync(DATASET_FILE, 'utf-8')));
    }
    catch (error) {
        return null;
    }
}
exports.loadDataset = loadDataset;
//# sourceMappingURL=storage.js.map