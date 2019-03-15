import React, { Component } from 'react';
import { Collapse, Button } from '@material-ui/core';

class ReadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false,
    };
  }

  render() {
    const { collapsed, children } = this.props;

    const summaryStyle = !this.state.in ? { height: `${collapsed - 20}px` } : {};

    const styles = {
      buttonStyle: {
        padding: 0,
        paddingTop: 5,
      },
    };

    return (
      <div>
        <Collapse in={this.state.in} collapsedHeight={`${collapsed}px`}>
          <div style={summaryStyle}>{children}</div>
        </Collapse>
        {!this.state.in ? (
          <Button
            style={styles.buttonStyle}
            onClick={() => {
              this.setState({ in: true });
            }}
          >
            Read More...
          </Button>
        ) : (
          <Button
            style={styles.buttonStyle}
            onClick={() => {
              this.setState({ in: false });
            }}
          >
            Read Less...
          </Button>
        )}
      </div>
    );
  }
}

export default ReadMore;
