# Sales Operating System — AI Command Centre

An exact clone of [https://sales-omega-eight.vercel.app](https://sales-omega-eight.vercel.app).

A 3D interactive isometric command centre for Sunnyeora dropshipping e-commerce operations, featuring 35 autonomous AI agents across 6 departments, real-time catalog feeds, Composio tool integrations, scheduled automated routines, 3D interactive knowledge brain graphs, and ambient audio.

---

## 🌟 Features

- **3D Isometric AI Office**: Real-time WebGL / Three.js 3D command centre with animated procedural low-poly characters, department pods, interactive desks, dynamic day/night ambient lighting, and camera orbit controls.
- **35 Autonomous AI Agents**:
  - **Emails Pod**: EMAILS LEAD, Client Emails, Internal Emails, Vendor Emails, Contractor Emails.
  - **Sales Pod**: SALES LEAD, Lead Enricher, Inbound Leads Manager, Prospector, Proposals, Follow Ups.
  - **Marketing Pod**: MARKETING LEAD, Trend Research Scout, Newsletter Specialist, Graphics Designer, Meta Ads Specialist, Instagram Organic, Video Editor.
  - **Operations Pod**: OPERATIONS LEAD, Intel Analyst, Legal Review, Compliance Checker, Internal Reporting, Internal Dashboards.
  - **Finance Pod**: ACCOUNTING LEAD, Invoicing, Accounts Payable, Reconciliation.
  - **Delivery Pod**: DELIVERY LEAD, Project Co-ordinator, QA Checker, Client Reports, Client Assets, Designer Assistant, Onboarder.
- **Sunnyeora Live Catalog Modal**: Real-time dropshipping apparel inventory streaming directly with product galleries, margin breakdowns, profit analysis, and live Shopify links (`sunnyeora.myshopify.com`).
- **Composio & Platform Integrations Hub**: Modal for authorizing tools across 16 MCP services (Gmail, Slack, Meta Ads, Notion, Stripe, Shopify, Canva, Loops, Beehiiv, Apollo, PandaDoc, Xero, Clarity, HyperFrames, iMessage, Chrome).
- **Interactive Agent Profiles & AI Chat**: Slide-out drawer with direct chat with any agent, tool execution logs, and persona prompts.
- **Automated Routines Engine**: Scheduled cron routines for abandoned cart recovery, weekly sales reviews, style drops, and supplier audits.
- **Interactive 3D Brain**: Force-directed 3D knowledge graph of company SOPs, brand guidelines, offers, and department MOCs.
- **Procedural Web Audio**: Real-time synthesized ambient office acoustics and UI interactions without external audio assets.

---

## 🚀 Quick Start (Local)

Run with zero dependencies using Node.js:

```bash
# Start server
npm start
# or: node server.js
```

Open your browser at:
```
http://localhost:3000
```

To run in auto-reload development mode:
```bash
npm run dev
```

---

## ☁️ Deploy to Vercel

This repository includes `vercel.json` and serverless functions in `api/`:

```bash
# Using Vercel CLI
npx vercel

# Or push to GitHub and import into Vercel dashboard
```

---

## ⚙️ Environment Variables (Optional)

Create a `.env` file (copied from `.env.example`):

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
COMPOSIO_API_KEY=your_composio_api_key_here
SHOPIFY_STORE_DOMAIN=sunnyeora.myshopify.com
```

- When `GEMINI_API_KEY` is provided, agents chat with real-time Google Gemini models.
- When omitted, agents respond with built-in intelligent role-based agent simulation.

---

## 📁 Project Structure

```
├── index.html          # Cloned 1.6MB Three.js 3D application frontend
├── server.js           # Built-in zero-dependency Node.js HTTP server
├── package.json        # Node configuration and run scripts
├── vercel.json         # Vercel deployment routes and rewrites
├── .env.example        # Environment variable template
├── api/                # Vercel serverless API handlers
│   ├── health.js       # /api/health
│   ├── composio.js     # /api/composio
│   ├── mcp.js          # /api/mcp
│   ├── agents.js       # /api/agents
│   ├── brain.js        # /api/brain
│   ├── products.js     # /api/products
│   ├── routines.js     # /api/routines
│   ├── tasks.js        # /api/tasks
│   ├── usage.js        # /api/usage
│   └── chat.js         # /api/chat
└── data/               # Seed data for agents, catalog, brain graph, MCP
    ├── health.json
    ├── composio.json
    ├── mcp.json
    ├── agents.json
    ├── brain.json
    ├── routines.json
    ├── tasks.json
    ├── usage.json
    └── products.json
```
