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
  register,
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
          {...register(id, { required: required })}
          {...props}
        />
      ) : (
        <Input 
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, { required: required })}
          {...props}
        />
      )}
    </div>
  );
};

export default InputForm;
