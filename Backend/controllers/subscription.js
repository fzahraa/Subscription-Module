//mongodb user
const User = require("../models/user");
const Profile = require("../models/profile");
const Subscription = require("../models/subscriptions");

require("dotenv").config();
//@desc      Searching users
//@route     Get /admin/searchNonVerified
//@access    Public

exports.createSubscriptionEn = async (req, res) => {
    try {
        // const user = await User.findById(req.userId);

        // if (!user) {
        //     return res.json({
        //         status: "FAILURE",
        //         message: `No user with id ${req.userId} exists`
        //     });
        // }

        // const profile = await Profile.findById(req.body.profile);

        // if (!profile) {
        //     return res.json({
        //         status: "FAILURE",
        //         message: "No profile with given id exists"
        //     });
        // }
        let {
            name_en,
            creatorProfileAndIdeaBook,
            addToCommunity,
            clientsReview,
            projectLimit,
            shareProfile,
            priorityDisplaySearch,
            promotion,
            quotation,
            videoProfilePreview,
            verificationDiscount,
            subscriptionTime,
            newUser
        } = req.body;
    
        const newSubscription = new Subscription({
            // name_en: req.name_en,
            // creatorProfileAndIdeaBook: req.creatorProfileAndIdeaBook,
            // addToCommunity: req.addToCommunity,
            // clientsReview: req.clientsReview,
            // projectLimit: req.projectLimit,
            // shareProfile: req.shareProfile,
            // priorityDisplaySearch: req. priorityDisplaySearch,
            // promotion: req.promotion,
            // quotation: req.quotation,
            // videoProfilePreview: req.videoProfilePreview,
            // verificationDiscount: req.verificationDiscount,
            // subscriptionTime: req.subscriptionTime,
            // newUser: req.newUser
            name_en,
            creatorProfileAndIdeaBook,
            addToCommunity,
            clientsReview,
            projectLimit,
            shareProfile,
            priorityDisplaySearch,
            promotion,
            quotation,
            videoProfilePreview,
            verificationDiscount,
            subscriptionTime,
            newUser
        });
        newSubscription
            .save()
            .then(() => {
                return res.json({
                    status: "SUCCESS",
                    message: "BlogPost created"
                });
            })
            .catch((err) => {
                return res.json({
                    status: "FAILURE",
                    message: "An error occurred while saving user blog post",
                    error: err.message
                });
            });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request",
            error: err.message
        });
    }
};
exports.getAllSubscriptionsEn = async (req, res) => {
  
    try {
  
      let subs;
        subs = await Subscription.find();
         
  
      if (subs.length < 1) {
        return res.json({
          status: "FAILURE",
          message: `No subscriptions registered in this category`,
        });
      }
  
      return res.json({
        status: "SUCCESS",
        message: "Successful request",
        data: subs,
      });
  
    } catch (err) {
      return res.json({
        status: "FAILURE",
        message: "There is some error while processing your request",
      });
    }
  };
  