const lib = require('lib')({ token: process.env.STDLIB_TOKEN })

/**
* Generic MessageBird SMS handler
* @param {string} sender The phone number that sent the text to be handled
* @param {string} receiver The StdLib phone number that received the SMS
* @param {string} message The contents of the SMS
* @param {string} createdDatetime Datetime when the SMS was sent
* @returns {any}
*/
module.exports = async (sender = '', receiver = '', message = '_', createdDatetime = '', context) => {
  // Try to find a handler for the message, default to __notfound__
  let handler = message.toLowerCase().trim().replace(/[^a-z0-9:\/\._-]/gi, '_') || '_'
  console.log(handler)
  let result
  let query
  try {
    if (handler.startsWith(`browse_`)) {
      query = handler.replace('browse_','');
      console.log("QUERY: <" + query)
      
       result = await lib[`${context.service.identifier}.messaging.browse`]({
          query: query,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
      
    } else if (handler.startsWith(`summary_`)) {
      query = handler.replace('summary_','');
      console.log(query)
       result = await lib[`${context.service.identifier}.messaging.summary`]({
          query: query,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
      
    } else if (handler.startsWith(`snippet_`)) {
      query = handler.replace('snippet_','');

       result = await lib[`${context.service.identifier}.messaging.snippet`]({
          query: query,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
    
    } else if (handler.startsWith(`search_`)) {
      query = handler.replace('search_','');

       result = await lib[`${context.service.identifier}.messaging.snippet`]({
          query: query,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
    
    } else if (handler.startsWith(`image_`)) {
      query = handler.replace('image_','');
       result = await lib[`${context.service.identifier}.messaging.image`]({
          query: query,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
    } else {
      console.log('else')
      if ("browser snippet image summary".indexOf(handler) > -1) {
        result = await lib[`${context.service.identifier}.messaging.blank`]({
          query: handler,
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
      } else {
        result = await lib[`${context.service.identifier}.messaging.${handler}`]({
          sender: sender,
          message: message,
          receiver: receiver,
          createdDatetime: createdDatetime
        })
      }
    }
  } catch (e) {
    // Catch thrown errors specifically so we can log them. See logs using
    // $ lib logs <username>.<service name> from the command line
    console.error(e)
    return
  }
  return result
}

