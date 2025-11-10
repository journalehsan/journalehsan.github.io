# Articles System - Documentation

## Overview
This website now has a comprehensive articles system for SEO-friendly, in-depth technical content separate from the blog.

## Structure

### Files Created/Modified:

1. **articles.js** - Data file containing all article metadata
2. **articles_list.html** - Paginated list page showing all articles
3. **articles/is_dynabook_good_for_linux.html** - First full article (SEO-optimized)
4. **index.html** - Updated with new Articles section above Blog section

### How It Works

#### Articles vs Blog
- **Blog**: Client-side loaded markdown posts for quick, informal content
- **Articles**: Static HTML pages with full SEO optimization for in-depth technical writing

#### Adding New Articles

1. **Create the article HTML file**:
   - Create a new file in `/articles/` folder
   - Use `articles/is_dynabook_good_for_linux.html` as template
   - Include all SEO meta tags, structured data, Open Graph, Twitter cards
   - Update canonical URLs, images, dates, and content

2. **Add article metadata to articles.js**:
   ```javascript
   {
       id: 'unique-article-id',
       title: 'Full Article Title',
       description: 'Short description for cards and SEO',
       author: 'Ehsan Tork',
       date: 'YYYY-MM-DD',
       readTime: 'X-Y min',
       coverImage: 'assets/img/cover-image.png',
       url: 'articles/article-filename.html',
       tags: ['Tag1', 'Tag2', 'Tag3']
   }
   ```

3. **Add to homepage** (optional for featured articles):
   - Edit the `#articles` section in `index.html`
   - Replace placeholder cards with new article cards

## Features

### SEO Optimization
Each article includes:
- Meta description and keywords
- Canonical URL
- Open Graph tags (Facebook)
- Twitter Card tags
- JSON-LD structured data (Schema.org Article)
- Semantic HTML5 elements
- Proper heading hierarchy

### Design
- Dark theme matching the main site
- Responsive design
- Accessible navigation
- Table of contents
- Back to articles link
- Share buttons
- Professional typography
- Code syntax highlighting support

### Pagination
- Articles list page supports pagination
- 6 articles per page by default
- Built with Alpine.js for smooth interactions

## Navigation Structure

```
Home (index.html)
├── Articles Section (featured)
│   └── View All Articles → articles_list.html
│       └── Individual Article → articles/[article-name].html
├── Blog Section (existing)
└── Writing Menu (dropdown)
    ├── Articles
    ├── Blog  
    └── All Articles
```

## Customization

### Changing Articles Per Page
Edit `articles_list.html`:
```javascript
articlesPerPage: 6, // Change this number
```

### Styling
All styles are inline in each file using:
- TailwindCSS for layout and utilities
- Custom CSS for article-specific styling
- Dark theme with blue accent colors

### Images
- Cover images go in `/assets/img/`
- Use high-quality images (1200x630 recommended for social sharing)
- Optimize images before uploading

## Best Practices

1. **SEO**:
   - Use descriptive titles (50-60 characters)
   - Write compelling meta descriptions (150-160 characters)
   - Include relevant keywords naturally
   - Use proper heading hierarchy (h1 → h2 → h3)
   - Add alt text to all images

2. **Content**:
   - Start with a clear introduction
   - Use table of contents for long articles
   - Break content into scannable sections
   - Include code examples with syntax highlighting
   - Add images, tables, and lists for visual interest

3. **Performance**:
   - Use lazy loading for images
   - Optimize images before upload
   - Minify HTML/CSS for production (optional)

4. **Accessibility**:
   - Use semantic HTML
   - Include ARIA labels where needed
   - Ensure good color contrast
   - Make links descriptive

## Current Articles

1. **Is Dynabook Good? Full Review for Linux & Windows 11**
   - URL: articles/is_dynabook_good_for_linux.html
   - Published: November 10, 2025
   - Topics: Hardware review, Linux, Windows 11, Developer tools

## Future Enhancements

Consider adding:
- Article categories/filtering
- Search functionality
- Related articles section
- Reading progress indicator
- Social share counters
- Comment system (Disqus, Utterances, etc.)
- RSS feed for articles
- Sitemap generation
