const mongoose = require("mongoose")


const DB_NAME = "paytm"
const connectDB = async () => {
    try {
        const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB Connnected :: DB HOST :: ", connectionInstance.connection.host);
    } catch (error) {
        console.error("MongoDB Error :: ERROR :: ", error);
        process.exit(1);
    }
}

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
}, {
    timestamps: true
});


const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    Account
}; 

connectDB()
