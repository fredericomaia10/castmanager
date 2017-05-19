/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Proposals from '../../ui/pages/proposals/Proposals.js';
import Polls from '../../ui/pages/polls/Polls.js';
import NewPoll from '../../ui/containers/polls/NewPoll.js';
import NewProposal from '../../ui/containers/proposals/NewProposal.js';
import EditPoll from '../../ui/containers/polls/EditPoll.js';
import EditProposal from '../../ui/containers/proposals/EditProposal.js';
import ViewProposal from '../../ui/containers/proposals/ViewProposal.js';
import Index from '../../ui/containers/Index.js';
import Login from '../../ui/pages/login/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/login/RecoverPassword.js';
import ResetPassword from '../../ui/pages/login/ResetPassword.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="polls" path="/polls" component={ Polls } onEnter={ authenticate } />
        <Route name="newPoll" path="/polls/new" component={ NewPoll } onEnter={ authenticate } />
        <Route name="editPoll" path="/polls/:_id/edit" component={ EditPoll } onEnter={ authenticate } />
        <Route name="proposals" path="/proposals" component={ Proposals } onEnter={ authenticate } />
        <Route name="newProposal" path="/proposals/new" component={ NewProposal } onEnter={ authenticate } />
        <Route name="editProposal" path="/proposals/:_id/edit" component={ EditProposal } onEnter={ authenticate } />
        <Route name="viewProposal" path="/proposals/:_id" component={ ViewProposal } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
