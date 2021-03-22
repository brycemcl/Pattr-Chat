import { default as MaterialAvatar } from '@material-ui/core/Avatar' // eslint-disable-line import/no-named-default
import initialsFromName from './initialsFromName'

// helper function to generate a random color for the names
function randomColor () {
  const hex = Math.floor(Math.random() * 0xFFFFFF)
  const color = '#' + hex.toString(16)

  return color
}

/* avatar component - takes in props from the message thread parent - sets the name and src props to default values if they are not passed
 * initials are created for a users avatar with initialsFromName helper function
 * we then call the MaterialAvatar child component, passing in our initials as props down to it */
const Avatar = ({ name = '', scr = null, avatarColor, setAvatarColor }) => {
  // helper function
  const color = (name) => {
    if (avatarColor[name]) {
      return avatarColor[name]
    } else {
      const color = randomColor()
      setAvatarColor((cs) => {
        return { ...cs, [name]: color }
      })

      return randomColor
    }
  }

  const initials = initialsFromName(name)
  return (
    <>
      <MaterialAvatar
        alt={name}
        style={{
          backgroundColor: color(name)
        }}
        src={scr}
      >
        {initials}
      </MaterialAvatar>
    </>
  )
}

export default Avatar
