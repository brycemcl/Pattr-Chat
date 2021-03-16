import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FaceIcon from '@material-ui/icons/Face'
import AssessmentIcon from '@material-ui/icons/Assessment'
import {
  showUsersInCompany,
  showChannelsInCompany
} from '../../helpers/selectors'

const drawerWidth = 240

// style this component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '80px',
    marginLeft: '16px'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

const Sidebar = ({ conversations }) => {
  // usestate in this component that will keep track of the menu option in the left hand panel which is clicked on
  const [, setClickedSidebarOption] = useState(null)

  const classes = useStyles()

  // call showUsersInCompany & showChannelsInCompany helper functions to get users and channels in company
  const usersInCompany = showUsersInCompany()
  const channelsInCompany = showChannelsInCompany()

  // return the component to render the sidebar & when a sidebar option is clicked, update the current state to record the last
  // clicked button
  return (
    <>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <List>
          {channelsInCompany.map(({ name, channelId }) => (
            <ListItem
              button
              key={name}
              onClick={() => setClickedSidebarOption(channelId)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {usersInCompany.map(({ name }) => (
            <ListItem button key={name}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
