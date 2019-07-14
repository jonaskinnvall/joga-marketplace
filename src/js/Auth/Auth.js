import auth0 from "auth0-js";
import history from "../history";

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: "jonaskinnvall.eu.auth0.com",
            clientID: "58axYvh5bZ5gW8n88k4VNKdStKlISkDc",
            redirectUri: "http://localhost:3000/callback",
            responseType: "token id_token",
            scope: "openid profile"
        });
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) {
                    history.replace("/");
                    return reject(err);
                }
                if (!authResult || !authResult.idToken) {
                    history.replace("/");
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                // set the time that the id token will expire at
                this.expiresAt = authResult.idTokenPayload.exp * 1000;
                resolve();
            });
        });
    }

    // handleAuthentication() {
    //     this.auth0.parseHash((err, authResult) => {
    //       if (authResult && authResult.accessToken && authResult.idToken) {
    //         this.setSession(authResult);
    //       } else if (err) {
    //         history.replace("/");
    //         console.log(err);
    //         alert(`Error: ${err.error}. Check the console for further details.`);
    //       }
    //     });
    // }

    // setSession(authResult) {
    //     // Set isLoggedIn flag in localStorage
    //     localStorage.setItem("isLoggedIn", "true");

    //     // Set the time that the access token will expire at
    //     let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    //     this.accessToken = authResult.accessToken;
    //     this.idToken = authResult.idToken;
    //     this.expiresAt = expiresAt;

    //     // navigate to the home route
    //     history.replace("/");
    // }

    // renewSession() {
    //     this.auth0.checkSession({}, (err, authResult) => {
    //        if (authResult && authResult.accessToken && authResult.idToken) {
    //          this.setSession(authResult);
    //        } else if (err) {
    //          this.logout();
    //          console.log(err);
    //          alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
    //        }
    //     });
    //   }

    logout() {
        // clear id token, profile, and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client;
