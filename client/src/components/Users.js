import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { userQuery } from '../services/queries';

class Users extends Component {
  render() {
    console.log(this.props);
    const { data } = this.props;
    return (
      <div>
        <h1>User List</h1>
        {!data.loading &&
          data.users.map((user, i) => (
            <div key={i}>
              {user.name} {user.age} {user.height}
            </div>
          ))}
        <h1>Create a user</h1>
        <form>
          <input type="text" placeholder="name" />
          <input type="text" placeholder="age" />
          <input type="text" placeholder="height" />
          <input type="text" placeholder="weight" />
          <input type="text" placeholder="blood_pressure" />
          <input type="text" placeholder="water" />
          <input type="text" placeholder="alcool" />
          <input type="text" placeholder="sport" />
        </form>
        <button>add</button>
      </div>
    );
  }
}

export default graphql(userQuery)(Users);
