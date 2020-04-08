import React from 'react';
import { mount } from 'enzyme';

// Component to test
import App from './App';

// Import Provider to wrap compoenet, redux-mock-store and middleware
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

// Import auth0 hook to make test work with mock function
import { useAuth0 } from './Auth/Auth';
// Create dummy user for test
const user = {
    email: 'johndoe@gmail.com',
    // eslint-disable-next-line babel/camelcase
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
    // eslint-disable-next-line babel/camelcase
    given_name: 'John',
};
jest.mock('./Auth/Auth');

// Create mockStore with middleware
// Also create initial state
const mockStore = configureMockStore([thunk, logger]);
const initialState = { userState: {}, itemState: [] };

describe('App in loading state', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        // Mock auth0 hook to return logged out state
        useAuth0.mockReturnValue({
            loading: true,
            isAuthenticated: false,
            user: null,
        });
    });
    it('App when loading', () => {
        // useAuth0.loading = true;
        const container = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(container.find('div').text()).toMatch('Loading...');
        container.unmount();
    });
});

describe('App in logged out state', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        // Mock auth0 hook to return logged out state
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: false,
            loginWithRedirect: jest.fn(),
            user: null,
            logout: jest.fn(),
        });
    });

    it('Navbar should have "log in" button', () => {
        const container = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(container.find('div.ml-auto').text()).toMatch('Log In');
        container.unmount();
    });
});

describe('App in logged in state', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        // Mock auth0 hook to return logged out state
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            user,
            logout: jest.fn(),
        });
    });

    it('Navbar should have User and Log Out buttons', () => {
        const container = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(container.find('div.ml-auto').text()).toMatch('John Log Out');
        container.unmount();
    });
});
