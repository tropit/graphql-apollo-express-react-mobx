import React from 'react'


export default ({ ...props }) => {
  const onChange = e => {
    props.handleChange(e.target.name, e.target.value)
  }
  return <input type="text" value={ props.value } name={ props.name } placeholder={props.placeholder} onChange={ onChange } />
}


