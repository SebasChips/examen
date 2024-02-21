const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());



app.get("/api/users", (req, res) => {
  const connection = mysql.createConnection({
    host: "mysql.db-sebas.svc.cluster.local",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "password",
  });

  connection.query(
    "CREATE DATABASE IF NOT EXISTS nombres",
    function (err, result) {
      if (err) throw err;
      console.log("BASE DE DATOS OKE");
    }
  );

  connection.query("USE nombres", function (err, result) {
    if (err) throw err;
  });


  connection.query(
    "CREATE TABLE IF NOT EXISTS nombres (nombre VARCHAR(255))",
    function (err, result) {
      if (err) throw err;
      console.log("TABLA OKE");
    }
  );

  connection.query("SELECT * FROM nombres", function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
  connection.end();
});



app.post("/api/users", (req, res) => {
  const connection = mysql.createConnection({
    host: "mysql.db-sebas.svc.cluster.local",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "password",
  });



  connection.query("USE test", function (err, result) {
    if (err) throw err;
  });



  connection.query(
    `INSERT INTO nombres (nombre) VALUES ('${req.body.name}')`,
    function (err, result) {
      if (err) throw err;
      res.status(200).send("DATOS INSERTADOS");
    }
  );
  connection.end();
});

app.listen(3000, "0.0.0.0", () => {
  console.log("corriendo en el puerto 3000");
});
