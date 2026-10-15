import fs from 'node:fs';
import path from 'node:path';

const deptLeads = {
  emails: 'elead',
  sales: 'lexi',
  marketing: 'mlead',
  ops: 'olead',
  fin: 'alead',
  delivery: 'dlead'
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const p = path.join(process.cwd(), 'data', 'routines.json');
  let data = { routines: [], depts: ['emails', 'fin', 'sales'], path: 'brain/Agents Office/routines.json', problems: [] };
  if (fs.existsSync(p)) {
    try {
      data = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {}
  }

  // DELETE
  if (req.method === 'DELETE' || req.query?.id) {
    const id = req.query?.id || req.body?.id;
    if (id) {
      data.routines = data.routines.filter(r => r.id !== id);
      try {
        fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
      } catch (e) {}
    }
    return res.status(200).json({ ok: true });
  }

  // POST
  if (req.method === 'POST') {
    const body = req.body || {};
    const dept = body.dept || 'sales';
    const text = body.text || 'Automated routine';
    const when = body.when || { kind: 'daily', at: '09:00' };

    const newRoutine = {
      id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30) || `routine-${Date.now()}`,
      dept,
      agent: deptLeads[dept] || 'lexi',
      title: text.length > 60 ? text.slice(0, 57) + '...' : text,
      text,
      when: typeof when === 'object' ? when : { kind: 'daily', at: '09:00' },
      needsOk: true,
      paused: false
    };

    data.routines.unshift(newRoutine);
    try {
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {}

    return res.status(200).json({ ok: true, routine: newRoutine });
  }

  // GET
  res.status(200).json(data);
}
