import React from 'react'
import Button from '../Ui/Button'

export const Form = ({children, onSubmit, className = "", ...props}) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6 ${className}`}
      {...props}
    >
      {children}
    </form>
  )
}

export default Form;

