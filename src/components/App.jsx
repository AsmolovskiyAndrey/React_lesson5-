import { Component } from 'react';
import { fetchDogByBreed } from 'components/Api';
import { Dog } from './Dog';
import { BreedSelect } from './BreedSelect';
import { DogSkeleton } from './DogSkeleton';
import css from './App.module.css';

export class App extends Component {
  state = {
    dog: null,
    error: null,
    isLoaidingDog: false,
  };

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
    const { dog, error, isLoaidingDog } = this.state;

    return (
      <div className={css.main}>
        <BreedSelect onSelect={this.selectBreed} />
        {error && <div>{error}</div>}

        {isLoaidingDog && <DogSkeleton />}
        {dog && !isLoaidingDog && <Dog dog={dog} />}
      </div>
    );
  }
}
