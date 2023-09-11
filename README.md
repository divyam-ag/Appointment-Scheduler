# Appointment-Scheduler

Description:

The Appointment Scheduler is a web application designed to simplify and streamline the process of scheduling and managing appointments. It provides a  platform for users to schedule appointments with others, view their upcoming appointments, and manage their availability. The application offers the following key features:

User Registration and Authentication: Users can sign up and log in to the application, ensuring secure access to appointment scheduling features.

Scheduling Appointments: Users can schedule appointments with other users on the platform. Appointments include details such as title, agenda, time, and the guest with whom the appointment is scheduled. The scheduling process checks the guest's availability to prevent conflicts.

Upcoming Appointments: Users can easily view their upcoming appointments, helping them stay organized and prepared.

Profile Management: Users have the ability to update their profile information, including their name and password, from their profile page.

Availability Management: Users can mark their off-hours on their profile page, indicating times when they are not available for appointments during the day.

Advanced Scheduling Logic: The application includes advanced scheduling logic to prevent overlapping appointments and ensure a smooth scheduling experience.


API LOGIC FLOW:

Sign Up:

The user first needs to sign up using the signup api. Upon signin users details are stored in the user collection.
The username and emailid are set to be unique in db and ccannot have duplicate entries.

Login:

Then the user needs to login using the login api. Only a signed-up user is allowed to login. Upon successful login a token is returend in response.
This token is used for authentication for other apis.
This token has an expiry of 1 hour. After 1 hour uer needs to re-login.


Appointment Scheduling

In the Schedule Api, the schedulerId is meant to be user's username and thus unique. It is used to authorize the user. If the schedulerId provided does not match with the username attached to the auth token at the time of login, the user is unauthorized.
The guestId is meant to be the guest's unique username.