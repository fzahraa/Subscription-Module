const app = require("express");
const router = app.Router();

//routes
const userRouter = require("./user");
const profileRouter = require("./profile");
const publicRouter = require("./public");
const adminRouter = require("./admin");
const blogpostRouter = require("./blogpost");
const subscriptionRouter = require("./subscription");

//route middleware
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/public", publicRouter);
router.use("/admin", adminRouter);
router.use("/blogpost", blogpostRouter);
router.use("/subscription", subscriptionRouter);

module.exports = router;
