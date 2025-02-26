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

## 3. Non-functional Requirements

1. Users must have a **.edu email address** for security.
2. Each university’s email network should have a **separate webpage/database** accessible only by users of that university.
3. User emails should be hidden from other users—only usernames should be visible.

## 4. External Requirements

- ReuseU will be a web-based platform accessible via a public URL.
- Instructions will be provided for setting up another instance of the website on a local server.
- Security measures will be implemented, including requiring a university email.
- The project will include documentation to facilitate contributions and system understanding.

### REQUIREMENT UPDATES FROM ORIGINAL PEER FEEDBACK
    - to prevent malignant usage and emphasize code stability, ReuseU will not be made open source.
    - Users should be able to list items for sale and trade with price parameters they define themselves
    - A **moderation** system should allow administrators to report or remove inappropriate listings
    - Listings should **expire automatically** after a set period to prevent outdated post clutter
    - A **category-based search and filter should be implemented for easy item searching**
    - interface should be **mobile-friendly**

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
