import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import 'react-quill/dist/quill.snow.css';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../actions';
import { errorImage } from '../../resources/errorImage';

export default (ChildComponent, formName) => {
  class ComposedComponent extends Component {
    renderQuill = ({ input }) => (
      <ReactQuill
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
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add
          </button>
        </li>
        {fields.map((item, index) => (
          <li key={index}>
            <button type="button" onClick={() => fields.remove(index)}>
              Remove
            </button>
            <h4>{index}</h4>
            <Field name={`${item}.content`} type="text" component="input" />
          </li>
        ))}
      </ul>
    );

    renderFileInput = ({
      input: {
        value: omitValue, onChange, onBlur, ...inputProps
      },
      meta: omitMeta,
      ...props
    }) => (
      <input
        type="file"
        accept="image/*"
        onChange={async e => onChange(await this.imageToBase64(e.target.files[0]))}
        onBlur={async e => onBlur(await this.imageToBase64(e.target.files[0]))}
        {...inputProps}
        {...props}
      />
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

    bufferToImage = (buffer) => {
      try {
        return `data:image/jpg;base64,${Buffer.from(buffer).toString('base64')}`;
      } catch (error) {
        console.log('image error');
        return errorImage;
      }
    };

    render() {
      return (
        <ChildComponent
          renderQuill={this.renderQuill}
          renderFileInput={this.renderFileInput}
          renderList={this.renderList}
          renderDatePicker={this.renderDatePicker}
          bufferToBase64={this.bufferToBase64}
          extractToList={this.extractToList}
          bufferToImage={this.bufferToImage}
          renderDropDown={this.renderDropDown}
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
