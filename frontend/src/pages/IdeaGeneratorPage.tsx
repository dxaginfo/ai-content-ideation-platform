import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { RootState } from '../redux/store';
import { generateIdeas, saveIdea } from '../redux/slices/ideaSlice';
import { showNotification } from '../redux/slices/uiSlice';

const IdeaGeneratorPage: React.FC = () => {
  const dispatch = useDispatch();
  const { ideas, isLoading, error } = useSelector((state: RootState) => state.ideas);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState<'blog' | 'video' | 'social'>('blog');
  const [count, setCount] = useState<number>(3);
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  
  const handleTypeChange = (e: SelectChangeEvent) => {
    setContentType(e.target.value as 'blog' | 'video' | 'social');
  };
  
  const handleCountChange = (e: SelectChangeEvent) => {
    setCount(Number(e.target.value));
  };
  
  const handleGenerateIdeas = () => {
    if (!prompt.trim()) {
      dispatch(showNotification({
        message: 'Please enter a topic to generate ideas',
        type: 'error'
      }));
      return;
    }
    
    dispatch(generateIdeas({ prompt, type: contentType, count }));
  };
  
  const handleSaveIdea = (idea: any) => {
    if (!isAuthenticated) {
      dispatch(showNotification({
        message: 'Please log in to save ideas',
        type: 'info'
      }));
      return;
    }
    
    dispatch(saveIdea(idea));
    dispatch(showNotification({
      message: 'Idea saved successfully!',
      type: 'success'
    }));
  };
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ my: 4 }}>
        AI Content Idea Generator
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="What would you like to create content about?"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="E.g., sustainable fashion, productivity tips, travel destinations"
                variant="outlined"
                helperText="Enter a topic, niche, or specific subject to generate ideas around"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Content Type</InputLabel>
                <Select
                  value={contentType}
                  label="Content Type"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="blog">Blog Post</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="social">Social Media</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Number of Ideas</InputLabel>
                <Select
                  value={count.toString()}
                  label="Number of Ideas"
                  onChange={handleCountChange}
                >
                  <MenuItem value="1">1 idea</MenuItem>
                  <MenuItem value="3">3 ideas</MenuItem>
                  <MenuItem value="5">5 ideas</MenuItem>
                  <MenuItem value="10">10 ideas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerateIdeas}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
          >
            {isLoading ? 'Generating...' : 'Generate Ideas'}
          </Button>
        </CardActions>
      </Card>
      
      {error && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Box>
      )}
      
      {ideas.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
            Generated Ideas
          </Typography>
          
          <Grid container spacing={3}>
            {ideas.map((idea) => (
              <Grid item xs={12} key={idea.id}>
                <Card sx={{ height: '100%' }}>
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
                    
                    <Typography variant="body1" paragraph>
                      {idea.content}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {idea.keywords.map((keyword, index) => (
                        <Chip key={index} label={keyword} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button
                      size="small"
                      onClick={() => handleSaveIdea(idea)}
                      startIcon={idea.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      color={idea.isSaved ? 'secondary' : 'primary'}
                    >
                      {idea.isSaved ? 'Saved' : 'Save Idea'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default IdeaGeneratorPage;
