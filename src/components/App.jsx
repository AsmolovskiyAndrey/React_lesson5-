import { Component } from 'react';
import { fetchBreeds, fetchDogByBreed } from 'api';
import { Dog } from './Dog';
import { BreedSelect } from './BreedSelect';
import FadeLoader from 'react-spinners/FadeLoader';

export class App extends Component {
  state = {
    breeds: [],
    dog: null,
    error: null,
    isLoaidingDog: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoaidingDog: true });
      const breedFirst = await fetchBreeds();
      this.setState({ breeds: breedFirst });
    } catch (error) {
      this.setState({
        error: 'Упс породы собак перезагразите страницу ещё раз',
      });
    } finally {
      this.setState({ isLoaidingDog: false });
    }
  }

  selectBreed = async briedId => {
    try {
      this.setState({ isLoaidingDog: true });
      const breedDog = await fetchDogByBreed(briedId);
      this.setState({ dog: breedDog });
    } catch (error) {
      this.setState({ error: 'Упс собака сбежала и мы не смогли её найти' });
    } finally {
      this.setState({ isLoaidingDog: false });
    }
  };

  render() {
    const { breeds, dog, error, isLoaidingDog } = this.state;
    // <ClockLoader color="#36d7b7" />;

    return (
      <>
        <BreedSelect breeds={breeds} onSelect={this.selectBreed} />
        {error && <div>{error}</div>}

        <FadeLoader
          color="#36d7b7"
          loading={isLoaidingDog}
          size={100}
          aria-label="Loading Spinner"
        />

        {dog && !isLoaidingDog && <Dog dog={dog} />}
      </>
    );
  }
}
