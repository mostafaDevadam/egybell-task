// api/proxy.js
import fetch from 'node-fetch';
export default async (req, res) => {
  const path = req.url.replace(/^\/api/, '');
  const upstream = `${process.env.VITE_LIVE_API_URL}/${path}`; // http://...
  const response = await fetch(upstream, {
    method: req.method,
    headers: Object.fromEntries(Object.entries(req.headers).filter(([k])=>k!=='host')),
    body: ['GET','HEAD'].includes(req.method) ? undefined : req
  });
  res.status(response.status);
  response.headers.forEach((v,k)=>res.setHeader(k,v));
  response.body.pipe(res);
};
