/**
* Returns a snippet of results for a single thing
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const send = require('../../helpers/send.js')
const search = require('../../helpers/search_got.js')

module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', query = '', context) => {
    console.log("SNIPPET triggered")
  let summ = await search(query)
  
  // Parse summ
  let result = summ.body.webPages
  let result_1 = result.value[0]
  let result_1_snip = result_1.snippet
  let result_1_url = result_1.displayUrl
  
  return send(
    receiver,
    sender,
    `SNIPPET: ${query}` + 
      `\n\n` + 
      `Snippet from '${result_1_url}': \n` +
      result_1_snip
  )
}
