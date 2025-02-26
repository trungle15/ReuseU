# ReuseU: Milestone 1

## 1. Product Description with User Roles

### Product Description
Each year, students discard tons of usable items they no longer need and cannot otherwise get rid of. At the same time, students buy countless items to make their daily college lives more comfortable. Such practices of massive consumption and discarding are detrimental to both the planet and students’ wallets. 

Introducing **ReuseU**, a web-based platform that lets students on college campuses reduce their spending and environmental impact by creating a small-scale, highly local online marketplace where they can trade personal belongings with other students on their campus. Instead of relying on poorly timed yard sales, ReuseU allows both sellers and buyers to use the platform at a time that works for them, 24/7, all year long.

ReuseU is similar to the "for-sale" section of Craigslist but on a more highly local and community-based scale, populated by students and for students. It has the advantage of college-email verified users, making seller-buyer relationships more transparent and reliable. There is no need to travel to a neighboring city to make a purchase, as everything being sold is within the vicinity of the campus. 

Since the items sold on ReuseU come from college students themselves, they are much more likely to find a new use among other students than items available at other online marketplaces or local garage sales.

### Other Products That Inspired and Informed ReuseU

- **Craigslist** – A well-known, crowd-sourced, US-based advertisement website with a for-sale section where users can sell and buy used items. Although it lacks an appealing UI, it has fundamental features that ReuseU can adopt.
- **Facebook Marketplace** – A Meta-based platform similar to Craigslist’s for-sale section.
- **Mercari** – A marketplace website and app created by the Japanese e-commerce company Mercari, launched in 2013. It features a more appealing design compared to FB Marketplace or Craigslist, a feature ReuseU aims to emulate.
- **OLX.uz** – A marketplace website and app based in Uzbekistan. It features intuitive and helpful separation of products into categories, another feature ReuseU plans to adopt.

Unlike these platforms, each of which operates on a massive scale (national or international), ReuseU takes a different approach by creating **unlinked instances of its website**, each specific to a unique college or university.

### User Roles

1. **Merchant** – A student listing their personal items for sale on ReuseU.
2. **Consumer** – A student purchasing or inheriting items from another student.

## 2. User Personas and User Stories (Functional Requirements)

### User Personas

#### **Lucy (she/her) – Merchant || Casual User (Senior On The Rush)**
- **Scenario**: A fourth-year student living off-campus and graduating in two weeks. Busy with exams and needs to quickly sell belongings accumulated over four years.
- **Needs**:
  - Easily add multiple products for sale.
  - Adjust webpage size for better readability.
  - Remove sold items to avoid unnecessary requests.
  - Allow price suggestions from buyers for quick sales.

#### **Jack (he/him) – Consumer || Broke First-Year**
- **Scenario**: A first-year student needing to furnish a dorm room quickly and cheaply.
- **Needs**:
  - Locate cheap deals.
  - Verify seller legitimacy.
  - Read detailed product descriptions.
  - Sort items by price to find the cheapest options.

#### **Arsene (any) – Consumer & Merchant || The Scalper**
- **Scenario**: Buys cheap items and resells them at high prices.
- **Needs**:
  - Ability to resell items.
  - Negotiate prices.
  - Upload custom images to improve item presentation.
  - Look up items for potential resale.

#### **Dexter (he/him) – Consumer || Casual User**
- **Scenario**: A second-year sneakerhead periodically checking used marketplaces for deals on shoes.
- **Needs**:
  - See the condition of potential shoe purchases.
  - Filter listings to only show shoes.
  - Save listings for later review.
  - See if past sellers have additional items available.

#### **Chamomile (xi/xir) – Consumer || Hardcore User**
- **Scenario**: A 35-year-old freshman returning to college after a long break, previously worked in underground crypto development.
- **Needs**:
  - Navigate the website with a 40% keyboard.
  - Send messages to multiple users.
  - Access the site with minimal Wi-Fi.
  - Native Linux support.

#### **Chara (she/her) – Merchant || Hoarder**
- **Scenario**: Emotionally attached to items and wants to ensure they go to good hands.
- **Needs**:
  - Find appreciative buyers.
  - Ensure buyers are within the same university community.
  - Securely list items to avoid trouble with school authorities.

## In Depth User Personas Made for Sprint 1:
Use Case  1   (Timur)            
| Section             | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Actor               | Lucy (she/her)  Merchant/ Casual User / Not Tech Savvy / Does not need her old phone                                                      |
| Goal                | Add items to sell quickly.                                                                                                                |
| Trigger             | Lucy decides she wants to sell an item of hers (e.g. phone) and takes some pictures of it to upload on ReuseU.                            |
| Preconditions       | Lucy has a specific item in mind to sell, and she has at least one photo of it.                                                           |
| Postconditions      | Lucy can see her phone as an active listing on her listings page.                                                                         |
| Flow                | Sign up / Login > Create a Listing > Upload Photos, put up descriptions and price > Submit > Check the listing as active in "My Listings" |
| Alternative Flow  A | Lucy does not know the price she should charge for the phone. The website offers a suggestion  for her when she creates a listing.        |
| Alternative Flow B  | Lucy wants to check the listing is active by searching it up instead of finding it in her active listings                                 |


 Use Case  2  (Trung)

| Section          | Description                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actor            | Jack (he/him) Casual User / First Year Student. Budget-conscious. Needs to furnish his dorm quickly and cheaply.                                        |
| Goal             | Jacks wants to find a lamp, is durable enough to last and can fits his budget                                                                           |
| Trigger          | With classes starting soon, Jack’s urgency to furnish his dorm drives him to use ReuseU.                                                                |
| Preconditions    | Jack must be a registered, logged-in user with his college-email                                                                                        |
| Postconditions   | Jack sends a message to a seller, the transaction happens offline                                                                                       |
| Flow             | Logging in and navigating to the item; Sorting by price and browse listing; Check details and seller legitimacy; Message the seller to arrange a meetup |
| Alternative Flow | Jacks skips unverified seller and look for different listings                                                                                           |


Use Case  3    (Howie)           
| Section          | Description                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Actor            | Dexter (he/him) - Casual User, Needs a new Laptop after his current one ran out of storage                                  |
| Goal             | Dexter wants to efficiently browse and track laptop listings to find good deals                                             |
| Trigger          | Dexter visits the site to check for new laptop listings                                                                     |
| Preconditions    | Dexter has an account and is logged in. Listing for a laptop exists on the platform.                                        |
| Postconditions   | Dexter can view laptop listings, check their condition via photos, save interesting ones, and revisit later                 |
| Flow             | Dexter navigates to the marketplace, filters to display laptops, inspects conditions using provided images, saves listings. |
| Alternative Flow | If no listings match the filters, Dexter adjusts search criteria/looks for new things or just logs out.                     |


 Use Case  4  (Sofia)
   
| Section          | Description |
| ---------------- | ----------- |
| Actor            | Chara (she/her) - Casual User, Merchant, Hoarder |
| Goal             | Chara is trying to get rid of her precious items to a trusted community/platform since she graduated                                                                                                          |
| Trigger          | Chara is pressured by her familty to get rid of the clutter from her room as she is graduating and can't fit everything from her room in her car.                                                             |
| Preconditions    | Chara needs to be login in using an account from her college email.                                                                                                                                           |
| Postconditions   | Chara needs to see the about page, create a listing, cancel a listing, and look at people's profiles                                                                                                          |
| Flow             | Chara needs to make sure the website she wants to sell her precious items from has good intentions, so she navigates to the about page. Afte reading the about page she creates a listing for a hello kitty squishmellow from a free cost. After a buyer attempts to buy she looks at their profile to see if they had a high rating. She sees the high rating and accepts the requests and sends the buyer a message.                         |
| Alternative Flow | Chara sees that the user trying to buy her item has a poor buyer rating. She cancels the buy requests and relists the item so someone else can buy it.                                                        |

Use Case  5    (Peter)          
| Section          | Description |
| ---------------- | ----------- |
| Actor            | Arsene (he/him) - Hardcore User, Merchant, Finance Guru                                                                               |
| Goal             | Arsene wants to turn a profit using the marketplace. Ideally he buys items for cheap and sells the for a profit                       |
| Trigger          | Arsene hears about a booming new used marketplace and is excited for a new opportunity to use his finance trading skills              |
| Preconditions    | Arsene must be a registered, logged-in user with his college-email and has a method in mind to find underpriced items                 |
| Postconditions   | Arsene can use different filters, look at similar items to determine the true used value, can create and track listings               |
| Flow             | Arsene logs in, and filters the items with the lowest price. He then searches for similar items to the one that appeals to him to determine the true price. He then navigates back to his profile, where he can determine items he has both bought and sold. The prices for both bought and sold items are displayed, allowing Arsene to keep track of his profits. |
| Alternative Flow1| Arsene's account gets permanently banned due to siginificant reports because he refuses to sell items in person for the listed price. |


  Use Case  6  (Krishna)
   
| Section          | Description |
| ---------------- | ----------- |
| Actor            | Chamomile (xi, xir) - Consumer, Hardcore User    |
| Goal             | Chamomile wants to be able to use the website with the lowest specs available, while also being able to communicate with a large amount of people at once. Xir goal is to communicate with people for information on products and people in need of certain items in order to turn a profit.      |
| Trigger          | Short on cash and possessing only low-end technology, Chamomile sees an opportunity to gain profit with this new marketplace and improve his situation.    |
| Preconditions    | Having enrolled at Grinnell, Chamomile has access to an account with the site, and a means of communicating with collaborators.        |
| Postconditions   | Chamomile can check listings and buy and sell based on the information given by the collaborators.        |
| Flow             | Chamomile logs in, and goes to the chat where xi can communicate with xir 40 collaborators. The group exchanges information, then Chamomile returns to the home page to begin his buying and selling efforts.   |
| Alternative Flow | Chamomile finds xirself with a banned account after xi keeps forgetting to meet xir buyers in person.     |



## 3. Non-functional Requirements

1. Users must have a **.edu email address** for security.
2. Each university’s email network should have a **separate webpage/database** accessible only by users of that university.
3. User emails should be hidden from other users—only usernames should be visible.

## 4. External Requirements

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

### PHYSICAL REQUIREMENTS FROM PROTOTYPE TESTING
    - Report functionality for a listing/user
    - Profile section with settings
    - back buttons
    - better tag placement

## 5. Scope and Feature List

### **Major Features**
1. Unique **Databases** for each university **.edu address**.
2. Page displaying **available products** at each university.
3. **Login implementation** with unique users grouped by university.
4. Separate **buying and selling interfaces**.

### **Stretch Goals**
1. **Rating system** for sellers/buyers.
2. **Report system** for user experiences.

### **Out of Scope**
1. Support for external digital payments (e.g., PayPal, Klarna, Apple Pay, etc.).
2. Offline support.

## 6. Citations

- Craigslist, 1995, [www.desmoines.craigslist.org](https://www.desmoines.craigslist.org/)
- Facebook Marketplace, Oct. 2016, [www.facebook.com/marketplace](https://www.facebook.com/marketplace/)
- Mercari, 1 Feb. 2013, [www.mercari.com](https://www.mercari.com/)
- OLX.uz, 16 Feb. 2006, [www.olx.uz](https://www.olx.uz/)
