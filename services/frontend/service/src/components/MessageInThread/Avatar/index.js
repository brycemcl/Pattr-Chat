import { useEffect } from 'react'
import { default as MaterialAvatar } from '@material-ui/core/Avatar' // eslint-disable-line import/no-named-default
import initialsFromName from './initialsFromName'

// helper function to generate a random color for the names
function randomColor () {
  const colors = [
    '#db3b69',
    '#9839db',
    '#1e65d6',
    '#20ba9b',
    '#129659',
    '#732a44',
    '#911489',
    '#348531',
    '#eda413',
    '#ed7411',
    '#d94a0d',
    '#14b58d',
    '#0c9ea6',
    '#0c82a6',
    '#a60c47',
    '#d49f02',
    '#6c4fd1',
    '#c722b1',
    '#10a123'
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
