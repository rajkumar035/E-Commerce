import {
  Box,
  Link,
  Stack,
  Typography,
  FormControl,
  Input,
  InputAdornment,
} from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';

export const ProductsSHow = () => {
  const links = {
    textDecoration: 'none',
    borderBottom: '1px dotted #bdbdbd',
    color: '#bdbdbd',
  };
  return (
    <>
      <Box
        sx={{
          padding: {
            sm: '12% 3% 1% 3%',
            md: '8% 3% 1% 3%',
            lg: '6% 18% 1% 18%',
            xl: '4.5% 18% 1% 18%',
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
        <Stack
          spacing={1}
          direction='row'
          alignItems='center'
          paddingTop='min(1%)'>
          <Typography color='GrayText'>Popular:</Typography>
          <Link style={links} href='#'>
            checkout
          </Link>
          <Link style={links} href='#'>
            orders
          </Link>
          <Link style={links} href='#'>
            marketing
          </Link>
          <Link style={links} href='#'>
            seo
          </Link>
        </Stack>
      </Box>
    </>
  );
};
