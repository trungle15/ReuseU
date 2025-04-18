'''
OpenAI Price Autofill (AI EXPERIMENT FOR SPRINT 4)

This file handles price autofill, so that sellers can have the option to get
their listing automatically priced if they are unsure of what they should sell
something for.

Author: Sofia DiCarlo, Class of 2025
'''
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variable 
load_dotenv()

# Get and set up private key
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(
   api_key=api_key 
)

'''
get_price_prediction

Function that creates a price suggestion for a seller when creating a listing

PARAMETERS:
* category (dictionary of strings): The category(s) associated with listing
* name (string): Name of the listing
* (OPTIONAL) description (string): Description that seller writes for product, 
                                   is optional for OpenAI prompting. Optional
                                   meaning that description can be passed in as
                                   'None'
                    
Use the input parameters, pass them into the ai with a custom prompt to get a 
price that is good for college student.

"Give me a good general price for <name>, in the <category> category, described 
as <optional description>"

RETURNS: 
Once the price has been returned, returns a upper-range price (price * .90) and 
lower-range (price * .75) in format [lower_price, upper_price]
'''
def get_price_prediction(category, name, description):

    # Test to check format of category(s)
    # print(f"categories are: {category}\n\n")
    
    # Generate price autofill response 
    response = client.responses.create(
        model="gpt-4.1-nano",
        instructions="Do not restate the prompt, just provide the price range for the item with no dollar signs in this format: <lower price>-<upper price>",
        input=f"Give me a good general price for {name}, in the {category} category(s), described as {description}"
        )
    
    # Store suggestion
    suggestion = response.output_text
    
    # Test
    # print(suggestion)
    
    # Find where the - character is in the response
    dash_location = None
    for i, char in enumerate(suggestion):
        if char == "-":
            dash_location = i
            # print(i)
        else:
            continue
    
    lower_bound = int(suggestion[0:dash_location])
    upper_bound = int(suggestion[dash_location+1:len(suggestion)])
    
    # print(lower_bound)
    # print(upper_bound)
    
    # OpenAI suggests this price range: 
    return [lower_bound, upper_bound]

'''
Test function to test OpenAI prompting. Feel free to edit the test inputs.
'''
def test_function():
    
    # Test category (dictionary of strings)
    category = {
        1: "Utensils",
        2: "Kitchen"
    }
    # Test listing name (string)
    name = "Large serrated kitchen knife"
    # Test description (OPTIONAL)
    description = None
    
    # Call the OpenAI prompt
    prediction = get_price_prediction(category, name, description)
    print("Price range:", prediction)
    

# Call test function to view the ai
test_function()

'''
******************************************************************************
AI TEST PROMPT
'''
# # Test prompt that creates a haiku
# completion = client.chat.completions.create(
#   model="gpt-4.1-nano",
#   store=True,
#   messages=[
#     {"role": "user", "content": "write a haiku about ai"}
#   ]
# )

# # Test
# print(completion.choices[0].message)
'''
******************************************************************************
'''