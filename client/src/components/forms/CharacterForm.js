import React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Button,
  FormGroup,
  Card,
  CardContent,
  CardMedia,
  Typography,
  MenuItem,
} from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';
import { bufferToImage } from '../extensions/Util';
import { errorImage } from '../../resources/errorImage';

class CharacterForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const {
        data: {
          thumbnail, relatedAnimes, relatedCharacters, ...props
        },
      } = await axios.get(`http://localhost:5000/characters/${this.props.match.params.id}`);

      this.props.initFormValues({
        ...props,
        thumbnail: bufferToImage(thumbnail),
        relatedAnimes: relatedAnimes.map(item => ({ label: item.title, value: item.title })),
        relatedCharacters: relatedCharacters.map(item => ({ label: item.name, value: item.name })),
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
      handleSubmit,
      renderQuill,
      renderFileInput,
      renderList,
      formValues,
      renderTextField,
      renderDropDown,
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
        <Field name="name" label="Name" component={renderTextField} />
        <Field name="description" component={renderQuill} />
        <FormGroup row>
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
        <FormGroup>
          <Field
            label="Animes"
            name="relatedAnimes"
            type="animes"
            component={renderList}
            isMulti
            style={styles.listStyle}
          />
          <Field
            label="Characters"
            name="relatedCharacters"
            type="characters"
            component={renderList}
            isMulti
            style={styles.listStyle}
          />
          <Field lable="Role" name="role" component={renderDropDown}>
            <MenuItem value="main">Main Character</MenuItem>
            <MenuItem value="supporting">Supporting Character</MenuItem>
          </Field>
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
  formValues: getFormValues('characterForm')(state),
});

export default connect(
  mapStateToProps,
  actions,
)(form(CharacterForm, 'characterForm'));
