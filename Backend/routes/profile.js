const express = require("express");
const router = express.Router();
const {
  createProfileEn,
  createProfileAr,
  addProjectEn,
  addProjectAr,
  deleteProjectEn,
  deleteProjectAr,
  updateProjectEn,
  updateProjectAr,
  updateProfileAr,
  updateProfileEn,
  takeReviewEn,
  takeReviewAr,
  addIdeaEn,
  addIdeaAr,
  sendCommentEn,
  sendCommentAr,
  getCommentsByIdEn,
  getCommentsByIdAr,
  deleteIdeaEn,
  deleteIdeaAr,
  updateSubscriptionDetailsEn
} = require("../controllers/profile");

const verifyToken = require("../middleware/auth");

//create new profile
router
  .route("/createprofileen")
  .post(verifyToken, createProfileEn);
router
  .route("/createprofilear")
  .post(verifyToken, createProfileAr);

router.route("/updateprofileen/:profileId").patch(verifyToken, updateProfileEn);
router.route("/updateprofilear/:profileId").patch(verifyToken, updateProfileAr);

router.route("/addprojecten/:profileId").patch(verifyToken, addProjectEn);
router.route("/addprojectar/:profileId").patch(verifyToken, addProjectAr);

router
  .route("/deleteprojecten/:profileId/:projectId")
  .patch(verifyToken, deleteProjectEn);
router
  .route("/deleteprojectar/:profileId/:projectId")
  .patch(verifyToken, deleteProjectAr);

router
  .route("/updateprojecten/:profileId/:projectId")
  .patch(verifyToken, updateProjectEn);
 router.route("/updatesubscriptiondetailsen/:profileId").patch(updateSubscriptionDetailsEn);
router
  .route("/updateprojectar/:profileId/:projectId")
  .patch(verifyToken, updateProjectAr);

router.route("/reviewen/:profileId/:projectId").patch(takeReviewEn);
router.route("/reviewar/:profileId/:projectId").patch(takeReviewAr);

router.route("/addideaen/:profileId").patch(verifyToken, addIdeaEn);
router.route("/addideaar/:profileId").patch(verifyToken, addIdeaAr);

router.route("/sendcommenten/:profileId/:ideaId").patch(sendCommentEn);
router.route("/sendcommentar/:profileId/:ideaId").patch(sendCommentAr);

router.route("/getcommentsen/:profileId/:ideaId").get(getCommentsByIdEn);
router.route("/getcommentsar/:profileId/:ideaId").get(getCommentsByIdAr);

router
  .route("/deleteideaen/:profileId/:ideaId")
  .patch(verifyToken, deleteIdeaEn);
router
  .route("/deleteideaar/:profileId/:ideaId")
  .patch(verifyToken, deleteIdeaAr);


module.exports = router;
