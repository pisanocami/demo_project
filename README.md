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
└── package.json          # Node.js dependencies
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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
