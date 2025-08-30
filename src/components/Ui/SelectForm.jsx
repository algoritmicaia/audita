import React from 'react';
import Label from '../Ui/Label'
import Select from '../Ui/Select';

export const SelectForm = ({ 
  id, 
  labelText, 
  options = [],
  required = false,
  placeholder = "Selecciona una opción",
  ...props 
}) => {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {labelText}
      </Label>
      
      <Select 
        id={id}
        options={options}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
      </Select>
    </div>
  );
};

export default SelectForm;
