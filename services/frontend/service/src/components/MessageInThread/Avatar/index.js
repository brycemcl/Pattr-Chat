import { default as MaterialAvatar } from '@material-ui/core/Avatar' // eslint-disable-line import/no-named-default
import initialsFromName from './initialsFromName'

/* avatar component - takes in props from the message thread parent - sets the name and src props to default values if they are not passed
 * initials are created for a users avatar with initialsFromName helper function
 * we then call the MaterialAvatar child component, passing in our initials as props down to it */
const Avatar = ({ name = '', scr = null }) => {
  const initials = initialsFromName(name)
  return (
    <>
      <MaterialAvatar alt={name} src={scr}>
        {initials}
      </MaterialAvatar>
    </>
  )
}

export default Avatar
