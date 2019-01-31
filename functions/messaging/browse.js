/**
* Returns the picture of a website via MMS.
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const screenshot = require('lib').utils.screenshot;
const mms = require('../../helpers/mms.js')

module.exports = async (sender = '', receiver = '', message = '', createdDatetime = '', query = '', context) => {
  let body = `http://utils.lib.id/screenshot/?url=${query}&screenSize=desktop`
  return mms(
    sender, 
    body
  );
}
