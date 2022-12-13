const amqp = require("amqplib");

const TaskQueueName = "taskq";
const ResultQueueName = "taskr";

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

        const interval = setInterval(() => {
            if(this.resultChannel) {
                rconsume();
                clearInterval(interval)
            }
        }, 500)
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

exports.Broker = Broker;