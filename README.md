# TODOs

-   [x] Implement user and item edit forms
-   [x] Update Home and Featured routes
-   [x] Make it possible to add images to items
-   [x] Improve UI
-   [ ] Screencasts

# Functional Specification

This will be a website a bit like _Blocket_ were a user can create an account and log in, using a Google account.

Users can use the sites functions of adding items for sale or browsing for other items to buy from other users. Users can also "star" or "like" items to keep track of them.

The items are added to a MongoDB database that's created to keep track of the items on the site. The users are also added to the database when logged in. Images added to items or to users are sent to Cloudinary and stored there, with the MongoDB database holding the URL to the images for respective item or user.

# Technical Specification

-   **Frontend:** The site uses _React_, _Redux_ and _react-bootstrap_ along with _Webpack_ with _Babel_ to bundle the code to one minified output file and compile ES6 code.

-   **Backend:** The site uses _Node.js_ with _Express.js_, _MongoDB_ with _Mongoose_ for managing the sites data, _Cloudinary_ to store images and _Auth0_ to integrate Google signin.

-   **Testing** Some component tests has been written with _Jest_ and _Enzyme_ and more will probably be written a bit later.
