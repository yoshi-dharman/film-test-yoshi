const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const routes = require("./routes/filmRoute");

app.use(cors());
app.use(express.json());
app.get("/", (req,res) => {
    res.json({
        message : "REST API Film"
    })
})
app.use(routes);

app.listen(port, () => {
    console.log("server running on port "+port);
});