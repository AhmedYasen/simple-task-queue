const amqp = require("amqplib");

const TaskQueueName = "taskq";
const ResultQueueName = "taskr";

// async function init_broker() {
//     console.log("connecting to broker...\n");
//     const conn = await amqp.connect("amqp://localhost:5672");
//     console.log("connected to broker\n");
//     const taskChannel = await conn.createChannel();
//     const resultChannel = await conn.createChannel();
//     await taskChannel.assertQueue(TaskQueueName);
//     await resultChannel.assertQueue(ResultQueueName);

//     exports.resultProduce = async function(content) {
//         await resultChannel.sendToQueue(ResultQueueName, Buffer.from(content));
//     }

//     exports.resultConsume = async function(callback) {
//         await resultChannel.consume(ResultQueueName, (msg) => {
//             const ack_func = (m) => resultChannel.ack(m);
//             callback(msg, ack_func)
//         });
//     }

//     exports.taskProduce = async function(content) {
//         await taskChannel.sendToQueue(TaskQueueName, Buffer.from(content));
//     }

//     exports.taskConsume = async function(callback) {
//         await taskChannel.consume(TaskQueueName, (task) => {
//             const ack_func = (t) => taskChannel.ack(t);
//             callback(task, ack_func);
//         })
//     }
//     console.log("Broker Initialized\n");
// }
// try {
//     init_broker()
// } catch (ex) {
//     console.error(ex);
// }

class Broker {
    constructor() {
        (async () => {
            const conn = await amqp.connect("amqp://rabbitmqc:5672");
            const taskChannel = await conn.createChannel();
            const resultChannel = await conn.createChannel();
            await taskChannel.assertQueue(TaskQueueName);
            await resultChannel.assertQueue(ResultQueueName);
            this.resultChannel = resultChannel;
            this.taskChannel = taskChannel;
            console.log("Broker Initialized\n");
        })();
    }

    async resultProduce(content) {
        await this.resultChannel.sendToQueue(ResultQueueName, Buffer.from(content));
    }
    
    async resultConsume(callback) {
        
        let rconsume = async () => await this.resultChannel.consume(ResultQueueName, (msg) => {
            const ack_func = (m) => this.resultChannel.ack(m);
            callback(msg, ack_func)
        });

        let consume_interval = () => {
            const interval = setInterval(() => {
                if(this.resultChannel) {
                    rconsume();
                    clearInterval(interval)
                }
            }, 500)
        }

        consume_interval();
    }
    
    async taskProduce(content) {
        await this.taskChannel.sendToQueue(TaskQueueName, Buffer.from(content));
    }

    async taskConsume(callback) {
        let tconsume = async () => await this.taskChannel.consume(TaskQueueName, (task) => {
            const ack_func = (t) => this.taskChannel.ack(t);
            callback(task, ack_func);
        })
        const interval = setInterval(() => {
            if(this.resultChannel) {
                tconsume();
                clearInterval(interval)
            }
        }, 500)
    }

}

module.exports = Broker;