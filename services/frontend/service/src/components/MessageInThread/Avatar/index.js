import { useEffect } from 'react'
import { default as MaterialAvatar } from '@material-ui/core/Avatar' // eslint-disable-line import/no-named-default
import initialsFromName from './initialsFromName'

// helper function to generate a random color for the names
function randomColor () {
  const colors = [
    '#d12154',
    '#6c1da3',
    '#0446b0',
    '#203a63',
    '#11ad65',
    '#6e394c',
    '#570505',
    '#58ab48',
    '#e0951b',
    '#944709',
    '#d94a0d',
    '#33bda6',
    '#0c9ea6',
    '#0c82a6',
    '#b55178',
    '#bf9b08',
    '#4d4fdb',
    '#822e69',
    '#00bf19',
    '#b3b3b3',
    '#637a77',
    '#160066',
    '#201d21'
  ]
  const random = Math.floor(Math.random() * colors.length)
  return colors[random]
}

/* avatar component - takes in props from the message thread parent - sets the name and src props to default values if they are not passed
 * initials are created for a users avatar with initialsFromName helper function
 * we then call the MaterialAvatar child component, passing in our initials as props down to it */
const Avatar = ({ name = '', scr = null, avatarColor, setAvatarColor }) => {
  // helper function to set a random color on an avatar
  const color = (name) => {
    if (avatarColor[name]) {
      return avatarColor[name]
    } else {
      return randomColor()
    }
  }

  const userColor = color(name)

  useEffect(() => {
    if (!avatarColor[name]) {
      setAvatarColor((cs) => {
        return { ...cs, [name]: userColor }
      })
    }
  })

  const initials = initialsFromName(name)
  return (
    <>
      <MaterialAvatar
        alt={name}
        style={{
          backgroundColor: userColor
        }}
        src={scr}
      >
        {initials}
      </MaterialAvatar>
    </>
  )
}

export default Avatar
