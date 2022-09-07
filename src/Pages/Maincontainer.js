import {Grid, Link, Stack, Typography} from '@mui/material';
import ContCards from '../Components/ContCards';
import {useNavigate} from 'react-router-dom';
import {Data} from '../Data';

const Maincontainer = ({data, Versionfilter, Categoryfilter}) => {
  const navigate = useNavigate();
  const Paths = {
    color: 'rgba(0, 0, 0, 0.9)',
    margin: '5% 0%',
    cursor: 'pointer',
    fontSize: '88%',
    background: '#FFF',
    border: '0px 0px 0px 0px',
    borderColor: '#fff',
    borderStyle: 'none',
  };
  const navLine = {
    margin: '2px 0px',
    borderColor: 'GrayText',
  };
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          padding: {
            sm: '3%',
            md: '3%',
            lg: '2% 16%',
            xl: '3% 18%',
          },
        }}>
        <Grid item xl={2}>
          <Stack direction='column'>
            <Typography fontWeight='600' fontSize='100%' margin='10px 0px' color='rgba(0, 0, 0, 0.8)'>
              Compatible
            </Typography>
            {Data.Compatible.map((compatitem) => (
              <input type="text" style={Paths} value={compatitem} onClick={Versionfilter} readOnly/>
            ))}
            <hr style={navLine} />
            <Typography fontWeight='600' fontSize='100%' margin='10px 0px' color='rgba(0, 0, 0, 0.8)'>
              Categories
            </Typography>
            {Data.Categories.map((items) => (
              <input type='text' value={items} style={Paths} onClick={Categoryfilter} readOnly />
            ))}
          </Stack>
        </Grid>
        <Grid item xl={10}>
          <Stack direction='column'>
            <Typography variant='h4' fontWeight='400' color='rgba(0, 0, 0, 0.8)'>
              Swift, Responsive Ecommerce Graphic Themes
            </Typography>
            <Typography variant='body2' color='rgba(0, 0, 0, 0.8)' margin='15px 0px 30px 0px' lineHeight='30px'>
              You have over 45 eCommerce site designs to choose from. All eCommerce website themes are 100% mobile-friendly, fully customizable, affordable, and 100% open source. Use the dropdowns below to find the perfect theme for your online store.
            </Typography>
            <Grid container gap={2} justifyContent='center'>
              {data.map((items, key) => (
                <Link
                  sx={{textDecoration: 'none'}}
                  onClick={() => {
                    navigate('/Products', {
                      state: {
                        head: items.head,
                        Desc: items.Description,
                        Rate: items.price,
                        MainImg: items.MainImg,
                        Logo: items.LogoImg,
                        Version: items.versions,
                        Customer: items.Customers,
                      },
                    });
                  }}>
                  <Grid item xl={4}>
                    <ContCards Thumbnail={items.img} Heading={items.head} Price={items.price} PathLink={items.Link} />
                  </Grid>
                </Link>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Maincontainer;
