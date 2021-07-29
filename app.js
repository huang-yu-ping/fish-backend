const express = require("express");
const app = express();
const morgan = require("morgan");
//error
const errorHandler = require("./middleware/error-handler");
//google
// const passport = require("passport");
// require("./middleware/passport-setup");

const PORT = 3000;

//morgan
app.use(morgan("dev"));

//cors
const cors = require("cors");

//public middleware
app.use(cors());
//json
app.use(express.json());

//passport
// app.use(passport.initialize());
// app.use(passport.session())

//router
app.use("/api/member", require("./router/member"));
app.use("/api/activity", require("./router/activity"));
app.use("/api/profile", require("./router/profile"));
app.use("/api/product", require("./router/product"));
app.use("/api/cart", require("./router/shopping-cart"));
app.use("/api/order", require("./router/products-order"));
//picture
app.use(express.static("images"));
//error
app.use(errorHandler());

app.listen(PORT, () => {
  console.log("server is running...in 3000 port");
});
