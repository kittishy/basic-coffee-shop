module.exports = function handler(req, res) {
  const lang = req.query?.lang === 'de' ? 'de' : 'pt-BR';
  const requestedNext = typeof req.query?.next === 'string' ? req.query.next : '/';
  const next = requestedNext.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/';

  res.setHeader(
    'Set-Cookie',
    `basic_locale=${lang}; Path=/; Max-Age=604800; SameSite=Lax; Secure`
  );
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(307, lang === 'de' ? next : '/br/');
};
