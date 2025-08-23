import React from 'react';
import Label from '../Ui/Label'
import TextArea from '../Ui/TextArea';

export const TextAreaForm = ({ 
  id, 
  labelText, 
  placeholder, 
  required = false,
  register,
  rows = 4,
  ...props 
}) => {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {labelText}
      </Label>
      
      <TextArea 
        id={id}
        placeholder={placeholder}
        rows={rows}
        {...register(id, { required: required })}
        {...props}
      />
    </div>
  );
};

export default TextAreaForm;
