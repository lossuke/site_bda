import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { isBlogPostListed } from '../utils/blog-visibility';

export async function GET(context) {
	const now = new Date();
	const posts = await getCollection('blog', ({ data }) => isBlogPostListed(data.pubDate, now));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
