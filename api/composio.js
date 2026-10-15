import fs from 'node:fs';
import path from 'node:path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const p = path.join(process.cwd(), 'data', 'composio.json');
  let data = { ok: true, configured: false, maskedKey: null, dashboardUrl: 'https://dashboard.composio.dev/' };
  if (fs.existsSync(p)) {
    try {
      data = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {}
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    if (body.apiKey) {
      data.configured = true;
      data.maskedKey = body.apiKey.length > 8 ? `${body.apiKey.slice(0, 4)}...${body.apiKey.slice(-4)}` : 'configured';
      try {
        fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
      } catch (e) {}
    }
    return res.status(200).json({ ok: true, configured: true });
  }

  res.status(200).json(data);
}
