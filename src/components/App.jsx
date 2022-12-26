import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

export class App extends Component {
  selectBreed = option => {
    console.log(option);
  };

  render() {
    return (
      <>
        <Select options={[]} onChange={this.selectBreed} />
      </>
    );
  }
}
