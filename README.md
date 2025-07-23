# 💳 Bank Information Management System (BIMS)

A full-stack web application built with **Node.js**, **Express**, **React**, and **MongoDB** that allows users to manage their bank account details securely. The system also features an **Admin Panel** to view and filter all users' bank information.

---

## 🧰 Technology Stack

| Layer       | Technology                |
|-------------|---------------------------|
| Frontend    | React.js                  |
| Backend     | Node.js, Express.js       |
| Database    | MongoDB with Mongoose     |
| Auth        | JWT, bcrypt (password hashing) |

---

## 🔐 Features

### 👤 User Panel (Web | Mobile-Optional)

#### 1. **Authentication**
- User registration and login
- JWT-based session authentication
- Passwords securely hashed using **bcrypt**

#### 2. **Bank Account Management**
- **Add Bank Account**
  - Fields: IFSC Code, Branch Name, Bank Name, Account Number, Account Holder’s Name
  - All fields have proper input validation

- **View Bank Accounts**
  - Retrieve and display all bank accounts of the logged-in user

- **Edit Bank Account**
  - Update any existing bank account's information

- **Delete Bank Account**
  - Remove any of the user's bank accounts

- **Multiple Account Support**
  - Each user can manage multiple bank accounts

---

### 🛠️ Admin Panel (Web Only)

#### 👁️ View All User Bank Info
- Admins can:
  - View all registered users
  - Access and filter through every user's bank account details
---

For queries or contributions:
Akshit Ahuja
https://www.linkedin.com/in/akshit-ahuja-1583b928a/

