import fs from 'node:fs';
import path from 'node:path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const p = path.join(process.cwd(), 'data', 'products.json');
  let data = { ok: true, store: 'sunnyeora.myshopify.com', total: 0, products: [] };
  if (fs.existsSync(p)) {
    try {
      data = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {}
  }

  res.status(200).json(data);
}
