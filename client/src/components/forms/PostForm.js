import React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, FormGroup, Card, CardMedia, CardContent, Typography,
} from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';
import { bufferToImage } from '../extensions/Util';
import { errorImage } from '../../resources/errorImage';

class PostForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const {
        data: { mainImage, ...props },
      } = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
      this.props.initFormValues({ mainImage: bufferToImage(mainImage), ...props });
    }
  }

  onSubmit = (formProps) => {
    const {
      requestType,
      createRequest,
      history,
      updateRequest,
      match: {
        params: { id },
      },
    } = this.props;

    if (requestType === 'post') {
      createRequest(formProps, 'posts', () => {
        history.push('/');
      });
    } else if (requestType === 'put') {
      updateRequest(formProps, 'posts', id, () => {
        history.push('/');
      });
    }
  };

  render() {
    const {
      handleSubmit, renderQuill, renderTextField, formValues, renderFileInput,
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
        <Field name="content" component={renderQuill} />
        <FormGroup row>
          <Card style={styles.card}>
            <CardMedia
              style={styles.media}
              component="img"
              height="140"
              src={formValues ? formValues.mainImage : errorImage}
            />
            <CardContent>
              <Typography variant="subtitle1">THUMBNAIL</Typography>
              <Field name="mainImage" component={renderFileInput} placeholder="Main Image" />
            </CardContent>
          </Card>
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
  formValues: getFormValues('postForm')(state),
});

export default connect(
  mapStateToProps,
  actions,
)(form(PostForm, 'postForm'));
