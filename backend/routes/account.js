const express = require("express");
const authMiddleware = require("../middleware");
const {Account, User} = require("../db");
const { default: mongoose } = require("mongoose");

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
    // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
    const session = mongoose.startSession();

    try {
        (await session).startTransaction();
        const {amount, to} = req.body;
        const account = await  Account.findOne({userId: req.userId}).session(session);
        if (!account || amount > account.balance) {
            (await session).abortTransaction();
            return res.status(400).json({
                msg: "Insufficient Balance"
            })
        }
        const toAccount = Account.findOne({userId: to}).session(session);
        if (!toAccount) {
            (await session).abortTransaction();
            return res.status(400).json({
                msg: "Account to pay the money is invalid"
            })
        }

        // transfer
        Account.updateOne({userId: req.userId}, { $inc: { balance: -amount }}).session(session);
        Account.updateOne({userId: to}, { $inc: { balance: amount}}).session(session);
        //commit
        (await session).commitTransaction();
    } catch{
        async (e) => await session.abortTransaction();
        console.log(e);
    }
    // With transactionAsyncLocalStorage, you no longer need to pass sessions to every operation. Mongoose will add the session by default under the hood.
})


module.exports = router; 
