
# Setup

Install Node.js from [nodejs.org](https://nodejs.org/en/download)

Terminal: git clone https://github.com/mostafaDevadam/egybell-task.git. <br>

## Repo branches:<br>
- frontend: React
- backend: NodeJS/ExpressJS
- frontend-v2(Bonus): has a new features like refresh-token, Internationalization (i18n) and Theme. <br>

In project folder:

Using git switch to branch frontend: <br>
Terminal: git switch frontend <br>
create .env file add a variable for api url in it <br>
Use variables like in ./src/env.d.ts <br>
Define the same names of variables in .env like variables from ./src/env.d.ts <br>
Terminal: npm i  <br>

Run frontend: <br>

Terminal: npm run dev

test frontend:

Terminal: npm run test


Using git switch to branch backend: <br>
Terminal: git switch backend <br>
create .env file and add PORT and EXPRIES_IN variables in it. <br>

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

[task-api.postman_collection.json](https://github.com/mostafaDevadam/egybell-task/blob/frontend/task-api.postman_collection.json): postman collection for api/ednpoints

I used tailwindcss for styling of App and react-toastify for displaying feedback by toast-ui. <br>
I used redux-toolkit for auth and created reusable AuthForm component for login and register pages. <br>
I saved token in cookie. <br>

## Pages: <br>
- auth/Login: use AuthForm with validation(email, password) <br>
- auth/Register: useAuthForm with validation(role, email, password, confirm-password) <br>
- pages/Dashboard: is default page when user/admin is logged-in  <br>
- pages/Profile: display email and role <br>
- pages/Users: for admin and when current role is admin and admin can view/edit user profile <br>
- pages/ActivityLogs: for admin and current role is admin and admin can see the user activities <br>

Routes: <br>
I created app-routes and protected routes based on current user and his role <br>

I created UI as responsive and with dark mode if browser is in dark mode. <br>

## Testing: <br>
./test/auth/: testing for auth files. <br>
./test/components/: testing for components and based on auth and components in frontend branch. <br>
I wrote testing using Vitest and react-testing-library. <br>



# Backend: <br>

I developed a very simple Node.js/Express.js server  with restAPI and jwt <br>

## API: <br>

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

EndPoint: "/users" <br>
  Method: GET <br>
  Params: id is mandatory <br>
  Token is mandatory in headers <br>
  body: <br>
  - email is mandatory <br>
  - password is mandatory <br>
  response: statusCode is number, data:[list of users], message is string <br>
description: If current user role is admin then can get the response with data. <br>


EndPoint: "/logs" <br>
  Method: GET <br>
  Token is mandatory in headers <br>
  response: statusCode is number, data:[list of logs], message is string. <br>
description: if current user role is admin then can get the response with data. <br>

## What I would add or improve given more time? 
If I have more time then I will develop and add features like allow admin to create and assign permissions and roles for users <br>
I will make more testing using vitest and @testing-library/react for everything and develop or add a refresh-token in the app. <br>
