import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {}
  }

  selectBreed = option => {
    console.log(option);
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const options = this.buildSelectOptions();

    return (
      <>
        <Select options={options} onChange={this.selectBreed} />
      </>
    );
  }
}
