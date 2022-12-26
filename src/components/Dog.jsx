export const Dog = ({ dog }) => {
  const { name, bred_for, temperament } = dog.breeds[0];

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <img src={dog.url} width="480" alt="dog" />
      <div>
        <p>Name: {name}</p>
        <p>Bred for: {bred_for}</p>
        <p>Temperament: {temperament}</p>
      </div>
    </div>
  );
};
