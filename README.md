# 📩 Newsletter Subscription API

A simple and secure backend service built with **TypeScript/Node.js**, **Express**, and **MongoDB** to handle newsletter with **email confirmation via JWT** and **Resend API**. It uses a RESTful structure, HTML email, and proper validations for safe user interaction.

---

## 🚀 Features

- ✅ Subscribe users via email
- ✅ Send confirmation link (with JWT) to verify the email
- ✅ Only save confirmed emails to MongoDB
- ✅ Input sanitization + email format validation
- ✅ Secure environment using `.env` variables
- ✅ Rate limiting to prevent abuse
- ✅ Clean, scalable folder structure

---

## 🏗️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Email Provider**: [Resend](https://resend.com)
- **Auth**: JWT
- **Security**: sanitize-html, express-validator, dotenv

---

## 📂 Project Structure

```

/src
├── controllers/         # Logic for subscribing & confirming
├── models/              # Mongoose schema
├── routes/              # API endpoints
├── middleware/          # Validation middleware
├── index.ts             # Main server file
.env                     # Environment variables

````

---

## 🧪 API Endpoints

### 📬 `POST /api/v1/newsletter/subscribers/subscribe`
Subscribe a user to the newsletter (confirmation email is sent)

#### Request Body
```json
{
  "email": "user@example.com"
}
````

#### Response

```json
{
  "message": "Confirmation email sent!"
}
```

---

### ✅ `GET /api/v1/newsletter/subscribers/confirm?token=<jwt_token>`

Confirms user's email and saves it in the database.

#### Response Examples

* ✅ Success: `Subscription confirmed. You're now on the list!`
* ❌ Expired/invalid token: `Invalid or expired token.`
* ❗ Already subscribed: `You are already subscribed.`

---

## 🛠️ Environment Variables

Create a `.env` file in your root directory with the following:

```env
MONGODB_URI=your_mongodb_connection
RESEND_API_KEY=your_resend_api_key
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

---

## 🛡️ Security & Validation

* Uses `express-validator` for validating email format
* Uses `sanitize-html` to prevent XSS or injection
* Token-based validation (JWT)
* Rate-limiting for `/subscribe` endpoint

---

## 🧑‍💻 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/alimagdye/Newsletter.git
cd Newsletter

# 2. Install dependencies
npm install

# 3. Add your .env file (see above)

# 4. Start the server (with nodemon)
npm run dev
```

---

## 📈 Future Improvements

* Add support for unsubscribing

---

## 📄 License

MIT — Feel free to use, fork, and improve.

---

> Built by [Ali Magdy](https://github.com/alimagdye)
