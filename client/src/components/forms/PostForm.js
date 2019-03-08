import React, { Component } from 'react';
import { Field } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup } from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';

class PostForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const response = await axios.get(`http://localhost:5000/posts/${this.props.match.params.id}`);
      this.props.initFormValues({ title: response.data.title, content: response.data.content });
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
    const { handleSubmit, renderQuill, renderTextField } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" component={renderTextField} label="Title" />
        <Field name="content" component={renderQuill} />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.post.formInitValues,
});

export default connect(
  mapStateToProps,
  actions,
)(form(PostForm, 'postForm'));
