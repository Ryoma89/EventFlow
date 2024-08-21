# EventFlow

## 1. Introduction

### EventFlow Overview

EventFlow is an event management application where users can search for events, register their own events, and recruit participants. The app aims to streamline the process of organizing and discovering events, making it easier for users to connect with and engage in various events.

## 2. Design

### Overview

- **Design Concept**: The design philosophy and user experience goals of EventFlow.
- **UI/UX Design**: Key design elements and their intentions.
- **Wireframes/Mockups**: Description of major screens and layouts.

### Resources

- **Design Tools**: Tools used for design and their links (e.g., Figma, Sketch).
- **Style Guide**: Colors, fonts, and component styles.

## 3. Frontend

### Overview

- **Technology Stack**: 
  - Next.js: A front-end framework that uses server-side rendering and static site generation to build fast and SEO-friendly applications.
  - Tailwind CSS: A utility-first CSS framework that allows for efficient and responsive design development.
  - shadcn: A UI component library that offers beautiful and user-friendly components.
  - Stripe: A payment processing platform integrated into the app, enabling secure event payments.
  - Zustand: A lightweight and scalable state management library that ensures consistency across the application.
<br>

- **Directory Structure:**
  - app/: Manages routing and logic for each page using Next.js app router.
  - components/: Houses reusable UI components that maintain UI consistency across the application.
  - styles/: Contains custom styles and global styles that complement Tailwind CSS, reflecting the design rules across the project.
  - lib/: Manages logic and helper functions related to external API communication and data processing.
  - store/: Hosts Zustand state management logic, which handles the global state used throughout the application.
  - public/: Stores static assets (e.g., images, fonts) that are directly accessible by the client.
<br>

- **Data Flow:**
  - Zustand handles state management, ensuring simple and consistent state sharing between React components.
  - UI components are designed based on shadcn, separating page components from UI components to enhance maintainability.

### Deployment

- **Live Application URL**: https://eventflow-deploy-frontend.onrender.com

## 4. Backend

### Overview

- **Technology Stack**: Backend technologies used (e.g., Node.js, Django).
- **Architecture**: Architecture of the backend and description of major API endpoints.

### Deployment

- **Live API URL**: URL for the backend API or any endpoints.
- **Known Issues**: Any current issues or limitations of the backend.

## 5. Portfolio Links

- [Designer’s Portfolio](https://designer-portfolio.com)
- [Frontend Developer’s Portfolio](https://frontend-developer-portfolio.com)
- [Backend Developer’s Portfolio](https://backend-developer-portfolio.com)
