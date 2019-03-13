import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import axios from 'axios';
import {
  TextField, MenuItem, Button, Typography, Chip, Paper,
} from '@material-ui/core/';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import { CloudUploadSharp, CancelOutlined } from '@material-ui/icons';
import { quillStyle } from './formStyle';
import * as actions from '../../actions';
import { genreList } from '../../resources/List';

const style = theme => ({
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  message: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

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

    renderList = ({input, type, label }) => {
      const getSuggestions = async (inputValue) => {
        if (type === 'genres') {
          return new Promise((resolve) => {

            resolve(genreList.filter((str)=>{return str.includes(inputValue)}).map(value => ({ label: value, value })));
          });
        }
        const response = await axios.get(`http://localhost:5000/${type}/search/${inputValue}`);
        return response.data.map(value => ({ label: value, value }));
      };
      const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;
      const Control = props => (
        <TextField
          fullWidth
          InputProps={{
            inputComponent,
            inputProps: {
              className: props.selectProps.classes.input,
              inputRef: props.innerRef,
              children: props.children,
              ...props.innerProps,
            },
          }}
          {...props.selectProps.textFieldProps}
        />
      );
      const Option = props => (
        <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
      );
      const Message = (props) => {
        return (
          <Typography
            className={props.selectProps.classes.message}
            {...props.innerProps}
          >
            {props.children}
          </Typography>
        );
      }
      const Placeholder = props => (
        <Typography
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
      );

      const SingleValue = (props) => {
        return (
          <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
          </Typography>
        );
      }
      const ValueContainer = props => (
        <div className={props.selectProps.classes.valueContainer}>{props.children}</div>
      );
      const MultiValue = props => (
        <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelOutlined {...props.removeProps} />}
    />
      );
      const Menu = props => (
          <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
          </Paper>
      );
      const components = {
        Control,
        Menu,
        MultiValue,
        Option,
        Placeholder,
        SingleValue,
        ValueContainer,
        NoOptionsMessage:Message,
        LoadingMessage:Message
      };

      const { classes } = this.props;

      const selectStyles = {
        input: base => ({
          ...base,
          '& input': {
            font: 'inherit',
          },
        }),
      };
  
      return (
          <AsyncSelect
            loadOptions={getSuggestions}
            isMulti
            type={type}
            cacheOptions
            defaultOptions
            styles={selectStyles}
            noResultsText={<Typography>No results found</Typography>}
            classes={classes}
            textFieldProps={{
              label,
              InputLabelProps: {
                shrink: true,
              },
            }}
            components={components}
            placeholder={`Select Multiple ${label}`}
            value={input.value}
            onChange={(value) => input.onChange(value)}
            onBlur={(value) => input.onBlur(value)}
          />
      );
    };

    renderTextField = ({
      input,
      label,
      variant,
      type,
      InputLabelProps,
      InputProps,
      placeholder,
      multiline
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
        multiline={multiline}
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

    renderDatePicker = ({ input }) => <MuiPickersUtilsProvider utils={DateFnsUtils}><DatePicker {...input}/></MuiPickersUtilsProvider>;

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

    extractToList = objectList => (objectList ? objectList.map(obj => obj.value) : null);

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
      withStyles(style,{withTheme:true}),
      connect(
        null,
        actions,
      ),
      reduxForm({ form: formName, enableReinitialize: true }),
    )(ComposedComponent);
};
