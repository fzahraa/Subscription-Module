const app = require("express")();
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index.js");
const subscriptionRoute = require("./routes/subscription.js");
const fileupload = require("express-fileupload");


var timeout = require("connect-timeout");

app.use(timeout("60s"));

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

//app.use(cors());

app.use(
  fileupload({
    useTempfiles: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//connect db

const connectDB = require("./config/db");
connectDB();

//load env variables
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 8000;

const bodyParser = require("express").json;
app.use(bodyParser({ limit: "50mb" }));

//app.use("/subscriptions", subscriptionRoute);
app.use("/api", routes);

app.get('/', (req, res)=>{
  res.json("Its Working");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
