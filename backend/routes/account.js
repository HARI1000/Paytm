const { Router } = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db/db");
const { mongo, default: mongoose } = require("mongoose");
const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const userid = req.userId;
        const data = await Account.findOne({ userId: userid });
        res.json({ balance: data.balance });
    }
    catch (err) {
        res.json("You are not authorized to accesss this");
    }

});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const fromid = req.userId;
        const data = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        const fromData = await Account.findOne({ userId: fromid });
        const toData = await Account.findOne({ userId: data.to });
        if (fromData && toData)
        {
            if (fromData.balance > data.amount)
            {
            await Account.updateOne({ userId: fromid }, { $inc:{balance:-data.amount} });
            await Account.updateOne({ userId: data.to }, { $inc:{balance:data.amount} });
            await session.commitTransaction();
            res.status(200).json({
                message: "Transfer successful"
            })
            }
            else
            {
                await session.abortTransaction();
                res.status(400).json({
                    message: "Insufficient balance"
                });
            }
        }
        else
        {
            await session.abortTransaction();
            res.status(400).json({
                message: "Invalid account"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.json("something went wrong");
    }
})



module.exports = { accountRouter };