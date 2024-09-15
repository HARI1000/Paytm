const z = require("zod");
const { Router } = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { User,Account} = require("../db/db.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const userRouter = Router();
const signupSchema = z.object(
    {
        username: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string().min(6),
    }
)
const signinSchema = z.object(
    {
        username: z.string().email(),
        password: z.string().min(6)
    }
)
const updateSchema = z.object(
    {
        password: z.string(6).optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    }
)

userRouter.post("/signup", async (req, res) => {
    var data = req.body;
    const { success } = signupSchema.safeParse(data);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const response = await User.exists({ username: data.username });
    if (response) {
        res.status(411).json(
            {
                message: "Email already taken / Incorrect inputs"
            });
    }
    else {
        try {
            const response = await User.create(data);
            const user_id = response._id;
            const token = jwt.sign({ userId: user_id }, JWT_SECRET);
            await Account.create({
                userId:user_id,
                balance:1 + Math.floor(Math.random()*10000),
            })
            res.status(200).json({
                message: "User created successfully",
                token: token,
            });
        }
        catch (err) {
            console.log(err);
        }
    }
})

userRouter.post("/signin", async (req, res) => {
    var data = req.body;
    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    var response = await User.findOne({ username: data.username });
    const user_id = response._id;
    if (response.password == data.password) {
        const token = jwt.sign({ userId: user_id }, JWT_SECRET);
        res.status(200).json({
            message:"succesfully signedin",
            token: token
        }); 
    }
    else {
        res.status(411).json({
            message: "Error while logging in",
        })
    }
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    const { success } = updateSchema.safeParse(data);
    if (!success) {
        res.status(411).json({
            message: "Wrong Inputs"
        });
    }
    else {
        try {
            await User.updateOne({ _id: userId }, data);
            res.status(200).json({
                message: "Updated successfully"
            })
        }
        catch (err) {
            res.status(411).json({
                message: "Error while Updating"
            });
        }
    }

})


userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const response = await User.find({
            $or: [{ firstName: {"$regex":filter} }, { lastName: {"$regex":filter} }]
        });
        const filteredresponse = response.map((r) => {
            return {
                firstName: r.firstName,
                lastName: r.lastName,
                _id: r._id
            };
        });
        res.status(200).json(filteredresponse);
    }
    catch (err) {
        console.log(err);
    }

})

module.exports = { userRouter };