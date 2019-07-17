const experss = require("express");
const router = experss.Router();

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", (res, req) => {
  req.send(`Register user`);
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Public
router.post("/", (res, req) => {
  req.send(`Auth user`);
});

module.exports = router;
