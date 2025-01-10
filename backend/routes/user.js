const express = require("express");

const router = express.Router();
const zod = require("zod");
const  jwt = require("jsonwebtoken");
const { User, Account } = require("../db.js");
const { JWT_SECRET } = require("../config.js");
const { authMiddleware } = require("../middleware.js");


const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req, res, next) => {
    const {success} = signupBody.safeParse(req.body);
    if (!success) {
       return res.status(411).json({
        msg: "signupBody :: ERROR :: Invalid inputs / Email already taken"
       })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
       return res.status(411).json({
        msg: "signup :: ERROR :: User already exists"
       })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    // Now that the user is created, create an account for this user;

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // create a token:
    const token = await jwt.sign({
        userId,
    }, JWT_SECRET)

    res.status(200).json({
        msg: "Signup Successful",
        token: token
    })

})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res, next)=> {
    const {success} = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            msg: "singin :: ERROR :: invalid inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = await jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.status(200).json({
            msg: "New Token :: ",
            token
        })
        return;
    }

    res.status(500).json({
        msg: "singin :: ERROR :: Error while logging in"
    })

})

const updateBody = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.put('/', authMiddleware, async(req, res, next) => {
    const {success} = updateBody.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            msg: "update :: ERROR :: invalid inputs"
        })
    }
    await User.updateOne({
        _id: req.userId
    }, req.body)
    res.status(200).json({
        msg: "User updated successfullly"
    })
})

router.get("/bulk", async (req, res, next) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {firstName: { "$regex": filter }},
            {lastName: { "$regex": filter }},
        ]
    })
    res.status(200).json({
        user: users.map((user) => (
            {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            }
        ))
    })
})


module.exports = router;
