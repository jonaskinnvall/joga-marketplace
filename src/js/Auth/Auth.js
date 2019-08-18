import auth0 from 'auth0-js';
import history from '../history';
import { AUTH_VAR } from '../../../auth-var.json';

class Auth {
    accessToken;
    idToken;
    expiresAt;
    userProfile;

    auth0 = new auth0.WebAuth({
        domain: AUTH_VAR.domain,
        clientID: AUTH_VAR.clientID,
        redirectUri: AUTH_VAR.redirectUri,
        audience: AUTH_VAR.audience,
        responseType: AUTH_VAR.responseType,
        scope: AUTH_VAR.scope
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login() {
        console.log('Login ex: ', this.expiresAt);
        this.auth0.authorize({
            redirectUri: AUTH_VAR.redirectUri
            // connection: 'google-oauth2'
        });
        // this.auth0.authorize({
        //     redirectUri: AUTH_VAR.redirectUri
        // });
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                // history.replace('/');
            } else if (err) {
                history.replace('/');
                console.log(err);
                alert(
                    `Error: ${
                        err.error
                    }. Check the console for further details.`
                );
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        console.log('Ex at sesh: ', this.expiresAt);
        console.log('Time at sesh: ', new Date().getTime());

        // Navigate to the home route
        history.replace('/');

        // Set the time that the access token will expire at
        // let expiresAt = JSON.stringify(
        //     authResult.expiresIn * 1000 + new Date().getTime()
        // );
        // localStorage.setItem('access_token', authResult.accessToken);
        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem('expires_at', expiresAt);
        // // navigate to the home route
        // history.replace('/');
    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(
                    `Could not get a new token (${err.error}: ${
                        err.error_description
                    }).`
                );
            }
        });
    }

    getProfile() {
        return this.profile;
    }

    // getProfile(cb) {
    //     this.auth0.client.userInfo(this.accessToken, (err, profile) => {
    //         if (profile) {
    //             this.userProfile = profile;
    //         }
    //         cb(err, profile);
    //     });
    // }

    logout() {
        // clear id token, profile, and expiration
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('id_token');
        // localStorage.removeItem('expires_at');
        // console.log('Logout ex', this.expiresAt);

        // clear id token, profile, and expiration
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove user profile
        this.userProfile = null;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        this.auth0.logout({
            // returnTo: window.location.origin,
            clientID: AUTH_VAR.clientID
        });
        console.log('logout', this.expiresAt);

        // Navigate to the home route
        history.replace('/');
    }

    isAuthenticated() {
        // console.log('isAuth', this.expiresAt);
        // let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // return new Date().getTime() < expiresAt;

        console.log('Ex at auth: ', this.expiresAt);
        console.log('Time at auth: ', new Date().getTime());

        let expiresAt = this.expiresAt;
        console.log('Ex at auth2: ', expiresAt);

        return new Date().getTime() < expiresAt;
    }
}

export default Auth;

// const auth0Client = new Auth();
// export default auth0Client;
