const Status = Object.keys(require("./task_status").Status);
const brokermod = require("./broker");

const broker = new brokermod.Broker();

broker.taskConsume((task, ack) => {
    ack(task);
    task = JSON.parse(task.content.toString());
    let random_status = Math.floor(Math.random() * 3) + 1;
    const result = {
        id: task.id,
        status: Status[random_status],
    }
    broker.resultProduce(JSON.stringify(result));
});