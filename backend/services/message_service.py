import firebase_admin
from firebase_admin import credentials, db
import re
import os
import json

# get root of the database
def get_db_root():
    # check if app exists, init if not
    try:
        firebase_admin.get_app()
    except ValueError:
        # load credentials from env var or file
        pk_env = os.getenv("PK_JSON")
        if pk_env:
            cert = json.loads(pk_env)
            cred = credentials.Certificate(cert)
        else:
            path = os.path.join(os.path.dirname(__file__), "../pk.json")
            cred = credentials.Certificate(path)
        firebase_admin.initialize_app(cred, {
            'databaseURL': os.getenv("FIREBASE_DB_URL", 'https://reuseu-e42b8-default-rtdb.firebaseio.com/')
        })
    # get root ref
    ref = db.reference('/')
    return ref

ref = get_db_root()

#Inputs: dictionary account data of form:
# {LastTime': last_time,
#'MessageContent': message_content,
#'UserID': user_id,
#'ListingID': listing_id}
def add_message(message_data):
    # notice we read the number of accounts here and increment by 1
    messages = ref.child('Message').get()
    new_key = str(len(messages)) if messages else "1"
    message_data['MessageID'] = new_key
    
    # Temporarily store and remove ListingID since Message doesn't store it 
    # directly
    listing_id_temp = message_data['ListingID']
    message_data.pop("ListingID")
    
    # Add to Message Table
    ref.child('Message').child(new_key).set(message_data)

    # Look for an existing chat with this listing
    target_chat = None
    chat_exists = False
    chats = ref.child('Chat').get()
    
        
    # OLD LOOP
    # for chat in chats:
    #     for field, value in chat.items():
    #         if field == 'ListingID':
    #             if int(value) == listing_id_temp:
    #                 target_chat = chat
    #                 chat_exists = True
    
    # Check if chat tied to listing ID exists
    print((type(chat) for chat in chats))

    # If the chats table has # of chats >= 2
    if isinstance(chats, list):
    # keys are just indices in the list that are not None
        for chat in chats:
            if chat is not None:
                # To bypass the list of dicts
                for field, value in chat.items():
                    if field == 'ListingID':
                        # print(f"Checking value lIDt: {listing_id_temp}, and val: {value}")
                        if str(value) == listing_id_temp:
                            target_chat = chat
                            chat_exists = True
                            break
                if chat_exists == True:
                    break
    # If the chats table has only one chat
    elif isinstance(chats, dict):
        for chat in chats:
            if chat is not None:
                # Literally the only difference
                for field, value in chats.items():
                    if field == 'ListingID':
                        # print(f"Checking value lIDt: {listing_id_temp}, and val: {value}")
                        if str(value) == listing_id_temp:
                            target_chat = chat
                            chat_exists = True
                            break
                if chat_exists == True:
                    break

    if chat_exists:
        target_chat["Messages"] = target_chat["Messages"] + (str(message_data))
        # not new key but existing key
        ref.child('Chat').child(str(listing_id_temp)).set(target_chat)
    else:
        new_key = listing_id_temp
        new_chat = {}
        new_chat["ListingID"] = listing_id_temp
        new_chat["Messages"] = str(message_data)
        ref.child('Chat').child(new_key).set(new_chat)



# delete a message in the database from a message id
# not functioning at the moment


# For deletion, we can just delete whole chats instead of individual messages.
# for deleting messages in the messages table, we need to parse through 
# 'Messages' within the Chat table with a regular expression, where we get all
# the message ids within the strings: "MessageID: " <Message_ID> ","

# TODO:
# - 
def delete_chat(listing_id):
    target_chat = None
    # 1. find the chat using the listing id
    chats = ref.child('Chat').get()

    # print(chats)y
    for chat in chats:
        if chat is None:
            continue
        if chat['ListingID'] == str(listing_id):
            target_chat = chat
            break

    if target_chat is None:
        print("Chat does not exist")
        return
    
    # 2. iterate through messages (via Regex) and record all message ids 
    # associated with this chat in a list
    message_ids = []
    message = target_chat['Messages']
    print(message)
    message_ids = re.findall(r'\'MessageID\': \'(\d+)\'', message)
    print(message_ids)

    # 3. delete the chat
    ref.child('Chat').child(str(listing_id)).delete()
    
    
    # 4. find all the messages by message ids in message table and delete them.
    for message_id in message_ids:
        print(type(message_id))
        print(message_id)
        ref.child('Message').child(str(message_id)).delete()


    
    # listingid = ref.child('Message').child(str(message_id))['ListingID']
    # ref.child('Message').child(str(message_id)).delete()
    # chats = ref.child('Chat').get()

    # target_chat = None
    # chat_exists = False
    # chats = ref.child('Chat').get()
    # for chat in chats:
    #     for field, value in chat.items():
    #         if field == 'ListingID':
    #             if int(value) == listingid:
    #                 target_chat = chat
    #                 chat_exists = True
    # if chat_exists:
    #     target_chat["Messages"] = target_chat["Messages"].append(message_data)
    #     ref.child('Chat').child(new_key).set(target_chat)
    # else:
    #     print("Chat does not exist")

def delete_message(message_id):
    """
    Delete a specific message from the database using its message ID.
    
    Args:
        message_id (str): The ID of the message to delete
    """
    try:
        # Delete the message from the Message table
        ref.child('Message').child(str(message_id)).delete()
        
        # Find and update any chats that contain this message
        chats = ref.child('Chat').get()
        if isinstance(chats, dict):
            for chat_id, chat in chats.items():
                if chat and 'Messages' in chat:
                    # Remove the message from the chat's Messages string
                    messages_str = chat['Messages']
                    # Use regex to find and remove the message with this ID
                    pattern = r'\{[^}]*\'MessageID\': \'' + str(message_id) + r'\'[^}]*\}'
                    new_messages_str = re.sub(pattern, '', messages_str)
                    if new_messages_str != messages_str:
                        # Update the chat with the modified messages string
                        ref.child('Chat').child(chat_id).update({'Messages': new_messages_str})
    except Exception as e:
        print(f"Error deleting message: {str(e)}")
        raise e