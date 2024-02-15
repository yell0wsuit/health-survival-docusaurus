import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const BaseUrlImg = ({ src, alt, ...props }) => (
  <img src={useBaseUrl(src)}
  alt={alt} {...props}
  loading="lazy"
  decoding="async"
  />
);

export default BaseUrlImg;
