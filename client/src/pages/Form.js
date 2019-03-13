import React from 'react';
import AnimeForm from '../components/forms/AnimeForm';
import CharacterForm from '../components/forms/CharacterForm';
import PostForm from '../components/forms/PostForm';
import UserForm from '../components/forms/UserForm';
import StudioForm from '../components/forms/StudioForm';

const Form = (model, type) => (props) => {
  if (model === 'animeForm') {
    return (
      <div>
        <AnimeForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'postForm') {
    return (
      <div>
        <PostForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'characterForm') {
    return (
      <div>
        <CharacterForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'userForm') {
    return (
      <div>
        <UserForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'studioForm') {
    return (
      <div>
        <StudioForm {...props} requestType={type} />
      </div>
    );
  }
};

export default Form;
