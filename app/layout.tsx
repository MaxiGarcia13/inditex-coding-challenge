import { author } from '@package-json';
import { AppHeader } from '@/components/app-header';
import { QueryClientProvider } from '@/components/query-client-provider';
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content={author} />
      </head>
      <body>
        <AppHeader />

        <main>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
