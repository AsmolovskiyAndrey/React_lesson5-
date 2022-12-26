import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {}
  }

  selectBreed = async option => {
    try {
      const resp = await axios.get(`/images/search?breed_id=${option.value}`);
      this.setState({ dog: resp.data[0] });
      // console.log(resp.data[0]);
    } catch (error) {}
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
        {this.state.dog && (
          <div>
            <img src={this.state.dog.url} width="480" alt="dog" />
          </div>
        )}
      </>
    );
  }
}
