# WDCC Clubs Membership Checker System

Project initiated by WDCC in 2023.

## Overview

React app for students to check their membership for university clubs. Uses Express backend with Prisma.
Project is currently deployed to Fly.io and uses Github Actions for CI/CD. Pushes to main will automaticall try to deploy. Unfortunately, the frontend uses some dependencies from the backend and vice versa, which means they have to be built together and at the same time. The Dockerfile builds both and combines them for deployment. 

## Key Commands

In `\api`:
- Start Local Server: `yarn run start` (compiles to typescript and then runs from `/dist` folder)
- Watch Local Server: `yarn run watch` (watch for changes in any files and restart the server)
- Open Prisma Database Editor: `yarn run prisma studio`
- Generate Prisma models from schema: `yarn run prisma generate`
- Push changes to the prisma schema to the remote database: `yarn run prisma db push`
- Pull changes to the prisma schema from the remote database: `yarn run prisma db pull`

In `/client`:
- Start Development Server: `yarn run dev`
- Build Server (not really relevant): `yarn run build`

### API Environment Variables:

- PORT
- DATABASE_URL
- JWT_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REDIRECT_URI
- 

### Service Account
You must have the service account to run the backend. Contact Alex for the credentials.

### 2023 Team

- Serena Lau (Project Manager)
- Alex McLeod (Tech Lead)
- Vanisha Rajan (Designer)
- Sebastian Thomas (Developer)
- Eric Zheng (Developer)
- Jordan See (Developer)
- Nimit Parekh (Developer)
- Bethany Yates (Developer)
- Andrew Lam (Developer)

### Project Management

- [Ticket Backlog](https://github.com/orgs/UoaWDCC/projects/20/views/1)
- [Current Sprint](https://github.com/orgs/UoaWDCC/projects/20/views/2)
- [Milestones](https://github.com/UoaWDCC/wdcc-clubs-mem-checker/milestones)

### Other Links

- [Git Cheat Sheet](https://github.com/UoaWDCC/wdcc-clubs-mem-checker/wiki/Workshops-and-Trainings#git-cheat-sheet)
- [API Documentation](https://uoawdcc.github.io/wdcc-clubs-mem-checker/redoc-static.html)
