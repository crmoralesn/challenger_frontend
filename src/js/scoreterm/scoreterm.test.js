import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react'
import ScoreTerm from "./scoreterm";

test('renders content', () => {
    const component = render(<ScoreTerm/>)
})
