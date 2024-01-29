const { clientServer } = require("./bundle/server");

const handler = clientServer();

exports.handler = handler;
