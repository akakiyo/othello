import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
  it('Next Turn Player', () => {

    render(<App />);
    screen.debug();
  })
})