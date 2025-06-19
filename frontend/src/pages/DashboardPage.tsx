import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import { RootState } from '../redux/store';
import { fetchSavedIdeas } from '../redux/slices/ideaSlice';

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { savedIdeas, isLoading } = useSelector((state: RootState) => state.ideas);
  
  const [tabValue, setTabValue] = React.useState(0);
  
  useEffect(() => {
    dispatch(fetchSavedIdeas());
  }, [dispatch]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const filterIdeasByType = (type: 'blog' | 'video' | 'social') => {
    return savedIdeas.filter(idea => idea.type === type);
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back, {user?.name}! Manage your content ideas here.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {/* Left sidebar */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Stats
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Saved Ideas
                </Typography>
                <Typography variant="h4">
                  {savedIdeas.length}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Blog Ideas
                </Typography>
                <Typography variant="h4">
                  {filterIdeasByType('blog').length}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Video Ideas
                </Typography>
                <Typography variant="h4">
                  {filterIdeasByType('video').length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Social Media Ideas
                </Typography>
                <Typography variant="h4">
                  {filterIdeasByType('social').length}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to="/generator"
                startIcon={<AutoAwesomeIcon />}
              >
                Generate New Ideas
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Main content */}
        <Grid item xs={12} md={9}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="idea types"
                variant="fullWidth"
              >
                <Tab label="All Ideas" />
                <Tab label="Blog" />
                <Tab label="Video" />
                <Tab label="Social Media" />
              </Tabs>
            </Box>
            
            <Box sx={{ p: 3 }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {/* All Ideas */}
                  {tabValue === 0 && (
                    <>
                      {savedIdeas.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            You haven't saved any ideas yet.
                          </Typography>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="/generator"
                            sx={{ mt: 2 }}
                            startIcon={<AutoAwesomeIcon />}
                          >
                            Generate Ideas
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {savedIdeas.map((idea) => (
                            <Grid item xs={12} key={idea.id}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6" gutterBottom>
                                      {idea.title}
                                    </Typography>
                                    <Chip 
                                      label={idea.type.charAt(0).toUpperCase() + idea.type.slice(1)} 
                                      color="primary" 
                                      size="small" 
                                    />
                                  </Box>
                                  
                                  <Divider sx={{ my: 1.5 }} />
                                  
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                  </Typography>
                                  
                                  <Typography variant="body1" sx={{ mt: 1 }}>
                                    {idea.content}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {idea.keywords.map((keyword, index) => (
                                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                                    ))}
                                  </Box>
                                </CardContent>
                                
                                <CardActions>
                                  <Button size="small" startIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                  <Button size="small" color="error" startIcon={<DeleteOutlineIcon />}>
                                    Delete
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                  
                  {/* Blog Ideas */}
                  {tabValue === 1 && (
                    <>
                      {filterIdeasByType('blog').length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            You haven't saved any blog ideas yet.
                          </Typography>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="/generator"
                            sx={{ mt: 2 }}
                          >
                            Generate Blog Ideas
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {filterIdeasByType('blog').map((idea) => (
                            <Grid item xs={12} key={idea.id}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    {idea.title}
                                  </Typography>
                                  
                                  <Divider sx={{ my: 1.5 }} />
                                  
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                  </Typography>
                                  
                                  <Typography variant="body1" sx={{ mt: 1 }}>
                                    {idea.content}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {idea.keywords.map((keyword, index) => (
                                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                                    ))}
                                  </Box>
                                </CardContent>
                                
                                <CardActions>
                                  <Button size="small" startIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                  <Button size="small" color="error" startIcon={<DeleteOutlineIcon />}>
                                    Delete
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                  
                  {/* Video Ideas */}
                  {tabValue === 2 && (
                    <>
                      {filterIdeasByType('video').length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            You haven't saved any video ideas yet.
                          </Typography>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="/generator"
                            sx={{ mt: 2 }}
                          >
                            Generate Video Ideas
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {filterIdeasByType('video').map((idea) => (
                            <Grid item xs={12} key={idea.id}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    {idea.title}
                                  </Typography>
                                  
                                  <Divider sx={{ my: 1.5 }} />
                                  
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                  </Typography>
                                  
                                  <Typography variant="body1" sx={{ mt: 1 }}>
                                    {idea.content}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {idea.keywords.map((keyword, index) => (
                                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                                    ))}
                                  </Box>
                                </CardContent>
                                
                                <CardActions>
                                  <Button size="small" startIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                  <Button size="small" color="error" startIcon={<DeleteOutlineIcon />}>
                                    Delete
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                  
                  {/* Social Media Ideas */}
                  {tabValue === 3 && (
                    <>
                      {filterIdeasByType('social').length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            You haven't saved any social media ideas yet.
                          </Typography>
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="/generator"
                            sx={{ mt: 2 }}
                          >
                            Generate Social Media Ideas
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {filterIdeasByType('social').map((idea) => (
                            <Grid item xs={12} key={idea.id}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    {idea.title}
                                  </Typography>
                                  
                                  <Divider sx={{ my: 1.5 }} />
                                  
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(idea.createdAt).toLocaleDateString()}
                                  </Typography>
                                  
                                  <Typography variant="body1" sx={{ mt: 1 }}>
                                    {idea.content}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {idea.keywords.map((keyword, index) => (
                                      <Chip key={index} label={keyword} size="small" variant="outlined" />
                                    ))}
                                  </Box>
                                </CardContent>
                                
                                <CardActions>
                                  <Button size="small" startIcon={<EditIcon />}>
                                    Edit
                                  </Button>
                                  <Button size="small" color="error" startIcon={<DeleteOutlineIcon />}>
                                    Delete
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
