# LearnADC 🎯

LearnADC is a free, full-stack educational platform tailored for aspiring ADC (Attack Damage Carry) players in League of Legends. Created by a Master-tier ADC main, this project is designed to help players improve their macro, mechanics, champion mastery, and more through structured video lessons and interactive content.

---

## Try Out The Website!
<br>

- The beta is live at https://www.learnadc.com
- Register an account to view the courses and lessons!
- If you do run into any issues, please contact me below or via the contact form on the page

<br>

- Video demonstration (Quick App Demo Video): <b>Coming Soon</b>
- Technical review video (Technical overview of my development and deployment process): <b>Coming Soon</b>

---
## 🚀 About The Project

Climbing in League of Legends as an ADC can be frustrating — especially when you're not sure what to focus on. LearnADC aims to solve that by providing curated content, structured lessons, and strategic insights taught by a high-ELO ADC main. Whether you're new to the role or looking to refine your gameplay, LearnADC is your personal coach.

---

## 🛠️ Built With

**Frontend:**

- [Angular 19](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)

**Backend:**

- [Spring Boot 3](https://spring.io/projects/spring-boot)
- [Java 17](https://openjdk.org/projects/jdk/17/)
- [Spring Security + JWT](https://spring.io/guides/gs/securing-web/)
- [MySQL](https://www.mysql.com/) (Hosted on AWS RDS)
- [AWS EC2](http://aws.com/) (Backend hosting)
- [Vercel](http://vercel.com/) (Frontend hosting)

**Other Tools**

- [Spring Initializer](https://start.spring.io/) (Easy Maven project setup)
- [Postman](https://www.postman.com/downloads/) (For RestAPI testing when building backend)
- MySQL Workbench

---

## 🧰 Getting Started

To get a local copy up and running, follow these simple steps.

---

## ✅ Prerequisites

- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- Java 17
- Maven
- MySQL, other databases will work as well, JPA makes it easy to integrate any database (See resources at bottom)
- Git

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/kphit03/LearnADC.git
cd LearnADC
```

### 2. Setup the Backend

```bash
cd learnadc-backend
```

- Configure `application.properties` or `application.yml` with your MySQL credentials.
- Create a MySQL database named `learnadc`.
- The environment variables `JWT_SECRET` and `SMTP_USERNAME` and `SMTP_PASSWORD` must also be filled out for full functionality. This application uses SMTP with gmail.
- Visit: `http://localhost:8080` or whichever default endpoint your local backend is pointed to.
- (Optional) You can deploy this anyway you'd like, but I deployed the backend via AWS EC2 and RDS.

```bash
./mvnw spring-boot:run
```

### 3. Setup the Frontend

```bash
cd ../learnadc-frontend
npm install
ng serve 
```

- Setup your `environment.prod.ts` (Optional) or `environment.ts` variables to route to `http://localhost:8080`, or to your production API endpoint when deploying.
- Visit: `http://localhost:4200` to test frontend functionality

---

## ▶️ Usage

- **Unauthenticated users** can browse the homepage and FAQ.
- **Registered users** can access course content with lessons and embedded videos.
- **Admin users** can manage courses and lessons through the admin dashboard.

Features include:
- Course/lesson management (CRUD)
- Authenticated users can view courses/lessons
- Authorized admins can manage courses and lessons
- JWT-secured routes (Authentication/Authorization)
- YouTube iframe embedding
- Mobile responsiveness
- UI updates automatically as courses/lessons are added or removed
- Contact form that sends to email

---

## 🗺️ Roadmap

- [x] Public course viewing with authentication with JWT
- [x] Admin dashboard (CRUD operations)
- [x] Secure API endpoints via Spring Security
- [x] Responsive design for mobile/tablet
- [x] Sticky sidebar lesson navigation
- [x] YouTube iframe handling
- [x] Deploy minimum viable product for beta testing
- [ ] Cleanup code (random spacing, console logs that aren't needed, unnecessary comments, debugging lines)
- [ ] Write unit tests (JUnit or Mockito preferably)
- [ ] Create two full courses with lessons
- [ ] Setup/verify rate limiting features for login and contact form
- [ ] Add search and filtering for courses
- [ ] Add user comments or discussion section
- [ ] Add lesson progress tracking
- [ ] Other UI enchancements like animations within public dashboard, courses, lessons, faq, and admin dashboard pages.


---

## 📫 Contact
Having issues with my website or getting a local copy of this app to run? Feel free to contact me!

I'm Kevin Phitsanu  
[Portfolio](https://kevinphitsanu.com)  
[LinkedIn](https://www.linkedin.com/in/kevin-phitsanu/)  
[Email](mailto:kevinphitsanu22@gmail.com)

---

## 📚 Resources

- [Angular Docs](https://angular.io/docs) (Prior knowledge is recommended specifically for forms, router, angular-jwt, and rxjs)
- [Spring Boot Docs](https://docs.spring.io/spring-boot/) (Prior knowledge is recommeneded specifically for Spring architecture and basic Spring Crud Apps)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) (Easy database integration with JPA)
- [Spring Security Docs](https://docs.spring.io/spring-security/reference/index.html) (Prior knowledge is recommended for specifically JWT authentication, this is what I struggled with the most lol..)

---

> ⭐ If you found this project helpful or cool, give it a ⭐ on GitHub to show support!
