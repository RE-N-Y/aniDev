import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, getFormValues } from 'redux-form';
import form from '../extensions/form';

class AnimeForm extends Component {
  onSubmit = (formProps) => {
    const {
      history,
      requestType,
      id,
      createRequest,
      updateRequest,
      bufferToBase64,
      extractToList,
    } = this.props;
    const relatedAnimes = extractToList(formProps.relatedAnimes);
    const relatedCharacters = extractToList(formProps.relatedCharacters);
    const thumbnail = bufferToBase64(formProps.thumbnail);
    const mainImage = bufferToBase64(formProps.mainImage);
    if (requestType === 'post') {
      createRequest(
        {
          ...formProps,
          relatedAnimes,
          relatedCharacters,
          rating: parseFloat(formProps.rating),
          thumbnail,
          mainImage,
        },
        'animes',
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
          rating: parseFloat(formProps.rating),
          thumbnail,
          mainImage,
        },
        'animes',
        id,
        () => {
          history.push('/');
        },
      );
    }
  };

  render() {
    const {
      handleSubmit,
      renderQuill,
      renderFileInput,
      renderList,
      formValues,
      renderDatePicker,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" type="text" component="input" placeholder="title" />
        <Field name="rating" type="number" step="0.01" component="input" placeholder="ratings" />
        <Field name="mainImage" component={renderFileInput} placeholder="main image" />
        <img alt="main preview" src={formValues ? formValues.mainImage : null} />
        <Field name="thumbnail" component={renderFileInput} placeholder="thumbnail" />
        <img alt="thumbnail preview" src={formValues ? formValues.thumbnail : null} />
        <Field name="synopsis" component="textarea" placeholder="synopsis" />
        <Field name="review" component={renderQuill} />
        <Field name="startedAiring" component={renderDatePicker} />
        <Field name="finishedAiring" component={renderDatePicker} />
        <FieldArray name="relatedAnimes" component={renderList} />
        <FieldArray name="relatedCharacters" component={renderList} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({ formValues: getFormValues('animeForm')(state) });

export default connect(mapStateToProps)(form(AnimeForm, 'animeForm'));
