import React from 'react';

export function IngredientInput({
  id,
  name,
  qty,
  unit,
  prepNotes,
  handleIngredientChange,
  ...props
}) {
  const units = ['', 'g', 'mg', 'l', 'cl', 'ml'];

  return (
    <li>
      <input
        type="number"
        value={qty || ''}
        name="qty"
        onChange={(e) => handleIngredientChange(e, id)}
      />
      <select
        name="unit"
        onChange={(e) => handleIngredientChange(e, id)}
        value={unit}
      >
        {units.map((unit) => (
          <option value={unit}>{unit}</option>
        ))}
      </select>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => handleIngredientChange(e, id)}
      />
      ,
      <input
        type="text"
        name="prepNotes"
        value={prepNotes}
        onChange={(e) => handleIngredientChange(e, id)}
      />
    </li>
  );
}
