[![Netlify Status](https://api.netlify.com/api/v1/badges/927db46a-692a-451a-80a3-a18fb2030c0d/deploy-status)](https://app.netlify.com/sites/easy-bingo/deploys)

# Easy Bingo

A web application for creating and playing custom bingo cards.

available at : https://easy-bingo.com

## Features

- Create custom bingo cards with any size from 3x3 to 13x13
- Edit cell contents
- Shuffle cells (except the center cell)
- Save and load bingo cards
- Play bingo with your custom cards
- Download completed bingo cards as PNG images

## Tech Stack

- NuxtJS 3
- Pinia for state management
- TailwindCSS for styling
- Docker for containerization
- Helm for Kubernetes deployment

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker (optional)
- Kubernetes cluster with Helm (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/easy-bingo.git
cd easy-bingo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t easy-bingo .
```

2. Run the container:
```bash
docker run -p 3000:3000 easy-bingo
```

### Kubernetes Deployment

1. Install the Helm chart:
```bash
helm install easy-bingo ./helm/easy-bingo
```

## Project Structure

- `components/` - Vue components
- `pages/` - Nuxt pages
- `stores/` - Pinia stores
- `assets/` - Static assets
- `helm/` - Helm chart for Kubernetes deployment
- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker Compose configuration
