import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserInfoPage } from './UserInfoPage';
import { USERS, PLAYLISTS } from '../../data';
import '@testing-library/jest-dom';

jest.mock('../../data', () => ({
    USERS: [
        {
            id: 0,
            email: 'test@example.com',
            fullName: 'Test User',
            jobTitle: 'Test Job',
            avatar: 'test.jpg',
            bio: 'Test bio.',
            playlist: { id: 0, name: 'Test Playlist' },
        },
    ],
    PLAYLISTS: [{ id: 0, name: 'Test Playlist' }],
}));

describe('UserInfoPage', () => {
    it('Отображает текст по умолчанию, если нет пользователя', () => {
        render(
            <MemoryRouter initialEntries={['/users/1']}>
                <Routes>
                    <Route path="/users/:userId" element={<UserInfoPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('пользователя таким userId нет')).toBeInTheDocument();
    });

    it('Отображает данные о пользователе, если он существует (email, имя, ссылка на плейлист)', () => {
        render(
            <MemoryRouter initialEntries={['/users/0']}>
                <Routes>
                    <Route path="/users/:userId" element={<UserInfoPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Test Job')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Test bio.')).toBeInTheDocument();
        expect(screen.getByText('Плейлист:')).toBeInTheDocument();
        expect(screen.getByText('Test Playlist')).toBeInTheDocument();
    });
});