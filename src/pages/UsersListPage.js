import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../client/actions";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user, index) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }
  render() {
    return (
      <div>
        <ul>{this.props.users ? this.renderUsers() : <div>Loading...</div>}</ul>
        ;
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

const loadData = store => {
  console.log("Im trying to load some data");
  return store.dispatch(fetchUsers());
};
export { loadData };
export default connect(mapStateToProps, { fetchUsers })(UsersList);
