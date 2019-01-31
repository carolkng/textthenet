const got = require('got')

const SUBSCRIPTION_KEY = process.env['SMMRY_API_KEY']
if (!SUBSCRIPTION_KEY) {
  throw new Error('SMMRY_API_KEY is not set.')
}

module.exports = async (query) => {
  const length = 4 //sentences
  let hostname = `https://api.smmry.com/?SM_API_KEY=${SUBSCRIPTION_KEY}&SM_LENGTH=${length}&SM_URL=${query}`
  let responsebod 

try {
responsebod = await got(hostname)
} catch (e) {
console.err('Error: ' + e.message)
throw e
}

  return responsebod
}
