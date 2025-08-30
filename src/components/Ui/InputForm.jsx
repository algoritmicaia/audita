import React from 'react';
import Label from '../Ui/Label'
import Input from '../Ui/Input';
import TextArea from '../Ui/TextArea';

export const InputForm = ({ 
  id, 
  type, 
  labelText, 
  placeholder, 
  required = false,
  useArea = false,
  rows = 4,
  ...props 
}) => {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {labelText}
      </Label>
      
      {useArea ? (
        <TextArea 
          id={id}
          placeholder={placeholder}
          rows={rows}
          {...props}
        />
      ) : (
        <Input 
          id={id}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

export default InputForm;
