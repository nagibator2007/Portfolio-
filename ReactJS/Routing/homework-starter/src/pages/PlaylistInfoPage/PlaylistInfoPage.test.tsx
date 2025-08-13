import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PLAYLISTS } from '../../data';
import '@testing-library/jest-dom';
import { PlaylistInfoPage } from './PlaylistInfoPage';

describe('PlaylistInfoPage', () => {
    it('Должно отображаться «Такого плейлиста нет», когда плейлист не найден', () => {
        render(
            <MemoryRouter initialEntries={['/playlists/999']}>
                <Routes>
                    <Route path="/playlists/:playlistId" element={<PlaylistInfoPage />} />
                </Routes>
            </MemoryRouter>
        );

        const element = screen.queryByText('Такого плейлиста нет');
        expect(element).not.toBeNull();
    });

    it('Отображает данные о плейлисте, если он доступен (жанр, название, количестве песен в списке)', () => {
        render(
            <MemoryRouter initialEntries={['/playlists/0']}>
                <Routes>
                    <Route path="/playlists/:playlistId" element={<PlaylistInfoPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Проверяем жанр
        expect(screen.getByText('Жанр:')).toBeInTheDocument();
        expect(screen.getByText('Rock')).toBeInTheDocument();

        // Проверяем название
        expect(screen.getByText('Название: Great Rock Hits')).toBeInTheDocument();

        // Проверяем количество песен
        const songItems = screen.getAllByRole('listitem');
        expect(songItems.length).toBe(20);
    });
});