import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('Footer test', () => {
    it('Footer renders', () => {
        shallow(<Footer />);
    });
});
