# FurnitureViz - Furniture Design Application

## Project Overview
FurnitureViz is a desktop application developed for a furniture design company to help customers visualize furniture in their rooms before purchase. The application allows designers to create customized room layouts, add furniture items, and visualize them in both 2D and 3D formats based on room size, color schemes, and shapes.

## Features
- **User Authentication**: Secure login for designers
- **Room Configuration**: Set size, shape, and color scheme for rooms
- **2D Design Creation**: Create and modify furniture layouts in 2D
- **3D Visualization**: Convert 2D designs to 3D for better visualization
- **Scaling Options**: Scale designs to best fit the room dimensions
- **Shading & Coloring**: Apply shades and change colors of whole designs or selected parts
- **Design Management**: Save, edit, and delete designs

## Technology Stack
- **Frontend**: React.js with Tailwind CSS
- **User Interface**: Custom UI components for furniture manipulation
- **Visualization**: 2D & 3D rendering capabilities
- **State Management**: React hooks for state management
- **Styling**: Tailwind CSS for responsive design

## Installation

### Prerequisites
- Node.js (v14.0 or later)
- npm (v6.0 or later)

### Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/your-username/furniture-viz.git
   cd furniture-viz
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The application will be available at `http://localhost:3000`

## Project Structure
```
furniture-viz/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Designer/
│   │   ├── FurnitureItems/
│   │   ├── Room/
│   │   ├── Visualization/
│   │   └── common/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DesignerDashboard.jsx
│   │   └── RoomDesigner.jsx
│   ├── utils/
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Usage Guide

### Designer Login
1. Navigate to the application URL
2. Click on "Designer Login" button on the homepage
3. Enter credentials to access the designer dashboard

### Creating a New Design
1. From the designer dashboard, click "Create New Design"
2. Specify room parameters (size, shape, color scheme)
3. Use the toolbar to add furniture items to the room
4. Arrange items as needed using drag and drop

### 2D to 3D Visualization
1. Create your design in 2D view
2. Click the "3D View" button to convert the design to 3D
3. Use mouse controls to rotate and view the design from different angles

### Customizing Furniture
1. Select a furniture item in the design
2. Use the properties panel to modify:
   - Color (whole item or parts)
   - Shading effects
   - Size and scale

### Saving Designs
1. Click the "Save Design" button
2. Enter a name for the design
3. The design will be saved and accessible from the dashboard

## Development

### Contributing
1. Fork the repository
2. Create a feature branch
   ```
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```
   git commit -m "Add your feature description"
   ```
4. Push to the branch
   ```
   git push origin feature/your-feature-name
   ```
5. Open a pull request

## Testing
Run the test suite:
```
npm test
```

## Project Requirements (Based on Coursework Brief)
This project is developed as part of the PUSL3122 HCI, Computer Graphics, and Visualization module. It follows requirements specified in the coursework brief which include:
- Creating a desktop application for furniture visualization
- Implementing both 2D and 3D views
- Providing color and shading functionality
- Supporting multiple furniture types (chairs, tables, etc.)
- Allowing designers to save designs

## Team Members
- Sandun Wiratunga - [@sandunwira](https://github.com/sandunwira)
- Ruwin Hettiarachchi - [@Ruwinsh](https://github.com/Ruwinsh)
- Bodhisaranage Jayamanna - [@sasindujayamanna](https://github.com/sasindujayamanna)
- Dissanayake Dissanayake - [@ThenuraDissanayake](https://github.com/ThenuraDissanayake)
- Meepe Perera - [@ylp1455](https://github.com/ylp1455)

## License
[MIT License](LICENSE)
