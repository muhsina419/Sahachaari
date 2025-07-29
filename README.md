<h1 align="center">Sahachaari</h1>


## 📘 Project Description

**Sahachaari – Smart Traffic Control Assistant** is an AI-powered, web-based platform designed to modernize and streamline urban traffic management. In today’s fast-paced cities, traditional traffic control methods often fall short in handling congestion, emergency movements, and real-time incident reporting. Sahachaari addresses these challenges by offering an intelligent dashboard that integrates AI-driven traffic analysis, real-time emergency routing assistance, citizen-based issue reporting, and geographic insights.

At the core of Sahachaari is a modular system that brings together multiple stakeholders—traffic officers, emergency service providers, and the general public—under one unified platform. Using advanced computer vision techniques such as YOLOv8 and OpenCV, the platform detects and analyzes traffic density from video feeds to provide live recommendations for signal control. Emergency services can raise alerts to prioritize routes and ensure quick response times, which are visualized on the admin map interface for rapid action.

In addition to administrative tools, Sahachaari empowers citizens to contribute to traffic efficiency by reporting accidents, potholes, waterlogging, and blockages through an intuitive interface that includes geolocation and image uploads. These reports are instantly routed to traffic administrators for validation and response. The platform also features a map-based viewer of public parking areas, aiding city residents in planning vehicle parking without the chaos.

Sahachaari is designed with scalability in mind, using a full-stack solution with React and TypeScript on the frontend, Django and Django REST Framework on the backend, and AI modules developed in Python. The map services are powered by Leaflet.js or Google Maps API, and data is stored securely using SQLite or PostgreSQL. With its user-friendly interface, real-time data processing capabilities, and collaborative features, Sahachaari paves the way toward building smarter, safer, and more efficient cities.

## 🧩 Key Components

- **AI-Based Manual Traffic Control Assistant**
  - Detects and counts vehicles in each lane using YOLOv8/OpenCV.
  - Suggests optimal traffic light switching based on congestion.
  - Displays real-time stats: vehicle count, direction priority, and wait times.

- **Emergency Route Clearance Assistant**
  - Allows hospitals or ambulances to submit emergency route alerts.
  - Routes are highlighted on the admin map with ETA.
  - Enables quick action for manual or AI-driven traffic clearance.

- **Public Incident Reporter**
  - Citizens can report real-world issues like:
    - 🚧 Accidents
    - 🕳 Potholes
    - 🌊 Waterlogging
    - 🚦 Traffic jams or blockages
  - Reports include location, description, and image (optional).
  - Admin receives alerts and visualizes issues on the map.

- **Public Parking Area Viewer**
  - Displays known public and private parking zones on a map.
  - Each marker shows:
    - Parking area name
    - Type (public/private)
    - Optional capacity information

- **Admin Dashboard**
  - Central panel to monitor all modules.
  - Live traffic feed and AI suggestions.
  - Emergency route alerts and user-submitted issues.
  - View analytics: vehicle count history, incident types, response stats.
  - Manage parking zones.

## 🚀 Key Features

- Real-time vehicle detection using YOLOv8 or OpenCV.
- Interactive admin dashboard for manual control.
- Emergency alert system for ambulances/hospitals.
- Citizen-based issue reporting with map visualization.
- Static parking area viewer with map integration.
- AI-driven traffic light recommendations.
- Modular and scalable full-stack architecture.
- Clean UI with role-based navigation.

## 💻 Tech Stack

| Layer           | Tools & Frameworks                         |
|------------------|--------------------------------------------|
| **Frontend**      | React, TypeScript, Tailwind CSS            |
| **Backend**       | Django, Django REST Framework              |
| **AI Module**     | Python, YOLOv8, OpenCV                     |
| **Maps**          | Leaflet.js, Google Maps API                |
| **Database**      | SQLite / PostgreSQL                        |
| **Deployment**    | Vercel (Frontend), Heroku / AWS (Backend)  |

## 📁 Folder Structure

```
Sahachaari/
├── frontend/                 # React + Tailwind frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.tsx
├── backend/                  # Django backend
│   └── sahachaari/
│       ├── views.py
│       ├── models.py
│       └── urls.py
├── ai_module/                # YOLO/OpenCV traffic detection
│   └── traffic_counter.py
├── media/                    # Uploaded images
├── requirements.txt
├── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js and npm
- Python 3.x
- SQLite
- Virtualenv

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sahachaari.git
cd sahachaari
```

### 2. Setup Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend (Django + DRF)

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4. Run AI Module (YOLOv8)

```bash
cd ai_module
python traffic_counter.py
```



## 📜 License

This project is licensed under the MIT License.

## 🙋‍♀️ Authors

- [Muhsina](https://github.com/muhsina419)
- [Abhinandana](https://github.com/abhinandu790)
- [Akshaya](https://github.com/akshaya-smohan)
