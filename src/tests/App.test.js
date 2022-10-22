import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import renderWithContext from './renderWIth';

describe('Testando aplicação Star Wars', () => {
  it('Testa chamada da API e usuabilidade', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />);
    });

    const select = screen.getByTestId('column-filter');
    const selectTwo = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btn = screen.getByTestId('button-filter');

    const number1 = 20000;
    userEvent.selectOptions(select, ['population']);
    userEvent.selectOptions(selectTwo, ['maior que']);
    userEvent.type(value, number1);
    userEvent.click(btn);
    const text = screen.findByRole('cell', { name: /tatooine/i });
    expect(text).toBeDefined();

    const number2 = 4000;
    userEvent.selectOptions(select, ['orbital_period']);
    userEvent.selectOptions(selectTwo, ['maior que']);
    userEvent.type(value, number2);
    userEvent.click(btn);
    const textTwo = screen.findByRole('cell', { name: /yavin iv/i });
    expect(textTwo).toBeDefined();

    const number3 = 23;
    userEvent.selectOptions(select, ['rotation_period']);
    userEvent.selectOptions(selectTwo, ['menor que']);
    userEvent.type(value, number3);
    userEvent.click(btn);
    const textThree = screen.findByRole('cell', { name: /bespin /i });
    expect(textThree).toBeDefined();

    const number4 = 7200;
    userEvent.selectOptions(select, ['diameter']);
    userEvent.selectOptions(selectTwo, ['igual a']);
    userEvent.type(value, number4);
    userEvent.click(btn);
    const textFour = screen.findByRole('cell', { name: /hoth/i });
    expect(textFour).toBeDefined();
  });
});
