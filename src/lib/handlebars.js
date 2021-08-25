const { helpers } = require('handlebars');
const { format } = require('timeago.js');

const helper = {}

helpers.timeago = (created_at) => {
    return format(created_at);
}

module.exports = helper;