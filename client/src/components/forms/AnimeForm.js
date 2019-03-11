import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, getFormValues } from 'redux-form';
import axios from 'axios';
import {
  Button, FormGroup, Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';
import { bufferToImage } from '../extensions/Util';
import { errorImage } from '../../resources/errorImage';

class AnimeForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const {
        data: {
          mainImage,
          thumbnail,
          relatedAnimes,
          relatedCharacters,
          startedAiring,
          finishedAiring,
          ...props
        },
      } = await axios.get(`http://localhost:5000/animes/${this.props.match.params.id}`);
      this.props.initFormValues({
        ...props,
        mainImage: bufferToImage(mainImage),
        thumbnail: bufferToImage(thumbnail),
        startedAiring: new Date(startedAiring).toISOString().split('T')[0],
        finishedAiring: new Date(startedAiring).toISOString().split('T')[0],
        relatedAnimes: relatedAnimes.map(item => ({ content: item.title })),
        relatedCharacters: relatedCharacters.map(item => ({ content: item.name })),
      });
    }
  }

  onSubmit = (formProps) => {
    const {
      history,
      requestType,
      match: {
        params: { id },
      },
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
      renderTextField,
    } = this.props;

    const styles = {
      card: {
        maxWidth: 345,
        margin: 15,
      },
      media: {
        objectFit: 'cover',
      },
    };

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" component={renderTextField} label="Title" />
        <Field
          name="rating"
          type="number"
          step="0.01"
          component={renderTextField}
          placeholder="ratings"
        />
        <FormGroup row>
          <Card style={styles.card}>
            <CardMedia
              style={styles.media}
              component="img"
              height="140"
              src={formValues ? formValues.mainImage : errorImage}
            />
            <CardContent>
              <Typography variant="subtitle1">MAIN IMAGE</Typography>
              <Field name="mainImage" component={renderFileInput} placeholder="main image" />
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardMedia
              style={styles.media}
              component="img"
              height="140"
              src={formValues ? formValues.thumbnail : errorImage}
            />
            <CardContent>
              <Typography variant="subtitle1">THUMBNAIL</Typography>
              <Field name="thumbnail" component={renderFileInput} placeholder="thumbnail" />
            </CardContent>
          </Card>
        </FormGroup>
        <Field name="synopsis" component={renderTextField} placeholder="synopsis" multiline />
        <Field name="review" component={renderQuill} />
        <FormGroup>
          <Field name="startedAiring" component={renderDatePicker} />
          <Field name="finishedAiring" component={renderDatePicker} />
        </FormGroup>
        <FormGroup>
          <FieldArray name="relatedAnimes" component={renderList} />
          <FieldArray name="relatedCharacters" component={renderList} />
        </FormGroup>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.post.formInitValues,
  formValues: getFormValues('animeForm')(state),
});

export default connect(
  mapStateToProps,
  actions,
)(form(AnimeForm, 'animeForm'));
