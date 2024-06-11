import PropTypes from 'prop-types'

const MainButton = (props) => {

//to-do: clean this up to not be so unneccesary     
let normalButton = ' flex items-center gap-1 px-4 py-1 text-2xl' 
let smallButton = ' flex items-center gap-1 px-4 py-1'
let buttonSize;

  if (props.size === 'small') {
    buttonSize = smallButton
  } else {
    buttonSize = normalButton
  }
  
  
  return (
    <button {...props} className={buttonSize}>{props.children}</button>
  )
}

MainButton.propTypes = {
    children: PropTypes.node,
    size: PropTypes.string,
}


export default MainButton