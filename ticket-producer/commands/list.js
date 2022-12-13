exports.command = 'list [options]'

exports.describe = 'List/Query tasks'

exports.builder = {
    id: {
        desc: "task identifier",
        demandOption: false,
        string: true
    },
}

exports.handler = function (argv) {
    // const status = taskList(argv.id);
    // console.log(JSON.stringify(status) + "\n")
    fetch(`http://producer:3000/tasks/${argv.id? argv.id:""}`)
  .then((response) => response.json())
  .then((data) => console.log(data));
}