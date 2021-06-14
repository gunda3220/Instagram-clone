import React, {useEffect} from "react";
import {BrowserRouter as Router,Link,Route,Switch} from "react-router-dom";
import { lazy,Suspense } from 'react';
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protectedRoutes";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";

const Login = lazy(() => import ('./pages/Login'));
const Signup = lazy(() => import ("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Profile = lazy(() => import("./pages/Profile"))

function App() {

  const {user} = useAuthListener();
  return (
    <UserContext.Provider value = {{user}}>
       <div className="App">
        <Router>
          <Suspense fallback = {<p>Loading...</p>}>
            <Switch>
              <IsUserLoggedIn user = {user} exact loggedinpath = {ROUTES.DASHBOARD} path = {ROUTES.LOGIN}>
                <Login />
              </IsUserLoggedIn>
              <IsUserLoggedIn user = {user} exact loggedinpath = {ROUTES.DASHBOARD} path = {ROUTES.SIGN_UP}>
                <Signup />
              </IsUserLoggedIn>
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
