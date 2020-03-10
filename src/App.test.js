describe('Examining the syntax of Jest', () => {
    it('Sums number', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
// Component to test
import App from './App';
// Import auth0 hook to make test wotk with mock function
import { useAuth0 } from './Auth/Auth';

// Create dummy user for test
const user = {
    email: 'johndoe@gmail.com',
    // eslint-disable-next-line babel/camelcase
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746'
};

jest.mock('./Auth/Auth');

// TODO: Fix mock functions for useDispatch and useSelector
// for test to work with Redux

describe('First App test', () => {
    beforeEach(() => {
        // Mock auth0 hook to return the dummy user as logged in
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            user,
            logout: jest.fn()
        });
    });

    it('App renders without crashing', () => {
        shallow(<App />);
    });
});
