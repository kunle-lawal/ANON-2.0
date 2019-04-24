import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import StoryDetails from './components/stories/StoryDetails';
import CreateStory from './components/stories/CreateStory';

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
                  <Route path='/story/:id' component={StoryDetails} />
                  <Route path='/create' component={CreateStory} />
                  <Route path='/:id' component={Dashboard} />
                </Switch>
              </div>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
