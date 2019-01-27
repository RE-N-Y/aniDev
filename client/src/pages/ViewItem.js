import React, { Component } from 'react';
import axios from 'axios';

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
    const { type } = this.props.match.params;
    return (
      <ul>
        {this.state.items.map(item => (
          <li key={item._id}>{item[this.getItemName(type)]}</li>
        ))}
      </ul>
    );
  }
}
export default ViewItem;
