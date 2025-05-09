# FurnitureViz - 3D Furniture Visualization Platform

FurnitureViz is an interactive web application that helps users visualize furniture arrangements in their spaces. Whether you're an interior designer, a furniture retailer, or simply planning your home renovation, FurnitureViz makes it easy to create, visualize, and share room designs with accurate furniture placement.

## Features

### User Management

- **Secure Authentication**: User registration and login system built with Supabase
- **Profile Management**: Personalized user profiles with customizable display names
- **Session Persistence**: Seamless experience across browser sessions

### Room Design Tools

- **Custom Room Creation**:
  - Define precise room dimensions (width, length, height)
  - Choose between different room shapes (rectangular, L-shaped)
  - Customize wall and floor colors with hex color picker

### Visualization Modes

- **Multi-view Visualization**:
  - 2D top-down view for precise furniture placement
  - 3D perspective view to visualize the final look
  - Split-screen mode to see both views simultaneously
  - Single-click toggle between visualization modes

### Furniture Library

- **Pre-built Collection**: Includes common furniture pieces:
  - Dining chairs
  - Dining tables
  - Lounge chairs
  - Coffee tables
  - Side tables
- **Detailed Specifications**: Each piece includes accurate dimensions and color options

### Furniture Manipulation

- **Intuitive Controls**:
  - Drag-and-drop positioning in 2D view
  - Precise coordinate controls for exact placement
  - Rotation adjustment for perfect alignment
  - Scale modification to fit different furniture sizes
  - Color customization with color picker interface

### Design Management

- **Project Organization**:
  - Save designs with custom names
  - Browse all previously created designs
  - Edit existing room designs
  - Delete unwanted projects
  - Search through saved designs by name
  - Sort designs by creation date (newest/oldest)

### Design Gallery & Sharing

- **Community Features**:
  - View designs created by other users
  - Share your designs with clients or colleagues

## Tools & Technologies

- **Frontend Framework**: React.js
- **3D Rendering**: Three.js with React Three Fiber
- **Authentication & Database**: Supabase
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **3D Models**: React Three Drei
- **Icons**: Tabler Icons
- **Development Environment**: Vite

## Prerequisites

- Node.js (v16.x or higher recommended)
- npm (v8.x or higher) or yarn (v1.22.x or higher)
- A Supabase account for backend services
- Git (for version control and cloning the repository)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/sandunwira/hciproject.git
   cd hciproject
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the project root and add your Supabase credentials

   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```bash
hciproject/
├── node_modules/        # Project dependencies
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other asset files
│   ├── components/      # Reusable UI components
│   │   ├── DesignPreview.jsx
│   │   ├── DraggableFurniture.jsx
│   │   ├── FurnitureModels.jsx
│   │   ├── FurniturePreviewCanvas.jsx
│   │   ├── Navbar.jsx
│   │   └── ThreeDRenderer.jsx
│   ├── contexts/        # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/           # Application pages/routes
│   │   ├── CreateDesign.jsx
│   │   ├── DesignGallery.jsx
│   │   ├── EditDesign.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyDesigns.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   └── ViewDesign.jsx
│   ├── utils/           # Utility functions and helpers
│   │   └── Supabase.jsx # Supabase client configuration
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables
├── .env.example         # Sample environment variables
├── .gitignore           # Git ignore file
├── .eslint.config.js    # ESLint configuration
├── index.html           # Main HTML file
├── package-lock.json    # npm lock file
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── README.md            # Project documentation
└── vite.config.js       # Vite configuration
```

## Development

### Supabase Setup

To set up the required database tables in Supabase:

1. Create a new Supabase project
2. Add the following tables:

   **profiles**
   - id (uuid, primary key)
   - username (text, unique)
   - display_name (text)
   - email_address (text)
   - created_at (timestamp with timezone, default: now())
   - role (text, default: 'user')

   **designs**
   - id (uuid, primary key)
   - user_id (uuid, foreign key to auth.users.id)
   - name (text)
   - created_at (timestamp with timezone, default: now())
   - room_properties (json)
   - furniture_pieces (json)
   - thumbnail_url (text, nullable)

3. Set up row-level security policies for each table

### Running Tests

```bash
npm run test
# or
yarn test
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory, which can be deployed to your preferred hosting service.

Steps to deploy the build output:

1. Add environment variables
2. Build the project using the command above
3. Serve the `dist` directory using Serve or any static file server

   ```bash
   npm install -g serve
   serve -s dist
   ```

4. Open your browser and navigate to the server URL
5. For production deployment, consider using a cloud service like Vercel or Render

### Deployment Suggestions

- **Vercel**: Recommended for easy deployment with React applications
- **Render**: Another great option for hosting the project

## Contributions

1. 10898715 - Sandun Wiratunga (sandunwira)
2. 10898450 - Dissanayake G Dissanayake (ThenuraDissanayake)
3. 10898480 - Ruwin Hettiarachchi (Ruwinsh)
4. 10898605 - AYL Perera (ylp1455)
5. 10898489 - Bodhisaranage Jayamanna (sasindujayamanna)

## Acknowledgments

- Three.js and React Three Fiber for 3D rendering capabilities
- Supabase for providing the backend infrastructure
- The React team for the excellent frontend framework
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors whose libraries made this project possible
