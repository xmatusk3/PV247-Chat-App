//import { DemoComponent } from './containers-redux/demo/demoComponent.jsx';
import './utils/global-styles.js';
// import { EditedChannel } from './components/channels/editedChannel.jsx';

require.context('../static/', true);
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHistory } from './utils/createHistory';
import { createStore } from './utils/createStore';
// import { ChannelLayout } from './containers-redux/channels/channelLayout.jsx';

import ChannelLayout from 'components/channels/ChannelLayout.jsx';
// import { LoginForm} from './containers-redux/login/LoginForm.jsx';

const history = createHistory();
const store = createStore(history);

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {/*<LoginForm />*/}
            <ChannelLayout/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));