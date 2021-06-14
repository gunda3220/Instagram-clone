import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {getSuggestionsById} from "../../services/firebase";
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({activeUserDocId,userId}) => {

    const [profiles,setProfiles] = useState(null);

    useEffect(() => {
        const getSuggestionProfiles = async() =>{
            setProfiles(await getSuggestionsById(userId));
        }

        if(userId)
        {
            getSuggestionProfiles();
        }          
            
    },[userId]);

    return (
        profiles?
        <div className = "rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
             <p classnme = "font-bold text-gray-base">Suggestions for you</p>
            </div> 
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) => <SuggestedProfile className = "mb-2" key = {profile.docId} spDocId = {profile.docId} username = {profile.username} profileId = {profile.userId} userId = {userId} activeUserDocId = {activeUserDocId}/>
                )}
            </div>          
            
        </div> : profiles?.length === 0 ? null : 
        <Skeleton  count = {1} height = {150} className = "mt-5"/>

    )
}

export default Suggestions;

Suggestions.propTypes = {
    userId:PropTypes.string,
    activeUserDocId:PropTypes.string,
}
