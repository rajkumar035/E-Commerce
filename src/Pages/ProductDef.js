import {Stack, Box, Button, Tab, Card, Link, Typography} from '@mui/material';
import React, {useState} from 'react';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useLocation} from 'react-router-dom';

const ProductDef = () => {
  const location = useLocation();
  const navLine = {
    margin: '0px 0px',
    borderColor: 'GrayText',
    opacity: '40%',
  };
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: {
            lg: '2% 8% 2% 8%',
            xl: '3% 10%',
          },
          justifyContent: 'space-between',
        }}>
        <Stack direction='column'>
          <Box gap={'30px'} display={'flex'}>
            <Box>
              <img src={location.state.Logo} alt='Web-Brand' />
            </Box>
            <Box>
              <Typography fontSize='24px' fontWeight='100' margin='7px 2px'>
                {location.state.head}
              </Typography>
              <Typography fontSize='10px' fontWeight='600' margin='7px 2px' sx={{opacity: '70%'}}>
                by <Link>Templatesua</Link>
              </Typography>
              <Typography fontSize='14px' fontWeight='600' margin='20px 2px'>
                $ {location.state.Rate}
              </Typography>
              <Box display={'flex'} margin='4px 2px' gap={'20px'}>
                <Button sx={{textTransform: 'lowercase', fontSize: '100', padding: '8px 24px'}} type='button' disableFocusRipple variant='contained'>
                  Add to cart
                </Button>
                <Button sx={{textTransform: 'lowercase', fontSize: '100', padding: '8px 24px'}} type='button' disableFocusRipple variant='text'>
                  Add to wishlist
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box marginTop='6%'>
              <img src={location.state.MainImg} alt='brand-thumb' />
            </Box>
          </Box>
        </Stack>
        <Stack direction='column'>
          <Card sx={{padding: '0px 40px'}}>
            <Box sx={{padding: '40px 0px'}}>
              <Box display='flex' gap='10px'>
                <Typography fontSize='14px' fontWeight='600'>
                  Compatible:
                </Typography>
                <Typography fontSize='15px'>x {location.state.Version}</Typography>
              </Box>
              <Typography fontSize='15px'>Dont see your version ?</Typography>
              <Link fontSize='15px'>Contact us</Link>
              <Box marginTop='20px'>
                <Box display='flex' gap='10px'>
                  <Typography fontSize='15px' fontWeight='600'>
                    Author:
                  </Typography>
                  <Link fontSize='15px'>templatesua</Link>
                </Box>
                <Box display='flex' gap='10px'>
                  <Typography fontSize='15px' fontWeight='600'>
                    Installations:
                  </Typography>
                  <Typography fontSize='15px'>520</Typography>
                </Box>
              </Box>
            </Box>
            <hr style={navLine} />
            <Box sx={{padding: '40px 0px'}}>
              <Link fontSize='15px'>support@x-cart.com</Link>
            </Box>
          </Card>
        </Stack>
      </Box>
      <Box
        sx={{
          typography: 'body1',
          padding: {
            lg: '0% 8%',
            xl: '0% 10%',
          },
        }}>
        <TabContext value={value}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleChange} aria-label='Tab Heads'>
              <Tab label='Description' value='1' />
              <Tab label='Review' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>{location.state.Desc}</TabPanel>
          <TabPanel value='2'>Review</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ProductDef;
