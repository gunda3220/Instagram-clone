import React, {useEffect} from 'react';
import Header from "../components/Header";

const NotFound = () => {

    useEffect(() => {
        document.title = "Not Found - Instagram";
    },[])
    return (
        <div className = "bg-gray-background">
            <Header />
           <div className="mx-auto maax-w-screen-lg">
               <p className = "text-center text-2">Not Found!</p>
           </div>

        </div>
    )
}

export default NotFound
