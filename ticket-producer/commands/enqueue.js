exports.command = 'enq [options]'

exports.describe = 'Enqueue tasks'

exports.builder = {
    t: {
        desc: "task type",
        alias: "task-type",
        demandOption: true,
    },
    p: {
        demandOption: false,
        alias: "params",
        desc: "task parameters in json format",
    }
}

exports.handler = function (argv) {
    const content = {
        taskType: argv.taskType,
        ...argv.params
    };
    fetch("http://producer:3000/tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then((response) => response.text())
    .then((data) => console.log(data));
}