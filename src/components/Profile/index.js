import { useReducer,useEffect } from 'react';
import React from 'react';
import PropTypes from "prop-types";
import Header from "./Header";
import { getUserByUsername,getUserPhotosByUsername } from '../../services/firebase';
import Photos from "./Photos";


const UserProfile = ({user}) => {

    const reducer = (state,newState) => ({...state,...newState});
    const initialState = {
        profile:{},
        photosCollection:[],
        followerCount:0,
    }

    const [{profile,photosCollection,followerCount},dispatch] = useReducer(reducer,initialState);

    useEffect(() => {
        const getProfileInfoAndPhotos = async() =>{
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({profile:user,photosCollection:photos,followerCount:user.followers.length})
        }
        getProfileInfoAndPhotos();
        
    },[user.username]);

    return (
        <>
        <Header photosCount = {photosCollection? photosCollection.length:0} profile = {profile} followerCount = {followerCount} setFollowerCount = {dispatch}/>
        <Photos photos = {photosCollection} />
        </>
    )
}

export default UserProfile

UserProfile.propTypes = {
    user:PropTypes.shape({
        username:PropTypes.string.isRequired,
        dateCreated:PropTypes.number.isRequired,
        emailAddress:PropTypes.string.isRequired,
        followers:PropTypes.array.isRequired,
        following:PropTypes.array.isRequired,
        userId:PropTypes.string.isRequired,
        fullName:PropTypes.string.isRequired,
    }).isRequired
}
