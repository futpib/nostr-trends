import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'

interface TrendsWordResponse {
	word: string;
	count: number;
}

interface TrendsResponse {
	words: TrendsWordResponse[];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const response = await fetch('https://nostr-trends.dkeysil.com/trends');
	const trends = await response.json();

	return {
		props: {
			trends,
		},
	}
}

export default function Home({
	trends,
}: {
	trends: TrendsResponse;
}) {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<ul>
					{trends.words.map((word, index) => (
						<li
							key={index}
						>
							{word.count}
							{' '}
							{word.word}
						</li>
					))}
				</ul>
			</main>
		</>
	)
}
