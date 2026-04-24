
# Setup

Install Node.js from [nodejs.org](https://nodejs.org/en/download)

Terminal: git clone https://github.com/mostafaDevadam/egybell-task.git

In project folder:

Using git switch to branch frontend: <br>
Terminal: git switch frontend <br>
create .env file add a variable for api url in it <br>
Terminal: npm i  <br>

Run frontend: <br>

Terminal: npm run dev

test frontend:

Terminal: npm run test


Using git switch to branch backend: <br>
Terminal: git switch frontend <br>
create .env file and add PORT variable in it. <br>

Terminal: npm i 

Run backend: <br>
Terminal: npm run start <br>

# Design decisions  

## Frontend 
Folders:

./src/

actions/

api/

assets/

auth/

components/: buttons/, data-tables/, forms/, layouts/, views/

lib/

pages/

routes/

store/

App.tsx
custom.d.ts: to impoting css/scss/sass files in react pages or components 
enum.ts
types.ts

task-api.postman_collection.json: postman collection for api/ednpoints

./test/ : auth/: testing for auth files and components/: testing for components
I wrote testing using Vitest and react-testing-library. 

I used tailwindcss for styling of App and react-toastify for displaying feedback by toast-ui. <br>
I used redux-toolkit for auth and created reusable AuthForm component for login and register pages. <br>
I saved token in cookie using js-cookie library because react has not built-in api/lib for cookie. <br>

Pages: <br>
- auth/Login: use AuthForm with validation(email, password) <br>
- auth/Register: useAuthForm with validation(role, email, password, confirm-password) <br>
- pages/Dashboard: is default page when user/admin is logged-in  <br>
- pages/Profile: display email and role <br>
- pages/Users: for admin and when current role is admin and admin can view/edit user profile <br>
- pages/ActivityLogs: for admin and current role is admin and admin can see the user activities <br>

Routes: <br>
I created app-routes and protected routes based on current user and his role <br>

I created UI as responsive and with dark mode if browser is in dark mode. <br>

Backend: <br>
I developed a very simple Node.js/Express.js server  with restAPI and jwt <br>


# Backend/API: <br>

EndPoint: "/auth/register" <br>
Method: POST <br>
body:  <br>
- role is mandatory and it's enum("user"|"admin") <br>
- email is mandatory <br>
- password is mandatory <br>
response: statusCode is number, data, message is string <br>


EndPoint: "/auth/login" <br>
  Method: POST <br>
  body:  <br>
- email is mandatory <br>
- password is mandatory <br>
  response: statusCode is number, data has token and id, message is string <br>

EndPoint: "/users/id" <br>
 Method: GET <br>
 Params: id is mandatory <br>
 Token is mandatory in headers <br>
 response: statusCode is number, data: {user data}, message is string <br>


If current user role is admin then can get the response with data. <br>
EndPoint: "/users" <br>
  Method: GET <br>
  Params: id is mandatory <br>
  Token is mandatory in headers <br>
  body: <br>
  - email is mandatory <br>
  - password is mandatory <br>
  response: statusCode is number, data:[list of users], message is string <br>

if current user role is admin then can get the response with data <br>
EndPoint: "/logs" <br>
  Method: GET <br>
  Token is mandatory in headers <br>
  response: statusCode is number, data:[list of logs], message is string. <br>

## What I would add or improve given more time? 
If I have more time then I will develop and add features like themes and languages like arabic and english and handle direction on content from right to left and <br>
I will make more testing using vitest and @testing-library/react for everything and develop or add a refresh-token in the app. <br>



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
