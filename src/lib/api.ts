import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  },
});

export interface NotesResponse {
  docs: Note[];
  totalDocs?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
}

// Отримати всі нотатки
export const fetchNotes = async (): Promise<NotesResponse> => {
  const res = await api.get<{ notes: Note[] }>('/notes');
  return { docs: res.data.notes };
};

// Отримати нотатку по id
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

// Створити нотатку
export const createNote = async (
  payload: { title: string; content?: string; tag?: string }
): Promise<Note> => {
  const res = await api.post<Note>('/notes', payload);
  return res.data;
};

// Видалити нотатку
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};