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
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const res = await api.get('/notes', {
    params,
  });

  return {
    docs: res.data.notes,
    totalDocs: res.data.totalDocs,
    limit: res.data.limit,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (payload: { title: string; content?: string; tag?: string }): Promise<Note> => {
  const res = await api.post<Note>('/notes', payload);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};