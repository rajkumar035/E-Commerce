import {Box, Grid, Link, Stack, Typography} from '@mui/material';
import {Data} from '../Data';
import ContCards from './ContCards';
// import {useNavigate} from 'react-router-dom';

export const Maincontainer = () => {
  // const navigate = useNavigate();
  const Paths = {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.8)',
    margin: '6px 0px',
    cursor: 'pointer',
  };
  const navLine = {
    margin: '2px 0px',
    borderColor: 'GrayText',
  };

  // const handlesort = (e) => {
  //   var filteredvals = parseInt(e.target.value);
  //   console.log(filteredvals);
  //   var position = filterarr.indexOf(filteredvals);

  //   if (e.target.checked) {
  //     filterarr.splice(position, 1);
  //     console.log(filterarr);
  //   } else {
  //     if (!filterarr.includes(filteredvals)) {
  //       filterarr.push(parseInt(e.target.value));
  //       console.log(filterarr);
  //     }
  //   }
  // };

  return (
    <>
      <Box
        gap='60px'
        sx={{
          display: 'flex',
          padding: {
            lg: '2% 16%',
            xl: '3% 18%',
          },
        }}>
        <Stack direction='column'>
          {Data.Free$Paid.map((freeitems) => (
            <Link style={Paths}>{freeitems}</Link>
          ))}
          <hr
            style={navLine}
          />
          <Typography fontWeight='600' margin='8px 2px 14px 2px' color='rgba(0, 0, 0, 0.8)'>
            Compatible
          </Typography>
          {Data.Compatible.map((compatitem) => (
            <Link style={Paths}>{compatitem}</Link>
          ))}
          <hr
            style={navLine}
          />
          <Typography fontWeight='600' margin='8px 2px 14px 2px' color='rgba(0, 0, 0, 0.8)'>
            Categories
          </Typography>
          {Data.Categories.map((items) => (
            <Link style={Paths}>{items}</Link>
          ))}
        </Stack>

        <Stack direction='column'>
          <Typography variant='h4' fontWeight='400' color='rgba(0, 0, 0, 0.8)'>
            Swift, Responsive Ecommerce Graphic Themes
          </Typography>
          <Typography variant='body2' color='rgba(0, 0, 0, 0.8)' margin='15px 0px 30px 0px' lineHeight='30px'>
            You have over 45 eCommerce site designs to choose from. All eCommerce website themes are 100% mobile-friendly, fully customizable, affordable, and 100% open source. Use the dropdowns below to find the perfect theme for your online store.
          </Typography>
          <Grid gap={6} display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center'>
            {Data.Contents.map((items, key) => (
              // <Link
              //   onClick={() => {
              //     navigate('/Products', {
              //       state: {
              //         Img: items.img,
              //         head: items.head,
              //       },
              //     });
              //   }}>
                <ContCards Thumbnail={items.img} Heading={items.head} Price={items.price} PathLink={items.Link} />
              // </Link>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
};
