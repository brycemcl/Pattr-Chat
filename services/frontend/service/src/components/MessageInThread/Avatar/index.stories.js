// import { action } from '@storybook/addon-actions';
import Avatar from '.'

/* declare our story object, first key is the string we want to tag our story with
 * second key is the 'Avatar' component we imported from our project for storybook to watch out for it */
const story = {
  title: 'Avatar',
  component: Avatar
}

// functions declare in storybook to render our avatar with: an image, initials, initials with 1 name & initials with 3 names
const Image = () => (
  <Avatar name='Sally Smith' scr='https://i.imgur.com/V2aIZmk.jpg' />
)
const Initials = () => <Avatar name='Amos Burton' />
const InitialsOneName = () => <Avatar name='Bob' />
const InitialsThreeNames = () => <Avatar name='Bob Runs Wild' />

export default story
export { Image, Initials, InitialsOneName, InitialsThreeNames }
