import React, {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import useUser from '../hooks/useUser';
import Post from "./Post";
const Timeline = () => {

    const photos = usePhotos();

    return (
        <div className = "container col-span-2">
         {!photos ? (
             <>
                <Skeleton count={4} width={640} height={400} className = "mb-5"/> 
             </>
         ):photos?.length > 0 ? (
            photos.map((content) => <Post key = {content.docId} content = {content}/>)
         ):(
             <p className = "text-center text-2xl">Follow people to see photos</p>
         )
         }  
        </div>
    )
}

export default Timeline
