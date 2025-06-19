const Idea = require('../models/Idea');
const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// @desc    Generate content ideas
// @route   POST /api/ideas/generate
// @access  Public (rate limited for free users)
exports.generateIdeas = async (req, res, next) => {
  try {
    const { prompt, type, count = 3 } = req.body;

    if (!prompt || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a prompt and content type'
      });
    }

    // Validate content type
    if (!['blog', 'video', 'social'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Content type must be blog, video, or social'
      });
    }

    // Construct prompt based on content type
    let systemPrompt = '';
    
    switch (type) {
      case 'blog':
        systemPrompt = `Generate ${count} unique blog post ideas about "${prompt}". For each idea, provide a compelling title and a brief description that includes potential key points to cover. Also suggest 3-5 relevant keywords for SEO.`;
        break;
      case 'video':
        systemPrompt = `Generate ${count} engaging video content ideas about "${prompt}". For each idea, provide an attention-grabbing title and a brief description of what the video would cover. Include potential talking points and visual elements. Also suggest 3-5 relevant keywords for discoverability.`;
        break;
      case 'social':
        systemPrompt = `Generate ${count} social media content ideas about "${prompt}". For each idea, provide a catchy caption/headline and a brief description of the content. Specify which platform(s) it would work best on (Instagram, Twitter, LinkedIn, TikTok, etc.). Also suggest 3-5 relevant hashtags.`;
        break;
    }

    // In a real implementation, this would call the OpenAI API
    // For now, we'll mock the response
    
    // Mock response for demonstration
    const mockIdeas = [];
    
    for (let i = 0; i < count; i++) {
      let title, content, keywords;
      
      switch (type) {
        case 'blog':
          title = `${i+1}. How ${prompt} is Changing the Industry in 2025`;
          content = `This blog post will explore the revolutionary ways that ${prompt} is transforming industry standards and practices. Cover the latest innovations, expert insights, and future predictions.`;
          keywords = ['innovation', prompt.toLowerCase(), 'industry trends', '2025 forecast'];
          break;
        case 'video':
          title = `${i+1}. 5 Minutes to Understand ${prompt}: A Visual Guide`;
          content = `Create a concise, visually engaging explanation of ${prompt} that anyone can understand in just 5 minutes. Use animations, real-world examples, and expert interviews.`;
          keywords = ['explainer video', prompt.toLowerCase(), 'visual guide', 'beginner friendly'];
          break;
        case 'social':
          title = `${i+1}. Did you know these 3 facts about ${prompt}? #MindBlown`;
          content = `Short-form carousel post revealing surprising facts about ${prompt} that most people don't know. Perfect for Instagram and LinkedIn. Include eye-catching graphics and a call to action.`;
          keywords = [prompt.toLowerCase(), 'facts', 'didyouknow', 'mindblown'];
          break;
      }
      
      mockIdeas.push({
        id: `idea-${Date.now()}-${i}`,
        title,
        content,
        type,
        keywords,
        createdAt: new Date().toISOString(),
        isSaved: false
      });
    }

    res.status(200).json({
      success: true,
      count: mockIdeas.length,
      data: mockIdeas
    });
  } catch (error) {
    console.error('Generate ideas error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating ideas',
      error: error.message
    });
  }
};

// @desc    Save an idea
// @route   POST /api/ideas
// @access  Private
exports.saveIdea = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    const idea = await Idea.create(req.body);
    
    res.status(201).json({
      success: true,
      data: idea
    });
  } catch (error) {
    console.error('Save idea error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving idea',
      error: error.message
    });
  }
};

// @desc    Get all ideas for a user
// @route   GET /api/ideas
// @access  Private
exports.getIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: ideas.length,
      data: ideas
    });
  } catch (error) {
    console.error('Get ideas error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving ideas',
      error: error.message
    });
  }
};

// @desc    Get single idea
// @route   GET /api/ideas/:id
// @access  Private
exports.getIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }
    
    // Make sure user owns the idea
    if (idea.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this idea'
      });
    }
    
    res.status(200).json({
      success: true,
      data: idea
    });
  } catch (error) {
    console.error('Get idea error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving idea',
      error: error.message
    });
  }
};

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private
exports.updateIdea = async (req, res, next) => {
  try {
    let idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }
    
    // Make sure user owns the idea
    if (idea.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this idea'
      });
    }
    
    idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: idea
    });
  } catch (error) {
    console.error('Update idea error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating idea',
      error: error.message
    });
  }
};

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private
exports.deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }
    
    // Make sure user owns the idea
    if (idea.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this idea'
      });
    }
    
    await idea.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete idea error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting idea',
      error: error.message
    });
  }
};
