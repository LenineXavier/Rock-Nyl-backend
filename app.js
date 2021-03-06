require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const accountRouter = require("./routes/user.routes");
app.use("/account", accountRouter);

const productRouter = require("./routes/product.routes");
app.use("/product", productRouter);

const orderRouter = require("./routes/order.routes");
app.use("/orders", orderRouter);

const resetPasswordRouter = require("./routes/forgotPassword.routes");
app.use(`/password`, resetPasswordRouter);

const uploadRouter = require("./routes/uploadImages.routes");
app.use(`/upload`, uploadRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
