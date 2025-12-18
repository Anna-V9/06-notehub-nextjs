'use client';

interface Props {
  reset?: () => void;
}

export default function NoteDetailsError({ reset }: Props) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Oops!</h2>
      <p>Something went wrong while loading this note.</p>
      {reset && (
        <button
          onClick={reset}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none'
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}