const PORT = process.env.PORT || 3000;
require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();

const jwt = require("jsonwebtoken");
const cors = require("cors");

const DB_CONTROLLER = require("./controllers/db_controllers");
const db_controller = new DB_CONTROLLER();

app.use(cors({ origin: `http://localhost:${PORT}` }));
app.use(express.json());
app.use(router);

var users = [
  {
    username: "Min Khant",
  },
  {
    username: "Khant Dev",
  },
];

router.get("/api/users", authenticateUser, (req, res) => {
  res.json(users.filter((user) => user.username === req.user.name));
});
router.post("/api/login", async (req, res, next) => {
  const username = req.body.username;

  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

router.get("/api/:phone_no/evoucher", async (req, res) => {
  var data = await db_controller.getEvouchers(req, res);
  res.send(data);
});

router.post("/api/evoucher", async (req, res) => {
  await db_controller.createVouchers(req, res);
});

router.put("/api/:phone_no/evoucher/", async (req, res) => {
  await db_controller.editEvoucher(req, res);
});

router.put("/api/:phone_no/evoucher/purchase", async (req, res) => {
  await db_controller.purchaseItems(req, res);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (token == null) return res.status(401);
  console.log("TOKEN", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
}
