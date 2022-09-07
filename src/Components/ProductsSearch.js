import React from 'react';
import {Box, FormControl, Input, InputAdornment} from '@mui/material';
import {AiOutlineSearch} from 'react-icons/ai';

const ProductsSearch = ({Searchfunc}) => {
  return (
    <>
      <Box
        sx={{
          padding: {
            sm: '12% 3% 2% 3%',
            md: '8% 3% 2% 3%',
            lg: '6% 18% 2% 18%',
            xl: '6% 18% 2% 18%',
          },
        }}
        bgcolor='#212121'>
        <FormControl
          fullWidth
          sx={{
            color: '#fff',
            bgcolor: '#fff',
            borderRadius: '8px',
          }}>
          <Input
            onChange={Searchfunc}
            sx={{
              height: '50px',
              padding: '0px 20px',
            }}
            placeholder='Start your search'
            startAdornment={
              <InputAdornment position='start'>
                <AiOutlineSearch />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  );
};

export default ProductsSearch;
