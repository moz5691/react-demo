import React, {
  useState,
  useEffect
} from 'react';
import useFetch from 'use-http';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
    maxWidth: 360,
  },
  media: {
    height: 140,
  },
}));


const SelectSwitch1 = () => {

  const classes = useStyles();
  const [term, setTerm] = useState('');
  const [switch1, setSwitch1] = useState(null);

  const {
    get,
    post,
    response,
    loading,
    error
  } = useFetch('http://localhost:3333');

  async function findSwitch() {
    const foundSwitch = await get(`/switches/?name=${term}`)
    if (response.ok) {
      setSwitch1(foundSwitch)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    findSwitch();
    setTerm('');
  }

  return (<div style={{ margin: "20px" }} >


    <form className={classes.root}
      noValidate autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h3> Enter name of switch </h3>
      <Input placeholder="Name of network"
        inputProps={{ 'aria-label': 'description' }}
        value={term}
        onChange={
          (e) => setTerm(e.target.value)
        }
      />
    </form>

    <div> {
      switch1 ?
        <>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={switch1[0].imagePath}
                title="switch image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {switch1[0].name}
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  Description: {switch1[0].description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Port Type: {switch1[0].portType}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Enabled: {switch1[0].enabled ? 'True' : 'False'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Link: {switch1[0].link}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                More Detail
              </Button>
              <Button size="small" color="primary">
                Update
            </Button>
            </CardActions>
          </Card> </> : null



    } </div>

  </div>

  )
}

export default SelectSwitch1;