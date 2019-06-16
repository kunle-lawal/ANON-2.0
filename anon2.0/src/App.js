import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import WelcomePage from './components/layout/WelcomePage';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Topic from './components/dashboard/Topic';
import StoryDetails from './components/stories/StoryDetails';
import CreateStory from './components/stories/CreateStory';
import MyProfile from './components/UserProfile/MyProfile';
import Footer from './components/layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main_container">
            <BrowserRouter>
              <div className="main">
                <Navbar />
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route path='/topics/:id' component={Topic} />
                  <Route path='/story/:id' component={StoryDetails} />
                  <Route path='/create' component={CreateStory} />
                  <Route path='/profile' component={MyProfile} />
                  <Route exact path='/admin' component={AdminDashboard} />
                  <Route path='/admin/:id' component={AdminDashboard} />
                  <Route path='/page/:id' component={Dashboard} />
                  <Route path='/welcome' component={WelcomePage} />
                  <Route component={Dashboard} />
                </Switch>
                <Footer />
              </div>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
