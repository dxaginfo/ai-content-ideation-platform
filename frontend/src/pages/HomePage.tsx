import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          borderRadius: 2,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            Generate Content Ideas with AI
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Unleash your creativity with our AI-powered content idea generator.
            Perfect for bloggers, video creators, and social media managers.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button 
                  component={RouterLink} 
                  to="/generator" 
                  variant="contained" 
                  size="large"
                  startIcon={<AutoAwesomeIcon />}
                >
                  Generate Ideas
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  component={RouterLink} 
                  to="/register" 
                  variant="outlined" 
                  size="large"
                >
                  Sign Up Free
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <AutoAwesomeIcon fontSize="large" color="primary" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  AI-Powered Ideas
                </Typography>
                <Typography align="center">
                  Generate fresh content ideas for blogs, videos, and social media posts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <TrendingUpIcon fontSize="large" color="primary" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  Trend Analysis
                </Typography>
                <Typography align="center">
                  Discover trending topics relevant to your niche and audience.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <SearchIcon fontSize="large" color="primary" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  Keyword Optimization
                </Typography>
                <Typography align="center">
                  Get SEO-friendly content suggestions to boost your visibility.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CalendarTodayIcon fontSize="large" color="primary" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  Content Calendar
                </Typography>
                <Typography align="center">
                  Organize and schedule your content ideas for consistent publishing.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          borderRadius: 2,
          mt: 4,
          mb: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Ready to Create Amazing Content?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
            Start generating ideas in seconds. No credit card required.
          </Typography>
          <Button
            component={RouterLink}
            to="/generator"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Try It Now - It's Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
