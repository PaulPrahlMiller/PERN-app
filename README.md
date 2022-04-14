# PERN stack application

A simple fullstack application built using the PERN stack with custom webpack and babel configuration.

## Get started

1. Clone the repository
2. Install client dependencies (from project root)  
   `npm run install-client`
3. Install server dependencies (from project root)  
   `npm install`
4. Add a .env file with the following:
   - ELEPHANT_USER = 'Your elephantsql database username'
   - ELEPHANT_PWD = 'Your password for the database'
5. Build the application files into a dist folder
   - `cd client`
   - `npm run build`
6. Run the application using the development server.
   - `cd ..` (project root)
   - `npm run dev`
