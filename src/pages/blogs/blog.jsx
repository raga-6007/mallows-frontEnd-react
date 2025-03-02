import PropTypes from 'prop-types';
// material-ui
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListBlog from '../blogs/list';

// project import
import MainCard from 'components/MainCard';

function Blogs({ bgcolor, title, data, dark, main }) {
    return (
      <Card sx={{ '&.MuiPaper-root': { borderRadius: '0px' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2.5,
            bgcolor,
            color: dark ? 'grey.800' : '#ffffff',
            border: main ? '1px dashed' : '1px solid transparent'
          }}
        >
          {title && (
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item>
                {data && (
                  <Stack spacing={0.75} alignItems="center">
                    <Typography variant="subtitle2">{data.label}</Typography>
                    <Typography variant="subtitle1">{data.color}</Typography>
                  </Stack>
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="inherit">
                  {title}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Card>
    );
  }
  
  // ===============================|| COMPONENT - COLOR ||=============================== //
  
  export default function ComponentColor() {
    return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <ListBlog/>
          </Grid>
           
        </Grid>
    );
  }
  
  Blogs.propTypes = {
    bgcolor: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object,
    dark: PropTypes.bool,
    main: PropTypes.bool
  };
  

