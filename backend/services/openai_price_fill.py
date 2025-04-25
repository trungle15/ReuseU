'''
OpenAI Price Autofill (AI EXPERIMENT FOR SPRINT 4)

This file handles price autofill, so that sellers can have the option to get
their listing automatically priced if they are unsure of what they should sell
something for.

Author: Sofia DiCarlo, Class of 2025
'''
from openai import OpenAI
from dotenv import load_dotenv #< For private OPENAI_API_KEY handling
import os #< OS routines for NT or Posix depending on what system we're on.
import re #< regular expressions library

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

RETURNS: 
Once the price has been returned, returns a upper-range price and lower-range 
in format [lower_price, upper_price]

ERROR HANDLING:
The function includes several layers of error handling:

1. Environment Variables:
   - If OPENAI_API_KEY is not set in .env file, os.getenv() will return None
   - This will cause the OpenAI client initialization to fail

2. Input Validation:
   - Description is optional and defaults to "no description provided" if None
   - Category dictionary is converted to a comma-separated string
   - Empty or invalid categories will result in an empty string

3. OpenAI API Response:
   - The function expects a response in the format "<lower_price>-<upper_price>"
   - Uses regex pattern r'(\d+)\s*-\s*(\d+)' to extract price range
   - Raises ValueError if the response format is invalid
   - Example valid response: "10-20" or "10 - 20"
   - Example invalid response: "around $10" or "10 to 20"

4. Price Range Validation:
   - Extracted prices must be valid integers
   - Lower bound must be less than or equal to upper bound
   - Negative prices are not explicitly handled

Example Error Cases:
```python
# Missing API Key
api_key = None  # Raises OpenAI API error

# Invalid Category Format
category = {}  # Results in empty string for categories_formatted

# Invalid OpenAI Response
suggestion = "around $10"  # Raises ValueError

# Invalid Price Range
suggestion = "20-10"  # Valid format but illogical price range
```

To handle these errors in your application:
```python
try:
    price_range = get_price_prediction(category, name, description)
except ValueError as e:
    # Handle invalid price format
    print(f"Error: {e}")
except Exception as e:
    # Handle other errors (API, environment, etc.)
    print(f"Unexpected error: {e}")
```
'''
def get_price_prediction(category, name, description):
    
    # A fall-back for when a description is not provided, and is 'None'.
    description_text = description if description else "no description provided"
    
    # Format the category(s) for better prompting 
    # (dict -> "Categ_1, Categ_2, ...")
    categories_formatted = ", ".join(list(category.values()))
    
    # Generate price autofill response 
    response = client.responses.create(
        model="gpt-4.1-nano",
        instructions="Do not restate the prompt, just provide the price range for the item with no dollar signs in this format: <lower price>-<upper price>",
        input=f"Give me a good general price for {name}, in the {categories_formatted} category(s), described as {description_text}"
        )
    
    # Store suggestion
    suggestion = response.output_text
    
    # INPUT VALIDATION: Make sure that 'suggestion' variable has the correct
    #   format: "<lower_price>-<upper_price>"
    match = re.search(r'(\d+)\s*-\s*(\d+)', suggestion)
    if match:
        lower_bound = int(match.group(1))
        upper_bound = int(match.group(2))
    else:
        raise ValueError(f"Could not parse price range from: {suggestion}")
    
    # OpenAI suggests this price range: 
    return [lower_bound, upper_bound]

'''
Test function to test OpenAI prompting. Feel free to edit the test inputs.
'''
def price_fill_test():
    
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
    print(f"OpenAI suggests this price range for {name}:", prediction)
    

# Call test function to view the ai
price_fill_test()

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