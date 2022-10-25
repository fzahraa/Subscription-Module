const express = require("express");
const router = express.Router();
const {
    createBlogPostEn,
    createBlogPostAr,
    searchBlogPostsEn,
    searchBlogPostsAr,
    searchBlogPostEn,
    searchBlogPostAr,
    searchBlogPostsByIdEn,
    searchBlogPostsByIdAr,
    sendMessageEn,
    sendMessageAr,
    sendLikeEn,
    sendLikeAr,
    getMessagesByIdEn,
    getMessagesByIdAr,
    getLikesByIdEn,
    getLikesByIdAr,
    deleteBlogPostEn,
    deleteBlogPostAr
} = require("../controllers/blogpost");

const verifyToken = require("../middleware/auth");

router.route("/createblogposten").post(verifyToken, createBlogPostEn);
router.route("/createblogpostar").post(verifyToken, createBlogPostAr);

router.route("/deleteblogposten/:profileId/:blogpostId").delete(verifyToken, deleteBlogPostEn);
router.route("/deleteblogpostar/:profileId/:blogpostId").delete(verifyToken, deleteBlogPostAr);

router.route("/searchbyiden/:profileId").get(verifyToken, searchBlogPostsByIdEn);
router.route("/searchbyidar/:profileId").get(verifyToken, searchBlogPostsByIdAr);

router.route("/searchen").get(searchBlogPostsEn);
router.route("/searchar").get(searchBlogPostsAr);

router.route("/searchen/:blogpostId").get(searchBlogPostEn);
router.route("/searchar/:blogpostId").get(searchBlogPostAr);

router.route("/sendmessageen/:blogpostId").patch(sendMessageEn);
router.route("/sendmessagear/:blogpostId").patch(sendMessageAr);

router.route("/sendlikeen/:blogpostId").patch(sendLikeEn);
router.route("/sendlikear/:blogpostId").patch(sendLikeAr);

router.route("/getmessagesen/:blogpostId").get(getMessagesByIdEn);
router.route("/getmessagesar/:blogpostId").get(getMessagesByIdAr);

router.route("/getlikesen/:blogpostId").get(getLikesByIdEn);
router.route("/getlikesar/:blogpostId").get(getLikesByIdAr);

module.exports = router;

