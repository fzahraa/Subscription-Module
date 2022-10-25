const express= require('express');
// var subscription = require('../models/subscriptions');
// const router = express();

// router.post('/createSubscription', (req, res) => {
//     console.log("hi");
//     let subscriptions = {
//         creatorProfileAndIdeaBook: true,
//           addToCommunity: true,
//           clientsReview: true
//     }
//     subscription.create(subscriptions).then(function(subsData){
//         res.send(subsData)
//     })
// })

// router.get('/test', (req, res) => {
//     res.send("test")
// })

// module.exports = router;

const router = express.Router();
const {
    createSubscriptionEn,
    getAllSubscriptionsEn
} = require("../controllers/subscription");

const verifyToken = require("../middleware/auth");

router.route("/createSubscriptionEn").post(createSubscriptionEn);
router.route("/getAllSubscriptionsEn").get(getAllSubscriptionsEn);

module.exports = router;

