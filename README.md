Rangefinder Review
=======

WIP Rangefinder review application where users read, comment, and post
rangefinder reviews. It's mostly complete but I need to improve the UI and add
server side validations. The application framework is Nest, which is basically
Express + Typescript with routed controllers and dependency injection, with
a structure similar to Angular.

Technology
----------
* Nest
* MongoDB
* Rellax
* MaterializeCSS

Screenshots
---------
### Main
![main](/screenshots/main.png?raw=true "Main")

### Login 
Both local strategy and social strategy logins are supported.
![login](/screenshots/login.png?raw=true "Details")

### Reviews
Contribute to reviews or browse the catalog.
![reviews](/screenshots/reviews.png?raw=true "Reviews")

### Details
Feel free to comment on any review.
![details](/screenshots/details.png?raw=true "Details")

Run
---
Go to `app.module.ts` and point the MongoDB URI to your server and run `npm
install`.

Then run:
```
npm start
Go to http://localhost:3000
```

TODO
----
Improve UI (minor things are not working right)  
Improve Dockerfile (webpack is giving me grief)  
Add image preview (for posting reviews)  
Fix Edit features (anyone can edit anyone's review/comments)
