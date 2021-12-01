const express = require('express');
const app = express();
const router = express.Router();
const radio = require("../radio.json")
router.get("/", (req,res) => {
  res.render("index.ejs", {title: "test", radio});
})
module.exports = router;