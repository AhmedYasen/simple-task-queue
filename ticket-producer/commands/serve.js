exports.command = 'serve [service]'

exports.describe = 'Run the ticket service/server'

exports.builder = {
  service: {
    desc: "producer or consumer",
    default: "producer",
    string: true,
  },
}

exports.handler = function (argv) {
  require("../src/server");
}