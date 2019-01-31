/**
* Returns the picture of a website via MMS.
*/

const lib = require('lib')({ token: process.env.STDLIB_TOKEN })
const screenshot = require('lib').utils.screenshot;

module.exports = async (to, body) => {
  if (!to) {
    return body
  }
  return lib.utils.mms({
    to: to,
    mediaUrl: body
  });
}
