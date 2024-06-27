import express from "express";
import pug from "pug";
// const path = require('path');

import { loteRouter } from "./rutas/lote.router.js";

const app = express();


app.use(express.static("public"));
app.use(express.json());

app.use("/lotes", loteRouter);


// app.get("*", (req, res) => {
//   if (req.url.includes("favicon.ico")) {
//     res.end();
//   }

//   res.status(404).sendFile("error-404.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
//       res.status = 500;
//       res.end();
//   });
// });

app.get("/", (req, res) => {
  if (req.url.includes("favicon.ico")) {
    res.end();
  }

  res.send(pug.renderFile("src/vistas/index.pug", {
    pretty: true,
    activeLink: "home",
    estilos: "styles.css",
  }));
});



export { app };