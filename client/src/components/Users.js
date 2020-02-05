import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { usersQuery, addUserMutation } from '../services/queries';
import DescriptionHealth from './DescriptionHealth';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      height: '',
    };
  }

  updateQueries = (field, { target: { value } }) => {
    this.setState({
      [field]: ['age'].includes(field) ? Number(value) : value,
    });
  };

  onSubmitCreateUser = e => {
    e.preventDefault();
    this.props.addUser({
      variables: this.state,
      refetchQueries: [{ query: usersQuery }],
    });
  };

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>User List</h1>
        {!users.loading &&
          users.users.map((user, i) => (
            <div key={i}>
              {user.name} {user.age} {user.height}
            </div>
          ))}

        <h1>add a user</h1>
        <form>
          <div>
            <input
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.updateQueries.bind(null, 'name')}
            />
            <input
              type="text"
              placeholder="age"
              value={this.state.age}
              onChange={this.updateQueries.bind(null, 'age')}
            />
            <input
              type="text"
              placeholder="height"
              value={this.state.height}
              onChange={this.updateQueries.bind(null, 'height')}
            />
            <button onClick={this.onSubmitCreateUser}>add</button>
          </div>
        </form>
        <DescriptionHealth />
      </div>
    );
  }
}

export default compose(
  graphql(usersQuery, { name: 'users' }),
  graphql(addUserMutation, { name: 'addUser' })
)(Users);
