import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, getFormValues } from 'redux-form';
import axios from 'axios';
import {
  Button, FormGroup, Card, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import form from '../extensions/form';
import * as actions from '../../actions';
import { bufferToImage } from '../extensions/Util';
import { errorImage } from '../../resources/errorImage';

const style = theme => ({
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: `${theme.palette.primary.light} !important`,
  },
  cssLabel: {
    color: `${theme.palette.primary.light} !important`,
  },
});

class AnimeForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const {
        data: {
          mainImage,
          thumbnail,
          genres,
          relatedAnimes,
          relatedCharacters,
          relatedStudios,
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
        relatedAnimes: relatedAnimes.map(item => ({ label: item.title, value: item.title })),
        relatedCharacters: relatedCharacters.map(item => ({ label: item.name, value: item.name })),
        relatedStudios: relatedStudios.map(item => ({ label: item.name, value: item.name })),
        genres: genres.map(item => ({ label: item, value: item }))
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
    const relatedStudios = extractToList(formProps.relatedStudios);
    const genres = extractToList(formProps.genres);
    const thumbnail = bufferToBase64(formProps.thumbnail);
    const mainImage = bufferToBase64(formProps.mainImage);
    if (requestType === 'post') {
      createRequest(
        {
          ...formProps,
          relatedAnimes,
          relatedCharacters,
          relatedStudios,
          genres,
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
          relatedStudios,
          genres,
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
      classes,
    } = this.props;

    const styles = {
      card: {
        maxWidth: 345,
        margin: 15,
      },
      media: {
        objectFit: 'cover',
      },
      listStyle: {
        marignTop: 15,
      },
    };
    const inputStyle = {
      classes: {
        focused: classes.cssFocused,
        notchedOutline: classes.notchedOutline,
      },
    };
    const inputLabelStyle = {
      classes: {
        root: classes.cssLabel,
        focused: classes.cssFocused,
      },
    };
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          component={renderTextField}
          label="Title"
          InputLabelProps={inputLabelStyle}
          InputProps={inputStyle}
        />
        <Field
          name="rating"
          type="number"
          step="0.01"
          label="Rating"
          component={renderTextField}
          placeholder="ratings"
        />
        <FormGroup row>
          <Field name="story" label="Story" component={renderTextField} step="1" placeholder="Story" type="number"/>
          <Field name="art" label="Art" component={renderTextField} step="1" placeholder="Art" type="number"/>
          <Field name="character" label="Character" component={renderTextField} step="1" placeholder="Character" type="number"/>
          <Field name="music" label="Music" component={renderTextField} step="1" placeholder="Music" type="number"/>
        </FormGroup>
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
        <Field
          name="synopsis"
          label="Synopsis"
          component={renderTextField}
          placeholder="synopsis"
          multiline
        />
        <Field name="review" component={renderQuill} />
        <FormGroup>
          <Field name="startedAiring" component={renderDatePicker} />
          <Field name="finishedAiring" component={renderDatePicker} />
        </FormGroup>
        <FormGroup>
          <Field
            label="Genres"
            name="genres"
            type="genres"
            component={renderList}
            style={styles.listStyle}
          />
          <Field
            label="Animes"
            name="relatedAnimes"
            type="animes"
            component={renderList}
            style={styles.listStyle}
          />
          <Field
            label="Characters"
            name="relatedCharacters"
            type="characters"
            component={renderList}
            style={styles.listStyle}
          />
          <Field
            label="Studios"
            name="relatedStudios"
            type="studios"
            component={renderList}
            style={styles.listStyle}
          />
        </FormGroup>
        <Button style={{ marginTop: 15 }} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.post.formInitValues,
  formValues: getFormValues('animeForm')(state),
});

export default withStyles(style)(
  connect(
    mapStateToProps,
    actions,
  )(form(AnimeForm, 'animeForm')),
);
