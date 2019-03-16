import React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, FormGroup, Typography } from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';

class PostForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const { data } = await axios.get('http://localhost:5000/main/');
      this.props.initFormValues(data);
    }
  }

  onSubmit = (formProps) => {
    const { history } = this.props;
    // axios.post('http://localhost:5000/main/')
  };

  render() {
    const { handleSubmit, renderList, formValues } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="mainAnime" label="Main Anime" type="animes" component={renderList} />
        <Field name="featuredAnime" label="Featured Anime" type="animes" component={renderList} />
        <Field
          name="featuredPosts"
          label="Featured Posts"
          type="posts"
          component={renderList}
          isMulti
        />
        <Button style={{ marginTop: 15 }} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.post.formInitValues,
  formValues: getFormValues('settingForm')(state),
});

export default connect(
  mapStateToProps,
  actions,
)(form(PostForm, 'settingForm'));
