# CodeChef API

A simple REST API deployed on Render that fetches user-specific data based on the provided `user_id`.

## 🔗 Live API Endpoint

[https://codechef-api-uoxm.onrender.com/api/data/user_id]


Replace `user_id` with a valid user ID to retrieve corresponding data.

---

## 📦 Features

- RESTful architecture
- Returns data based on `user_id` via GET request
---

## 🧪 Example Usage

**Request:**
GET https://codechef-api-uoxm.onrender.com/api/data/12345

## Response:
{
  "user_id": "12345",
  "name": "John Doe",
  "email": "john@example.com",
  "score": 94
}
