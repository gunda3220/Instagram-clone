import React, {useState,useEffect,useContext} from 'react';
import UserContext from '../context/user';
import { getUserByUserId,getPhotos, getUserByUsername } from '../services/firebase';
import useUser from './useUser';

const usePhotos = () => {

    const [photos,setPhotos] = useState(null);
    const {user} = useContext(UserContext);
    const userId = user.uid;

    const {activeUserObject} = useContext(UserContext);

    useEffect(() => {

        const getTimelinePhotos = async() => {
            const [{following}] = await getUserByUserId(userId);
            let followedUserPhotos = [];
            if(following.length > 0)
            {
                followedUserPhotos = await getPhotos(userId,following);
            }
            followedUserPhotos.sort((a,b) => b.dateCreated - a.dateCreated)
            setPhotos(followedUserPhotos);   
        }

        getTimelinePhotos();

    },[userId,activeUserObject]);

    return photos
}

export default usePhotos;