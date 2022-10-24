import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block-wrapper"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      // {...props}
    >
      <rect x="0" y="307" rx="18" ry="18" width="280" height="75" />
      <rect x="10" y="397" rx="19" ry="19" width="90" height="27" />
      <rect x="63" y="446" rx="0" ry="0" width="7" height="2" />
      <circle cx="140" cy="130" r="130" />
      <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
      <rect x="123" y="395" rx="21" ry="21" width="150" height="43" />
    </ContentLoader>
  </div>
);

export default Skeleton;
