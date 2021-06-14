import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {updateFollowing,updateFollowers} from "../../services/firebase";

const SuggestedProfile = ({spDocId,username,profileId,userId,activeUserDocId}) => {

    const [followed,setFollowed] = useState(false);

    const handleFollowUser = async() => {
        setFollowed(true);
        await updateFollowing(activeUserDocId,profileId,false);

        await updateFollowers(spDocId,userId,false)
    } 

    return !followed?
        <div className = "flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
               <img className = "rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} alt="" /> 
               <Link to = {`/p/${username}`}><p className = "font-bold text-sm">{username}</p></Link> 
            </div> 
            <button className = "text-xs font-bold text-blue-medium p-1" type= "button" onClick ={handleFollowUser}>Follow</button>            
        </div>:
        null
    
}

export default SuggestedProfile

SuggestedProfile.propTypes = {
    spDocId:PropTypes.string,
    username:PropTypes.string,
    profileId:PropTypes.string,
    userId:PropTypes.string,
    activeUserDocId:PropTypes.string,
}
