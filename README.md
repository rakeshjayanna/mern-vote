#  Online Voting System (MERN Stack)

A secure, modern, and easy-to-use online voting system for college elections. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with role-based access and real-time vote analytics.

##  Features

- 👤 User Authentication (JWT-based)
- 🧑‍💼 Admin Role for poll creation, editing, deletion
- ✅ One-vote-per-user enforcement (across all polls)
- 📊 Pie chart summary of votes per candidate
- 🔒 Secure backend API with middleware protections
- 🎨 Responsive and clean UI using Material UI (MUI)

---

## Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | React.js, MUI, Axios   |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB, Mongoose      |
| Auth        | JWT, bcryptjs          |
| Charts      | Recharts (Pie Chart)   |



---

##  Roles

- **Admin**
  - Create/Edit/Delete candidate polls
  - View vote summary
- **User**
  - Vote **only once**
  - View poll results

---

## Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/React.git
cd voting-app

# Install backend
cd server
npm install
npm run dev

# Install frontend
cd ../client
npm install
npm start


🧪 API Endpoints (Backend)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login + get JWT token
GET	/api/auth/me	Get logged-in user info
POST	/api/polls/	Create poll (admin only)
GET	/api/polls/	Get all polls
GET	/api/polls/:id	Get single poll
POST	/api/polls/:id/vote	Vote for a candidate
GET	/api/polls/summary	Get all vote stats

Charts
The /summary page displays a Pie Chart showing vote percentage per candidate. Built with Recharts.

Logic Notes
Only one poll per candidate

Only one vote per user (across all candidates)

Admin can manage polls but cannot vote

Token stored in localStorage and used in all API calls

 Author
Made with ❤️ by Rakesh J


