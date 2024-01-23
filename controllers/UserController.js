const User = require("../models/User");


const Register = async (_username,_email, _password,followers) => {
    try {
        let data = await User.create({ username: _username,email:_email, password: _password ,followers });
        if (data) {
            return ("user was registered successfully")
        }
        else {
            console.log("not registered");
        }
    }
    catch (e) {
        console.log(e);

    }

}


const Login = async (_username, _password) => {
    try {
        let data =await User.findOne({ password: _password, username: _username });
        if (data) {
            return (`logged in successfully,userName: ${data.username}` );
        }
    }
    catch (e) {
        console.log(e);
    }

}

const getAllUsers =async () => {
    try {
        let data = await User.find({},{username:1,_id:0});
        if (data) {
            return (data);
        }
    }
    catch (e) {
        console.log(e);
    }


}

const deleteUser =async (_username) => {
    try {
        let data = await User.deleteOne({username:_username});
        
        if (data) {
            return ("user deleted");
        }
    }
    catch (e) {
        console.log(e);
    }

}
 const editUser=async (_username,_newusername,_email,_password,_followers,_following) => {
     try {
         let data = await User.updateOne({username:_username},{username:_newusername,email:_email,password:_password,followers:_followers,following:_following})
         if (data) {
             return (`user was edited successfully”,userName: ${data.userName}`);
         }
     }
     catch (e) {
         console.log(e);
     }
 
 }
 const getUserById= async (_id) => {
    try {
      const user = await User.findOne({_id:_id});
      return user;
    } catch (error) {
      console.log( error);
    }
  }
  const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
   
    return 'error';
  }
};
const followUser = async (userId, followUserId) => {
    try {
      // Add followUserId to the followers of userId
      const followers=await User.findByIdAndUpdate(userId, { following: followUserId } );
      const following= await User.findByIdAndUpdate(followUserId, { followers: userId } );

      return followers +' '+ following;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  };
  
const unfollowUser = async (userId, unfollowUserId) => {
    try {
      // Remove unfollowUserId
      const unfollowers=await User.findByIdAndUpdate(userId, { following: unfollowUserId } );
      const unfollowing=await User.findByIdAndUpdate(followUserId,  { followers: userId } );

      return unfollowers+ " " +unfollowing;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  };
module.exports = { Register, Login, getAllUsers,deleteUser,editUser,getUserById,getUserProfile,followUser};