import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import EditPost from './pages/EditPost';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/posts/:id" exact component={Post} />
        <Route path="/posts/:id/edit" exact component={EditPost} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
