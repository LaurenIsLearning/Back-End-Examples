import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config()

console.log('Supabase URL:', process.env.SUPABASE_URL)
console.log('Supabase Key:', process.env.SUPABASE_KEY)
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Authenticate user with their email and password
const { data, error } = await supabase.auth.signInWithPassword({
    email: 'tom@pfw.edu',
    password: 'PFWcsW3bD3v!',
});

if (error) {
    console.error('Error authenticating user:', error.message);
} else {
    console.log('User authenticated successfully:', data.user);
}

//Delete everything from authors and articles tables
// const articleIds = await supabase.from('articles').select('id');
// const { data: articlesData, error: articlesError } = await supabase.from('articles').delete().in(articleIds.data.map(( data ) => data.id));
// if (articlesError) {
//     console.error('Error deleting articles:', articlesError.message);
// }

// const authorIds = await supabase.from('authors').select('id');
// const { data: authorsData, error: authorsError } = await supabase.from('authors').delete().in(authorIds.data.map(( data) => data.id));
// if (authorsError) {
//     console.error('Error deleting authors:', authorsError.message);
// }

// Sample data
const authors = [
  { first_name: 'John', last_name: 'Doe' },
  { first_name: 'Jane', last_name: 'Smith' },
  { first_name: 'Alice', last_name: 'Johnson' },
  { first_name: 'Bob', last_name: 'Brown' },
];

const titles = [
  'Understanding JavaScript Closures',
  'Introduction to Node.js',
  'Async Programming in JavaScript',
  'Exploring New Features in ES6',
  'A Guide to RESTful APIs',
  'Building a Simple Blog with Node.js',
  'Introduction to TypeScript',
  'Best Practices in JavaScript',
  'Database Management in SQL',
  'Getting Started with Supabase',
  'Working with Promises in JavaScript',
  'Functional Programming Basics',
  'Building a CRUD App',
  'JavaScript Performance Tips',
  'Understanding JavaScript Scope',
  'Introduction to Webpack',
  'React vs. Vue: A Comparison',
  'CSS Flexbox and Grid Layout',
  'Node.js Streams Explained',
  'Deploying Node.js Applications',
  'Advanced SQL Queries',
  'Database Relationships Explained',
  'Exploring GraphQL',
  'Understanding JSON Web Tokens (JWT)',
  'A Guide to CSS Animations',
  'Introduction to Web Security',
  'Handling Errors in JavaScript',
  'A Guide to JavaScript Modules',
  'Introduction to Backend Development',
  'Modern Web Development Tools',
];

// Function to create authors and articles
async function seedDatabase() {
  try {
    // Insert authors
    const { data: authorsData, error: authorsError } = await supabase
      .from('authors')
      .insert(authors)
      .select('id');

    if (authorsError) throw authorsError;

    // Insert articles with random authors
    const articles = titles.map((title, index) => {
      const author = authorsData[Math.floor(Math.random() * authorsData.length)];
      return {
        title: title,
        author: author.id,
        publish_date: new Date(),
        body: `This is the content of the article titled "${title}".`,
      };
    });

    // Insert articles
    const { error: articlesError } = await supabase.from('articles').insert(articles);
    if (articlesError) throw articlesError;

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}

// Run the seed function
seedDatabase();