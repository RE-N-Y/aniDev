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
    const {
      match: {
        params: { type },
      },
      history,
    } = this.props;
    return (
      <ul>
        {this.state.items.map(item => (
          <div
            key={item._id}
            onClick={() => {
              history.push(`/${type}/${item._id}/edit`);
            }}
          >
            <li>{item[this.getItemName(type)]}</li>
          </div>
        ))}
      </ul>
    );
  }
}
export default ViewItem;
