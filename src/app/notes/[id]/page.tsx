import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function NoteDetailsPage({ params }: PageProps) {
 
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    throw new Error('Note id is missing');
  }

  const queryClient = new QueryClient();

 
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NoteDetailsClient
      noteId={id}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}