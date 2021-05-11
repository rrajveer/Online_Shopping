import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
  },
  media: {
    
    height: "100px",
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    // paddingBottom:"20px"
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));