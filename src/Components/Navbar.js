import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Toolbar,
} from '@mui/material';
import { BiShoppingBag } from 'react-icons/bi';

export const Navbar = () => {
  const links = {
    textDecoration: 'none',
  };
  const buttons = {
    textTransform: 'none',
    color: 'white',
    padding: '0rem',
    margin: '0rem 0.6rem',
    width: 'max-content',
    height: 'auto',
  };

  return (
    <>
      <Box>
        <AppBar
          position='fixed'
          sx={{
            padding: {
              lg: '0% 16%',
              xl: '0% 16%',
            },
          }}>
          <Toolbar
            style={{
              justifyContent: 'space-between',
            }}>
            <Stack direction='row'>
              <IconButton size='large'>
                <img
                  src='https://market.x-cart.com/skins/XCartMarketplaceDesign/customer/img/logo-new-white.svg'
                  alt='brand'
                />
              </IconButton>
              <Stack
                direction='row'
                alignItems='center'
                sx={{
                  marginLeft: {
                    md: '2%',
                    lg: '2%',
                    xl: '8%',
                  },
                }}>
                <Button
                  variant='text'
                  size='large'
                  style={buttons}
                  sx={{ fontWeight: '900' }}
                  disableRipple>
                  App Store
                </Button>
                |
                <Button
                  variant='text'
                  size='large'
                  style={buttons}
                  disableRipple>
                  Addons
                </Button>
                <Link style={links} href='/Products'>
                  <Button
                    variant='text'
                    size='large'
                    style={buttons}
                    disableRipple>
                    Templates
                  </Button>
                </Link>
                <Button
                  variant='text'
                  size='large'
                  style={buttons}
                  disableRipple>
                  Experts & Services
                </Button>
                <Button
                  variant='text'
                  size='large'
                  style={buttons}
                  disableRipple>
                  SSL Certificates
                </Button>
              </Stack>
            </Stack>
            <IconButton size='medium'>
              <BiShoppingBag color='white' />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
