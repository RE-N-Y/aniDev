import React from 'react';
import AnimeForm from '../components/forms/AnimeForm';
import CharacterForm from '../components/forms/CharacterForm';
import PostForm from '../components/forms/PostForm';
import UserForm from '../components/forms/UserForm';
import StudioForm from '../components/forms/StudioForm';

const Form = (model, type) => (props) => {
  if (model === 'animeForm') {
    return (
      <div style={{ padding: 15 }}>
        <AnimeForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'postForm') {
    return (
      <div style={{ padding: 15 }}>
        <PostForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'characterForm') {
    return (
      <div style={{ padding: 15 }}>
        <CharacterForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'userForm') {
    return (
      <div style={{ padding: 15 }}>
        <UserForm {...props} requestType={type} />
      </div>
    );
  }
  if (model === 'studioForm') {
    return (
      <div style={{ padding: 15 }}>
        <StudioForm {...props} requestType={type} />
      </div>
    );
  }
};

export default Form;
