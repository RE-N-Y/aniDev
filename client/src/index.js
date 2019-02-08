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
import Form from './pages/Form';
import Post from './pages/Post';
import DashBoard from './pages/DashBoard';
import ViewItem from './pages/ViewItem';
import Anime from './pages/Anime';
import Character from './pages/Character';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile" component={Profile} />
        <Route path="/createPost" component={Form('postForm', 'post')} />
        <Route path="/posts/:id" exact component={Post} />
        <Route path="/posts/:id/edit" exact component={Form('postForm', 'put')} />
        <Route path="/createCharacter" component={Form('characterForm', 'post')} />
        <Route path="/characters/:id" exact component={Character} />
        <Route path="/characters/:id/edit" exact component={Form('characterForm', 'put')} />
        <Route path="/createAnime" component={Form('animeForm', 'post')} />
        <Route path="/animes/:id" exact component={Anime} />
        <Route path="/animes/:id/edit" exact component={Form('animeForm', 'put')} />
        <Route path="/admin" exact component={DashBoard} />
        <Route path="/admin/:type/pages/:nPage" exact component={ViewItem} />
        <Route path="/users/:id/edit" component={Form('userForm', 'put')} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/reset/:token" exact component={Reset} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
