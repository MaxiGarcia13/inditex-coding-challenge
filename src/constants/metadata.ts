import type { Metadata } from 'next';
import process from 'node:process';

const title = 'Inditex Coding Challenge';
const description = 'Inditex Coding Challenge by Inditex';
const image = `${process.env.APP_URL}/logo.png`;

export const APP_METADATA: Metadata = {
  title: 'Inditex Coding Challenge',
  description: 'Inditex Coding Challenge by Inditex',
  openGraph: {
    title,
    description,
    images: image ? [image] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: image ? [image] : [],
  },
};
