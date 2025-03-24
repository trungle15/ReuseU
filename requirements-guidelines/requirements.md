## Non-functional Requirements

1. Users must have a **.edu email address** for security.
2. Each university’s email network should have a **separate webpage/database** accessible only by users of that university.
3. User emails should be hidden from other users—only usernames should be visible.

## External Requirements

- ReuseU will be a web-based platform accessible via a public URL.
- Instructions will be provided for setting up another instance of the website on a local server.
- Security measures will be implemented, including requiring a university email.
- The project will include documentation to facilitate contributions and system understanding.

### REQUIREMENT UPDATES FROM PEER FEEDBACK
    - to prevent malignant usage and emphasize code stability, ReuseU will not be made open source.
    - Users should be able to list items for sale and trade with price parameters they define themselves
    - A **moderation** system should allow administrators to report or remove inappropriate listings
    - Listings should **expire automatically** after a set period to prevent outdated post clutter
    - A **category-based search and filter should be implemented for easy item searching**
    - interface should be **mobile-friendly**

### REQUIREMENT UPDATES FROM CIDER LAB
    - preferred payment method tags will be added as to not be restrictive
    - there will be an optional "delivery method" tag that can be used if items are large/far away, etc.

### PHYSICAL REQUIREMENTS FROM PROTOTYPE TESTING
    - Report functionality for a listing/user
    - Profile section with settings
    - back buttons
    - better tag placement




### SPRINT 2 

## Part 2: Software Architecture
Provide an overview of your system. In your Requirements Document, add the following:

Identify and describe the major software components and their functionality at a conceptual level.
Specify the interfaces between components at a high level. Which components connect to which other components?
Identify the major data storage components and specify interfaces between data storage and software components.
Create a diagram of your system's architecture. Most of the above can be specified by an architecture diagram, but add notes as needed to describe the diagram.
If there are particular assumptions underpinning your chosen architecture, identify and describe them.

Write about your design decisions. In your Sprint Journal, add an entry on the following:

For each of two decisions pertaining to your software architecture, identify and briefly describe an alternative. For each of the two alternatives, discuss its pros and cons compared to your choice.

## Part 3: Data Modeling
Data modeling: If your system stores data, describe in detail what data your system stores, and how. If it uses a database, give the first draft of your database schema. If not, describe how you are storing the data and its organization. To explain your data, you may find it helpful to draw an entity-relation diagram.

Add the data model to your Requirements Document.

Initial database schema:

![Database Schema](../assets/Database_Schema.jpg)


