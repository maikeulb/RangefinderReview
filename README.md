Rangefinder Review
=======

WIP Rangefinder review application where users read, comment, and post
rangefinder reviews. It's mostly complete but I need to improve the UI and add
server side validations. 

Technology
----------
* NEST (built on Express+Typescript)
* MongoDB
* MaterializeCSS

Screenshots
---------
### Main
![main](/screenshots/main.png?raw=true "Main")

### Login (local strategy + social login)
![login](/screenshots/details.png?raw=true "Details")

### Reviews
![reviews](/screenshots/reviews.png?raw=true "Reviews")

### Details
![details](/screenshots/details.png?raw=true "Details")

Run
---
Go to `app.module.ts` and point the MongoDB URI to your server and run `npm
install`.

Then run,
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
