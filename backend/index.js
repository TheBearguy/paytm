const  express = require("express");

const app = express();


app.get('/', (req, res) => {
    res.send("I'm up")
})

app.listen(
    3000,
    () => {
        console.log("hello there");
    }
)
