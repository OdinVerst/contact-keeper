const express = require("express");

const app = express();
app.get("/", (res, req) => req.json({ msg: "Welcom to Contact Keeper" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server start on ${PORT} - port`);
});
