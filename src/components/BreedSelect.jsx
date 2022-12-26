import { Component } from 'react';
import Select from 'react-select';
import { fetchBreeds } from 'api';
import FadeLoader from 'react-spinners/FadeLoader';

export class BreedSelect extends Component {
  state = {
    breeds: [],
    error: null,
    isLoaidingFirst: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoaidingFirst: true });
      const breedFirst = await fetchBreeds();
      this.setState({ breeds: breedFirst });
    } catch (error) {
      this.setState({
        error: 'Упс породы собак перезагразите страницу ещё раз',
      });
    } finally {
      this.setState({ isLoaidingFirst: false });
    }
  }

  buildOptions = () => {
    return this.state.breeds.map(breed => ({
      value: breed.id,
      label: breed.name,
    }));
  };

  render() {
    const { error, isLoaidingFirst } = this.state;
    const { onSelect } = this.props;
    const options = this.buildOptions();

    return (
      <div>
        <Select options={options} onChange={option => onSelect(option.value)} />
        <FadeLoader
          color="#36d7b7"
          loading={isLoaidingFirst}
          size={100}
          aria-label="Loading Spinner"
        />
        {error && <div>{error}</div>}
      </div>
    );
  }
}
