const experss = require("express");
const router = experss.Router();

//@route    GET api/contacts
//@desc     Get all user contacts
//@access   Private
router.get("/", (res, req) => {
  req.send(`Get all contacts`);
});

//@route    POST api/auth
//@desc     Add new contact
//@access   Private
router.post("/", (res, req) => {
  req.send(`Add new contact`);
});

//@route    PUT api/auth/:id
//@desc     Update contact
//@access   Private
router.put("/:id", (res, req) => {
  req.send(`Update contact`);
});

//@route    DELETE api/auth/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", (res, req) => {
  req.send(`Delete contact`);
});

module.exports = router;
