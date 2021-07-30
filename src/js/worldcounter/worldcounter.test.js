import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react'
import WordCounter from "./WordCounter";

test('renders content', () => {
    const component = render(<WordCounter/>)
})
