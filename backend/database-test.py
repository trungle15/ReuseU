import firebase_admin
from firebase_admin import credentials, db

#passes in creds to database and returns reference to root

def get_db_root():
    cred = credentials.Certificate("adminkey.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://reuseu-e42b8-default-rtdb.firebaseio.com/'
    })
    ref = db.reference('/')
    return ref


#prints all content from root of database
def print_all_content():
    ref = get_db_root()
    data = ref.get()
    print("Database content:", data)

print_all_content()
