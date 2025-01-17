# Project Documentation

## 1. Project Requirements Document

### 1.1 Overview
This project aims to create an English learning application that helps users improve their Reading, Listening, Writing, and Speaking skills. The application will leverage Next.js for the frontend (including server-side rendering where needed) and Supabase for backend services such as database, authentication, and storage. AI functionalities will be integrated for automated feedback and personalized learning paths.

### 1.2 Objectives
- Provide a comprehensive learning experience that covers all four language skills.
- Offer tailored learning plans based on individual user needs.
- Automate grading, error detection, and feedback to enhance the learning process.
- Integrate tools for speed listening practice, spelling/grammar checks, vocabulary context explanations, and pronunciation support.
- Leverage Supabase for authentication, database storage, and real-time data syncing.

### 1.3 Scope
- User Registration & Login (Supabase Auth): Account creation and secure authentication using Supabase’s Auth API.
- Dashboard: Overview of user progress, recommended study paths, and upcoming tasks, pulling data from Supabase.
- Skill Modules: Reading, Listening, Writing, Speaking.
- Feedback & Grading: Automated scoring and improvement tips across all four skills, powered by AI.
- Content Management: Ability (for admins) to add, modify, or remove lessons and exercises via a Supabase table.
- Reporting & Analytics: Track and display user performance data from Supabase in real time.

### 1.4 User Stories
- As a learner, I want to see a personalized study plan so that I can follow a structured approach to improve my English.
- As a learner, I want immediate feedback on my writing to understand my spelling and grammar mistakes.
- As a learner, I want to practice listening at various speeds to train my ear for natural conversation.
- As a learner, I want to receive real-time pronunciation guidance so I can speak more accurately.
- As an admin, I want to add and organize course content for each skill area in a simple interface that syncs with Supabase.

### 1.5 Functional Requirements
- Authentication: Use Supabase Auth for registration, login, logout, and secure sessions.
- Personalized Learning Paths: Dynamically generated paths based on user proficiency and goals, stored in Supabase.
- Automated Feedback System: Provide grammar/spelling corrections, pronunciation detection, reading comprehension guidance via integrated AI APIs.
- Content Library: Organized lessons, exercises, and quizzes for each skill, stored in Supabase tables.
- Progress Tracking: Store user progress and feedback data in Supabase, and display progress in real time.

### 1.6 Non-Functional Requirements
- Performance: Should deliver quick page loads and dynamic content updates with SSR/ISR (Next.js).
- Security: Protect user data with secure connections (HTTPS) and Supabase Auth.
- Scalability: Use Supabase’s managed Postgres backend to handle growing data volumes.
- Reliability: High uptime due to Next.js hosting (e.g., Vercel) and Supabase’s reliable infrastructure.
- Usability: Straightforward and intuitive user interface following design best practices.

## 2. Frontend Guidelines (Next.js)

### 2.1 Design Principles
- **Consistency:** Use a shared design system or component library.
- **Responsiveness:** Ensure layouts adapt to mobile, tablet, and desktop.
- **Accessibility:** Follow WCAG standards (color contrast, alt text, semantic HTML).
- **User-Centric:** Keep navigation simple and user flows intuitive.

### 2.2 Page Structure & Routing
- **Pages Directory:** Use Next.js’ built-in file-based routing under `pages/`.
- **Dynamic Routes:** For user-specific or course-specific pages (e.g., `pages/[userId].tsx`, `pages/courses/[courseId].tsx`).
- **API Routes:** Use Next.js API routes (if needed) to handle custom logic or integrate AI services.

### 2.3 Reusable Components
- **Layout Components:** Top-level layout with header, footer, navigation.
- **UI Elements:** Buttons, forms, modals, card layouts, etc.
- **Skill-Specific Components:** Reading, Listening, Writing, Speaking modules with distinct UI/UX patterns.

### 2.4 State Management
- Depending on complexity, you may store global user session data with:
  - React Context
  - SWR or React Query for data fetching with caching and real-time updates from Supabase.
  - Redux Toolkit (optional) if you need more complex state handling.

### 2.5 Styling
- **CSS Modules or Styled Components:** For modular styles.
- **Tailwind CSS:** For utility-first styling.
- **Shadcn UI:** For a collection of customizable, lightweight React components built with Tailwind CSS.
  - **Installation:**
    ```bash
    npx shadcn@latest init
    ```
  - **Usage:**
    - Import and use components directly in your files:
      ```jsx
      import { Button } from '@shadcn/ui';

      function MyComponent() {
        return (
          <Button variant="default">Click Me</Button>
        );
      }
      ```
    - Customize components by extending their styles:
      ```jsx
      import { Button, buttonVariants } from '@shadcn/ui';

      function MyComponent() {
        return (
          <Button className={buttonVariants({ variant: 'outline' })}>Custom Button</Button>
        );
      }
      ```
    - Use the theme configuration to maintain consistency across the application:
      ```js
      // theme.js
      export const theme = {
        // Custom theme configurations
      };
      ```
- **Maintain consistency using a shared theme config** if using a component library (e.g., Material-UI, Chakra UI).

### 2.6 Testing & QA
- **Unit Tests:** With Jest, React Testing Library for components.
- **E2E Tests:** With Cypress or Playwright to simulate user interactions in Next.js environment.
- **Accessibility Tests:** Lighthouse, axe-core.

## 3. Backend Structure Document (Supabase + Next.js)

Since you are using Supabase for most backend functionalities, you have two primary “backend” layers:
- **Supabase:** Handles your database (Postgres), Auth, and Storage.
- **Next.js:** May include API routes for custom logic (e.g., calling AI APIs for feedback).

### 3.1 Supabase Data Schema (Example)

The database schema is designed to support the application's functionalities, with clear relationships and constraints.

#### Users Table
- `id` (UUID, primary key, NOT NULL)
- `email` (TEXT, unique, NOT NULL)
- `created_at` (TIMESTAMP, NOT NULL)
- `role` (TEXT, NOT NULL)
- `level` (TEXT, NOT NULL)
- `preferences` (JSONB)
- `name` (TEXT)
- `last_login` (TIMESTAMP)

#### Courses Table
- `id` (UUID, primary key, NOT NULL)
- `title` (TEXT, NOT NULL)
- `description` (TEXT)
- `skill_type` (TEXT, NOT NULL)
- `created_at` (TIMESTAMP, NOT NULL)
- `duration` (INTEGER)
- `difficulty_level` (TEXT)

#### Lessons Table
- `id` (UUID, primary key, NOT NULL)
- `course_id` (UUID, foreign key to Courses.id, NOT NULL)
- `title` (TEXT, NOT NULL)
- `content` (TEXT)
- `created_at` (TIMESTAMP, NOT NULL)
- `lesson_number` (INTEGER)
- `duration` (INTEGER)

#### UserProgress Table
- `id` (UUID, primary key, NOT NULL)
- `user_id` (UUID, foreign key to Users.id, NOT NULL)
- `course_id` (UUID, foreign key to Courses.id, NOT NULL)
- `lesson_id` (UUID, foreign key to Lessons.id, NOT NULL)
- `score` (INTEGER)
- `feedback` (TEXT)
- `updated_at` (TIMESTAMP, NOT NULL)
- `started_at` (TIMESTAMP)
- `completed_at` (TIMESTAMP)

#### Feedback Table
- `id` (UUID, primary key, NOT NULL)
- `user_id` (UUID, foreign key to Users.id, NOT NULL)
- `skill` (TEXT, NOT NULL)
- `input_text` (TEXT)
- `feedback_text` (TEXT)
- `score` (INTEGER)
- `created_at` (TIMESTAMP, NOT NULL)
- `feedback_type` (TEXT)
- `timestamp` (TIMESTAMP)

#### Relationships
- **Users** have many **UserProgress** entries.
- **Courses** have many **Lessons**.
- **Lessons** belong to one **Course**.
- **UserProgress** entries link **Users**, **Courses**, and **Lessons**.
### 3.2 Supabase Auth
SignUp / SignIn: Supabase manages user credentials via email/password or OAuth providers.

Security: Use RLS (Row-Level Security) policies to ensure each user can only access their own data.

### 3.3 Next.js API Routes
AI Feedback

POST /api/feedback/writing

POST /api/feedback/speaking

etc.

These routes will receive user submissions, call external AI APIs for feedback, and store the response in Supabase.

Course Management

GET /api/courses (Fetch all or user-specific courses)

POST /api/courses (Admin-only to create a new course)

### 3.4 Real-time Updates
Supabase Realtime: Optionally, you can listen for changes in user progress or feedback to update the frontend in real time (e.g., via hooks like useEffect + SWR or Supabase’s real-time client).

### 3.5 Security & Permissions
RLS (Row Level Security): Ensure that data is only accessible by authorized users.

API Route Protection: In Next.js, use middleware or server-side checks to verify Supabase session tokens.

HTTPS: All communication with Supabase and external AI APIs should be encrypted.


## 4. App Flow Document

### 4.1 User Registration & Onboarding
- **Sign Up:** User enters email and password (handled by Supabase Auth).
- **Profile Setup:** The user is asked for current level, goals, and time availability. This data is stored in a profiles table or as part of the users table in Supabase.
- **Initial Diagnostic Test (optional):** Used to adjust the user’s baseline.
- **Personalized Learning Path:** Based on the user’s baseline, the system (via Next.js API route + AI) stores a recommended plan in Supabase.

### 4.2 Skill Practice Flow
- **Reading:**
  - User selects a reading passage.
  - Application retrieves the text from Supabase.
  - Upon completion, user gets feedback on vocabulary or comprehension.
- **Listening:**
  - User chooses an audio clip from Supabase Storage or a third-party storage.
  - Adjust playback speed, do a short quiz, and receive immediate feedback.
- **Writing:**
  - User writes an essay/response and submits to the Next.js API route.
  - The API route calls an AI service for grammar/spelling corrections.
  - Feedback is stored in Supabase and returned to the client.
- **Speaking:**
  - User records or uploads audio.
  - The Next.js API route sends the audio or transcription to the AI service for analysis.
  - Feedback is saved in Supabase and displayed to the user.

### 4.3 Course Design & Tracking
- **Course Overview:** Data fetched from Supabase; displays recommended tasks for each skill.
- **Calendar View:** Summaries of deadlines and recommended assignment sequences.
- **Progress Dashboard:** Summarizes performance, completed tasks, and upcoming lessons from the UserProgress table.
- **Adaptive Adjustments:** The system modifies the user’s plan if they progress faster/slower than expected, storing updates in Supabase.

### 4.4 Feedback & Review
- **Immediate Feedback:** Right after task submission, user sees an AI-generated summary.
- **Progress Reports:** Periodic summaries of user’s improvements and areas to focus on, stored in Supabase for easy retrieval.
- **Review Sessions:** Scheduled re-tests or revision tasks triggered by time-based or progress-based logic.

## 5. Tech Stack Doc

### 5.1 Frontend
- **Framework:** Next.js (TypeScript).
- **UI/Styling:** Tailwind CSS, Shadcn UI.
- **Data Fetching:** Built-in Next.js data fetching methods (getServerSideProps, getStaticProps) plus SWR or React Query for client-side revalidation.
- **Authentication:** Supabase Auth integrated with Next.js.

### 5.2 Backend (Supabase + NextJS)
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth (JWT-based sessions)
- **Storage:** Supabase Storage for lesson files, audio, etc.
- **Serverless Functions:** Next.js API routes for custom logic, especially for AI integrations.

### 5.3 Deployment & Hosting
- **Next.js Hosting:** Vercel, AWS, or any platform supporting Next.js.
- **Supabase:** Managed service for database, auth, storage, and real-time.
- **CI/CD:** GitHub Actions or Vercel’s built-in pipeline for deployments.

### 5.4 Other Services
- **AI/NLP:** External APIs such as OpenAI, Hugging Face, or custom ML models for grammar/spelling suggestions and pronunciation analysis.
- **Email/Notifications:** If needed, integrate with third-party services (SendGrid, Mailgun) or use Supabase’s own features.
- **Logging/Monitoring:** Vercel logs, Supabase logs, and external analytics tools.

## 6. System Prompts

(Example prompts for calling external AI services from Next.js API routes.)

### Spelling & Grammar Check Prompt
- **System:** “Analyze the following text for spelling, grammar, and style issues. Provide suggested fixes and brief explanations.”
- **User:** `<User's text>`

### Vocabulary Explanation Prompt
- **System:** “Identify words or phrases in this text that are likely challenging for a B1-level English learner. Provide definitions and usage examples.”
- **User:** `<Reading passage or user text>`

### Speaking Feedback Prompt
- **System:** “Analyze the user’s speech for pronunciation errors, grammar mistakes, and clarity. Provide a short, constructive summary.”
- **User:** `<Audio file or transcript>`

### Course Design Prompt
- **System:** “Given the user’s English level and goals, provide a recommended sequence of tasks covering Reading, Listening, Writing, and Speaking. Estimate weekly time needed.”
- **User:** `<User's level, goals, availability>`

## 7. File Structure Doc

The file structure is organized to maintain a clean and scalable codebase. Below is an example file structure tailored to Next.js + Supabase:

```
root
├── app (or pages)         // Depending on Next.js version
│   ├── api                // Next.js API Routes
│   │   ├── feedback
│   │   │   ├── writing.ts
│   │   │   ├── speaking.ts
│   │   │   └── ...
│   │   └── courses.ts
│   ├── auth               // If using next-auth or custom Auth pages
│   ├── dashboard
│   │   └── page.tsx       // or index.tsx, main Dashboard UI
│   ├── courses
│   │   ├── [courseId].tsx // Dynamic route for course detail
│   │   └── index.tsx      // Course listing
│   ├── _app.tsx           // Custom App configuration
│   └── ...
├── components
│   ├── Layout
│   │   └── Layout.tsx
│   ├── Reading
│   ├── Listening
│   ├── Writing
│   ├── Speaking
│   └── ...
├── lib
│   └── supabaseClient.ts  // Supabase initialization
├── hooks
│   └── useSupabaseAuth.ts
├── public
│   └── assets
├── styles
│   ├── globals.css
│   └── ...
├── utils
│   └── aiUtils.ts         // Utility functions for calling AI APIs
├── docs
│   ├── ProjectRequirements.md
│   ├── FrontendGuidelines.md
│   ├── BackendStructure.md
│   ├── AppFlow.md
│   ├── TechStack.md
│   ├── SystemPrompts.md
│   └── FileStructure.md
├── .env.local             // Environment variables (Supabase keys, AI keys)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Directory Descriptions
- **app (or pages):** Contains all Next.js routes and pages.
- **api:** Custom API endpoints in Next.js (for AI calls, etc.).
- **components:** Reusable React components.
- **lib:** Initialization of Supabase client or other libraries.
- **hooks:** Custom React hooks, including authentication or data fetching.
- **public:** Static assets like images and fonts.
- **styles:** Global styles and theme configurations.
- **utils:** Utility functions for various purposes, such as AI API calls.
- **docs:** Project documentation in Markdown format.
- **.env.local:** Environment variables for local development.
- **package.json:** Project dependencies and scripts.
- **tsconfig.json:** TypeScript configuration.

## Final Notes

- **Shadcn UI Integration:** Ensure that Shadcn components are used consistently across the application to maintain a cohesive UI design. Customize Shadcn components as needed to fit the application's design guidelines.
- **Tailwind CSS Configuration:** Configure Tailwind CSS to work seamlessly with Shadcn UI, ensuring that custom styles and utility classes are properly applied.
- **Component Reusability:** Leverage Shadcn UI components to build reusable and responsive UI elements that adhere to the application's design principles.

By integrating Shadcn UI into your project, you can enhance the consistency and quality of your frontend design, while maintaining a lightweight and performant application.







