const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/htmlRoutes"));
//app.use(require ("./routes/apiRoutes"))
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
