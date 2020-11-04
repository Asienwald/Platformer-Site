import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';
import './App.css';

// pages
import HomePage from './components/pages/home';
import NotFound from './components/pages/notfound';
import WorldMapPage from './components/pages/worldmap';
import AboutMePage from './components/pages/aboutme';
import EducationPage from './components/pages/education'
import ExperiencePage from './components/pages/experience';
import Environment from './components/common/environment';
import AchievemmentsPage from './components/pages/achievements';
import FindMePage from './components/pages/findme';

import Player from './components/common/player';
import { useDispatch } from 'react-redux';
import { AllActions } from './actions';
import ProjectsPage from './components/pages/projects';
import { AnimateSharedLayout } from 'framer-motion';


const LocationManager: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch();

  const changeMovingEnv = (moving: boolean, playerCenter: boolean, playerInvert: boolean) => {
    dispatch(AllActions.EnvActions.changeMoving(moving));
    dispatch(AllActions.EnvActions.setPlayerCenter(playerCenter));
    dispatch(AllActions.EnvActions.setPlayerInvert(playerInvert));
  }

  useEffect(() => {
    console.log(location.pathname)
    const path: string = location.pathname;

    if(path == "/"){
      changeMovingEnv(true, true, false);
      dispatch(AllActions.EnvActions.setBackWorld(false));
    }else if(path == "/worldmap"){
      changeMovingEnv(false, false, true);
      dispatch(AllActions.EnvActions.setBackWorld(false));
    }else if([
      '/aboutme',
      '/education',
      '/experience',
      '/achievements',
      '/projects',
      '/findme'
    ].includes(path) || path.match(/\/(projects|achievements)(\/.*)*/)){
      changeMovingEnv(true, false, false);
      dispatch(AllActions.EnvActions.setBackWorld(true));
    }else{
      changeMovingEnv(false, true, true);
      dispatch(AllActions.EnvActions.setBackWorld(false));
    }
  }, [location])

  return (
    <div>
      
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <AnimateSharedLayout type="crossfade">
        <Router basename={process.env.PUBLIC_URL}>
          <LocationManager/>
          <Switch>
              <Route
                exact = {true}
                path = "/"
                component = {HomePage}
              />
              <Route
                exact
                path = "/worldmap"
                component = {WorldMapPage}
              />
              <Route
                exact
                path = "/aboutme"
                component = {AboutMePage}
              />
              <Route
                exact
                path = "/education"
                component = {EducationPage}
              />
              <Route
                exact
                path = "/experience"
                component = {ExperiencePage}
              />
              <Route
                exact
                path = {["/achievements/:route", "/achievements"]}
                component = {AchievemmentsPage}
              />

              <Route
                exact
                path = {["/projects/:route", "/projects"]}
                component={ProjectsPage}
              />

              <Route
                exact
                path="/findme"
                component={FindMePage}
              />

              <Route
                component = {NotFound}
              />       
          </Switch>

          <Player/>

          <Environment/>

        </Router>
      </AnimateSharedLayout>
      

    </div>
  );
}

export default App;
