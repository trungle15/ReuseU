# Sprint 2 Journal

## Part 1: Coding Guidelines
   For each programming language that you will use in the implementation of your project, provide a link to a pre-existing coding style guideline that the members of your project will follow. Do not try to make up your own guidelines. Briefly state why you chose those guidelines and how you plan to enforce them.


Coding guidelines should appear in your Repository alongside any existing developer guidelines. Make sure the readme file in the root directory of your repo clearly describes where developer guidelines can be found.


 
## Part 2: Software Architecture

Provide an overview of your system. In your Requirements Document, add the following:

* Identify and describe the major software components and their functionality at a conceptual level.
* Specify the interfaces between components at a high level. Which components connect to which other components?
* Identify the major data storage components and specify interfaces between data storage and software components.
* Create a diagram of your system's architecture. Most of the above can be specified by an architecture diagram, but add notes as needed to describe the diagram.
* If there are particular assumptions underpinning your chosen architecture, identify and describe them.

Write about your design decisions. In your Sprint Journal, add an entry on the following:

* For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.


## Part 3: Data Modeling
Data modeling: If your system stores data, describe in detail what data your system stores, and how. If it uses a database, give the first draft of your database schema. If not, describe how you are storing the data and its organization. To explain your data, you may find it helpful to draw an entity-relation diagram.

Add the data model to your Requirements Document.


## Part 4: Software Design
In your Requirements Document, provide a detailed definition of each of the software components you identified in your architecture.

* What packages, classes, or other units of abstraction form these components?
* What are the responsibilities of each of those parts of a component?
* Specify the interfaces between components in detail.
  * What kind of data gets passed between each pair of components? To minimize coupling, try to minimize the number of components that need to be connected to each other and keep the interfaces between components as small as possible.

Note that software design is distinct from architecture because it is more specific and detailed, providing additional detail about components that may only be a single rectangle the architecture diagram.




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

### 5.2. Epics
An epic is a series of issues that come together to create an identifiable feature group. Completion of an epic may span multiple sprints.


Divide your planned work into about 3-6 epics. For each epic, write in your Sprint Journal:

* Description -- What will this epic achieve?
* Dependencies --  What (other epic) needs to be done before this epic can be started?
* Effort estimate -- How many person-week units do you expect it will take (If 3 team members will work on it for 2 weeks, that's 6 person-weeks.)
* Subtasks -- In the backlog of your Issue Manager, label tasks so they can easily be identified as part of the given epic. Create any relevant tasks that do not exist yet. Note that issues do not need to be well formed until they are added to the current sprint backlog.

### 5.3. Product Roadmap
In your Sprint Journal, create a timeline or calendar to represent your product roadmap. You might experiment with different text or graphical formats to make a calendar that is easy for your team  to understand. In your roadmap, include:

* Approximate start date of each epic
* Approximate completion date of each epic
* Enough time for flexibility in case your approximations are off


### 5.4. Documentation plan
In your Requirements Document, outline a plan for the documentation that you plan to deliver with the system, e.g., user guides, admin guides, developer guides, man pages, help menus, wikis, etc. Make sure to create corresponding issues in your Issue Manager.



 
## Part 6: Continuous Integration Plan

In your Sprint Journal, write a test plan, describing:

* Your test library (e.g., JUnit, Mocha, Pytest, etc).
* A brief justification for why you chose that test library.
* Your CI service and how your project repository is linked to it. (GitHub Actions is the recommended CI service.)
* A brief justification for why you chose that CI service.

In the Developer Guidelines section of your Repository, document what a developer needs to know about testing and CI, including:

* How to add a new test to the code base.
* Which tests will be executed in a CI build.
* Which development actions trigger a CI build.

## Part 7: Test Automation and Continuous Integration Setup

## Part 8: Additional Work


