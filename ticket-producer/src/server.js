const express = require('express')
const bodyParser = require("body-parser");
const producer = require("./task_producer");
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enqueue task
// content is json object
app.post('/tasks', async (req, res) => {
  let body = req.body;
  if (body.taskType) {
    const id = await producer.enqueue(req.body);
    res.send(id);
  } else {
    res.status(400).json({error: "Json MUST include taskType member"}).end()
  }
})

// list all -> /tasks
// list specific -> /tasks/[id]
app.get('/tasks/:id?', (req, res) => {
  res.send(JSON.stringify(producer.list(req.params.id)) + "\n");
})

app.listen(port, () => {
  console.log(`Ticket Service Started on port: ${port}`)
})