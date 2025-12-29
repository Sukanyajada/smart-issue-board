# Smart Issue Board

## Project Overview
Smart Issue Board is a web application for managing issues in a project environment. 
It allows users to create, track, and manage issues with features like priority, status, 
assigned user, and similar issue detection. The application is designed to simulate 
real-world issue tracking workflows.

---

## Tech Stack

- **Frontend:** React.js  
  React was chosen for its component-based architecture, ease of creating dynamic 
  user interfaces, and smooth integration with Firebase for authentication and 
  database operations.

- **Backend/Database:** Firebase Firestore  
  Firestore provides a cloud-hosted NoSQL database, enabling real-time data 
  updates and seamless storage of user and issue data.

- **Authentication:** Firebase Auth (Email/Password)  
  Manages user sign-up, login, and session handling securely.

- **Hosting:** Vercel  
  Provides fast and reliable deployment for React applications.

---

## Firestore Data Structure

The Firestore database has two main collections:

1. **users**
users (collection)
└── userId (document)
└── email: string

2. **issues**
issues (collection)
└── issueId (document)
├── title: string
├── description: string
├── priority: string (Low/Medium/High)
├── status: string (Open/In Progress/Done)
├── assignedTo: string (user email or name)
├── createdAt: timestamp
├── updatedAt: timestamp
└── createdBy: string (user email)

---

## Handling Similar Issues

When creating a new issue, the system checks for existing issues with similar titles.  
If a similar issue exists, the user is warned and prompted to confirm whether they still 
want to create the new issue. This prevents duplicate entries and helps maintain a clean 
and organized issue board.

---

## Confusing or Challenging Parts

- Implementing the **status transition rule**, which prevents an issue from moving 
directly from "Open" to "Done", required careful validation logic.
- Detecting **similar issues** required handling variations in issue titles and ensuring 
that the system provides meaningful suggestions without being too strict or too lenient.
- Managing **real-time updates** in Firestore for issue lists and filters.

---

## Future Improvements

- Implement **role-based access control** for admin and user functionalities.
- Add **advanced search and filter options**, such as keyword search and date range.
- Include **notifications** or email alerts when issues are assigned or updated.
- Improve **similar issue detection** using more sophisticated string similarity algorithms.

---
