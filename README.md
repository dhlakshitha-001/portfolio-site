# D H Lakshitha - Personal Portfolio 🚀

A futuristic, highly interactive, and fully responsive personal portfolio website designed for full-stack developers and DevOps engineers. Crafted with a premium "future tech" aesthetic, this portfolio features smooth mouse-tracking spotlight effects, parallax animations, a dynamic feedback system, and a backend-free contact form.

## ✨ Features

- **Future Tech Aesthetics:** Premium dark mode UI, smooth gradients, and glassmorphism elements.
- **Global Mouse Tracking:** A custom glowing aura that tracks the user's cursor across the entire site.
- **Spotlight Cards:** Advanced CSS radial-gradient hover effects on all interactive elements (projects, certifications, and feedback cards).
- **Hero Parallax & Animations:** Engaging hero section with animated SVGs and scroll-triggered reveals.
- **Client Feedback System:** Fully functional 5-star feedback submission system with instant front-end persistence using `localStorage`.
- **Serverless Contact Form:** Fully integrated with [Web3Forms](https://web3forms.com/) for secure, backend-free email submissions via AJAX.
- **Enterprise Footer:** Comprehensive footer with navigation, tech stack overview, a mockup newsletter subscription form, and social links.
- **Fully Responsive:** Beautifully optimized for desktops, tablets, and mobile devices.

## 🛠️ Built With

- **HTML5** - Semantic and accessible markup.
- **Vanilla CSS3** - Custom properties (variables), Flexbox/Grid layouts, and advanced animations (no external CSS frameworks).
- **Vanilla JavaScript** - DOM manipulation, Intersection Observers for scroll animations, and `fetch` API for async form submissions.
- **Web3Forms** - Email handling API.
- **Remix Icons** - Scalable vector icons.
- **Google Fonts** - *Syne* for sleek display typography and *DM Sans* for highly readable body text.

## 🚀 Quick Setup & Deployment

Because this project is entirely static (HTML/CSS/JS), it is perfectly engineered for free hosting platforms like **GitHub Pages**, **Vercel**, or **Netlify**.

### Running Locally
You don't need any complex build tools to run this site locally.
1. Clone the repository:
   ```bash
   git clone https://github.com/dhlakshitha-001/portfolio-site.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio-site
   ```
3. Open `index.html` in your favorite web browser, or use a tool like the VS Code **Live Server** extension for hot-reloading.

### Configuring the Contact Form
To receive messages from the contact form directly to your email:
1. Go to [Web3Forms](https://web3forms.com/).
2. Enter your email address to generate a free **Access Key**.
3. Open `index.html` and locate the Contact Section (around line 614).
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your newly generated key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_NEW_KEY_GOES_HERE" />
   ```

### Deploying to GitHub Pages
1. Commit all your changes and push them to your `main` branch on GitHub.
2. Go to your repository settings on GitHub.
3. Click on the **Pages** menu item.
4. Under **Build and deployment**, select `Deploy from a branch`.
5. For the branch drop-down, select `main` (or `master`) and `/ (root)`, then click **Save**.
6. Wait a few minutes, and your site will be live!

## 🤝 Let's Connect!

- **GitHub:** [@dhlakshitha-001](https://github.com/dhlakshitha-001)
- **LinkedIn:** [D H Lakshitha](https://www.linkedin.com/in/d-h-lakshitha-68961826a)
- **Email:** dhlakshitha@outlook.com

---

*Designed and engineered by D H Lakshitha. All rights reserved.*
