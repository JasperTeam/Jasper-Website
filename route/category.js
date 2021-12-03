const express = require('express');
const app = express();
const router = express.Router();
const radio = require("../radio.json")
router.get("/:id", (req,res) => {
  res.render("category.ejs", {title: "test", radio, req, user:req.user});
})
module.exports = router;