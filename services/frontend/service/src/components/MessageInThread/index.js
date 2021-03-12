import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})
const MessageInThead = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt,
        fugiat? Quo quaerat illum sit omnis dolor? Quo alias maxime repellendus!
      </div>
    </Card>
  )
}

export default MessageInThead
