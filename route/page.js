const express = require('express');
const app = express();
var _ = require('underscore');
const router = express.Router();
const radio = require("../radio.json")
router.get("/", (req,res) => {
  res.render("index.ejs", {title: "test", radio, req, user: req.user});
})
router.use('/search', (req, res, next) => {
  let search = req.query.q;
    if (!search) search = "";
    search = search.toLowerCase();
    let radios = radio.info;
    let found = radios.filter(r => {
        if (r.name.toLowerCase().includes(search)) return true;
        else return false;
    });
    if (!found) return res.send({ error: "No radios found for this search" });
   res.render("search.ejs", {title: "test", radio, req, user: req.user});
});
module.exports = router;