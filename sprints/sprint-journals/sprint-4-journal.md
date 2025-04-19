# Sprint 4 Journal 

## Part 1: External Documentation and Stakeholder Meetings


## Part 2: Internal Documentation

### Team 1: Krishna, Peter, Timur. 
Timur and Peter reviewing Krishna’s code
	
#### Code we worked on: 
ReuseU/backend/services/test_suite.py lines 1-566

#### Changes we made: 

* Made the testing menu case-insensitive for user input such as Y/y or N/n to make testing simpler. 
* Clarified the inclusive/exclusive nature of indices when deleting accounts. Made both indices inclusive for ease of use.
* Changed the menu message for when deleting accounts to  say smth closer to “enter starting index for range of accounts to delete (inclusive)”
* Possible change to be implemented later : ensure consistency in naming variables (snake case and capitalization of variables)

#### Existing documentation that was helpful

We found menu comments/directions in the test-suite for the tester to follow to be particularly useful and well-organized by use-case. Doc strings for functions in the code file were also helpful tho more needed.
The larger one-line comments that separate code into logical sections

#### Commit hash for new documentation and link:
* Commit hash: 
* Link:



### Team 1.1: Krishna, Peter, Timur. 
Timur and Krishna reviewing Peter’s code
	
#### Code we worked on: 
* ReuseU/backend/services/message_service.py lines 25-74, and 
* ReuseU/backend/services/transaction_service.py lines 20-50

#### Changes we made: 

* Clarified some of the documentation in add_message function, specifically how the indexing for creating new message works. 
* Removed debugging print statements for code cleanliness.
*  Included comments to explain the if else branch for appending a message vs creating a new one. 
* Also deleted OLD LOOP code.
* Removed unnecessary spacing between the documentation strings and the function definitions.

#### Existing documentation that was helpful

I found the doc strings at function definitions that talk about input formats were helpful in understanding what the function is expected to take in as a parameter and then understand how it operates on that parameter. 



#### Commit hash for new documentation and link:
* Commit hash: 
* Link:




### Team 2: Sofia, Howie, Trung



## Part 3: Self-Selected Work toward Minimum Viable Product (MVP)

## Part 4: Generative AI Experiment
* Sofia used OpenAI to implement a Price suggestion feature.
   1. Going into using OpenAI for the first time in this way, I was expecting the AI to very in the price range that it gave. I was hoping that this AI would help circumvent our need to cross-check different listings in our database and use the LLM's database instead for price-matching. Especially because there may not always be many, or any other listings of the same type to cross-reference in thr first place.
   2. How I prompted it: In my function, `get_price_prediction`, I pass in `name`, `category`(s), and `description`(optional), and use these aspects of a listing to generate a price range suggestion to provide when a user creates a listing and goes to input a price. I used the following prompt: 
      1. _"Give me a good general price for `{name}`, in the `{category}` category(s), described as `{description}`"_
      2. I put the following in the `instructions` field: _"Do not restate the prompt, just provide the price range for the item with no dollar signs in this format: `<lower_price>-<upper_price>`"_
   3. **TODO; Discuss with other team members**: _How did this use of AI affect your product development or other sprint deliverables? If you integrated any of its output directly into your code base, include a link to a pull request where the generated output can be clearly distinguished._
   4. *OpenAI* helped immensely with easing the process of price suggestions. It is a feature that we originally pushed off as a stretch goal due to the complexity of our original approach, but this turned it into a very doable deliverable.

## Part 5: Demo 2 and Presentation