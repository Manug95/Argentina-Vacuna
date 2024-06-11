import express from "express";
// const path = require('path');

const app = express();


// app.use(express.static("public"));
app.use(express.json());


// app.get("*", (req, res) => {
//   if (req.url.includes("favicon.ico")) {
//     res.end();
//   }

//   res.status(404).sendFile("error-404.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
//       res.status = 500;
//       res.end();
//   });
// });



export { app };