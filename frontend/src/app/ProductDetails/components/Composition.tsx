import React from 'react';

interface CompositionProps {
  composition: string;
}

const Composition: React.FC<CompositionProps> = ({ composition }) => {
  return (
    <div>
      <p className="mb-3 font-medium">Liste complète des ingrédients</p>
      <p className="text-sm mb-4">{composition}</p>
      <p className="text-xs italic text-gray-500">
        Le fabricant est responsable des ingrédients...
      </p>
    </div>
  );
};

export default Composition;
