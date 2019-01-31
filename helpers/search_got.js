const got = require('got')

const SUBSCRIPTION_KEY = process.env['AZURE_SUBSCRIPTION_KEY']
if (!SUBSCRIPTION_KEY) {
  throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
}

module.exports = async (query) => {
  let hostname = 'api.cognitive.microsoft.com'
  let path = '/bing/v7.0/search?q=' + encodeURIComponent(query)
  let headers = { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
  let responsebod 
  
  try {
    responsebod = await got(hostname + path, {
      headers: headers,
      json: true
    })
  } catch (e) {
    console.err('Error: ' + e.message)
    throw e
  }

  return responsebod
}
