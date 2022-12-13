# Getting Services Up
Just run `docker compose up --build -d`

# Usage
**using cli**
 - help: `docker exec -it producerc node /app/src/cli.js --help`
 - enqueue task: `docker exec -it producerc node /app/src/cli.js enq -t [taskType] -p [taskParameters]`
 - **example**: `docker exec -it producerc node /app/src/cli.js enq -t SendEmail -p {"from": "a@b.com", "to": "c@b.com", "body": "abc"}`
 - list all tasks: `docker exec -it producerc node /app/src/cli.js list`
 - list specific task: `docker exec -it producerc node /app/src/cli.js list --id [ID]` (DON'T FORGET ID)
 
 ---
 **using REST Api**
 - enqueue task: `POST http://localhost:3000/tasks` payload `{taskType: "abc", ...}`
 - list all tasks: `GET http://localhost:3000/tasks`
 - list specific task: `GET http://localhost:3000/tasks/[ID]` (DON'T FORGET ID)
 
# Sequence Diagram
![Untitled Diagram drawio (1)](https://user-images.githubusercontent.com/18401282/207250980-2c22d0dd-8e19-490c-ab52-c7033af97026.png)

 
