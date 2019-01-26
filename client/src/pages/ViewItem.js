import React, { Component } from 'react';
import axios from 'axios';

class ViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentWillMount() {
    const { data } = await axios('http://localhost:5000/posts/pages/1', {
      method: 'get',
      withCredentials: true,
    });
    this.setState({ items: data });
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    );
  }
}
export default ViewItem;
