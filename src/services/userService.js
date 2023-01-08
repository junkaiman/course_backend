const {default: axios} = require("axios");
const { oauth_url, client_id, client_secret, redirect_uri, scope } = require("../configs/mastodon_conf");
const User = require("../models/user");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  initUser: async (user_id, user_name, email, n_bolt, inviter_id) => {
    const newUser = new User({
      user_id: user_id,
      user_name: user_name,
      email: email,
      joined_at: Date.now(),
      user_status: "pending",
      n_bolt: n_bolt,
      unlocked_course_ids: [],
      uploaded_syllabus_ids: [],
      uploaded_review_ids: [],
      invite_code: makeid(8),
      inviter_id: inviter_id,
      invitee_ids: [],
    });
    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
      return null;
    }
    return newUser._id.toString();
  },

  // get user by id
  // return: user object
  getUserById: async (id) => {
    const user = await User.findOne({ user_id: id });
    return user;
  },

  // n_bolt minus one
  // return: error_code
  // 0: success
  // -1: n_bolt < 1
  // -2: user not found
  nBoltMinusOne: async (id) => {
    const user = await User.findOne({ user_id: id });
    if (!user) {
      return -2;
    }
    if (user.n_bolt < 1) {
      return -1;
    }
    await User.updateOne(
      {
        user_id: id,
      },
      {
        $inc: {
          n_bolt: -1,
        },
      }
    );
    return user.n_bolt - 1;
  },

  // n_bolt plus one
  // return: error_code
  // 0: success
  // -2: user not found
  nBoltPlusOne: async (id) => {
    const user = await User.findOne({ user_id: id });
    if (!user) {
      return -2;
    }
    await User.updateOne(
      {
        user_id: id,
      },
      {
        $inc: {
          n_bolt: 1,
        },
      }
    );
    return user.n_bolt + 1;
  },

  // get waitlist status
  // return: waitlist status
  // * order: current order
  // * n_uploads: number of uploaded syllabus
  // * n_invites: number of invited users
  getWaitlistStatus: async (id) => {
    // count number of users with count(uploaded_syllabus_ids) >= self.count(uploaded_syllabus_ids)
    const user = await User.findOne({
      user_id: id,
    });
    if (!user) {
      return null;
    }
    let n_uploads = user.uploaded_syllabus_ids.length;
    let n_invites = user.invitee_ids.length;
    let user_wlcredit = n_uploads * 2 + n_invites * 1;
    const agg_users = await User.aggregate([
      {
        $project: {
          wl_credit: {
            $add: [
              { $multiply: [{ $size: "$uploaded_syllabus_ids" }, 2] },
              { $multiply: [{ $size: "$invitee_ids" }, 1] },
            ],
          },
        },
      },
      {
        $sort: { wl_credit: -1 },
      },
      {
        $match: {
          wl_credit: { $gte: user_wlcredit },
        },
      },
    ]);
    return {
      order: agg_users.length,
      n_uploads: n_uploads,
      n_invites: user.invitee_ids.length,
    };
  },

  // Auth related
  // get access token
  // return: access token
  getAccessToken: async (code) => {
    try {
      let response = await axios.post(oauth_url, {
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        scope: scope,
        code: code
      });
      return response.data.access_token;
    } catch (e) {
      console.log(e)
      return null
    }
  },
};
