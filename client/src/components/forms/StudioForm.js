import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, getFormValues } from 'redux-form';
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
        data: { logo, relatedAnimes, ...props },
      } = await axios.get(`http://localhost:5000/studios/${this.props.match.params.id}`);
      this.props.initFormValues({
        ...props,
        logo: bufferToImage(logo),
        relatedAnimes: relatedAnimes.map(item => ({ label: item.title, value: item.title })),
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
    const logo = bufferToBase64(formProps.logo);
    if (requestType === 'post') {
      createRequest(
        {
          ...formProps,
          relatedAnimes,
          logo,
        },
        'studios',
        () => {
          history.push('/');
        },
      );
    } else if (requestType === 'put') {
      updateRequest(
        {
          ...formProps,
          relatedAnimes,
          logo,
        },
        'studios',
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

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="name" component={renderTextField} label="Name" />
        <FormGroup row>
          <Card style={styles.card}>
            <CardMedia
              style={styles.media}
              component="img"
              height="140"
              src={formValues ? formValues.logo : errorImage}
            />
            <CardContent>
              <Typography variant="subtitle1">LOGO</Typography>
              <Field name="logo" component={renderFileInput} placeholder="Logo" />
            </CardContent>
          </Card>
        </FormGroup>
        <Field name="review" component={renderQuill} />
        <FormGroup>
          <Field
            label="Animes"
            name="relatedAnimes"
            type="animes"
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
  formValues: getFormValues('studioForm')(state),
});

export default connect(
  mapStateToProps,
  actions,
)(form(AnimeForm, 'studioForm'));
