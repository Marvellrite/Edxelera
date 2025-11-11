# PROJECT GUIDE

1. run `npm install` or `npm i` to install all the packages in the project set-up.

2. check the depentencies in [package.json](package.json) to know which dependencies are installed.

3. use [react-hook-form](https://react-hook-form.com) which i've already installed to build the form plus client-side form validation.

4. the [hooks](/app//hooks) folder is where you have to define custom hooks

PS: All layout files should not be edited, without permission.(if for any reason you might need to edit the layout file, please let me know.)

---

## API END POINTS
### AUTH

POST /auth/signin
POST /auth/signup
POST /auth/signout
POST /auth/forgotten-password
POST /auth/otp
POST /auth/resend-otp

### USERS
GET /USERS
GET /users/me  (protected)
PATCH /users/:_id/edit  (protected)
DELETE /users/:_id/delete  (protected)

### PAYMENT
POST /payment
POST /payment/:_id/