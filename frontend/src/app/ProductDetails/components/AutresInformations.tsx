import React from 'react';

interface AutresInformationsProps {
  autresInfo: string;
}

const AutresInformations: React.FC<AutresInformationsProps> = ({ autresInfo }) => {
  return (
    <div>
      <h4 className="font-semibold mb-4">Autres informations</h4>
      <ul className="list-disc list-inside text-sm mb-4">
        
      </ul>
      <p className="text-sm">{autresInfo}</p>
    </div>
  );
};

export default AutresInformations;
