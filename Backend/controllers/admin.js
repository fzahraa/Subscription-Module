//mongodb user
const Profile = require("../models/profile");


//@desc      Searching users
//@route     Get /admin/searchNonVerified
//@access    Public


exports.searchNonVerifiedUsers = async (req, res) => {

    try {

        let profiles;

        profiles = await Profile.find({
            crnVerified: false
        })
            .populate("user", "name_en")
            .select({ "about_en.name": 1, "about_en.registrationNumber": 1, "contact_en.number": 1 });

        if (profiles.length < 1) {
            return res.json({
                status: "FAILURE",
                message: "No non-verified users found"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: profiles
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Searching users
//@route     Get /admin/searchVerified
//@access    Public


exports.searchVerifiedUsers = async (req, res) => {

    try {

        let profiles;

        profiles = await Profile.find({
            crnVerified: true
        })
            .populate("user", "name_en")
            .select({ "about_en.name": 1, "contact_en.number": 1 });

        if (profiles.length < 1) {
            return res.json({
                status: "FAILURE",
                message: "No verified users found"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: profiles
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Update profile
//@route     Patch /admin/updateprofile
//@access    Public


exports.updateProfile = async (req, res) => {

    let { id, crnVerified } = req.body;

    try {

        const profile = await Profile.findById(id);

        if (!profile) {
            return res.json({
                status: "FAILURE",
                message: "No user with given id exists"
            });
        }

        Profile.findByIdAndUpdate(
            id,
            {
                crnVerified,
            },
            {
                new: true,
            }
        ).then(() => {
            return res.json({
                status: "SUCCESS",
                message: "Profile updated"
            });
        })

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};

//@desc      Update profile
//@route     Patch /admin/updatesubsprofile
//@access    Public


exports.updateSubsProfile = async (req, res) => {

    let { id, subscriptionVerified } = req.body;


    try {

        const profile = await Profile.findById(id);

        if (!profile) {
            return res.json({
                status: "FAILURE",
                message: "No user with given id exists"
            });
        }

        Profile.findByIdAndUpdate(
            id,
            {
                subscriptionVerified,
            },
            {
                new: true,
            }
        ).then(() => {
            return res.json({
                status: "SUCCESS",
                message: "Profile updated"
            });
        })

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};

//@desc      Searching users
//@route     Get /admin/searchSubscriptionPendingUsers
//@access    Public


exports.searchSubscriptionPendingUsers = async (req, res) => {

    try {

        let profiles;

        profiles = await Profile.find({
            subscriptionVerified: false
        })
            .populate("user", "name_en")
            .select({ "about_en.name": 1, "about_en.registrationNumber": 1, "contact_en.number": 1, "subscriptionVerificationImage" : 1 });

        if (profiles.length < 1) {
            return res.json({
                status: "FAILURE",
                message: "No non-verified users found"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: profiles
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};
