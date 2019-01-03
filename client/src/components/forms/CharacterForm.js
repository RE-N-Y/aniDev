import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import form from '../extensions/form';

class CharacterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
    };
  }

  onSubmit = (formProps) => {
    const {
      history, requestType, id, createRequest, updateRequest,
    } = this.props;
    const relatedAnimes = formProps.relatedAnimes
      ? formProps.relatedAnimes.map(obj => obj.content)
      : null;
    const relatedCharacters = formProps.relatedCharacters
      ? formProps.relatedCharacters.map(obj => obj.content)
      : null;
    const thumbnail = new Buffer(formProps.thumbnail, 'base64');
    console.log(thumbnail);
    if (requestType === 'post') {
      createRequest(
        {
          ...formProps,
          relatedAnimes,
          relatedCharacters,
          thumbnail,
        },
        'characters',
        () => {
          history.push('/');
        },
      );
    } else if (requestType === 'put') {
      updateRequest(
        {
          ...formProps,
          relatedAnimes,
          relatedCharacters,
          thumbnail,
        },
        'characters',
        id,
        () => {
          history.push('/');
        },
      );
    }
  };

  render() {
    const {
      handleSubmit, renderQuill, renderFileInput, renderList,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="name" type="text" component="input" />
        <Field name="description" component={renderQuill} />
        <Field
          name="thumbnail"
          component={renderFileInput}
          onChange={(e, newValue, previousValue) => {
            this.setState({ thumbnail: newValue });
          }}
        />
        <img alt="thumbnail preview" src={this.state.thumbnail} />
        <FieldArray name="relatedAnimes" component={renderList} />
        <FieldArray name="relatedCharacters" component={renderList} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default form(CharacterForm, 'characterForm');
