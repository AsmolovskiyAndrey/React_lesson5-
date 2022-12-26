import axios from 'axios';
import { Component } from 'react';
import Select from 'react-select';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/breeds');
      this.setState({ breeds: response.data });
    } catch (error) {
      this.setState({
        error: 'Упс породы собак перезагразите страницу ещё раз',
      });
    }
  }

  selectBreed = async option => {
    try {
      // const resp = await axios.get(`/images/search?breed_id=${option.value}`);
      const resp = await axios.get(`/images/search`, {
        params: { breed_id: option.value },
      });
      this.setState({ dog: resp.data[0] });
    } catch (error) {
      this.setState({ error: 'Упс собака сбежала и мы не смогли её найти' });
    }
  };

  buildSelectOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const { dog, error } = this.state;
    const options = this.buildSelectOptions();

    return (
      <>
        <Select options={options} onChange={this.selectBreed} />
        {error && <div>{error}</div>}
        {dog && (
          <div style={{ display: 'flex', gap: 16 }}>
            <img src={dog.url} width="480" alt="dog" />
            <div>
              <p>Name: {dog.breeds[0].name}</p>
              <p>Bred for: {dog.breeds[0].bred_for}</p>
              <p>Temperament: {dog.breeds[0].temperament}</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
