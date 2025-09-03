import React from 'react';

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return <p>{description}</p>;
};

export default Description;
