import fs from 'node:fs';
import path from 'node:path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const p = path.join(process.cwd(), 'data', 'health.json');
  let data = {};
  if (fs.existsSync(p)) {
    data = JSON.parse(fs.readFileSync(p, 'utf8'));
  }

  res.status(200).json({
    ...data,
    providerConfigured: !!process.env.GEMINI_API_KEY || data.providerConfigured,
    composioConfigured: !!process.env.COMPOSIO_API_KEY || data.composioConfigured
  });
}
