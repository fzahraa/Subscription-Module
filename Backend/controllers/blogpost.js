//mongodb user
const User = require("../models/user");
const Profile = require("../models/profile");
const BlogPost = require("../models/blogpost");

require("dotenv").config();


//@desc      Create blogpost
//@route     Post /blogpost/createblogposten
//@access    Private


exports.createBlogPostEn = async (req, res) => {

    let {
        createdBy,
        createdAt,
        post
    } = req.body;

    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                status: "FAILURE",
                message: `No user with id ${req.userId} exists`
            });
        }

        const profile = await Profile.findById(req.body.profile);

        if (!profile) {
            return res.json({
                status: "FAILURE",
                message: "No profile with given id exists"
            });
        }

        const newBlogPost = new BlogPost({
            user: req.userId,
            profile: req.body.profile,
            createdBy,
            createdAt,
            post
        });

        newBlogPost
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


//@desc      Create blogpost
//@route     Post /blogpost/createblogpostar
//@access    Private


exports.createBlogPostAr = async (req, res) => {

    let {
        createdBy,
        createdAt,
        post
    } = req.body;

    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                status: "FAILURE",
                message: `لا يوجد مستخدم بالمعرف ${req.userId}`
            });
        }

        const profile = await Profile.findById(req.body.profile);

        if (!profile) {
            return res.json({
                status: "FAILURE",
                message: "لا يوجد ملف تعريف بالمعرف المحدد"
            });
        }

        const newBlogPost = new BlogPost({
            user: req.userId,
            profile: req.body.profile,
            createdBy,
            createdAt,
            post
        });

        newBlogPost
            .save()
            .then(() => {
                return res.json({
                    status: "SUCCESS",
                    message: "تم إنشاء مشاركة مدونة"
                });
            })
            .catch((err) => {
                return res.json({
                    status: "FAILURE",
                    message: "حدث خطأ أثناء حفظ منشور مدونة المستخدم",
                    error: err.message
                });
            });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك",
            error: err.message
        });
    }
};


//@desc      Searching blogposts
//@route     Get /blogpost/searchen
//@access    Public


exports.searchBlogPostsEn = async (req, res) => {

    try {

        const blogposts = await BlogPost.find();

        if (blogposts.length < 1) {
            return res.json({
                status: "FAILURE",
                message: "No blogposts"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Searching blogposts
//@route     Get /blogpost/searchar
//@access    Public


exports.searchBlogPostsAr = async (req, res) => {

    try {

        const blogposts = await BlogPost.find();

        if (blogposts.length < 1) {
            return res.json({
                status: "FAILURE",
                message: "لا توجد مشاركات مدونة"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "طلب ناجح",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك"
        });
    }
};


//@desc      Searching blogpost
//@route     Get /blogpost/searchen/:blogpostId
//@access    Public


exports.searchBlogPostEn = async (req, res) => {

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: "FAILURE",
                message: "No blogpost"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: blogpost
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Searching blogpost
//@route     Get /blogpost/searchar/:blogpostId
//@access    Public


exports.searchBlogPostAr = async (req, res) => {

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: "FAILURE",
                message: "لا توجد مشاركة مدونة"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "طلب ناجح",
            data: blogpost
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك"
        });
    }
};


//@desc      Searching blogposts by id
//@route     Get /blogpost/searchbyiden/:profileId
//@access    Public


exports.searchBlogPostsByIdEn = async (req, res) => {

    try {

        const blogposts = await BlogPost.find({ profile: req.params.profileId });

        if (!blogposts) {
            return res.json({
                status: "FAILURE",
                message: "No blogposts with given id exists"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Searching blogposts by id
//@route     Get /blogpost/searchbyidar/:profileId
//@access    Public


exports.searchBlogPostsByIdAr = async (req, res) => {

    try {

        const blogposts = await BlogPost.find({ profile: req.params.profileId });

        if (!blogposts) {
            return res.json({
                status: "FAILURE",
                message: "لا توجد مشاركات مدونة بالمعرف المحدد"
            });
        }

        return res.json({
            status: "SUCCESS",
            message: "طلب ناجح",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك"
        });
    }
};


//@desc      Send message in an existing blogpost
//@route     Patch /blogpost/sendmessageen/:blogpostId
//@access    Public


exports.sendMessageEn = async (req, res) => {

    const { message, profileId } = req.body;

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "No blogpost with given id exists",
            });
        }

        await BlogPost.findByIdAndUpdate(
            req.params.blogpostId,
            { $push: { messages: message } },
            { safe: true, upsert: true, new: true }
        );

        const blogposts = await BlogPost.find({ profile: profileId });

        return res.json({
            status: "SUCCESS",
            message: "Message sent",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request",
            error: err.message
        });
    }
};


//@desc      Send message in an existing blogpost
//@route     Patch /blogpost/sendmessagear/:blogpostId
//@access    Public


exports.sendMessageAr = async (req, res) => {

    const { message, profileId } = req.body;

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "لا توجد مشاركة مدونة بالمعرف المحدد",
            });
        }

        await BlogPost.findByIdAndUpdate(
            req.params.blogpostId,
            { $push: { messages: message } },
            { safe: true, upsert: true, new: true }
        );

        const blogposts = await BlogPost.find({ profile: profileId });

        return res.json({
            status: "SUCCESS",
            message: "تم الارسال",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك",
            error: err.message
        });
    }
};


//@desc      Send like in an existing blogpost
//@route     Patch /blogpost/sendlikeen/:blogpostId
//@access    Public


exports.sendLikeEn = async (req, res) => {

    const { like, profileId } = req.body;

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "No blogpost with given id exists"
            });
        }

        await BlogPost.findByIdAndUpdate(
            req.params.blogpostId,
            { $push: { likes: like } },
            { safe: true, upsert: true, new: true }
        );

        const blogposts = await BlogPost.find({ profile: profileId });

        return res.json({
            status: "SUCCESS",
            message: "Like sent",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request",
            error: err.message
        });
    }
};


//@desc      Send like in an existing blogpost
//@route     Patch /blogpost/sendlikear/:blogpostId
//@access    Public


exports.sendLikeAr = async (req, res) => {

    const { like, profileId } = req.body;

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "لا توجد مشاركة مدونة بالمعرف المحدد"
            });
        }

        await BlogPost.findByIdAndUpdate(
            req.params.blogpostId,
            { $push: { likes: like } },
            { safe: true, upsert: true, new: true }
        );

        const blogposts = await BlogPost.find({ profile: profileId });

        return res.json({
            status: "SUCCESS",
            message: "أعجبني أرسلت",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك",
            error: err.message
        });
    }
};


//@desc      Get messages
//@route     Get /blogpost/getmessagesen/:blogpostId
//@access    Public


exports.getMessagesByIdEn = async (req, res) => {

    try {

        const messages = await BlogPost.findById(req.params.blogpostId).select({
            messages: 1
        });

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: messages
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Get messages
//@route     Get /blogpost/getmessagesar/:blogpostId
//@access    Public


exports.getMessagesByIdAr = async (req, res) => {

    try {

        const messages = await BlogPost.findById(req.params.blogpostId).select({
            messages: 1
        });

        return res.json({
            status: "SUCCESS",
            message: "طلب ناجح",
            data: messages
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك"
        });
    }
};


//@desc      Get likes
//@route     Get /blogpost/getlikesen/:blogpostId
//@access    Public


exports.getLikesByIdEn = async (req, res) => {

    try {

        const likes = await BlogPost.findById(req.params.blogpostId).select({
            likes: 1
        });

        return res.json({
            status: "SUCCESS",
            message: "Successful request",
            data: likes
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request"
        });
    }
};


//@desc      Get likes
//@route     Get /blogpost/getlikesar/:blogpostId
//@access    Public


exports.getLikesByIdAr = async (req, res) => {

    try {

        const likes = await BlogPost.findById(req.params.blogpostId).select({
            likes: 1
        });

        return res.json({
            status: "SUCCESS",
            message: "طلب ناجح",
            data: likes
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك"
        });
    }
};


//@desc      Delete an existing blogpost
//@route     Patch /blogpost/deleteblogposten/:blogpostId
//@access    Public


exports.deleteBlogPostEn = async (req, res) => {

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "No blogpost with given id exists"
            });
        }

        await BlogPost.findByIdAndDelete(req.params.blogpostId);

        const blogposts = await BlogPost.find({ profile: req.params.profileId });

        return res.json({
            status: "SUCCESS",
            message: "BlogPost deleted",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "There is some error while processing your request",
            error: err.message
        });
    }
};


//@desc      Delete an existing blogpost
//@route     Patch /blogpost/deleteblogpostar/:blogpostId
//@access    Public


exports.deleteBlogPostAr = async (req, res) => {

    try {

        const blogpost = await BlogPost.findById(req.params.blogpostId);

        if (!blogpost) {
            return res.json({
                status: 404,
                message: "لا توجد مشاركة مدونة بالمعرف المحدد"
            });
        }

        await BlogPost.findByIdAndDelete(req.params.blogpostId);

        const blogposts = await BlogPost.find({ profile: req.params.profileId });

        return res.json({
            status: "SUCCESS",
            message: "تم حذف مشاركة المدونة",
            data: blogposts
        });

    } catch (err) {
        return res.json({
            status: "FAILURE",
            message: "حدث خطأ ما أثناء معالجة طلبك",
            error: err.message
        });
    }
};