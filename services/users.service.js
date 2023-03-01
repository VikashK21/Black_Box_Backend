const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../auth/user.auth");
// const phoneConfig = require("../config/twilio.cofig");
// const twilio = require("twilio")(phoneConfig.accountSID, phoneConfig.authToken);

class Users {
  async matchOtp(email, otp) {
    try {
      const result = await prisma.users.findUnique({
        where: { email },
      });
      console.log(result);
      if (result && result.otp === otp) {
        await prisma.users.update({
          where: { email },
          data: { otp: 0, verified: true },
        });
        console.log("yse it came here and updated tooo");
        return { status: true };
      }
      return { status: false };
    } catch (err) {
      return err.message;
    }
  }

  async userCheck(email, otp) {
    try {
      const result = await prisma.users.findUnique({
        where: { email },
      });
      if (result) {
        await prisma.users.update({
          where: { email },
          data: { otp },
        });
        return true;
      }
      return false;
    } catch (err) {
      return err.message;
    }
  }

  async AddFriend(my_id, friend_id) {
    try {
      const searchR = await prisma.friends.findMany({
        where: { my_id, friend_id },
      });
      if (searchR && searchR.length === 0) {
        const result = await prisma.friends.create({
          data: { my_id, friend_id },
        });
        await prisma.friends_Peer.create({
          data: { my_id, peer_id: result.id },
        });
        return result;
      }
      console.log(searchR, "already");
      return "Already in Frienship";
    } catch (err) {
      return err.message;
    }
  }

  async AcceptFriend(id) {
    try {
      const searchR = await prisma.friends.findUnique({
        where: { id },
      });
      const result = async (id) => {
        return await prisma.friends.update({
          where: { id },
          data: { accepted: true },
        });
      };
      if (searchR) {
        await result(id);
        const result2 = await prisma.friends.findFirst({
          where: { my_id: searchR.friend_id, friend_id: searchR.my_id },
        });
        if (result2 && !result2.accepted) {
          return await result(result2.id);
        } else if (result2 && result2.accepted) {
          return result2;
        }
        const peerId = await this.AddFriend(searchR.friend_id, searchR.my_id);
        return await result(peerId.id);
      }
      return "User not found";
    } catch (err) {
      return err.message;
    }
  }

  async DismissFriend(id) {
    try {
      const searchF = await prisma.friends.findUnique({
        where: { id },
        include: {
          Friends_Peer: true,
        },
      });
      const dUser = async (id, peerId) => {
        try {
          await prisma.friends_Peer.delete({
            where: { id: peerId },
          });
          return await prisma.friends.delete({
            where: { id },
          });
        } catch (err) {
          return err.message;
        }
      };
      if (searchF) {
        const result = await dUser(searchF.id, searchF.Friends_Peer[0].id);
        console.log(result, "primary deleted");
        const searchF2 = await prisma.friends.findMany({
          where: { my_id: searchF.friend_id, friend_id: searchF.my_id },
          include: { Friends_Peer: true },
        });
        if (searchF2 && searchF2.length > 0) {
          const result2 = await dUser(
            searchF2[0].id,
            searchF2[0].Friends_Peer[0].id,
          );
          console.log(result2, "secondary deleted");
          return result2;
        }
        return result;
      }
      return "The user not part of the group";
    } catch (err) {
      return err.message;
    }
  }

  async FriendRequests(my_id) {
    try {
      const result = await prisma.friends.findMany({
        where: { friend_id: my_id, accepted: false },
        include: {
          Friends_Peer: {
            include: {
              my_details: true,
            },
          },
        },
        orderBy: { id: "desc" },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async areFriends(my_id) {
    try {
      console.log(my_id, "my_id");
      const result = await prisma.friends.findMany({
        where: { my_id },
        include: { friend: true },
        orderBy: { id: "desc" },
      });
      console.log(result, "the list");
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async allUsers(go = false) {
    try {
      const result = await prisma.users.findMany({
        include: {
          Course: true,
          Participants: true,
        },
      });
      // working for the purpose of Friendship >>>
      if (go) {
        const friendsRes = await prisma.friends.findMany({
          where: { my_id: go },
          select: { friend_id: true },
        });
        friendsRes.push({ friend_id: go });
        const friendsRes2 = friendsRes.map((ele) => ele.friend_id);
        for (let pF = 0; result.length > pF; pF++) {
          if (friendsRes2.length === 0) {
            break;
          } else if (friendsRes2.includes(result[pF].id)) {
            friendsRes2.splice(friendsRes2.indexOf(result[pF].id));
            result.splice(pF, 1);
          }
        }
        return result;
      } else {
        let numU_T = { Students: 0, Teachers: 0, Users: result };
        if (result.length > 0) {
          for (let eachU of result) {
            if (eachU.Course.length > 0) {
              numU_T.Teachers += 1;
            }
            if (eachU.Participants.length > 0) {
              numU_T.Students += 1;
            }
          }
        }
        return numU_T;
      }
    } catch (err) {
      return err.message;
    }
  }

  async hostProfile(id) {
    try {
      const result = await prisma.users.findUnique({
        where: { id },
        include: {
          Course: {
            include: {
              Classes: true,
              Vid_Classes: true,
              Reactions: true,
            },
          },
        },
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async forgetPass(email, password) {
    try {
      const result2 = await prisma.users.findUnique({
        where: { email },
      });
      if (!result2) {
        return "The email does not exist!!";
      }
      if (
        (result2 && result2.provider === "google") ||
        result2.provider === "facebook"
      ) {
        return `Please login with ${result2.provider} Account!!`;
      }
      if (result2.verified && result2.otp === 0) {
        password = await bcrypt.hash(password, 12);
        if (result2.password === password) {
          return "Please change your password to new one!!";
        }
        const result = await prisma.users.update({
          where: { email },
          data: { password, verified: false },
        });
        console.log(result);
        const token = await authenticationToken(result);
        console.log({ token, result });
        return { result, token };
      }
      return "The user is not verified!!";
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
  async profile(id) {
    try {
      const result = await prisma.users.findUnique({ where: { id } });
      const token = await authenticationToken(result);
      return { result, token };
    } catch (err) {
      return err.message;
    }
  }

  async editProfile(data, id) {
    try {
      const result2 = await prisma.users.findUnique({
        where: { id },
      });
      if (data.email !== result2.email) {
        if (result2.provider === "google" || result2.provider === "facebook") {
          return `Please edit the email from your ${result2.provider} account!!`;
        }
      }
      if (data.hasOwnProperty("password")) {
        data.password = await bcrypt.hash(data.password, 12);
      }
      const result = await prisma.users.update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      return err.message;
    }
  }

  async signup(data) {
    // manual registration worked : )
    const password = data.password;
    try {
      console.log(data, "data");
      const result = await prisma.users.findUnique({
        where: { email: data.email },
      });
      // if (data && data && data.hasOwnProperty("phone_num")) {
      /// the temporary change till the app updated>>>>
      // if (data.phone_num.length === 0) {
      //   delete data.phone_num;
      //   data.provider='google'
      // }
      //   const results2 = await prisma.users.findUnique({
      //     where: { phone_num: data.phone_num },
      //   });
      //   if (results2 && results2.phone_num.length > 0)
      // return "The user already exist!!";
      // }

      if (result) {
        if (data && data.hasOwnProperty("provider")) {
          console.log(result);
          return this.loginWithEmailPass(data.email, password);
        } else {
          console.log("okay the aready there...");
          return "The user already exits!!";
        }
      }
      data.password = await bcrypt.hash(data.password, 12);
      let result4;
      const email_type = data.email.split("@")[1];
      console.log(email_type, "the unique email");
      if (email_type !== "gmail.com") {
        result4 = await prisma.classroom.findUnique({
          where: { email_type },
        });
        console.log(result4, "the data");
        if (result4) {
          data.classroom_id = result4.id;
        }
      }
      console.log(data, "the params");
      const result2 = await prisma.users.create({
        data,
      });
      if (data && data.hasOwnProperty("provider")) {
        return this.loginWithEmailPass(data.email, password);
      }
      return result2;
    } catch (err) {
      console.log(err.message);
      return err.message;
      console.log(err.message);
    }
  }

  async loginWithEmailPass(email, password, provider = false) {
    // manual login worked : )
    try {
      let result = await prisma.users.findUnique({
        where: { email },
      });
      console.log(password, "the loginWithEmial,----->>>>>");
      console.log(result, "the existing entry");
      if (!result) {
        console.log(result);
        return "The user does not exits!!";
      }
      password = await bcrypt.compare(password, result.password);
      if (provider || password) {
        const email_type = email.split("@")[1];
        if (email_type !== "gmail.com" && !result.classroom_id) {
          const result3 = await prisma.classroom.findUnique({
            where: { email_type },
          });
          if (result3) {
            result = await prisma.users.update({
              where: { id: result.id },
              data: { classroom_id: result3.id },
            });
          }
        }
        const token = await authenticationToken(result);
        return { token, result };
      } else if (!password) {
        console.log(password);
        return "The password is invalid!!";
      }
    } catch (err) {
      return err.message;
    }
  }

  async loginWithPhoneOTP(body) {
    try {
      const result = await prisma.users.findUnique({
        where: { phone_num: body.phone_num },
      });
      if (!result) {
        return "The user does not exits!!";
      }
      if (body.hasOwnProperty("phone_num") && body.hasOwnProperty("otp")) {
        const verifying = await twilio.verify
          .services(phoneConfig.serviceID)
          .verificationChecks.create({
            to: `+${body.phone_num}`,
            code: body.otp,
          });
        if (verifying.status === "approved") {
          const token = await authenticationToken(result);
          return { ...verifying, token };
        }
        return "Something went wrong, please try again.";
        // console.log(verifying, "verifying...");
      } else {
        const sending = await twilio.verify
          .services(phoneConfig.serviceID)
          .verifications.create({
            to: `+${body.phone_num}`,
            channel: "sms",
          });
        // console.log(sending, "creating and seding...");
        return sending;
      }
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Users;
