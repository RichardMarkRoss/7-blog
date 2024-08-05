# 7-blog

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```
# Blog Platform Project

## Objective: Initial Setup and Frontend Framework

### Setup Development Environment
- :white_check_mark: **Install Nuxt.js and Vuetify**: Successfully installed Nuxt.js and Vuetify for the frontend framework.
- :white_check_mark: **Set up a basic Nuxt.js project structure**: Initialized the project with the necessary folders and files.
- :white_check_mark: **Install necessary dependencies for Nuxt.js and Vuetify**: Installed and configured all required dependencies for a Nuxt.js project using Vuetify.

### Create Project Repository
- :white_check_mark: **Set up a Git repository**: Initialized a Git repository to track changes.
- :white_check_mark: **Commit initial setup and dependencies**: Committed the initial project setup, including the installation of dependencies.

## Objective: Basic Frontend Structure

### Create Layouts and Pages
- :white_check_mark: **Set up the main layout for the platform**: Implemented the default layout (`layouts/default.vue`) with a navigation bar and main content area.
- :white_check_mark: **Create a homepage to display a list of blog posts**: Developed the homepage (`pages/index.vue`) to list blog posts with a basic design.

### Implement Routing
- :white_check_mark: **Define routes for the homepage and individual blog post pages**: Configured routing for the homepage and detailed blog post pages using Nuxt.js routing.

## Current Issues
- :x: **Login not working**: The login functionality is currently non-functional, potentially due to issues with API integration or authentication flow.
- :x: **Registration not working**: The registration process is encountering errors, preventing new users from signing up.
- :x: **Comments not displaying**: Comments are not being displayed on individual post pages, likely due to issues in fetching or rendering comments.
- :x: **Editing not working**: The functionality to edit posts or comments is not operational.

## Next Steps
1. **Debug and fix login functionality**: Investigate and resolve the issues preventing users from logging in.
2. **Fix registration issues**: Ensure that new users can register successfully, including proper handling of form validation and API requests.
3. **Display comments**: Ensure that comments are correctly fetched and displayed for each post, and allow logged-in users to add new comments.
4. **Enable editing capabilities**: Implement and test the editing functionality for posts and comments.

## Contributions
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
