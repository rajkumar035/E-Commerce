import { Card, CardMedia, CardContent, Typography, Link } from '@mui/material';

const ContCards = ({ Thumbnail, Heading, Price, PathLink }) => {
  const links = {
    textDecoration: 'none',
  };

  return (
    <>
      <Card
        sx={{
          width: '300px',
        }}>
        <Link style={links} href='/Products'>
          <CardMedia
            src={Thumbnail}
            alt='Profile-cont'
            component='img'
            height='180px'
          />
          <CardContent>
            <Typography
              color='rgba(0, 0, 0, 0.6)'
              fontSize='medium'
              margin='5px'>
              <b>{Heading}</b>
            </Typography>
            <Typography
              color='rgba(0, 0, 0, 0.9)'
              fontSize='small'
              margin='0px'
              marginLeft='5px'>
              <b>{Price}</b>
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default ContCards;
