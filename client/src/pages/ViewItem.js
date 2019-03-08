import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@material-ui/core';

class ViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  getItemName(type) {
    if (type === 'characters') {
      return 'name';
    }
    if (type === 'users') {
      return 'username';
    }
    return 'title';
  }

  async componentWillMount() {
    const { type, nPage } = this.props.match.params;
    const { data } = await axios(`http://localhost:5000/${type}/pages/${nPage}`, {
      method: 'get',
      withCredentials: true,
    });
    this.setState({ items: data });
  }

  render() {
    const {
      match: {
        params: { type },
      },
      history,
    } = this.props;
    return (
      <List>
        {this.state.items.map(item => (
          <div
            key={item._id}
            onClick={() => {
              history.push(`/${type}/${item._id}/edit`);
            }}
          >
            <ListItem button>
              <ListItemText>{item[this.getItemName(type)]}</ListItemText>
            </ListItem>
          </div>
        ))}
      </List>
    );
  }
}
export default ViewItem;
