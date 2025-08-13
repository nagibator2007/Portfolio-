import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { UsersPage } from './UsersPage';
import { USERS } from '../../data';
import '@testing-library/jest-dom';

jest.mock('../../data', () => ({
    USERS: [
        { id: 0, fullName: 'Test User' },
        { id: 1, fullName: 'Another User' },
    ],
}));

const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(() => [new URLSearchParams(), mockSetSearchParams]),
}));


describe('UsersPage', () => {
    beforeEach(() => {
        mockSetSearchParams.mockClear();
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    });

    it('вызывает метод setSearchParam из react-router-dom при вводе имени пользователя', () => {
        render(
            <MemoryRouter initialEntries={['/users']}>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const inputElement = screen.getByLabelText('введите имя');
        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
        expect(mockSetSearchParams).toHaveBeenCalledWith({ searchName: 'test' });
    });

    it('фильтрует пользователей по введенному имени', () => {
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('searchName=test'), mockSetSearchParams]);

        render(
            <MemoryRouter initialEntries={['/users?searchName=test']}>
                <Routes>
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </MemoryRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links.length).toBe(1);
        expect(links[0]).toHaveTextContent('Test User');
    });
});