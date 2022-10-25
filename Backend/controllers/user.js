//mongodb user
const User = require("../models/user");
const Profile = require("../models/profile");
const translate = require('@vitalets/google-translate-api');

//to bycrypt password
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//@desc      User signup
//@route     Post /user/signupen
//@access    Public


exports.signupEn = async (req, res) => {

  let { name, email, password, phoneNumber, role } = req.body;

  let role_en, role_ar;

  User.findOne({ email })
    .then((result) => {
      if (result) {

        return res.json({
          status: "FAILED",
          message: "User with provided email already exists"
        });

      } else {

        if (role == "Maintenance" || role == "صيانة") {
          role_en = "Maintenance";
          role_ar = "صيانة";
        }
        else if (role == "Contractor" || role == "مقاول") {
          role_en = "Contractor";
          role_ar = "مقاول";
        }
        else if (role == "Designer" || role == "مصمم") {
          role_en = "Designer";
          role_ar = "مصمم";
        }
        else if (role == "Consultant" || role == "استشاري") {
          role_en = "Consultant";
          role_ar = "استشاري";
        }
        else {
          role_en = "User";
          role_ar = "المستعمل";
        }

        // creating new user
        // password handling

        const saltRounds = 10;

        bycrypt.hash(password, saltRounds).then((hashedPassword) => {
          translate(name, { from: 'en', to: 'ar', client: 'gtx' }).then((res1) => {
            const newUser = new User({
              name_en: name,
              name_ar: res1.text,
              email,
              password: hashedPassword,
              phoneNumber,
              role_en,
              role_ar
            });

            newUser
              .save()
              .then(() => {
                return res.json({
                  status: "SUCCESS",
                  message: "SignedUp successfully"
                });
              })
              .catch((err) => {
                return res.json({
                  status: "FAILED",
                  message: "An error occurred while saving user account",
                  error: err
                });
              });
          })
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "FAILED",
        message: "Error while processing email",
        error: err
      });
    });
};


//@desc      User signup
//@route     Post /user/signupar
//@access    Public


exports.signupAr = async (req, res) => {

  let { name, email, password, phoneNumber, role } = req.body;

  let role_en, role_ar;

  User.findOne({ email })
    .then((result) => {
      if (result) {

        return res.json({
          status: "FAILED",
          message: "المستخدم بالبريد الإلكتروني المقدم موجود بالفعل"
        });

      } else {

        if (role == "Maintenance" || role == "صيانة") {
          role_en = "Maintenance";
          role_ar = "صيانة";
        }
        else if (role == "Contractor" || role == "مقاول") {
          role_en = "Contractor";
          role_ar = "مقاول";
        }
        else if (role == "Designer" || role == "مصمم") {
          role_en = "Designer";
          role_ar = "مصمم";
        }
        else if (role == "Consultant" || role == "استشاري") {
          role_en = "Consultant";
          role_ar = "استشاري";
        }
        else {
          role_en = "User";
          role_ar = "المستعمل";
        }

        // creating new user
        // password handling

        const saltRounds = 10;
        bycrypt.hash(password, saltRounds).then((hashedPassword) => {
          translate(name, { to: 'en', client: 'gtx' }).then((res1) => {
            const newUser = new User({
              name_en: res1.text,
              name_ar: name,
              email,
              password: hashedPassword,
              phoneNumber,
              role_en,
              role_ar
            });

            newUser
              .save()
              .then(() => {
                return res.json({
                  status: "SUCCESS",
                  message: "الاشتراك بنجاح"
                });
              })
              .catch((err) => {
                return res.json({
                  status: "FAILED",
                  message: "حدث خطأ أثناء حفظ حساب المستخدمt",
                  error: err
                });
              });
          })
        });
      }
    })
    .catch((err) => {
      return res.json({
        status: "FAILED",
        message: "خطأ أثناء معالجة البريد الإلكتروني",
        error: err
      });
    });
};


//@desc      User signin
//@route     Post /user/signinen
//@access    Public


exports.signinEn = async (req, res) => {

  let { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "FAILED",
        message: "User with this email does not exist"
      });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: "FAILED",
        message: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        id: user.id
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) {
          return res.json({
            status: "FAILED",
            message: "An error occurred"
          });
        }
        return res.json({
          status: "SUCCESS",
          message: "Signedin successfully",
          token: token,
          user: user
        });
      }
    );

  } catch (err) {
    return res.json({
      status: "FAILED",
      message: "An Error occurred while checking the credentials",
      error: err.message
    });
  }
};


//@desc      User signin
//@route     Post /user/signinar
//@access    Public


exports.signinAr = async (req, res) => {

  let { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "FAILED",
        message: "المستخدم بهذا البريد الإلكتروني غير موجود"
      });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: "FAILED",
        message: "بيانات الاعتماد غير صالحة"
      });
    }

    const payload = {
      user: {
        id: user.id
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) {
          return res.json({
            status: "FAILED",
            message: "حدث خطأ"
          });
        }
        return res.json({
          status: "SUCCESS",
          message: "تم تسجيل الدخول بنجاح",
          token: token,
          user: user
        });
      }
    );

  } catch (err) {
    return res.json({
      status: "FAILED",
      message: "حدث خطأ أثناء التحقق من بيانات الاعتماد",
      error: err.message
    });
  }
};


//@desc      Get user
//@route     get /user/getuseren
//@access    Private


exports.getUserEn = async (req, res) => {

  try {
    const user = await User.findById(req.userId);
    const profile = await Profile.findById(user.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "No profile with given id exists"
      });
    }

    return res.json({
      status: "SUCCESS",
      message: "Successful request",
      user: user,
      profile: profile
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "There is some error while processing your request"
    });
  }
};


//@desc      Get user
//@route     get /user/getuserar
//@access    Private


exports.getUserAr = async (req, res) => {

  try {

    const user = await User.findById(req.userId);
    const profile = await Profile.findById(user.profileId);

    if (!profile) {
      return res.json({
        status: "FAILURE",
        message: "لا يوجد ملف تعريف بالمعرف المحدد",
      });
    }

    return res.json({
      status: "SUCCESS",
      message: "طلب ناجح",
      user: user,
      profile: profile
    });

  } catch (err) {
    return res.json({
      status: "FAILURE",
      message: "هناك خطأ ما أثناء معالجة طلبك"
    });
  }
};


exports.checkEmail = async (req, res) => {

  let { email } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "SUCCESS",
        message: "User with this email does not exist"
      });
    }
    else {
      return res.json({
        status: "FAILED",
        message: "User with this email already exists",
      });
    }

  } catch (err) {
    return res.json({
      status: "Error",
      message: "An Error occurred while checking the email",
      error: err.message
    });
  }
};