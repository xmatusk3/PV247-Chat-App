import './utils/global-styles.js';

require.context('../static/', true);
import ReactDom from 'react-dom';
import React from 'react';
import 'es6-shim';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { createStore } from './utils/createStore';

import Layout from './components/Layout.jsx';
import LoginLayout from './components/login/LoginLayout';

const history = createHashHistory();
const store = createStore(history);

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/chat" component={Layout} />
                <Route path="/" component={LoginLayout} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));