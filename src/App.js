import React, {useEffect, useState} from "react";
import {BrowserRouter as Router,Link,Route,Switch} from "react-router-dom";
import { lazy,Suspense } from 'react';
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protectedRoutes";
import { getUserByUserId } from "./services/firebase";

const Login = lazy(() => import ('./pages/Login'));
const Signup = lazy(() => import ("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Profile = lazy(() => import("./pages/Profile"))

function App() {

  const {user} = useAuthListener();
  const [activeUserObject,setActiveUserObject] = useState(null)

  const getUserObject = async(id) =>{
    let [userObject] = await getUserByUserId(id);
    setActiveUserObject(userObject);
  }

  useEffect(() => {
    getUserObject(user.uid);
  },[])

  return (
    <UserContext.Provider value = {{user,activeUserObject,setActiveUserObject}}>
       <div className="App">
        <Router>
          <Suspense fallback = {<p>Loading...</p>}>
            <Switch>
              <Route path = {ROUTES.SIGN_UP} exact component = {Signup} />  
              <Route path = {ROUTES.LOGIN} exact component = {Login} />  
              <ProtectedRoute exact user = {user} path = {ROUTES.DASHBOARD}>
                <Dashboard />
              </ProtectedRoute>  
              <Route path = {ROUTES.PROFILE} component = {Profile} />       
              <Route component = {NotFound}></Route>     
            </Switch>
          </Suspense>      
        </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
