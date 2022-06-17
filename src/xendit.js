// For actual usage, this should be require('xendit-node')
const Xendit = require('xendit-node');
const dotenv = require('dotenv');

dotenv.config();

const x = new Xendit({
  secretKey: 'xnd_development_9p4awwgZplUW6KzAReSTt2x3R2XQeLpLh88e6nWfekrxfh2poQF9qIX4XaEPnb',
  xenditURL: 'https://api.xendit.co/'
});

module.exports = x;
