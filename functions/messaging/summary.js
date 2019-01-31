/**
* Returns the summary of text on a page
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const send = require('../../helpers/send.js')
const smmry = require('../../helpers/smmry_got.js')

module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', query = '', context) => {
  console.log("SUMMARY triggered")
  let summ = await smmry(query)
  let result = JSON.parse(summ.body)
  // console.log(summ.body)
  if (summ.body.indexOf("sm_api_title") > -1) {
    return send(
      receiver,
      sender,
      `SUMMARY: ${result["sm_api_title"]}` + 
        `\n\n` + 
        `${result["sm_api_content"]}`
    )
  } else {
  return send(
  receiver,
  sender,
  `SUMMARY: Failed to summarize link. \n\nPerhaps it's not in an article format?'`
  )
  }

}
