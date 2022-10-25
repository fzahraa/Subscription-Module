//mongodb user
const User = require("../models/user");
const Profile = require("../models/profile");
const translate = require('@vitalets/google-translate-api');

require("dotenv").config();


//@desc      Create profile
//@route     Post /profile/createprofileen
//@access    Private


exports.createProfileEn = async (req, res) => {

  let {
    about,
    experience,
    resource,
    service_en,
    service_ar,
    contact,
    photo
  } = req.body;

  try {

    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        status: "FAILURE",
        message: "No user with given id exists"
      });
    } else if (user.role == "user") {
      return res.json({
        status: "FAILURE",
        message: "User of this role is not allowed to create a profile"
      });
    } else if (user.profile == "true" || user.profile == true) {
      return res.json({
        status: "FAILURE",
        message: "This user already has a profile"
      });
    }

    translate(about.name, { from: 'en', to: 'ar', client: 'gtx' }).then((res1) => {
      translate(about.address, { from: 'en', to: 'ar', client: 'gtx' }).then((res2) => {
        translate(about.vision, { from: 'en', to: 'ar', client: 'gtx' }).then((res3) => {
          translate(contact.person, { from: 'en', to: 'ar', client: 'gtx' }).then((res4) => {

            const newProfile = new Profile({
              user: req.userId,
              about_en: about,
              about_ar: {
                name: res1.text,
                address: res2.text,
                establishmentYear: about.establishmentYear,
                registrationNumber: about.registrationNumber,
                vision: res3.text,
                highestMonetaryValue: about.highestMonetaryValue
              },
              experience,
              resource,
              service_en,
              service_ar,
              contact_en: contact,
              contact_ar: {
                person: res4.text,
                number: contact.number
              },
              photo
            });

            newProfile
              .save()
              .then(async (profile) => {

                const update = { profile: "true", profileId: profile.id };

                await User.findByIdAndUpdate(req.userId, update, {
                  new: true
                });

                return res.json({
                  status: "SUCCESS",
                  message: "Profile created"
                });

              })
              .catch((err) => {
                return res.json({
                  status: "FAILURE",
                  message: "An error occurred while saving user profile",
                  error: err.message
                });
              });
          })
        })
      })
    })
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};


//@desc      Create profile
//@route     Post /profile/createprofilear
//@access    Private

exports.createProfileAr = async (req, res) => {

  let {
    about,
    experience,
    resource,
    service_en,
    service_ar,
    contact,
    photo,
  } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد مستخدم بالمعرف المعطى موجود"
      });
    } else if (user.role == "المستعمل") {
      return res.json({
        status: "FAILURE",
        message: "لا يُسمح لمستخدم هذا الدور بإنشاء ملف تعريف"
      });
    } else if (user.profile == "true" || user.profile == true) {
      return res.json({
        status: "FAILURE",
        message: "هذا المستخدم لديه بالفعل ملف تعريف"
      });
    }

    translate(about.name, { from: 'ar', to: 'en', client: 'gtx' }).then((res1) => {
      translate(about.address, { from: 'ar', to: 'en', client: 'gtx' }).then((res2) => {
        translate(about.vision, { from: 'ar', to: 'en', client: 'gtx' }).then((res3) => {
          translate(contact.person, { from: 'ar', to: 'en', client: 'gtx' }).then((res4) => {

            const newProfile = new Profile({
              user: req.userId,
              about_en: {
                name: res1.text,
                address: res2.text,
                establishmentYear: about.establishmentYear,
                registrationNumber: about.registrationNumber,
                vision: res3.text,
                highestMonetaryValue: about.highestMonetaryValue
              },
              about_ar: about,
              experience,
              resource,
              service_en,
              service_ar,
              contact_en: {
                person: res4.text,
                number: contact.number
              },
              contact_ar: contact,
              photo
            });

            newProfile
              .save()
              .then(async (profile) => {

                const update = { profile: "true", profileId: profile.id };

                await User.findByIdAndUpdate(req.userId, update, {
                  new: true
                });

                return res.json({
                  status: "SUCCESS",
                  message: "تم إنشاء الملف الشخصي"
                });

              })
              .catch((err) => {
                return res.json({
                  status: "FAILURE",
                  message: "حدث خطأ أثناء حفظ ملف تعريف المستخدم",
                  error: err.message
                });
              });
          })
        })
      })
    })
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Update profile
//@route     Patch /profile/updateprofileen/:profileId
//@access    Private


exports.updateProfileEn = async (req, res) => {

  let { userName, companyName, companyAddress, companyVision } = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    const user = await User.findById(profile.user);

    translate(userName, { from: 'en', to: 'ar', client: 'gtx' }).then((res1) => {
      translate(companyName, { from: 'en', to: 'ar', client: 'gtx' }).then((res2) => {
        translate(companyAddress, { from: 'en', to: 'ar', client: 'gtx' }).then((res3) => {
          translate(companyVision, { from: 'en', to: 'ar', client: 'gtx' }).then((res4) => {

            const update = {
              name_en: userName,
              name_ar: res1.text,
              email: req.body.email,
              role_en: req.body.roleEn,
              role_ar: req.body.roleAr
            };

            User.findByIdAndUpdate(user._id, update, {
              new: true
            }).then((responseUser) => {
              Profile.findByIdAndUpdate(
                req.params.profileId,
                {
                  "about_en.name": companyName,
                  "about_en.address": companyAddress,
                  "about_en.vision": companyVision,

                  "about_ar.name": res2.text,
                  "about_ar.address": res3.text,
                  "about_ar.vision": res4.text,

                  "service_en.role": req.body.roleEn,
                  "service_en.category": req.body.categoryEn,
                  "service_en.subCategory": req.body.subCategoryEn,

                  "service_ar.role": req.body.roleAr,
                  "service_ar.category": req.body.categoryAr,
                  "service_ar.subCategory": req.body.subCategoryAr,

                  "contact_en.number": req.body.contactNumber,

                  "contact_ar.number": req.body.contactNumber,

                  photo: req.body.profilePhoto
                },
                { new: true }
              ).then((responseProfile) => {

                if (responseUser && responseProfile) {
                  return res.json({
                    status: "SUCCESS",
                    message: "Profile updated",
                    profile: responseProfile,
                    user: responseUser
                  });
                }
              });
            });

          })
        })
      })
    })

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request"
    });
  }
};


//@desc      Update profile
//@route     Post /profile/updateprofilear/:profileId
//@access    Private


exports.updateProfileAr = async (req, res) => {

  let { userName, companyName, companyAddress, companyVision } = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد موجود"
      });
    }

    const user = await User.findById(profile.user);

    translate(userName, { from: 'ar', to: 'en', client: 'gtx' }).then((res1) => {
      translate(companyName, { from: 'ar', to: 'en', client: 'gtx' }).then((res2) => {
        translate(companyAddress, { from: 'ar', to: 'en', client: 'gtx' }).then((res3) => {
          translate(companyVision, { from: 'ar', to: 'en', client: 'gtx' }).then((res4) => {

            const update = {
              name_en: res1.text,
              name_ar: userName,
              email: req.body.email,
              role_en: req.body.roleEn,
              role_ar: req.body.roleAr
            };

            User.findByIdAndUpdate(user._id, update, {
              new: true
            }).then((responseUser) => {
              Profile.findByIdAndUpdate(
                req.params.profileId,
                {
                  "about_en.name": res2.text,
                  "about_en.address": res3.text,
                  "about_en.vision": res4.text,

                  "about_ar.name": companyName,
                  "about_ar.address": companyAddress,
                  "about_ar.vision": companyVision,

                  "service_en.role": req.body.roleEn,
                  "service_en.category": req.body.categoryEn,
                  "service_en.subCategory": req.body.subCategoryEn,

                  "service_ar.role": req.body.roleAr,
                  "service_ar.category": req.body.categoryAr,
                  "service_ar.subCategory": req.body.subCategoryAr,

                  "contact_en.number": req.body.contactNumber,

                  "contact_ar.number": req.body.contactNumber,

                  photo: req.body.profilePhoto
                },
                { new: true }
              ).then((responseProfile) => {

                if (responseUser && responseProfile) {
                  return res.json({
                    status: "SUCCESS",
                    message: "تحديث الملف الشخصي",
                    profile: responseProfile,
                    user: responseUser
                  });
                }
              });
            });

          })
        })
      })
    })

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك"
    });
  }
};


//@desc      Add project in an existing profile
//@route     Patch /profile/addprojecten/:profileId
//@access    Private


exports.addProjectEn = async (req, res) => {

  const project = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: 404,
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $push: { portfolio: project } },
      { safe: true, upsert: true, new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Project added",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};



//@desc      Add project in an existing profile
//@route     Patch /profile/addprojectar/:profileId
//@access    Private


exports.addProjectAr = async (req, res) => {

  const project = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: 404,
        message: "لا يوجد ملف تعريف بالمعرف المحدد موجود"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $push: { portfolio: project } },
      { safe: true, upsert: true, new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "تمت إضافة المشروع",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Delete project of a existing profile
//@route     Patch /profile/deleteprojecten/:profileId/:projectId
//@access    Private


exports.deleteProjectEn = async (req, res) => {
  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { portfolio: { _id: req.params.projectId } } },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Project deleted",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request"
    });
  }
};


//@desc      Delete project of a existing profile
//@route     Patch /profile/deleteprojectar/:profileId/:projectId
//@access    Private


exports.deleteProjectAr = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد موجود"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { portfolio: { _id: req.params.projectId } } },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "تم حذف المشروع",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك"
    });
  }
};


//@desc      Update project of a existing profile
//@route     Patch /profile/updateprojecten/:profileId/:projectId
//@access    Private


exports.updateProjectEn = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.projectName": req.body.projectName,
          "portfolio.$.projectLocation": req.body.projectLocation,
          "portfolio.$.projectDescription": req.body.projectDescription,
          "portfolio.$.images": req.body.images
        },
      },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Project updated",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};


//@desc      Update project of a existing profile
//@route     Patch /profile/updateprojectar/:profileId/:projectId
//@access    Private


exports.updateProjectAr = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد موجود"
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.projectName": req.body.projectName,
          "portfolio.$.projectLocation": req.body.projectLocation,
          "portfolio.$.projectDescription": req.body.projectDescription,
          "portfolio.$.images": req.body.images
        },
      },
      { new: true }
    );

    const user = await User.findById(profile.user);

    if (updatedProfile) {
      return res.json({
        status: "SUCCESS",
        message: "تم تحديث المشروع",
        profile: updatedProfile,
        user: user
      });
    }
  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Take review on a specific project
//@route     Patch /profile/reviewen/:profileId/:projectId
//@access    Public


exports.takeReviewEn = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.review": req.body.review,
          "portfolio.$.noOfStars": req.body.stars,
          "portfolio.$.reviewerName": req.body.name,
          "portfolio.$.reviewerPhoneNumber": req.body.phoneNumber,
          "portfolio.$.reviewerTitle": req.body.title
        },
      },
      { new: true }
    );

    return res.json({
      status: "SUCCESS",
      message: "Profile updated"
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};


//@desc      Take review on a specific project
//@route     Patch /profile/reviewar/:profileId/:projectId
//@access    Private


exports.takeReviewAr = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد موجود"
      });
    }

    await Profile.findOneAndUpdate(
      { _id: req.params.profileId, "portfolio._id": req.params.projectId },
      {
        $set: {
          "portfolio.$.review": req.body.review,
          "portfolio.$.noOfStars": req.body.stars,
          "portfolio.$.reviewerName": req.body.name,
          "portfolio.$.reviewerPhoneNumber": req.body.phoneNumber,
          "portfolio.$.reviewerTitle": req.body.title
        },
      },
      { new: true }
    );

    return res.json({
      status: "SUCCESS",
      message: "تحديث الملف الشخصي",
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Add idea in an existing profile
//@route     Patch /profile/addideaen/:profileId
//@access    Public


exports.addIdeaEn = async (req, res) => {

  const idea = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: 404,
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $push: { ideas: idea } },
      { safe: true, upsert: true, new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Idea added",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};


//@desc      Add idea in an existing profile
//@route     Patch /profile/addideaar/:profileId
//@access    Private


exports.addIdeaAr = async (req, res) => {

  const idea = req.body;

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: 404,
        message: "لا يوجد ملف تعريف بالمعرف المحدد"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $push: { ideas: idea } },
      { safe: true, upsert: true, new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "الفكرة مضافة",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "حدث خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Send comment on a specific idea
//@route     Patch /profile/sendcommenten/:profileId/:ideaId
//@access    Public


exports.sendCommentEn = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    await Profile.updateOne(
      { _id: req.params.profileId, "ideas._id": req.params.ideaId },
      {
        "$push":
        {
          "ideas.$.comments": req.body
        }
      }
    );

    const user = await User.findById(profile.user);

    const updatedProfile = await Profile.findById(profile._id);

    return res.json({
      status: "SUCCESS",
      message: "Comment sent",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};


//@desc      Send comment on a specific idea
//@route     Patch /profile/sendcommentar/:profileId/:ideaId
//@access    Public


exports.sendCommentAr = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد"
      });
    }

    await Profile.updateOne(
      { _id: req.params.profileId, "ideas._id": req.params.ideaId },
      {
        "$push":
        {
          "ideas.$.comments": req.body
        }
      }
    );

    const user = await User.findById(profile.user);

    const updatedProfile = await Profile.findById(profile._id);

    return res.json({
      status: "SUCCESS",
      message: "تم إرسال التعليق",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "حدث خطأ ما أثناء معالجة طلبك",
      error: err.message
    });
  }
};


//@desc      Get comments
//@route     Get /profile/getcommentsen/:profileId/:ideaId
//@access    Public


exports.getCommentsByIdEn = async (req, res) => {

  try {

    const comments = await Profile.findById(
      { _id: req.params.profileId, "ideas._id": req.params.ideaId }
    ).select({
      "ideas.comments": 1
    });

    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      data: comments
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request"
    });
  }

};


//@desc      Get comments
//@route     Get /profile/getcommentsar/:profileId/:ideaId
//@access    Public


exports.getCommentsByIdAr = async (req, res) => {

 try {

    const comments = await Profile.findById(
      { _id: req.params.profileId, "ideas._id": req.params.ideaId }
    ).select({
      "ideas.comments": 1
    });

    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      data: comments
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "حدث خطأ ما أثناء معالجة طلبك"
    });
  }

};


//@desc      Delete idea of a existing profile
//@route     Patch /profile/deleteideaen/:profileId/:ideaId
//@access    Private


exports.deleteIdeaEn = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { ideas: { _id: req.params.ideaId } } },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Idea deleted",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request"
    });
  }
};


//@desc      Delete idea of a existing profile
//@route     Patch /profile/deleteideaar/:profileId/:ideaId
//@access    Private


exports.deleteIdeaAr = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد"
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { $pull: { ideas: { _id: req.params.ideaId } } },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "الفكرة محذوفة",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "حدث خطأ ما أثناء معالجة طلبك"
    });
  }
};

//@desc      Update profile
//@route     Patch /profile/updatesubscriptiodetailsen/:profileId
//@access    Private
exports.updateSubscriptionDetailsEn = async (req, res) => {

  try {
  
    const profile = await Profile.findById(req.params.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.profileId },
      {
        $set: {
          "subscriptionPackage": req.body.subscriptionPackage,
          "subscriptionVerificationImage": req.body.subscriptionVerificationImage,
          "subscriptionVerified" : req.body.subscriptionVerified
        },
      },
      { new: true }
    );

    const user = await User.findById(profile.user);

    return res.json({
      status: "SUCCESS",
      message: "Subscription Updated Successfully. Your subscription will be updated in the next 24 hours!",
      profile: updatedProfile,
      user: user
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request",
      error: err.message
    });
  }
};