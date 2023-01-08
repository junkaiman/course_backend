const {default: axios} = require("axios");
const { verify_cred_url } = require("../configs/mastodon_conf");

module.exports = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    axios
      .get(verify_cred_url, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        req.user_id = response.data.id;
        next();
    })
      .catch((e) => {
        res.sendStatus(403);
    });
  } else {
    res.sendStatus(403);
  }
};
