import React from 'react';
ç
import { Link } from 'react-router-dom'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header> 
            <Link to="/dashboard">Dashboard</Link>
          </DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <span onClick={() => { this.Signout() }}>Sign Out</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

