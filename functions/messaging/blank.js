/**
* Returns the picture of a website via MMS.
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const send = require('../../helpers/send.js')

module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', query = '', context) => {
  return send(
    receiver,
    sender,
    `${query} must take an argument. \n` + 
    `Example: ${query} duckduckgo.com`
  )
}
