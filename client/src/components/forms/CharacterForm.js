import React, { Component } from 'react';
import { Field, FieldArray, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import form from '../extensions/form';

class CharacterForm extends Component {
  onSubmit = (formProps) => {
    const {
      history,
      requestType,
      id,
      createRequest,
      updateRequest,
      extractToList,
      bufferToBase64,
    } = this.props;
    const relatedAnimes = extractToList(formProps.relatedAnimes);
    const relatedCharacters = extractToList(formProps.relatedCharacters);
    const thumbnail = bufferToBase64(formProps.thumbnail);
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
      handleSubmit, renderQuill, renderFileInput, renderList, formValues,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="name" type="text" component="input" />
        <Field name="description" component={renderQuill} />
        <Field name="thumbnail" component={renderFileInput} />
        <img alt="thumbnail preview" src={formValues ? formValues.thumbnail : null} />
        <FieldArray name="relatedAnimes" component={renderList} />
        <FieldArray name="relatedCharacters" component={renderList} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({ formValues: getFormValues('characterForm')(state) });

export default connect(mapStateToProps)(form(CharacterForm, 'characterForm'));
