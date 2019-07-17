const experss = require("express");
const router = experss.Router();

//@route    POST api/users
//@desc     Registr a user
//@access   Public
router.post("/", (res, req) => {
  req.send(`Register user`);
});

module.exports = router;
