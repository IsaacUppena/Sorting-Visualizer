import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  arrayBars: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  arrayContainer: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  normalBar: {
    backgroundColor: theme.palette.bars.main,
    alignSelf: 'flex-end',
    width: '5px',
    margin: 0,
  },
  compBar: {
    backgroundColor: theme.palette.secondary.main,
    alignSelf: 'flex-end',
    width: '5px',
    margin: 0,
  },
}));
