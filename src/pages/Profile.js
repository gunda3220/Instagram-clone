import React, { useState,useEffect } from 'react'
import {useParams,useHistory} from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from "../components/Header";
import UserProfile from "../components/Profile";



const Profile = () => {

    const history = useHistory();
    const [user,setUser] = useState(null);
    const {username} = useParams();
    const[userExists,setUserExists] = useState(false);

    useEffect(() => {

        const checkUserExists = async() => {
            const getUser = await getUserByUsername(username);  
            if(getUser)
            {
                setUser(getUser);
                setUserExists(true);
            }
            else{
                history.push(ROUTES.NOT_FOUND);
            }       
        }
        checkUserExists();

    }, [username,history]);

    return (
        userExists ? <div className = "bg-gray-background">
            <Header />
            <div className = "mx-auto max-w-screen-lg">
                <UserProfile user = {user} />
            </div>
        </div>
        : null
    )
}

export default Profile;