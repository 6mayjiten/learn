import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const Loader = () => (
  <ContentLoader
    animate={true}
    speed={1}
    width={400}
    height={475}
    viewBox="0 0 400 475"
    backgroundColor="#c0c0c0"
    foregroundColor="#ecebeb">
    <Circle cx="31" cy="31" r="15" />
    <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
    <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
    <Rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
  </ContentLoader>
);

export default Loader;
