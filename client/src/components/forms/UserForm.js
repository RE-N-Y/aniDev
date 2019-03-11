import React, { Component } from 'react';
import { Field } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';
import { MenuItem, Button, FormGroup } from '@material-ui/core';
import form from '../extensions/form';
import * as actions from '../../actions';
import requireAuth from '../extensions/requireAuth';

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
      updateRequest(formProps, 'users', id, () => {
        history.push('/');
      });
    }
  };

  render() {
    const { handleSubmit, renderDropDown, renderTextField } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <FormGroup style={{ marginBottom: 10 }}>
          <Field name="username" component={renderTextField} label="Username" />
          <Field name="access" component={renderDropDown}>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Field>
        </FormGroup>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.post.formInitValues,
});

const WrappedUserForm = form(UserForm, 'userForm');

export default connect(
  mapStateToProps,
  actions,
)(requireAuth(WrappedUserForm, ['admin', 'editor']));
