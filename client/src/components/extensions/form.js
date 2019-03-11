import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
  TextField, List, ListItem, Button, Typography,
} from '@material-ui/core/';
import { CloudUploadSharp } from '@material-ui/icons';
import { quillStyle } from './formStyle';
import * as actions from '../../actions';

const Quill = ReactQuill.Quill;
const Font = Quill.import('formats/font');
Font.whiteList = ['Ubuntu', 'Raleway', 'Roboto'];
Quill.register(Font, true);

export default (ChildComponent, formName) => {
  class ComposedComponent extends Component {
    renderQuill = ({ input }) => (
      <ReactQuill
        theme="snow"
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
          clipboard: {
            matchVisual: false,
          },
        }}
        style={quillStyle}
        {...input}
        onChange={(newValue, delta, source) => {
          if (source === 'user') {
            input.onChange(newValue);
          }
        }}
        onBlur={(range, source, quill) => {
          input.onBlur(quill.getHTML());
        }}
      />
    );

    renderList = ({ fields }) => (
      <List>
        <ListItem>
          <Button onClick={() => fields.push({})}>Add</Button>
        </ListItem>
        {fields.map((item, index) => (
          <ListItem key={index}>
            <h4>{index}</h4>
            <Field name={`${item}.content`} component={this.renderTextField} />
            <Button onClick={() => fields.remove(index)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    );

    renderTextField = ({
      input,
      label,
      variant,
      type,
      InputLabelProps,
      InputProps,
      placeholder,
    }) => (
      <TextField
        label={label}
        variant={variant}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        type={type}
        margin="normal"
        placeholder={placeholder}
        fullWidth
        {...input}
      />
    );

    renderFileInput = ({
      input: {
        value: omitValue, onChange, onBlur, ...inputProps
      },
      meta: omitMeta,
      ...props
    }) => (
      <Button secondary variant="outlined" component="label" label="UPLOAD">
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={async e => onChange(await this.imageToBase64(e.target.files[0]))}
          onBlur={async e => onBlur(await this.imageToBase64(e.target.files[0]))}
          {...inputProps}
          {...props}
        />
        <Typography>UPLOAD</Typography>
        <CloudUploadSharp style={{ marginLeft: 5 }} />
      </Button>
    );

    renderDatePicker = ({ input }) => <TextField type="date" {...input} />;

    renderDropDown = ({ input, children }) => <TextField select {...input} children={children} />;

    imageToBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => {
        reject('input reader error');
      };
      reader.readAsDataURL(file);
    });

    bufferToBase64 = buffer => Buffer.from(buffer.split(',')[1], 'base64');

    extractToList = objectList => (objectList ? objectList.map(obj => obj.content) : null);

    render() {
      return (
        <ChildComponent
          renderQuill={this.renderQuill}
          renderFileInput={this.renderFileInput}
          renderList={this.renderList}
          renderDatePicker={this.renderDatePicker}
          bufferToBase64={this.bufferToBase64}
          extractToList={this.extractToList}
          renderDropDown={this.renderDropDown}
          renderTextField={this.renderTextField}
          {...this.props}
        />
      );
    }
  }

  return compose(
    connect(
      null,
      actions,
    ),
    reduxForm({ form: formName, enableReinitialize: true }),
  )(ComposedComponent);
};
