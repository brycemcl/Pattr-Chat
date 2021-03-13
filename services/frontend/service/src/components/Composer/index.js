// import { useEffect, useState } from 'react'

// helper function to log what the user inputs in the input field to the console
// const currentVal = (event) => {
//   console.log(event.target.value)
// }

// composer component
const Composer = ({ value, setValue }) => {
  // manage our controlled components state here

  /* https://reactjs.org/docs/hooks-reference.html#useref - if there is a button somewhere else
     in our component tree, it would use "inputEl" to access the text stored in this components state */

  // link the reference to this input DOM element to our useRef above
  // return <input ref={inputEl} onChange={currentVal} type='text'></input>;
  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      type='text'
    />
  )
}

export default Composer
