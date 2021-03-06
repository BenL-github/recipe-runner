import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Hero(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'rgb(0,0,0,0.5)',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography>
              Made by:&nbsp;
              <Link variant="h6" href="https://github.com/BenL-github" color="inherit">
                {post.author}
              </Link>
            </Typography>
            <Typography >
              with help from:&nbsp;
              <Link variant="subtitle1" href="https://github.com/teejayjan" color="inherit">
                {post.author2}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}