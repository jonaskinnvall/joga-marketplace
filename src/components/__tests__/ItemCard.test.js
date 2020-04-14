import React from 'react';
import { mount } from 'enzyme';
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

const testItem = {
    userID: '2147627834623744883746',
    category: 'Toys',
    user: 'John Doe',
    title: 'Item Test',
    desc: 'Testing item',
    creationDate: '2020-04-02T13:47:30.550+00:00',
};

const mockStore = configureMockStore([thunk, logger]);
const initialState = { userState: {}, itemState: [testItem] };

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
        const container = mount(
            <Provider store={store}>
                <ItemCard item={store.getState().itemState[0]} />
            </Provider>
        );
        expect(container.find(ItemCard).prop('item')).toMatchObject(testItem);
        container.unmount();
    });
});
