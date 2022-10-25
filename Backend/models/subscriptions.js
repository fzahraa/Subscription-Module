const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
      name_en: {
        type: String,
        enum: ['Starter', 'Silver', 'Gold']
      },
      name_ar: {
        type: String,
        enum: ['بداية', 'فضة', 'ذهب']
      },
      creatorProfileAndIdeaBook: {
        type: Boolean
      },
      addToCommunity: {
        type: Boolean
      },
      clientsReview: {
        type: Boolean
      },
      projectLimit: {
        type: String,
      },
      shareProfile: {
        type: Boolean
      },
      priorityDisplaySearch: {
        type: String
      },      
      promotion: {
        type: String
      },
      quotation: {
        type: String
      },
      videoProfilePreview: {
        type: String,
      },
      verificationDiscount: {
        type: String,
      },
     subscriptionTime: {
        type: String
      },
      newUser: {
        type: String
      }
});

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = subscriptionModel;
