import { Component } from 'react';
import { fetchBreeds, fetchDogByBreed } from 'api';
import { Dog } from './Dog';
import { BreedSelect } from './BreedSelect';

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
  };

  async componentDidMount() {
    try {
      const breedFirst = await fetchBreeds();
      this.setState({ breeds: breedFirst });
    } catch (error) {
      this.setState({
        error: 'Упс породы собак перезагразите страницу ещё раз',
      });
    }
  }

  selectBreed = async briedId => {
    try {
      const breedDog = await fetchDogByBreed(briedId);
      this.setState({ dog: breedDog });
    } catch (error) {
      this.setState({ error: 'Упс собака сбежала и мы не смогли её найти' });
    }
  };

  render() {
    const { breeds, dog, error } = this.state;

    return (
      <>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />
        {error && <div>{error}</div>}
        {dog && <Dog dog={dog} />}
      </>
    );
  }
}
