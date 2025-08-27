<img width="1918" height="879" alt="image" src="https://github.com/user-attachments/assets/b5161e20-b9ed-4041-97cb-1041e7540a98" />


## 🚢 ShipViewerOnMap

ShipViewerOnMap is a ship tracking system built with the OpenLayers library.
The project fetches ship data from the database and visualizes it on a map based on position, heading, type, size, and speed. It also includes risk analysis features to detect potential dangers and notify users.

## ✨ Features

🧭 Displays ship heading accurately on the map

🚢 Different colored icons for ship types

📏 Automatic scaling of ship size according to map zoom level

⏩ Ship movement simulation based on speed

⚠️ Collision risk detection in the Istanbul Strait

🛃 Smuggling risk detection in the Aegean and Black Sea

🔔 Notification system for risk alerts

## 🛠️ Technology Stack

Project: .NET MVC

Frontend: JavaScript (Vite)

Database: Microsoft SQL Server (MSSQL)

Map Library: OpenLayers

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/berkeyldrmm/shipViewerOnMap.git
   cd ShipViewerOnMap

2. Restore .NET dependencies (NuGet packages):
   ```bash
   dotnet restore

3. Install dependencies:
   ```bash
   cd ClientApp
   npm install

4. Run the Vite project in watch mode (auto compile):
   ```bash
   npm run watch

5. Configure the database:
   
   Update your MSSQL connection string in appsettings.json or web.config
   
   Run migrations (if using EF Core):

   ```bash
   dotnet ef database update

7. Start the project:

   ```bash
   dotnet run
