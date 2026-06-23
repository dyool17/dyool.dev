import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../consts';
import { LOCALE_META } from '../../i18n';

// Spanish RSS feed. Filters posts to lang='es'. The English feed is at
// /rss.xml and filters to lang='en' instead.
export async function GET(context) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft && data.lang === 'es')
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE.title} — Blog`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      // IDs for Spanish posts are namespaced `es/<slug>`; strip the prefix
      // so the link in the feed matches the public URL.
      link: `/es/blog/${post.id.replace(/^es\//, '')}/`,
      categories: post.data.tags,
      author: SITE.author,
    })),
    customData: `<language>${LOCALE_META.es.rssLang}</language>`,
    stylesheet: false,
  });
}
