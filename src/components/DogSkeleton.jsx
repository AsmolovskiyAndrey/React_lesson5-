import ContentLoader from 'react-content-loader';

export const DogSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="216" y="54" rx="2" ry="2" width="140" height="10" />
      <rect x="215" y="34" rx="2" ry="2" width="140" height="10" />
      <rect x="-3" y="12" rx="2" ry="2" width="204" height="204" />
      <rect x="215" y="13" rx="2" ry="2" width="140" height="10" />
    </ContentLoader>
  );
};
