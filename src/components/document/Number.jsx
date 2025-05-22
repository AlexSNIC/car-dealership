import React from 'react'

const Number = ({name, value}) => {
  return (
    <div className='field'>
      <span className='field__name'>{name}: </span>
      <span className='field__value'>{value}</span>
      <button className="button field__button"><i className="bi bi-pencil-square"></i></button>
    </div>
  )
}

export default Number