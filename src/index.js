import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import CourseListReducer from './reducer/reducer';
const store = createStore(CourseListReducer);

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
