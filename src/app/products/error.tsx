'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem',
      backgroundColor: 'hsl(var(--background))',
      textAlign: 'center',
    }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
          Oups !
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
          Cette page n'a pas pu se charger correctement.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '0.875rem 1.75rem',
            backgroundColor: 'hsl(var(--primary))',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Réessayer
        </button>
        <Link
          href="/products"
          style={{
            padding: '0.875rem 1.75rem',
            backgroundColor: 'transparent',
            color: 'hsl(var(--primary))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
