'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import { fetchNotes, type NotesResponse } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './NotesClient.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setSearch(value);
      }, 500),
    []
  );

  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes({ page, perPage, search })
  });

  const notes = data?.docs ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearch} />
        <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
        <button className={css.createButton} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.notesGrid}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Something went wrong.</p>}
        {!isLoading && !error && <NoteList notes={notes} />}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onSuccess={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}