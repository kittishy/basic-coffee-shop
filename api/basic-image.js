const SOURCES = {
  hero: {
    token: 'IMG_0298',
    fallback: '/assets/images/basic-hero.webp',
  },
  story: {
    token: '293833908_121356587273499_6248779579633607898_n',
    fallback: '/assets/images/basic-brunch.webp',
  },
  location2: {
    token: 'Location_2',
    fallback: '/assets/images/basic-hero.webp',
  },
  location3: {
    token: 'Location_3',
    fallback: '/assets/images/basic-brunch.webp',
  },
  location6: {
    token: 'Location_6',
    fallback: '/assets/images/basic-hero.webp',
  },
};

const PAGES = [
  'https://www.basiccoffee-kitchen-bar.com/',
  'https://www.basiccoffee-kitchen-bar.com/basic-kitchen',
  'https://www.basiccoffee-kitchen-bar.com/basic-bar',
];

function normalizeHtml(html) {
  return html
    .replace(/\\u0026/gi, '&')
    .replace(/&amp;/gi, '&')
    .replace(/\\\//g, '/');
}

function findImageUrl(html, token) {
  const normalized = normalizeHtml(html);
  const matches = normalized.match(/https:\/\/le-cdn\.website-editor\.net\/[^\s"'<>]+/gi) || [];
  const exact = matches.find(url => url.includes(token));
  if (!exact) return null;
  return exact.replace(/[),;]+$/g, '');
}

module.exports = async function handler(req, res) {
  const key = typeof req.query?.key === 'string' ? req.query.key : '';
  const source = SOURCES[key];

  if (!source) {
    res.status(400).json({ error: 'Unknown image key' });
    return;
  }

  try {
    let imageUrl = null;

    for (const page of PAGES) {
      const pageResponse = await fetch(page, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BasicCoffeeImageProxy/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
      });

      if (!pageResponse.ok) continue;
      const html = await pageResponse.text();
      imageUrl = findImageUrl(html, source.token);
      if (imageUrl) break;
    }

    if (!imageUrl) {
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
      res.redirect(307, source.fallback);
      return;
    }

    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BasicCoffeeImageProxy/1.0)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!imageResponse.ok) {
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
      res.redirect(307, source.fallback);
      return;
    }

    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(buffer);
  } catch (error) {
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.redirect(307, source.fallback);
  }
};
