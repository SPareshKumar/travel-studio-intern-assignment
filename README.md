
# 🏨 Hotel Request Management System

This is a full-stack hotel request management system that allows users to submit service requests over **WhatsApp**, which are then stored in a PostgreSQL database. Staff can manage and view pending requests via a dashboard.

---

## 🚀 Features

- Users can send service requests via WhatsApp.
- Requests are processed and stored using a NestJS backend with Prisma and PostgreSQL.
- Frontend dashboard built using Next.js and TanStack Query.
- Integrated WhatsApp via [Twilio Sandbox API](https://www.twilio.com/docs/whatsapp/sandbox) using n8n workflow automation.
- Live frontend hosted on **Vercel**.
- Uses `ngrok` for local backend tunneling to test WhatsApp integration.

---

## 🧱 Project Structure

```bash
root
├── backend/              # NestJS Backend with Prisma & PostgreSQL
│   ├── src/
│   └── prisma/
├── frontend-dashboard/   # Next.js Dashboard for viewing requests
│   ├── src/
│   ├── public/
│   └── vercel.json
└── workflow/
    └── request-workflow.json  # n8n WhatsApp workflow
```

---

## 📦 Tech Stack

- **Backend:** NestJS, Prisma ORM, PostgreSQL, pgAdmin
- **Frontend:** Next.js, TanStack Query
- **Automation:** n8n workflow with WhatsApp via Twilio Sandbox API
- **Deployment:** Vercel (Frontend), ngrok (Backend tunnel for WhatsApp)
- **Database GUI:** pgAdmin

---

## 🔑 WhatsApp Integration (Twilio Sandbox)

1. Sign up at [Twilio Console](https://console.twilio.com/).
2. Navigate to **Messaging > Try it Out > Send a WhatsApp Message**.
3. Use the sandbox environment:
   - Join by sending the code to the sandbox number.
   - Use the number in the **n8n workflow** (`request-workflow.json`) for integration.
4. Authenticate using Twilio credentials:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_NUMBER`
5. The workflow generates a user token and sends it along with request text to the backend endpoint via ngrok.

---

## 🧪 Running the Project Locally

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Docker (optional for DB setup)
- ngrok (for local tunneling)
- n8n (for workflow automation)

---

### 🛠️ Backend Setup

```bash
cd backend
npm install
# Start PostgreSQL manually or via Docker
# Configure .env with DATABASE_URL (Prisma)
npx prisma migrate dev
npm run start:dev
```

To expose backend to the internet (for WhatsApp API):
```bash
ngrok http 3000
```

---

### 🖥️ Frontend Setup

```bash
cd frontend-dashboard
npm install
npm run dev
```

To access live frontend:
- Update `vercel.json` with the correct backend endpoint (e.g., ngrok URL).
- Deploy to Vercel:
```bash
vercel --prod
```

---

### 🔄 Workflow Automation with n8n

1. Start n8n:
```bash
npx n8n
```
2. Import `workflow/request-workflow.json`.
3. Configure webhook URL to use your **ngrok** exposed backend endpoint.
4. Ensure credentials (Twilio) are added in n8n.

---

## 📊 Dashboard

The dashboard provides:
- List of all pending hotel requests.
- Realtime status updates (optional with polling or socket).
- Secure admin access (to be implemented if needed).

---

## 🧹 Useful Commands

### Backend
```bash
npm run start:dev      # Run NestJS server
npx prisma studio      # Open DB GUI
npx prisma migrate dev # Run DB migrations
```

### Frontend
```bash
npm run dev            # Start Next.js server
vercel --prod          # Deploy to Vercel
```

---

## 📬 Contact / Contribution

Open issues or pull requests for bugs and feature suggestions. Contributions welcome!
