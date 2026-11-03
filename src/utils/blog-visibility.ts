// La date de publication est comparée par jour, dans le fuseau du BDA,
// indépendamment du fuseau du serveur qui génère le site.
const parisDayFormatter = new Intl.DateTimeFormat('fr-FR', {
	timeZone: 'Europe/Paris',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
});

function parisDay(date: Date): string {
	const parts = Object.fromEntries(
		parisDayFormatter.formatToParts(date).map(({ type, value }) => [type, value]),
	);
	return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isBlogPostListed(pubDate: Date, now = new Date()): boolean {
	return parisDay(pubDate) <= parisDay(now);
}
