# Pickup Line Generator

A fun web application that generates personalized pickup lines based on information about your crush and preferred style.

## Features

- 🎨 Beautiful UI with romantic theme
- 💝 Personalized pickup line generation
- 📱 Fully responsive design
- 🔄 Regenerate functionality for new lines
- 📋 Copy to clipboard functionality
- 🎯 Multiple pickup line styles

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Google Fonts** - Grand Hotel & Inter fonts

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── login/
│   │   └── page.tsx       # Login page
│   ├── generator/
│   │   └── page.tsx       # Form page
│   ├── results/
│   │   └── page.tsx       # Results page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
└── components/
    ├── Button.tsx         # Reusable button component
    ├── HeartIcon.tsx      # Heart icon SVG
    ├── CopyIcon.tsx       # Copy icon SVG
    ├── GoogleIcon.tsx     # Google icon SVG
    ├── LoadingSpinner.tsx # Loading spinner
    └── index.ts           # Component exports
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update `.env.local` with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Enable Google OAuth in Supabase Auth settings
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. **Landing Page**: Click "Generate one for me" to start
2. **Login**: Sign up with Google (simulation)
3. **Generator Form**:
   - Describe your crush
   - Choose a style (funny, romantic, etc.)
   - Click "Generate for me"
4. **Results**:
   - View generated pickup lines
   - Copy lines to clipboard
   - Regenerate for new options

## Design Features

- **Color Scheme**: Pink/red theme (#FF2157, #A5455C, #B5002C)
- **Typography**: Grand Hotel for headings, Inter for body text
- **Responsive**: Works on desktop and mobile devices
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **UX**: Loading states, copy feedback, smooth transitions

## Build for Production

```bash
npm run build
npm start
```

## Contributing

This is a demonstration project showcasing modern React/Next.js development practices with TypeScript and Tailwind CSS.

## License

MIT License - feel free to use this code for learning and development purposes.
