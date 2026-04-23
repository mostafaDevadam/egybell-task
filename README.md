
# Setup

Install Node.js from

Terminal: git clone <link-of-repo>

In project folder:
Using git switch to branch frontend: 
create .env file add a variable for api url in it
Terminal: npm i 

Run frontend:
Terminal: npm run dev

test frontend:
Terminal: npm run test


Using git switch to branch backend:
create .env file and add PORT variable in it
Terminal: npm i 

Run backend:
Terminal: npm run start

Frontend folders:
./src/
actions
api
assets
auth
components/: buttons/, data-tables/, forms/, layouts/, view/
lib
pages
routes
store
App.tsx
custom.d.ts: to impoting css/scss/sass files in react pages or components 
enum.ts
types.ts

./test/auth: testing for auth files

I used tailwindcss for styling of App and react-toastify for displaying feedback by toast-ui
I used redux-toolkit for auth and created reusable AuthForm component for login and register pages.
I saved token in cookie using js-cookie library because react has not built-in api/lib for cookie.

Pages:
auth/Login: use AuthForm with validation(email, password)
auth/Register: useAuthForm with validation(role, email, password, confirm-password)
pages/Dashboard: is default page when user/admin is logged-in 
pages/Profile: display email and role
pages/Users: for admin and when current role is admin and admin can view/edit user profile
pages/ActivityLogs: for admin and current role is admin and admin can see the user activities

Routes:
I created app-routes and protected routes based on current user and his role

I created UI as responsive and with dark mode if browser is in dark mode

Backend:
I developed a very simple Node.js/Express.js server  with restAPI and jwt


Backend/API:

EndPoint: "/auth/register"
Method: POST
body: 
role is mandatory and it's enum("user"|"admin")
email is mandatory
password is mandatory
response: statusCode is number, data, message is string


EndPoint: "/auth/login"
Method: POST
body: 
email is mandatory
password is mandatory
response: statusCode is number, data has token and id, message is string

EndPoint: "/users/id"
Method: GET
Params: id is mandatory
Token is mandatory in headers
response: statusCode is number, data: {user data}, message is string


if current user role is admin then can get the response with data
EndPoint: "/users"
Method: GET
Params: id is mandatory
Token is mandatory in headers
body: 
email is mandatory
password is mandatory
response: statusCode is number, data:[list of users], message is string

if current user role is admin then can get the response with data
EndPoint: "/logs"
Method: GET
Token is mandatory in headers
response: statusCode is number, data:[list of logs], message is string


If I have more time then I will develop and features themes and languages like arabic and english and handle direction on content from righ to left and 
I will make more testing using vitest/react-test for everything and develop or add a refresh-token in the app.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
