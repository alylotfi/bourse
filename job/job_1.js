/*
* Get all Central Bank Accounts Number from all Behdad credentials using Behdad webservices
* */

const JobService = require('../modules/behdad/services/AccountNumberService')
exports.JobRunning = () => {
  const CronJob = require('cron').CronJob
  new CronJob('*/5 * * * * *', async () => {
    // new CronJob('0 5 * * * *', async () => {
    // const Job = new JobService()
    // await Job.getAccountNumbersFromBehdad()
  }, null, true, 'Asia/Tehran')
}