import React, { useState,useContext,useEffect} from 'react'
import {useHistory,Link} from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import {doesUserNameExist} from "../services/firebase";

const Signup = () => {

    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [userName,setUserName] = useState('');
    const [fullName,setFullName] = useState("");

    const [emailAddress,setEmailAddress] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const isInvalid = password ==="" || emailAddress === "";

    const handleSignup = async(e) =>{
        e.preventDefault();
        const userNameExists = await doesUserNameExist(userName);
        if(!userNameExists)
        {
            try {
                const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress,password);
                await createdUserResult.user.updateProfile({
                    displayName:userName,
                });
                await firebase.firestore().collection('users').add({
                    userId:createdUserResult.user.uid,
                    username:userName.toLowerCase(),
                    fullName,
                    emailAddress:emailAddress.toLowerCase(),
                    following:[],
                    dateCreated:Date.now()
                })
                history.push(ROUTES.DASHBOARD)
                setError("");
            } catch (error) {
                setFullName("")
                setEmailAddress("")
                setPassword("");
                setError(error.message);
            }
        }
        else{
            setError("That username is already taken, please try another");
        }
    };

    useEffect(() => {
        document.title = 'Signup - Instagram';
    },[])

    return (
        <div className = "container flex mx-auto max-w-screen-md items-center h-screen" >
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="Iphone with profile" className = "max-w-full"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">   
                <h1 className = "flex justify-center w-full">
                    <img src="/images/logo.png" alt="Instagram" className = "mt-2 w-612"/>
                </h1>
                {error && <p className = "mb-4 text-xs text-red-primary">{error}</p>}

                <form onSubmit = {handleSignup} method = "POST">
                    <input onChange = {(e) => setUserName(e.target.value)}aria-label = "Enter your username" type="text" placeholder = "username" className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" value = {userName}/>

                    <input onChange = {(e) => setFullName(e.target.value)}aria-label = "Enter your Full name" type="text" placeholder = "Full name" className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" value = {fullName}/>

                    <input onChange = {(e) => setEmailAddress(e.target.value)}aria-label = "Enter your email address" type="email" placeholder = "Email address" className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" value = {emailAddress}/>

                    <input onChange = {(e) => setPassword(e.target.value)}aria-label = "Enter your password" type="password" placeholder = "Password" className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2" value = {password}/>

                    <button disabled={isInvalid} type = "submit" className = {`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>
                        Sign up
                    </button>
                </form>
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                <p className = "text-sm">Have an account? {' '} <Link to = {ROUTES.LOGIN} className ="font-bold text-blue-medium">Login</Link></p>
            </div>
            </div> 
        </div>
    )
}

export default Signup;

// text-red-primary
// text-gray-base
// border-gray-primary
// bg-blue-medium
