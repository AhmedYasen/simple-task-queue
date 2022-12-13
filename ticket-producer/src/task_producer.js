const uuidv4 = require("uuid").v4;
const Broker = require("./broker");
const Status = require("./task_status").Status;

const broker = new Broker();
let TaskStatus = {};

broker.resultConsume(async (msg, ack) => {
    try {
        console.log("Status Received:\n", msg.content.toString());
        ack(msg);
        const result = JSON.parse(msg.content.toString());
        TaskStatus[result.id].status = result.status;
    } catch (error) {
        console.log("Status Exception:\n", error.message);
    }
});


exports.enqueue = async function (content) {
    const task = {
        id: uuidv4(),
        content: content,
    };
    TaskStatus[task.id] = {taskType: content.taskType, status: Status.Processing};
    console.log("Task Enqueued: \n", task);
    broker.taskProduce(JSON.stringify(task));
    return task.id;
}


exports.list = function (id) {
    let ret = {};
    if (id) {
        ret[id] = TaskStatus[id] == undefined ? "ID NOT FOUND" : TaskStatus[id];
    } else {
        ret = TaskStatus;
    }
    return ret;
}
