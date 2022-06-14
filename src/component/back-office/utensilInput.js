import React from 'react';

export function UtensilInput({
  id,
  name,
  handleUtensilChange,
  ...props
}) {

  return (
    <li>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => handleUtensilChange(e, id)}
      />
    </li>
  );
}
