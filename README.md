# TODOs

-   [x] Implement user and item edit forms
-   [x] Update Home and Featured routes
-   [x] Make it possible to add images to items
-   [ ] Write more component tests
-   [ ] Improve UI
-   [ ] Deploy site
-   [ ] Screencasts

# Functional Specification

This will be a website like _Blocket_ were a user can create an account and log in by using a Google account. Log in with other accounts, e.g. Facebook, or with regular e-mail and password may be implemented later, but Google sign in works good and will be the only option for now at least.

Users can use the sites functions of adding items for sale or browsing for other items to buy from other users. Users can also "star" or "like" items to keep track of them.

The items will be added to a database that's created to keep track of the items on the site. The users are also added to the database when logged in.

# Technical Specification

-   **Frontend:** The site uses _React_, _Redux_ and _react-bootstrap_ along with _Webpack_ with _Babel_ to bundle the code to one minified output file and compile ES6 code.

-   **Backend:** The site uses _Node.js_ with _Express.js_, _MongoDB_ with _Mongoose_ for managing the sites data and _Auth0_ to integrate Google signin.

-   **Testing** Some component tests has been written with _Jest_ and _Enzyme_ and more will probably be written a bit later.
