/**
* Returns a snippet of results for a single thing
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const mms = require('../../helpers/mms.js')
const search = require('../../helpers/search_got.js')

module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', query = '', context) => {
  console.log("IMAGE triggered")
  let summ = await search(query)
  console.log(JSON.stringify(summ.body))

  // Parse summ
  let result = summ.body['images']
  console.log(result)
  let result_1 = result.value[0]
  let result_1_snip = result_1.snippet
  let result_1_url = result_1.displayUrl
  
  return mms(
    sender,
    result_1.contentUrl
  )
}
