// api/proxy/[...path].js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const paths = req.query.path || [];
  const path = Array.isArray(paths) ? paths.join('/') : paths;
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const upstreamBase = process.env.VITE_LIVE_API_URL.replace(/\/$/, ''); // e.g. "http://egdashboard.eu-4.evennode.com"
  const upstreamUrl = `${upstreamBase}/${path}${query}`;

  const headers = { ...req.headers };
  delete headers.host;

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    // for non-GET/HEAD forward body as a stream
    body: ['GET','HEAD'].includes(req.method) ? undefined : req
  });

  res.status(upstreamRes.status);
  upstreamRes.headers.forEach((v, k) => {
    const lk = k.toLowerCase();
    if (!['transfer-encoding', 'connection', 'content-encoding'].includes(lk)) {
      res.setHeader(k, v);
    }
  });
  upstreamRes.body.pipe(res);
}
