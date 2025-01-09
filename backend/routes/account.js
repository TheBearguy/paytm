const express = require("express");
const authMiddleware = require("../middleware");
const {Account} = require("../db");

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res, next) => {
    const account =  await Account.findOne({
        userId: req.userId
    });
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res, next) => {
    // db transaction
    // user should not pay an amount they dont possess
})
