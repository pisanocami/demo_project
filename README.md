# Project Manager

A modern project management application built with React + TypeScript + Vite (frontend) and FastAPI (backend).

## 🚀 Features

- **Project Management**: Create and manage projects with ease
- **Task Tracking**: Add and organize tasks within projects
- **Modern UI**: Clean and responsive interface built with Tailwind CSS
- **Real-time Updates**: State management with Zustand
- **Type Safety**: Full TypeScript support

## 📦 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (State Management)
- React DnD (Drag and Drop)

### Backend
- FastAPI
- Pydantic (Data Validation)
- SQLite (Development)

## 🛠️ Project Structure

```
.
├── backend/               # FastAPI backend
│   ├── app/              
│   │   ├── main.py       # FastAPI application
│   │   ├── core/         # Core configurations
│   │   ├── db/           # Database configurations
│   │   └── models/       # Data models
│   ├── requirements.txt  # Python dependencies
│   └── run.py           # Application entry point
│
├── src/                  # Frontend source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # State management
│   └── utils/            # Utility functions
│
├── public/               # Static files
├── .replit               # Replit configuration
├── replit.nix           # Nix package configuration
├── Procfile             # Heroku deployment config
├── start.sh             # Startup script
├── build.sh             # Build script
└── package.json         # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (for frontend)
- Python 3.8+ (for backend)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python run.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the project root:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5000`

## 📚 API Documentation

Once the backend is running, you can access:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Deployment

### Replit Deployment

1. Fork this repository to your Replit account
2. Create a new Repl and import the repository
3. Replit will automatically detect the configuration
4. Click "Run" to start the application
5. The app will be available at the provided Replit URL

### Heroku Deployment

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to your Heroku account:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Deploy your application:
   ```bash
   git push heroku main
   ```
5. Open the app:
   ```bash
   heroku open
   ```

### Local Development with Docker

1. Build the Docker image:
   ```bash
   docker build -t project-manager .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 project-manager
   ```
3. Access the app at `http://localhost:5000`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
