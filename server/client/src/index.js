import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import {devToolsEnhancer} from 'redux-devtools-extension'; 
import App from './App';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import 'materialize-css/dist/css/materialize.min.css';
import registerServiceWorker from './registerServiceWorker';


const sagaMiddleware = createSagaMiddleware();
const Store = createStore(
    reducers,
    devToolsEnhancer(),
    applyMiddleware(sagaMiddleware)
    
);
sagaMiddleware.run(rootSaga);


//const Store = createStore(reducers, devToolsEnhancer())


ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
