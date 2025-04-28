import firebase_admin
import pytest
from firebase_admin import credentials, db

from services.message_service import add_message, delete_chat
from services.exceptions import NotFoundError



try:
    firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate("pk.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://reuseu-e42b8-default-rtdb.firebaseio.com/'
    })
# get root ref
ref = db.reference('/')

#for i in range(20):

message_id = add_message({
        'LastTime': "now",
        'MessageContent': "OH YEAH",
        'UserID': 3, 
        'ListingID': '2'
    })



#compare = get_acc(account_id)

#def test_get():
#    assert compare['First_name'] == 'Krishna'
#    assert compare['Last_name'] == 'Nayar'
#    assert compare['PhoneNumber'] == '713-775-9080'
#    assert compare['School'] == 'grinnell'
#    assert compare['Username'] == 'kanayar21'
#    assert compare['dateTime_creation'] == '2025-04-08T18:56:02.560105Z'

delete_chat(message_id)

#def test_deletion():
#    if not ref.child('Account').get():
#        with pytest.raises(NotFoundError, match= "No accounts found."):
#            get_acc(1)
#    else:
#        with pytest.raises(NotFoundError, match= f"Account {account_id} not found."):
#            get_acc(account_id)
    