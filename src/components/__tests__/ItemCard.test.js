import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import ItemCard from '../ItemCard';

// Import auth0 hook to make test work with mock function
import { useAuth0 } from '../../Auth/Auth';
// Create dummy user for test
const user = {
    email: 'johndoe@gmail.com',
    // eslint-disable-next-line babel/camelcase
    email_verified: true,
    sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('../../Auth/Auth');

const mockStore = configureMockStore([thunk, logger]);
const initialState = { userState: {}, itemState: [] };

describe('ItemCard test', () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
        useAuth0.mockReturnValue({
            loading: false,
            isAuthenticated: true,
            loginWithRedirect: jest.fn(),
            user,
            logout: jest.fn(),
        });
    });
    it('ItemCard renders', () => {
        shallow(
            <Provider store={store}>
                <ItemCard />
            </Provider>
        );
    });
});
