import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ideaService from '../../services/ideaService';

interface Idea {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'video' | 'social';
  keywords: string[];
  createdAt: string;
  isSaved: boolean;
}

interface IdeaState {
  ideas: Idea[];
  savedIdeas: Idea[];
  currentIdea: Idea | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IdeaState = {
  ideas: [],
  savedIdeas: [],
  currentIdea: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const generateIdeas = createAsyncThunk(
  'ideas/generate',
  async ({ prompt, type, count }: { prompt: string; type: 'blog' | 'video' | 'social'; count: number }, thunkAPI) => {
    try {
      // This is a placeholder, will be implemented with actual API integration
      return await ideaService.generateIdeas(prompt, type, count);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to generate ideas');
    }
  }
);

export const saveIdea = createAsyncThunk(
  'ideas/save',
  async (idea: Idea, thunkAPI) => {
    try {
      // This is a placeholder, will be implemented with actual API integration
      return await ideaService.saveIdea(idea);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to save idea');
    }
  }
);

export const fetchSavedIdeas = createAsyncThunk(
  'ideas/fetchSaved',
  async (_, thunkAPI) => {
    try {
      // This is a placeholder, will be implemented with actual API integration
      return await ideaService.getSavedIdeas();
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch saved ideas');
    }
  }
);

const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    clearCurrentIdea: (state) => {
      state.currentIdea = null;
    },
    setCurrentIdea: (state, action: PayloadAction<Idea>) => {
      state.currentIdea = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate ideas cases
      .addCase(generateIdeas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateIdeas.fulfilled, (state, action: PayloadAction<Idea[]>) => {
        state.isLoading = false;
        state.ideas = action.payload;
      })
      .addCase(generateIdeas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Save idea cases
      .addCase(saveIdea.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveIdea.fulfilled, (state, action: PayloadAction<Idea>) => {
        state.isLoading = false;
        const savedIdea = action.payload;
        
        // Update the idea in the ideas array to mark it as saved
        state.ideas = state.ideas.map(idea =>
          idea.id === savedIdea.id ? { ...idea, isSaved: true } : idea
        );
        
        // Add to saved ideas if not already there
        if (!state.savedIdeas.some(idea => idea.id === savedIdea.id)) {
          state.savedIdeas.push(savedIdea);
        }
      })
      .addCase(saveIdea.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch saved ideas cases
      .addCase(fetchSavedIdeas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedIdeas.fulfilled, (state, action: PayloadAction<Idea[]>) => {
        state.isLoading = false;
        state.savedIdeas = action.payload;
      })
      .addCase(fetchSavedIdeas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentIdea, setCurrentIdea, clearError } = ideaSlice.actions;

export default ideaSlice.reducer;
