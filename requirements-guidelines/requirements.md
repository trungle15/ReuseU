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

Major software components - UI frontend with listings, user authentication database with firebase, database for listings
UI (Frontend) -> allows purchasing/posting of items
User authentication -> allows for authentication of users from user/password
Listing Database -> stores listings that can be modified.
UI Frontend -> connects (initially) to the user authentication database for sign in. It pulls current listings from the Listings database associated
with the users email address. The UI Frontend can update the Listings database via the adding of Listings, and the purchasing of said Listings. The Listings can
also be updated.
The Major Data storage components are 
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

- The Account table holds initial account information which is filled at the time of account creation. This table contains a users personal information such as name, email and identifying information such as UserId and date of creation.
- The Listing table holds the information present on a particular listing. We have data about the listing like title, description, category and the identifying information is listing id and user id (the seller's id).
- The Reviews table holds 3 ids: selling, buying, listing. The content of the review is stored alongside the rating and the time of the review.
- The Transaction table holds the same ids as the review table alongside price and date of transaction.
- We have a seperate profile table that only holds userid and the user's rating. We may remove this table but as of now we wanted to seperate what is constant at account creation and what is added to an account later. If we add more changing fields tied to an account, they will be placed in this profile table. CHANGE FROM PHOTO: Purchased Listing and Sold Listings are stacks/arrays of listing ids included in profile.
- We have a message table containing the userid, message id, time of chat and message content. CHANGE FROM PHOTO: we have boolean saying whether the message came from the buyer or seller.
- Chat holds the array/stack of message ids tied to a listing.

Part 4: Software Design
Formed by: A listings homepage, populated with clickable Listings, that contain data such as price, username of the seller, a favorited option, description, etc.
Upon being clicked, A Listing page opens, with more in depth details.
There is a profile page, accessible by the profile photo in the dashboard, with information on the user.
You can sign in and sign out using a dropdown from the dashboard.
You can send messages to people, saved to the messages table of the listings database.

Firebase User identification Database
Simply a database with username and password that is used to log in to the application. Managed in the cloud.


Listings Database
The database providing the listings will have the following schema, explained in detail above in part 3:
an Account database, a Transaction table associated with the college email, Listing table for the specific email domain, Review table for the domain specific email,
Message/Chat tables for messages.

Users type in their username and password which then gets sent to the firebase auth, if successful they receive an auth token which allows them
to log on the site. If they are a first time login, they will fill in things like Birthday/Age, Gender, etc, which will then be sent to our user database (separate to 
the firebase auth, we use the firebase user-id as a key) Upon clicking a listing, then a sellers profile, then messaging them, the messages will be stored in the database, which then sends a packet
to update the receiving users messages.
When users create a listing, they will fill out information such as Title, price, description, categoryID, and Images.
Automatically added to this data object will be a generated ListingID, UserID, Sell Status, CreateTime, (and a translation of CategoryID if necessary (i.e) *electronics* to 12)
This will all be coupled to to a single object, and sent to the Listings table in the database, which will then propagate back to the website for potential sellers to see.

Upon transaction, *since they will take place offline*, the users will have to confirm. We will then attribute a ListingID, then use the Buyer and Seller ID,
take the self-reported date of transaction, and price, and send it to the transaction table of the database.
The Listings Sell status will then be updated accordingly. 

The user will be able to review sellers -> an object containing the review will be sent, automatically tagged with
ListingID, ReviewerID, SellerID, Review, ReviewData, Rating to the Review table.