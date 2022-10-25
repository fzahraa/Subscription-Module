const express = require("express");
const router = express.Router();
const { searchNonVerifiedUsers, searchVerifiedUsers, updateProfile, searchSubscriptionPendingUsers, updateSubsProfile } = require("../controllers/admin");


router.route("/searchNonVerified").get(searchNonVerifiedUsers);
router.route("/searchVerified").get(searchVerifiedUsers);
router.route("/searchSubscriptionPendingUsers").get(searchSubscriptionPendingUsers);
router.route("/updateProfile").patch(updateProfile);
router.route("/updateSubsProfile").patch(updateSubsProfile);


module.exports = router;

