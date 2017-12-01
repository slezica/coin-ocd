import * as moment from 'moment'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { Dataset, Coin } from './model'


const DATASET_FILE = '/tmp/coin-ocd.json'


export function saveDataset(dataset: Dataset) {
  writeFileSync(DATASET_FILE, JSON.stringify(dataset), 'utf-8')
}


export function loadDataset(): Dataset | null {
  try {
    return new Dataset(
      JSON.parse(readFileSync(DATASET_FILE, 'utf-8'))
    )

  } catch (error) {
    return null
  }
}
