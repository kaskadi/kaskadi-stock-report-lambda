module.exports.handler = async (event) => {
  const listRecipients = require('./helpers/list-recipients.js')
  const searchAllProducts = require('./helpers/search-all-products.js')
  const getWeekNumber = require('./helpers/get-week-number.js')
  const buildMsg = require('./helpers/build-msg.js')
  const sendEmail = require('./helpers/send-email.js')
  await Promise.all([listRecipients(), searchAllProducts()])
  .then(data => sendEmail({
    from: 'stock-reporter@klimapartner.net',
    to: data[0],
    subject: `Weekly stock report - week ${getWeekNumber(new Date())}`,
    html: buildMsg(data[1])
  }))
}
