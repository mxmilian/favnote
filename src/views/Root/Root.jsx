import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import Details from 'views/Details/Details';
import Notes from 'views/Notes/Notes';
import Twitters from 'views/Twitters/Twitters';
import Articles from 'views/Articles/Articles';

const Root = () => (
  <MainTemplate>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/notes" />} />
        <Route exact path="/notes" component={Notes} />
        <Route path="/notes/:id" component={Details} />
        <Route exact path="/articles" component={Articles} />
        <Route path="/articles/:id" component={Details} />
        <Route exact path="/twitters" component={Twitters} />
        <Route path="/twitters/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  </MainTemplate>
);

export default Root;
