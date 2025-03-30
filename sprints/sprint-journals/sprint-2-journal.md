# Sprint 2 Journal

## Part 1: Coding Guidelines
   For each programming language that you will use in the implementation of your project, provide a link to a pre-existing coding style guideline that the members of your project will follow. Do not try to make up your own guidelines. Briefly state why you chose those guidelines and how you plan to enforce them.


Coding guidelines should appear in your Repository alongside any existing developer guidelines. Make sure the readme file in the root directory of your repo clearly describes where developer guidelines can be found.


 
## Part 2: Software Architecture

In your Sprint Journal, add an entry on the following:

* For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.
### **Alternatives**  
#### 1. Vercel for Frontend Hosting:
One alternative to Vercel is Netlify. Netlify is very similar to Vercel, and both options are usually offered as the first suggestions when talking about simple, small-scale web project hosting.

##### Pros of Netlify:
* Offers similar git-based compatibility and deploymeny as Vercel
* Cheap at small scale usages
* Provides built-in autorization, though not as thorough as firebase AUTH
##### Cons of Netlify:
* Less optimizaed for Next.js, as opposed to Vercel
* Works better for static websites, not dynamics ones
* No team member has experience with Netlify, whereas Trung has experience with Vercel

  
#### 2. Firebase for Database Hosting: 
One alternative to Firebase database hosting is AWS Amplify, which offers a similar framework for web development in general and database implementation and maintenance specifically. 

##### Pros:
* Compatible with SQL, NoSQL, and GraphQL
* Allows for customization and fine-graining
* Integrates nicely with other AWS infrastructure  
##### Cons:
* Harder to grasp for beginner developers
* Complex pricing and subject to high costs piling up, whereas Firebase base free plan is likely to cover our needs
* Might not integrate nicely with non-AWS infrastructure


## Part 3: Data Modeling
Data modeling: If your system stores data, describe in detail what data your system stores, and how. If it uses a database, give the first draft of your database schema. If not, describe how you are storing the data and its organization. To explain your data, you may find it helpful to draw an entity-relation diagram.

Add the data model to your Requirements Document.

Database design:

![Database Schema](../../assets/Database_Schema.jpg)

- The Account table holds initial account information which is filled at the time of account creation. This table contains a users personal information such as name, email and identifying information such as UserId and date of creation.
- The Listing table holds the information present on a particular listing. We have data about the listing like title, description, category and the identifying information is listing id and user id (the seller's id).
- The Reviews table holds 3 ids: selling, buying, listing. The content of the review is stored alongside the rating and the time of the review.
- The Transaction table holds the same ids as the review table alongside price and date of transaction.
- We have a seperate profile table that only holds userid and the user's rating. We may remove this table but as of now we wanted to seperate what is constant at account creation and what is added to an account later. If we add more changing fields tied to an account, they will be placed in this profile table. CHANGE FROM PHOTO: Purchased Listing and Sold Listings are stacks/arrays of listing ids included in profile.
- We have a message table containing the userid, message id, time of chat and message content. CHANGE FROM PHOTO: we have boolean saying whether the message came from the buyer or seller.
- Chat holds the array/stack of message ids tied to a listing.

## Part 4: Software Design
In your Requirements Document, provide a detailed definition of each of the software components you identified in your architecture.

* What packages, classes, or other units of abstraction form these components?
* What are the responsibilities of each of those parts of a component?
* Specify the interfaces between components in detail.
  * What kind of data gets passed between each pair of components? To minimize coupling, try to minimize the number of components that need to be connected to each other and keep the interfaces between components as small as possible.

Note that software design is distinct from architecture because it is more specific and detailed, providing additional detail about components that may only be a single rectangle the architecture diagram.
1. Frontend (Next.js)
Packages/Modules:
pages/ (Next.js routing)
components/ (Reusable UI components (styled buttons with our colors/animations, etc.))
lib/ (Frontend utilities)
styles/ (CSS modules)
context/ (React context providers (might use redux, still unknown))
Responsibilities:
pages/: Handle route rendering and page composition
components/:
Listing: Displays listing previews
Dashboard: Global navigation
AuthModal: Handles login/signup
lib/api.js: Frontend API service layer
context/AuthContext.js: Manages user authentication state
Interfaces: Communicates with backend via REST API calls (JSON payloads), receives user input events and translates to API requests

2. Backend (Firebase/Firestore)
Components:
Firebase Authentication
Firestore Database
Cloud Functions (serverless logic)
Responsibilities:
auth.py: Handles user authentication flows
db.py: Manages all database operations
storage.py: Handles file uploads/downloads
triggers/: Cloud Functions for: onUserCreate: Profile initialization, onListingUpdate: Notification triggers
Interfaces: Exposes REST endpoints via Firebase HTTP functions, Receives JSON payloads from frontend, Returns structured JSON responses
Exact design for all data models can be viewed at ![Database Schema](../../assets/Database_Schema.jpg)
Shared models will be: User, Listing, Transaction

3. Component Interactions
Frontend ↔ Backend:
Authentication Flow:
Frontend sends email/password (JSON)
Backend returns auth token + user data (JSON)
(example sequence diagram for Listing management)
sequenceDiagram
  Frontend->>Backend: POST /listings (NewListingDTO)
  Backend->>Firestore: Create document
  Firestore->>Backend: DocumentReference
  Backend->>Frontend: Listing (JSON)
To minimize coupling:
Frontend only knows:
API endpoint URLs
Expected request/response shapes
Backend only knows:
Data validation rules
Database schema

graph LR
  A[User Action] --> B[API Service]
  B --> C[Backend Handler]
  C --> D[(Database)]
  C --> E[Third-Party Services] (firebase, cloudinary (image storage), maybe stripe??)
  E --> B
  D --> C
  C --> B
  B --> F[UI Update]  

key points: All database access goes through backend
Frontend contains zero business logic
Data validation at both layers




## Part 5: Process Description

### 5.1. Risk assessment
In your Sprint Journal, write an entry to identify the top three risks to successful completion of your project.

For each, give:

* Likelihood of occurring (high, medium, low)
* Impact if it occurs (high, medium, low)
* Evidence upon which you base your estimates, such as what information you have already gathered or what experiments you have done
* Steps you are taking to reduce the likelihood or impact, and steps to permit better estimates
* Plan for detecting the problem (trivial example: running automated tests to determine that a file format has changed)
* Mitigation plan should it occur
Be specific. If part of your risk analysis could be included in a different team's sprint journal, then you are probably not being specific enough.

#### Risk 1: Errors creating listings due to connection errors
 * Medium likelihood of occurring
   * Dependent on Internet connection, can happen often or not at all depending on where you are
 * High impact if it occurs
   * Potential to render website useless; if postings can't be made people can't buy things
 * To detect problem, we can attempt to post listing in place with spottier Internet and see if this causes problems
 * Mitigation idea: When creating a listing, automatically save it as a draft before posting
   * Updates as you add information, results in posting saving should you lose access
  
#### Risk 2: Self-reporting Timestamps when purchasing listing
 * High likelihood of occurring
   * Users likely to forget or neglect to add a timestamp
 * Medium impact if it occurs
   * Potential for scams to occur with greater frequency and ease
   * Listed as medium on the assumption not many people will attempt to game the system
 * To detect problem: If report is made, check if an entry for date + time sold exists.
 * To mitigate problem: Have entering the date and time be a requirement for confirming a purchase

#### Risk 3: Scammers - buyers take money and don’t give item
 * Low likelihood of occurring
   * Assume that people here have enough integrity to not do such things!
 * High impact if it occurs
   * Stealing money, defeats the purpose of the site!
 * To detect problem: Report button feature will alert staff (us) to possible scammers
 * To mitigate problem: Users will have rating system so that those with an apparent history of scams will be avoided - based on how much they were reported

### 5.2. Epics
An epic is a series of issues that come together to create an identifiable feature group. Completion of an epic may span multiple sprints.

#### Epic 1: Documentation
* **Description**: This epic's main goal is to finalize the bulk of our written work for ReuseU. This entails all of the files in our [requirements-guidelines](https://github.com/dicarlosofia/ReuseU/tree/main/requirements-guidelines) folder being close to their final version, as well as our README file.
* **Dependencies**: No other epics need to be done before we can start this epic. This epic is already in development with the bulk of what the ReuseU team is working on within Sprint 2.
* **Effort Est.**: This will take our whole team, for the written work is somewhat extensive. This will end up being 12 person-weeks. 
* **Subtasks**: These will be marked accordingly with the ***Epic 1*** Tag.

#### Epic 2: Beta Version Development
* **Description**: This epic's main goal is to begin developing the technical side of ReuseU, a.k.a. bringing all that we have written down on paper to life.
* **Dependencies**: We must have *most* of ***Epic 1*** done before we begin on this epic. This is because the written work is a necessary preliminary step to help the team have a more cohesive, parallel workflow when we all transition into a team of mostly developers.
* **Effort Est.**: This will take about 4 people for 2 and a half weeks, or 10 person-weeks. 
* **Subtasks**: These will be marked accordingly with the ***Epic 2*** Tag.


#### Epic 3: Creating and Managing Listings
* **Description**: This epic focuses on implementing the core functionality that allows users to create, manage, and interact with listings on ReuseU. Users should be able to post items they want to sell or give away, edit or remove listings, and browse or search for available items.
* **Dependencies**: Completion of Epic 2 (Beta Version Development) is essential, as the foundational infrastructure, authentication, and database setup need to be in place before listing functionality can be built.
* **Effort Est.**: Approximately 3 people for 3 weeks, totaling 9 person-weeks.
* **Subtasks**: All subtasks will be marked accordingly with the Epic 3 Tag.

#### Epic 4: Frontend/Visual Development
* **Description**: This epic focuses on developing and implementing the aspects of the site users interact with. This will start with website layout to ensure it is intuitive to users, then visual elements to make it appealing.
* **Dependencies**: No other epics are necessarily required to create visuals and plan layout of all required pages, and can be completed parallel to Epic 2. However, completion of Epic 3 is recommended to test transitions between pages and ensure correctness.
* **Effort Est.**: Approximately 3 people for 3 weeks, totaling 9 person-weeks.
* **Subtasks**: All subtasks will be marked accordingly with the Epic 4 Tag.

#### Epic 5: Final Version Development
* **Description**: This epic's main goal is to begin finalizing ReuseU as a website. At the end of this epic, ReuseU should be ready to be tentatively used by Grinnellians.
* **Dependencies**: We must have Epic 2 completed before we begin this epic.
* **Effort Est.**: This will take all 6 team members for two weeks minimum, so 12 person-weeks. 
* **Subtasks**: These will be marked accordingly with the ***Epic 3*** Tag.

### 5.3.

![alt text](<ReuseU Epics Timeline.png>)


### 5.4. Documentation plan
We will need to release the following documentation with our system:
* Admin guide: Assists admins (us, for the time being) on how to manage and maintain the system
* Help menus: Helps users learn about features and how to make use of them

 
## Part 6: Continuous Integration Plan

### Frontend 
Test library for frontend: Cypress. Chosen for being well documented and standard in teh industry.
components/whatever we deem necessary to be tested will be executed in a CI build.
Pushes to main / PRs will trigger a CI build

### Backend
Test library: Pytest. Simple, flexible, and widely used for Python/Flask testing; supports mocking Firebase interactions.

CI Service: GitHub Action

How Linked: Workflow file `(.github/workflows/backend-ci.yml)` in `dicarlosofia/ReuseU` triggers on pushes/PRs to `main`.

Justification: Native GitHub integration, free tier, and customizable for our needs.

## Part 7: Test Automation and Continuous Integration Setup
Add configuration to your Repository to enable automated tests and CI. You are not expected to provide an extensive test suite for your project at this point. Rather, the goal is to have the test infrastructure and CI set up with a few existing, example tests. (Your set up and the documented test-addition process should allow a developer on the team to easily add and run a new test.)


In your Sprint Journal, include a screenshot of your successful tests to demonstrate that they have run and passed.

Assets/TestsPassed

## Part 8: Additional Work

We completed setting up database service in Firebase and added schema and dummy data in our Firebase realtime database following the schema provided in Part 3 - Data Modeling, fulfilling [#64](https://github.com/dicarlosofia/ReuseU/issues/64).

A new mascot design was developed.

A (very) rough outline for the listings homepage was created in branch "skeleton" - this includes the Listing component, the Listings Homepage component,
and a Dashboard. They are all just outlines to be filled in. No deep functionality has been added, but tests for them have been arranged.


