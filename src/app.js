const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost:27017/clientes",  { useNewUrlParser: true, 
useUnifiedTopology: true 
});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
  console.log("Conexão realizada com sucesso.")
});

//rotas
const clientes = require("./routes/clientesRoute");


//app.use(bodyParser.json()); ou
app.use(express.json()); 

//Podemos usar a propria função de parser de json do express, sem a necessidade de instalar o body parser 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  });

app.use("/clientes", clientes)

module.exports = app;
