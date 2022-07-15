📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

# Week 5 Assignment: Life Tracker

Submitted by: **Ammar Fakih**

Deployed Application: [Lifetracker Deployed Site](https://ammar-tracker.surge.sh/)

## Application Features

### Core Features

- [X] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [X] If the user is logged in, it should display a **Sign Out** button. 
  - [X] If no user is logged in, it should display **Login** and **Register** buttons
  - [X] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [X] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [X] **Login Page:** A form that allows users to login with email and password.
- [X] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [X] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [X] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [X] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [X] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [X] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [X] The detailed activity page should display a feed of all previous tracked activities.
- [X] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [X] The activity tracked should be given a unique id for easy lookup.
  * [Table Schema](./api/life-tracker-schema.sql) 

### Stretch Features

Implement any of the following features to improve the application:
- [ ] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video

Link: https://www.loom.com/share/08d5b10774fc48e58011604abf99f4c2

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, I used what we learned about postgreSQL to create a database to store user data. I used what we learned about json web tokens to save a token to keep a user logged in when they leave and come back to the page. I also used bcrypt to hash the passwords for user accounts.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would attempt to fix the various bugs in the app. For example, if the user inputs invalid information, the app should show an error, telling the user what to change. I would also add some more sql queries to practice what I have learned. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I was able to show the features that work best. However, I should have showed more of the server and database capabilities with Postman.

### Open-source libraries used

- Add any links to open-source libraries used in your project.

- https://reactjs.org/
- https://chakra-ui.com/
- https://axios-http.com/
- https://lodash.com/
- https://momentjs.com/
- https://www.npmjs.com/package/react-datetime-picker
- https://www.npmjs.com/package/bcrypt
- https://www.npmjs.com/package/colors
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/morgan
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/nodemon

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

I would like to shoutout the TAs and instructors for providing us with a great education and for always helping us maximize our learning.
