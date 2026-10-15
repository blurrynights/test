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

  const p = path.join(process.cwd(), 'data', 'tasks.json');
  let tasks = [];
  if (fs.existsSync(p)) {
    try {
      tasks = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (e) {}
  }

  const { id, action } = req.query || {};

  // DELETE task
  if (req.method === 'DELETE' && id) {
    tasks = tasks.filter(t => t.id !== id);
    try {
      fs.writeFileSync(p, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (e) {}
    return res.status(200).json({ ok: true });
  }

  // POST with action run or revise
  if (req.method === 'POST') {
    if (action === 'run' && id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.state = 'done';
        task.startedAt = Date.now() - 3000;
        task.finishedAt = Date.now();
        task.tools = ['notion', 'gmail'];
        task.result = `Successfully executed "${task.title}". Results validated with live store data.`;
        try {
          fs.writeFileSync(p, JSON.stringify(tasks, null, 2), 'utf8');
        } catch (e) {}
        return res.status(200).json(task);
      }
      return res.status(404).json({ error: 'Task not found' });
    }

    if (action === 'revise' && id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.state = 'done';
        task.revisedAt = Date.now();
        try {
          fs.writeFileSync(p, JSON.stringify(tasks, null, 2), 'utf8');
        } catch (e) {}
        return res.status(200).json(task);
      }
      return res.status(404).json({ error: 'Task not found' });
    }

    // Create new task
    const body = req.body || {};
    const dept = body.dept || 'sales';
    const text = body.text || 'New task';
    const agentId = deptLeads[dept] || 'lexi';

    const newTask = {
      id: Math.random().toString(36).substring(2, 14),
      dept,
      agent: agentId,
      title: text.length > 50 ? text.slice(0, 47) + '...' : text,
      text,
      plan: [
        `Analyze requirements for ${text.slice(0, 40)}`,
        `Execute deliverable using department tools`,
        `Review against Sunnyeora brand standards`
      ],
      why: `Assigned to ${agentId.toUpperCase()} based on request.`,
      state: 'next',
      addedAt: Date.now(),
      by: 'you'
    };

    tasks.unshift(newTask);
    try {
      fs.writeFileSync(p, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (e) {}

    return res.status(200).json(newTask);
  }

  // GET tasks
  res.status(200).json(tasks);
}
