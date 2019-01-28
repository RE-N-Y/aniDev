import React, { Component } from 'react';
import { Field } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import form from '../extensions/form';
import * as actions from '../../actions';

class UserForm extends Component {
  async componentWillMount() {
    if (this.props.requestType === 'put') {
      const response = await axios.get(`http://localhost:5000/users/${this.props.match.params.id}`);
      const { username, access } = response.data;
      this.props.initFormValues({ username, access });
    }
  }

  onSubmit = (formProps) => {
    const {
      requestType,
      history,
      updateRequest,
      match: {
        params: { id },
      },
    } = this.props;

    if (requestType === 'put') {
      updateRequest(formProps, 'posts', id, () => {
        history.push('/');
      });
    }
  };

  render() {
    const { handleSubmit, renderDropDown } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="username" type="text" component="input" label="Username" />
        <Field name="access" component={renderDropDown}>
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Field>
        <button type="submit">Submit</button>
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
)(form(UserForm, 'userForm'));
