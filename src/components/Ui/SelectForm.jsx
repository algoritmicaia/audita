import React from 'react';
import Label from '../Ui/Label'
import Select from '../Ui/Select';

export const SelectForm = ({ 
  id, 
  labelText, 
  options = [],
  required = false,
  placeholder = "Selecciona una opción",
  value,
  onChange,
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
        value={value}
        onChange={onChange}
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
