import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
}))

function Spinner () {
  const classes = useStyles()
  return (
    <div className={classes.spinner}>
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}

export default Spinner
