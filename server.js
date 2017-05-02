// Dependencies

var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    PORT = process.env.PORT || 3000;

// BodyParser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});