const PORT = process.env.PORT || 3000;
require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();

const jwt = require("jsonwebtoken");
const cors = require("cors");

const DB_CONTROLLER = require("./controllers/db_controllers");
const db_controller = new DB_CONTROLLER();

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(express.json());
app.use(router);

let refreshTokens = [];

router.get("/api/users", authenticateUser, (req, res, next) => {
  //res.json(users.filter((user) => user.username === req.user.name));
});

router.post("/api/login", async (req, res, next) => {
  var username = req.body.username;

  var user = {
    username: username,
  };

  const accessToken = await generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  console.log("accesstoken", accessToken);
  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

router.delete("/api/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

router.post("/api/token", async (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, verifed) => {
    if (err) return res.sendStatus(403);
    const access_token = generateAccessToken({ verifed: verifed.name });
    res.send({ access_token: access_token });
  });
});

router.post("/api/leepal", (req, res) => {
  console.log("req res ", req.body);
});
router.get(
  "/api/:phone_no/evoucher",
  authenticateUser,
  async (req, res, next) => {
    var data = await db_controller.getEvouchers(req, res);
    res.send(data);
    next();
  }
);

router.post("/api/evoucher", authenticateUser, async (req, res, next) => {
  await db_controller.createVouchers(req, res);
  next();
});

router.put(
  "/api/:phone_no/evoucher/",
  authenticateUser,
  async (req, res, next) => {
    await db_controller.editEvoucher(req, res);
    next();
  }
);

router.put(
  "/api/:phone_no/evoucher/purchase",
  authenticateUser,
  async (req, res, next) => {
    await db_controller.purchaseItems(req, res);
    next();
  }
);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("Success");
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}
