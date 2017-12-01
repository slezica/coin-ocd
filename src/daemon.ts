import * as fs from 'fs'
import * as api from './api'
import * as storage from './storage'
const lockfile = require('proper-lockfile')


const LOCK_FILE = "/tmp/coin-ocd-lock"


function acquireLock() {
  fs.openSync(LOCK_FILE, 'a+') // ensure it exists
  lockfile.lockSync(LOCK_FILE)
}


async function updateDataset() {
  const dataset = await api.fetchDataset()
  storage.saveDataset(dataset)
}


process
  .once('SIGINT', () => process.exit(1))
  .once('SIGTERM', () => process.exit(1))


try {
  acquireLock()
} catch (error) {
  process.exit(1)
}

updateDataset()
setInterval(updateDataset, 60 * 1000)
