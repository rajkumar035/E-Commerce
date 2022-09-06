import React from 'react';
import {Box, Grid, Link, Stack, Typography} from '@mui/material';
import {Data} from '../Data';

const Contacts = () => {
  const links = {
    color: '#FFFFFF',
    textdecoration: 'none',
    fontSize: '11px',
    margin: '4px 0px',
    cursor: 'pointer',
    lineHeight: '18px'
  };
  const head = {
    color: '#FFFFFF',
    fontSize: '15px',
    margin: '20px 0px',
    fontWeight: '600',
  };
  const head1 = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '11px',
    margin: '4px 0px',
  };
  return (
    <>
      <Box
        sx={{
          padding: {
            lg: '0% 16%',
            xl: '1.5% 16%',
          },
          background: '#1976D2',
        }}>
        <Grid container spacing={5}>
          <Grid item xl={2.4}>
            <Stack>
              <Typography style={head}>Extras</Typography>
              {Data.Contacts.map((x) => {
                return x.Extras.map((y) => {
                  return <Link style={links}>{y}</Link>;
                });
              })}
            </Stack>
          </Grid>
          <Grid item xl={2.4}>
            <Stack>
              <Typography style={head}>Support</Typography>
              {Data.Contacts.map((x) => {
                return x.Support.map((y) => {
                  return <Link style={links}>{y}</Link>;
                });
              })}
              <Typography style={head}>Compare</Typography>
              {Data.Contacts.map((x) => {
                return x.Compare.map((y) => {
                  return <Link style={links}>{y}</Link>;
                });
              })}
            </Stack>
          </Grid>
          <Grid item xl={2.4}>
            <Stack>
              <Typography style={head}>Resources</Typography>
              {Data.Contacts.map((x) => {
                return x.Resources.map((y) => {
                  return <Link style={links}>{y}</Link>;
                });
              })}
            </Stack>
          </Grid>
          <Grid item xl={2.4}>
            <Stack>
              <Typography style={head}>Latest on Blog</Typography>
              {Data.Contacts.map((x) => {
                return x.LatestonBlog.map((y) => {
                  return (
                    <Stack marginBottom='12px'>
                      <Typography style={head1}>{y.Date}</Typography>
                      <Link style={links}>{y.Question}</Link>
                    </Stack>
                  );
                });
              })}
            </Stack>
          </Grid>
          <Grid item xl={2.4}>
            <Stack>
              <Typography style={head}>X-Cart</Typography>
              {Data.Contacts.map((x) => {
                return x.XCart.map((y) => {
                  return <Link style={links}>{y}</Link>;
                });
              })}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Contacts;
