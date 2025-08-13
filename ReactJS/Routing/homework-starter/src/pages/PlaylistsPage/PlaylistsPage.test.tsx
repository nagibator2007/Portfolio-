import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import { PlaylistsPage } from './PlaylistsPage';
import { PLAYLISTS } from '../../data';
import '@testing-library/jest-dom';

jest.mock('../../data', () => ({
    PLAYLISTS: [
        { id: 0, name: 'Test Playlist', genre: 'Rock' },
        { id: 1, name: 'Another Playlist', genre: 'Pop' },
    ],
}));

const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(() => [new URLSearchParams(), mockSetSearchParams]),
}));

describe('PlaylistsPage', () => {
    beforeEach(() => {
        mockSetSearchParams.mockClear();
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    });

    it('вызывает метод setSearchParam при вводе жанра', () => {
        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        const inputElement = screen.getByLabelText('введите жанр');
        fireEvent.change(inputElement, { target: { value: 'rock' } });

        expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
        expect(mockSetSearchParams).toHaveBeenCalledWith({ searchGenre: 'rock', searchName: '' });
    });

    it('вызывает метод setSearchParam при вводе названия', () => {
        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        const inputElement = screen.getByLabelText('введите название');
        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
        expect(mockSetSearchParams).toHaveBeenCalledWith({ searchName: 'test', searchGenre: '' });
    });

    it('фильтрует плейлисты по введенному жанру и названию', () => {
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('searchGenre=rock&searchName=test'), mockSetSearchParams]);

        render(
            <MemoryRouter initialEntries={['/playlists?searchGenre=rock&searchName=test']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        const links = screen.getAllByRole('link');
        expect(links.length).toBe(1);
        expect(links[0]).toHaveTextContent('- Test Playlist');
    });
});