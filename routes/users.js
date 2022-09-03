const express = require("express");
const { getAllUsers, getSingleUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById } = require("../controllers/user_controller");

const {users} = require("../data/users.json");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUserById);

router.post("/", createNewUser);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUser);

router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;  //default export //this line must be at the end