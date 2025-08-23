const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Database connection - Using Neon PostgreSQL
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Mock data for local development when database is not available
let mockPosts = [];
let useDatabase = true;

// Admin credentials (simple authentication)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'website-admin',
  password: process.env.ADMIN_PASSWORD || 'website-admin'
};

// Simple admin authentication middleware
const adminAuth = (req, res, next) => {
  const { username, password } = req.body;
  
  console.log('Admin auth attempt:', { 
    received: { username, password }, 
    expected: { username: ADMIN_CREDENTIALS.username, password: ADMIN_CREDENTIALS.password },
    body: req.body 
  });
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    console.log('Admin authentication successful');
    req.isAdmin = true;
    next();
  } else {
    console.log('Admin authentication failed');
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Middleware
app.use(helmet());
app.use(cors({
  origin: NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL].filter(Boolean)
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:8080', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database initialization
async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        content TEXT NOT NULL,
        tags TEXT,
        links TEXT,
        featured_image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log('Database initialized successfully');
    
    // Check if we have sample data, if not, insert it
    const checkData = await pool.query('SELECT COUNT(*) FROM posts');
    if (parseInt(checkData.rows[0].count) === 0) {
      console.log('Inserting sample data...');
      await insertSampleData();
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    console.log('Falling back to mock data mode for local development');
    useDatabase = false;
    await initializeMockData();
  }
}

// Insert sample data function
async function insertSampleData() {
  try {
    const samplePosts = [
      {
        title: 'The Significance of Griha Pravesh Puja: Blessing Your New Home',
        subtitle: 'Discover the profound meaning behind the traditional house warming ceremony and how it creates positive energy in your new dwelling according to Vastu principles.',
        content: '<h2>Introduction</h2><p>Griha Pravesh Puja is one of the most important ceremonies in Hindu tradition when moving into a new home. This sacred ritual not only blesses the dwelling but also ensures the removal of negative energies and invites prosperity, peace, and happiness for the family.</p><h3>Why Griha Pravesh Puja?</h3><p>According to Vastu Shastra, every piece of land has its own energy field. When we build a house on it, we need to harmonize these energies with our own. Griha Pravesh Puja helps in:</p><ul><li>Removing negative energies from the land</li><li>Inviting positive vibrations</li><li>Blessing the family with prosperity</li><li>Ensuring peace and harmony</li></ul><h2>The Ritual Process</h2><p>The ceremony involves several steps including purification, invocation of deities, and specific mantras for different areas of the house.</p>',
        tags: 'Griha Pravesh, Vastu, Home Blessing, Puja',
        links: 'https://en.wikipedia.org/wiki/Griha_Pravesh, https://www.vaastu-shastra.com/'
      },
      {
        title: 'Understanding the Sacred Marriage Rituals in Hindu Tradition',
        subtitle: 'Explore the deep spiritual significance of Hindu wedding ceremonies and how each ritual contributes to a blessed and harmonious married life.',
        content: '<h2>The Sacred Union</h2><p>Hindu marriage is not just a union of two individuals but a sacred bond that connects two souls and families. Each ritual in a Hindu wedding has profound spiritual significance that goes beyond the physical ceremony.</p><h3>Key Rituals</h3><ul><li><strong>Kanyadaan:</strong> The giving away of the bride</li><li><strong>Saptapadi:</strong> Seven sacred steps around the fire</li><li><strong>Mangalsutra:</strong> Sacred thread symbolizing marriage</li><li><strong>Vivah Homa:</strong> Sacred fire ceremony</li></ul><h2>Spiritual Significance</h2><p>These rituals are designed to create a strong spiritual foundation for the couple, ensuring their journey together is blessed and harmonious.</p>',
        tags: 'Marriage, Vivah, Saptapadi, Hindu Wedding, Rituals',
        links: 'https://en.wikipedia.org/wiki/Hindu_wedding, https://www.hinduismtoday.com/'
      },
      {
        title: 'Ganesh Chaturthi: The Festival of New Beginnings',
        subtitle: 'Learn about the importance of Lord Ganesha in Hindu culture and how Ganesh Chaturthi celebrations bring prosperity and remove obstacles.',
        content: '<h2>Lord Ganesha</h2><p>Lord Ganesha, the remover of obstacles and the patron of arts and sciences, holds a special place in Hindu hearts. Ganesh Chaturthi celebrates his birth and is one of the most important festivals in Hindu culture.</p><h3>Festival Celebrations</h3><p>The festival involves:</p><ul><li>Installing Ganesha idols in homes and public places</li><li>Daily prayers and offerings</li><li>Cultural programs and community celebrations</li><li>Immersion ceremony (Visarjan)</li></ul><h2>Benefits of Celebration</h2><p>Celebrating Ganesh Chaturthi brings:</p><ul><li>Removal of obstacles in life</li><li>Success in new ventures</li><li>Wisdom and knowledge</li><li>Family prosperity</li></ul>',
        tags: 'Ganesh, Chaturthi, Festival, Hindu Culture, Lord Ganesha',
        links: 'https://en.wikipedia.org/wiki/Ganesh_Chaturthi, https://www.ganeshchaturthi.com/'
      }
    ];

    for (const post of samplePosts) {
      await pool.query(
        `INSERT INTO posts (title, subtitle, content, tags, links)
         VALUES ($1, $2, $3, $4, $5)`,
        [post.title, post.subtitle, post.content, post.tags, post.links]
      );
    }
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Initialize mock data for local development
async function initializeMockData() {
  mockPosts = [
    {
      id: 1,
      title: 'The Significance of Griha Pravesh Puja: Blessing Your New Home',
      subtitle: 'Discover the profound meaning behind the traditional house warming ceremony and how it creates positive energy in your new dwelling according to Vastu principles.',
      content: '<h2>Introduction</h2><p>Griha Pravesh Puja is one of the most important ceremonies in Hindu tradition when moving into a new home. This sacred ritual not only blesses the dwelling but also ensures the removal of negative energies and invites prosperity, peace, and happiness for the family.</p><h3>Why Griha Pravesh Puja?</h3><p>According to Vastu Shastra, every piece of land has its own energy field. When we build a house on it, we need to harmonize these energies with our own. Griha Pravesh Puja helps in:</p><ul><li>Removing negative energies from the land</li><li>Inviting positive vibrations</li><li>Blessing the family with prosperity</li><li>Ensuring peace and harmony</li></ul><h2>The Ritual Process</h2><p>The ceremony involves several steps including purification, invocation of deities, and specific mantras for different areas of the house.</p>',
      tags: 'Griha Pravesh, Vastu, Home Blessing, Puja',
      links: 'https://en.wikipedia.org/wiki/Griha_Pravesh, https://www.vaastu-shastra.com/',
      featured_image: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Understanding the Sacred Marriage Rituals in Hindu Tradition',
      subtitle: 'Explore the deep spiritual significance of Hindu wedding ceremonies and how each ritual contributes to a blessed and harmonious married life.',
      content: '<h2>The Sacred Union</h2><p>Hindu marriage is not just a union of two individuals but a sacred bond that connects two souls and families. Each ritual in a Hindu wedding has profound spiritual significance that goes beyond the physical ceremony.</p><h3>Key Rituals</h3><ul><li><strong>Kanyadaan:</strong> The giving away of the bride</li><li><strong>Saptapadi:</strong> Seven sacred steps around the fire</li><li><strong>Mangalsutra:</strong> Sacred thread symbolizing marriage</li><li><strong>Vivah Homa:</strong> Sacred fire ceremony</li></ul><h2>Spiritual Significance</h2><p>These rituals are designed to create a strong spiritual foundation for the couple, ensuring their journey together is blessed and harmonious.</p>',
      tags: 'Marriage, Vivah, Saptapadi, Hindu Wedding, Rituals',
      links: 'https://en.wikipedia.org/wiki/Hindu_wedding, https://www.hinduismtoday.com/',
      featured_image: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Ganesh Chaturthi: The Festival of New Beginnings',
      subtitle: 'Learn about the importance of Lord Ganesha in Hindu culture and how Ganesh Chaturthi celebrations bring prosperity and remove obstacles.',
      content: '<h2>Lord Ganesha</h2><p>Lord Ganesha, the remover of obstacles and the patron of arts and sciences, holds a special place in Hindu hearts. Ganesh Chaturthi celebrates his birth and is one of the most important festivals in Hindu culture.</p><h3>Festival Celebrations</h3><p>The festival involves:</p><ul><li>Installing Ganesha idols in homes and public places</li><li>Daily prayers and offerings</li><li>Cultural programs and community celebrations</li><li>Immersion ceremony (Visarjan)</li></ul><h2>Benefits of Celebration</h2><p>Celebrating Ganesh Chaturthi brings:</p><ul><li>Removal of obstacles in life</li><li>Success in new ventures</li><li>Wisdom and knowledge</li><li>Family prosperity</li></ul>',
      tags: 'Ganesh, Chaturthi, Festival, Hindu Culture, Lord Ganesha',
      links: 'https://en.wikipedia.org/wiki/Ganesh_Chaturthi, https://www.ganeshchaturthi.com/',
      featured_image: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  console.log('Mock data initialized successfully');
}

// API Routes

// Admin login endpoint
app.post('/api/admin/login', adminAuth, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin authenticated successfully',
    isAdmin: true
  });
});

// Get all posts (public)
app.get('/api/posts', async (req, res) => {
  try {
    if (useDatabase) {
      const result = await pool.query(
        'SELECT * FROM posts ORDER BY created_at DESC'
      );
      res.json(result.rows);
    } else {
      // Use mock data
      const sortedPosts = mockPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      res.json(sortedPosts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single post (public)
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useDatabase) {
      const result = await pool.query(
        'SELECT * FROM posts WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json(result.rows[0]);
    } else {
      // Use mock data
      const post = mockPosts.find(p => p.id === parseInt(id));
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json(post);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new post (admin only)
app.post('/api/admin/posts', adminAuth, async (req, res) => {
  try {
    console.log('Creating new post with data:', req.body);
    const { title, subtitle, content, tags, links, featuredImage } = req.body;
    
    // Convert empty string to null for database
    const imageUrl = featuredImage && featuredImage.trim() !== '' ? featuredImage : null;
    
    if (!title || !content) {
      console.log('Validation failed: missing title or content');
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (useDatabase) {
      const result = await pool.query(
        `INSERT INTO posts (title, subtitle, content, tags, links, featured_image)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [title, subtitle, content, tags, links, imageUrl]
      );
      res.status(201).json(result.rows[0]);
    } else {
      // Use mock data
      const newId = Math.max(...mockPosts.map(p => p.id), 0) + 1;
      const newPost = {
        id: newId,
        title,
        subtitle: subtitle || null,
        content,
        tags: tags || null,
        links: links || null,
        featured_image: imageUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      mockPosts.unshift(newPost);
      res.status(201).json(newPost);
    }
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update post (admin only)
app.put('/api/admin/posts/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, tags, links, featuredImage } = req.body;
    
    // Convert empty string to null for database
    const imageUrl = featuredImage && featuredImage.trim() !== '' ? featuredImage : null;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (useDatabase) {
      const result = await pool.query(
        `UPDATE posts 
         SET title = $1, subtitle = $2, content = $3, tags = $4, links = $5, featured_image = $6, updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [title, subtitle, content, tags, links, imageUrl, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json(result.rows[0]);
    } else {
      // Use mock data
      const postIndex = mockPosts.findIndex(p => p.id === parseInt(id));
      
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      mockPosts[postIndex] = {
        ...mockPosts[postIndex],
        title,
        subtitle: subtitle || null,
        content,
        tags: tags || null,
        links: links || null,
        featured_image: imageUrl,
        updated_at: new Date().toISOString()
      };
      
      res.json(mockPosts[postIndex]);
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete post (admin only)
app.delete('/api/admin/posts/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useDatabase) {
      const result = await pool.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json({ message: 'Post deleted successfully' });
    } else {
      // Use mock data
      const postIndex = mockPosts.findIndex(p => p.id === parseInt(id));
      
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      mockPosts.splice(postIndex, 1);
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Using Neon PostgreSQL database`);
  });
}

startServer().catch(console.error); 