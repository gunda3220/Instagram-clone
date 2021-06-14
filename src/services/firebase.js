import {firebase,FieldValue} from "../lib/firebase.js";

export const doesUserNameExist = async(username) =>{
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username',"==",username)
    .get();

    return result.docs.length;
}


export const getUserByUsername = async(username) => {
    const user = await firebase
    .firestore()
    .collection('users')
    .where('username','==',username)
    .get();

    return user.docs.map((user) => (
        {
            ...user.data(),docId:user.id,
        }
    ))[0];
} 

export const getUserByUserId = async(id) =>{

    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId','==',id)
    .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId:item.id,
    }));

    return user

}

export const getSuggestionsById = async(id) =>{
    const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .where('userId','!=',id)
    .get();

    const [{following}] = await getUserByUserId(id);
 
    return result.docs.map((user) => 
        ({...user.data(),docId:user.id}))
        .filter((profile) => (!following.includes(profile.userId)))
}

export const updateFollowing = async(activeUserDocId,profileId,isFollowingProfile) => {
    return firebase
    .firestore()
    .collection('users')
    .doc(activeUserDocId)
    .update({
        following:isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId) 
    })
}

export const updateFollowers = async(spDocId,userId,isFollowingProfile) => {
    return firebase
    .firestore()
    .collection('users')
    .doc(spDocId)
    .update({
        followers:isFollowingProfile ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId) 
    })
}

export const getPhotos = async(userId,following) => {

    const result = await firebase
                        .firestore()
                        .collection('photos')
                        .where('userId','in',following)
                        .get();

    const userFollowingPhotos = result.docs.map((photo) => ({
        ...photo.data(),docId:photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowingPhotos.map(async(photo) => {
            let userLikedPhoto = false;
            if(photo.likes.includes(userId)){
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const {username} = user[0];
            return {username,...photo,userLikedPhoto};
        })
    );
    return photosWithUserDetails;

}


export const getUserPhotosByUsername = async(username) => {
    const {userId} = await getUserByUsername(username);
    const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId','==',userId)
    .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId:item.id,
    }));
}

export const isUserFollowingProfile = async(loggedInUserUsername,profileUserId) => {

    const result = await firebase
    .firestore()
    .collection('users')
    .where('username','==',loggedInUserUsername)
    .where('following','array-contains',profileUserId)
    .get();
     
    return result.docs.length?true:false;
}

export const toggleFollow = async(isFollowingProfile,activeUserDocId,profileDocId,profileUserId,followingUserId) =>{
    await updateFollowing(activeUserDocId,profileUserId,isFollowingProfile);
    await updateFollowers(profileDocId,followingUserId,isFollowingProfile);
}