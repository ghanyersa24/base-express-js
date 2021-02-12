const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { sequelize } = require("./models");
// sequelize.sync();
// const { routes } = require("./router");
const routerUsers = require("./controllers/users/router");
const routerBooks = require("./controllers/books/router");
const routerTransaction = require("./controllers/transactions/router");
app.use("/users", routerUsers);
app.use("/books", routerBooks);
app.use("/transactions", routerTransaction);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
