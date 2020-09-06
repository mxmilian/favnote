import ProtectedRoute from 'hoc/ProtectedRoutes';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Details from 'views/Details/Details';
import Notes from 'views/Notes/Notes';
import Sign from 'views/Sign/Sign';
import Twitters from 'views/Twitters/Twitters';
import Articles from 'views/Articles/Articles';
import { routes } from 'routes';
import Users from 'views/Users/Users';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect push to={routes.sign} />} />
          <ProtectedRoute exact path={routes.users} component={Users} />
          <ProtectedRoute exact path={routes.notes} component={Notes} />
          <ProtectedRoute path={routes.notesDetails} component={Details} />
          <ProtectedRoute exact path={routes.articles} component={Articles} />
          <ProtectedRoute path={routes.articlesDetails} component={Details} />
          <ProtectedRoute exact path={routes.twitters} component={Twitters} />
          <ProtectedRoute path={routes.twittersDetails} component={Details} />
          <Route path={routes.sign} component={Sign} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
