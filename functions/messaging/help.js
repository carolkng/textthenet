const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const send = require('../../helpers/send.js')

/**
* HELP handler, responds if user texts "help"
*  (or any uppercase variation like "MORE")
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
* @returns {any}
*/
module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', context) => {
  console.log("HELP triggered")
  return send(
    receiver,
    sender,
    `HELP: Text The Net` + 
      `\n\n` + 
      `SEARCH <thing>: To look something up\n` + 
      `IMAGE <thing>: To find an image\n` + 
      `BROWSE <link>: To get a snapshot of a page\n` + 
      `SUMMARY <link>: To get a summary of a page\n`
  )
}

