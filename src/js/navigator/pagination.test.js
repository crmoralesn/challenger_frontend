import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react'
import Pagination from "./pagination";

test('renders content', () => {
    const component = render(<Pagination/>)
})
