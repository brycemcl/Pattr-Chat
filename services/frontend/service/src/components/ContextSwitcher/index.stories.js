import ContextSwitcher from '.'

import AppContext from '../AppContext'
import { makeStyles } from '@material-ui/core/styles'

const story = {
  title: 'ContextSwitcher',
  component: ContextSwitcher
}

const useStyles = makeStyles(() => ({
  root: {
    width: '150px',
    height: '500px'
  }
}))

const ContextSwitcherView = () => {
  const classes = useStyles()
  return (
    <AppContext>
      <div className={classes.root}>
        <ContextSwitcher />
      </div>
    </AppContext>
  )
}
export default story
export { ContextSwitcherView }
