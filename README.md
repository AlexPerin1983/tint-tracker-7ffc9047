# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b2a294a5-1463-4c9e-a1f5-9bb4b20152b8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b2a294a5-1463-4c9e-a1f5-9bb4b20152b8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You have two options for deployment:

1. **Using Lovable**
   Simply open [Lovable](https://lovable.dev/projects/b2a294a5-1463-4c9e-a1f5-9bb4b20152b8) and click on Share -> Publish.

2. **Using Netlify**
   This project is fully compatible with Netlify. To deploy:

   1. Create an account on [Netlify](https://www.netlify.com)
   2. Click on "Add new site" > "Import an existing project"
   3. Connect your GitHub repository
   4. Use these build settings:
      - Build command: `npm run build`
      - Publish directory: `dist`
      - Node version: 18 (or higher)
   5. Click "Deploy site"

   Your site will be live in minutes!

## I want to use a custom domain - is that possible?

We don't support custom domains (yet) on Lovable. If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)