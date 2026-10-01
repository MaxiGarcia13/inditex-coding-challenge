import { author } from '@package-json';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const description = `Inditex Coding Challenge by ${author}`;

  return (
    <html lang="en">
      <head>
        <title>Inditex Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
      </head>
      <body>{children}</body>
    </html>
  );
}
