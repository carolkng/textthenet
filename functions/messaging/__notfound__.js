const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const send = require('../../helpers/send.js')

const DEMO_REGEX = /^\s*what\s*do\s*you\s*think\s*of\s*([^\s\?]*)\s*.*$/gi

/**
* Not found handler - handles all SMS that don't match a command
*   (i.e. "more" = functions/messaging/more.js)
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
* @returns {any}
*/
module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', context) => {
  if (message.match(DEMO_REGEX)) {
    // We matched some regex
    let matches = new RegExp(DEMO_REGEX).exec(message)
    let item = matches[1].toLowerCase()
    return await lib[`${context.service.identifier}.messaging.snippet`]({
        query: item,
        sender: sender,
        message: message,
        receiver: receiver,
        createdDatetime: createdDatetime
    })
  } else {
    // We didn't find a command or match anything
    return send(
      receiver,
      sender,
      `Sorry, that's not a recognized command. \n` +
      `Try BROWSE, SNIPPET, IMAGE. For more info, text HELP.`
    )
  }
}

