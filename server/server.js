const express = require("express");
//const os = require("os");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

// app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Create a GET route
app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello Express!" });
});

// app.get("/api/getUsername", (req, res) =>
//     res.send({ username: os.userInfo().username })
// );

//Create POST route
app.post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${
            req.body.post
        }`
    );
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
