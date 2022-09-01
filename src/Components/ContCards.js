import {Card, CardMedia, CardContent, Typography} from '@mui/material';

const ContCards = ({Thumbnail, Heading, Price, PathLink}) => {
  return (
    <>
      <Card
        sx={{
          width: '250px',
          cursor: 'pointer',
        }}>
        <CardMedia src={Thumbnail} alt='Profile-cont' component='img' height='150px' />
        <CardContent>
          <Typography color='rgba(0, 0, 0, 0.6)' fontSize="15px" margin='5px'>
            <b>{Heading}</b>
          </Typography>
          <Typography color='rgba(0, 0, 0, 0.9)' fontSize="12px" margin='0px' marginLeft='5px'>
            <b>{Price}</b>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ContCards;
