import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Details from 'views/Details/Details';
import Notes from 'views/Notes/Notes';
import Twitters from 'views/Twitters/Twitters';
import Articles from 'views/Articles/Articles';
import { routes } from 'routes';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to="/notes" />} />
          <Route exact path={routes.notes} component={Notes} />
          <Route path={routes.notesDetails} component={Details} />
          <Route exact path={routes.articles} component={Articles} />
          <Route path={routes.articlesDetails} component={Details} />
          <Route exact path={routes.twitters} component={Twitters} />
          <Route path={routes.twittersDetails} component={Details} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
