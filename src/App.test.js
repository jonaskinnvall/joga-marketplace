describe('Examining the syntax of Jest', () => {
    it('Sums number', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
    });
});

import React from 'react';
import { shallow } from 'enzyme';

// Component to test and reducer for mockStore
import App from './App';
import reducer from './reducers/userReducer';

// Import auth0 hook to make test wotk with mock function
// Import Redux store to mock
import { useAuth0 } from './Auth/Auth';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

// Create dummy user for test
const user = {
    email: 'johndoe@gmail.com',
    // eslint-disable-next-line babel/camelcase
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746'
};
jest.mock('./Auth/Auth');

// Middlewares for mockStore
const middlewares = [thunk, logger];

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
        const mockStore = createStore(reducer, middlewares);
        shallow(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
    });
});
