const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const { sequelize } = require("./models");
// sequelize.sync({ force: true });
const routerUsers = require("./controllers/users/router");
const routerBooks = require("./controllers/books/router");
const routerTransaction = require("./controllers/transactions/router");

app.get("/", (req, res) =>
  res.json({ success: true, message: "Welcome to my rest api order-book" })
);
app.use("/users", routerUsers);
app.use("/books", routerBooks);
app.use("/transactions", routerTransaction);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
