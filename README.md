# Shubham Gupta - Personal Website

This is the personal website and blog for Shubham Gupta, Security Researcher and Bug Hunter.

## 🚀 Deployment Instructions

### Production Build

The website is configured to build a static export to the `/out` directory:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The static files will be in the /out directory
```

### Deployment Options

1. **Apache Server**:
   - Upload the contents of the `/out` directory to your web server
   - The `.htaccess` file is automatically copied to the output directory
   - Make sure your server has Apache with `mod_rewrite` enabled

2. **Nginx Server**:
   - Upload the contents of the `/out` directory to your web server
   - Use the following Nginx configuration:

   ```nginx
   server {
     listen 80;
     server_name guptashubham.com www.guptashubham.com;
     
     # Redirect to HTTPS
     return 301 https://$host$request_uri;
   }

   server {
     listen 443 ssl;
     server_name guptashubham.com www.guptashubham.com;
     
     # SSL configuration
     ssl_certificate /path/to/certificate.crt;
     ssl_certificate_key /path/to/private.key;
     
     root /path/to/out;
     index index.html;
     
     # Handle direct URL access
     location / {
       try_files $uri $uri.html $uri/ =404;
     }
     
     # Handle trailing slashes
     rewrite ^(/.+)/$ $1 permanent;
     
     # Security headers
     add_header X-Content-Type-Options "nosniff";
     add_header X-Frame-Options "SAMEORIGIN";
     add_header X-XSS-Protection "1; mode=block";
     add_header Referrer-Policy "strict-origin-when-cross-origin";
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
     add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)";
     
     # Caching
     location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
       expires 30d;
     }
   }
   ```

3. **Vercel/Netlify**:
   - Simply connect your GitHub repository
   - Set the build command to `npm run build`
   - Set the output directory to `out`

## 🔍 SEO Configuration

The website is optimized for search engines with:

- Meta tags and OpenGraph data in the root layout
- Structured data (Schema.org) for personal information
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Google Search Console verification file

### Google Search Console

To complete Google Search Console verification:

1. Log in to [Google Search Console](https://search.console.google.com/)
2. Add your property (domain or URL prefix)
3. Verify ownership using the HTML file method (already included in the build)
4. Submit your sitemap by going to "Sitemaps" > Add your sitemap URL

## 🖥 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 📑 Website Structure

- **Home**: `/`
- **About**: `/about/`
- **Blog**: `/blog/`
- **Resume**: `/resume/`
- **Contact**: `/contact/`
- **Resources**:
  - CORS POC Generator: `/resources/cors-poc-generator/`
  - XSS Scanner: `/resources/xss-scanner/`
- **HTTP Request**: `/http-request/`
- **What is Hacking**: `/what-is-hacking/`
- **Privacy Policy**: `/privacy-policy/`

## 📋 Maintenance Tips

### Adding Blog Posts

Blog posts are served from Sanity CMS. To add new posts:

1. Create the post in Sanity Studio
2. The website will automatically fetch the new content

### Updating Meta Information

Update SEO metadata in `src/app/layout.tsx` for site-wide changes.

### Performance Monitoring

The website includes built-in Web Vitals monitoring. Check the browser console during development to see performance metrics.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- Content Security Policy
- XSS protection headers
- HTTPS enforcement
- Proper CORS configuration
- Rate limiting on contact form
- reCAPTCHA verification

## 📊 Analytics

Google Analytics is integrated to track visitor statistics.

---

© Shubham Gupta. All rights reserved.

## Features

- Modern, responsive design with dark/light mode
- Portfolio section highlighting security expertise and projects
- Blog section for sharing cybersecurity insights
- Interactive resume with timeline and skills visualization
- Contact form with animated paper plane effect
- Resources section with security tools like CORS POC Generator

## Tech Stack

- [Next.js 14](https://nextjs.org) - React framework
- [TailwindCSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Phosphor Icons](https://phosphoricons.com) - Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
