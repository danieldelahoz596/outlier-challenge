const jsonServer = require("json-server");
const questions = require("./src/questions.json");

const server = jsonServer.create();
const router = jsonServer.router({ questions });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("Server is running");
});
