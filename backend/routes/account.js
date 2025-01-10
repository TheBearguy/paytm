const express = require("express");
const {authMiddleware} = require("../middleware");
const {Account} =  require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post('/transfer', authMiddleware, async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        const {amount, to} = req.body;

        const account = await Account.findOne({userId: req.userId}).session(session);
        if (!account || amount > account.balance) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }
        console.log("TO  :: ", to);

        const toAccount = await Account.findOne({userId: to}).session(session);
        console.log("ToACCOUNT:: ", toAccount);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Account to pay the money is invalid"
            });
        }

        // Perform the transfer
        await Account.updateOne(
            {userId: req.userId},
            { $inc: { balance: -amount }}
        ).session(session);

        await Account.updateOne(
            {userId: to},
            { $inc: { balance: amount}}
        ).session(session);

        await session.commitTransaction();
        await session.endSession();

        return res.json({
            message: "Transfer successful"
        });
})


module.exports = router;
