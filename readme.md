# Hansons Landing Page

The entire application is built with Vue.js. It has form validation and a single-page app functionality.

The app collects the data across all of the steps, and puts it into an object. You can see the object 
at the top of the application (go to /scripts/app.js).

When the collected data is picked up and validated, the app will send a POST request with the data object
to a custom endpoint URL that you can change at the top of the app (endPointURL).

You can also change the text, regex patterns (for validation), and error messages for every step.
Everything is in the formStepData array.