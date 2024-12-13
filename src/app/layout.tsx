import type {Metadata} from 'next'
import {Geist} from 'next/font/google'

import '@/styles/globals.scss'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Sudoku',
	description: 'Neon vibes with sudoku!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} antialiased`}>{children}</body>
		</html>
	)
}
