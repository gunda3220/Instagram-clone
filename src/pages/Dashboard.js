import React, {useEffect,useContext} from 'react';
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar/";
import UserContext from "../context/user";
import useUser from '../hooks/useUser';

const Dashboard = () => {

    const {user} = useContext(UserContext);

    const {user:userObject} = useUser();

    useEffect(() => {
        document.title = "Dashboard";
    },[]);

    return (
        <div className = "bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
