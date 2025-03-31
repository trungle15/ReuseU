import datetime
import random

import firebase_admin
from firebase_admin import credentials, db


def get_db_root():
    # check if app exists, init if not
    try:
        firebase_admin.get_app()
    except ValueError:
        cred = credentials.Certificate("pk.json")
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://reuseu-e42b8-default-rtdb.firebaseio.com/'
        })
    # get root ref
    ref = db.reference('/')
    return ref

def print_all_content():
    # print db content
    ref = get_db_root()
    db_content = ref.get()
    print("database content:", db_content)

def add_account(account_data):
    # add account with sequential key (count + 1)
    ref = get_db_root()
    accounts = ref.child('Account').get()
    new_key = str(len(accounts) + 1) if accounts else "1"
    ref.child('Account').child(new_key).set(account_data)

# generates accs for testing purposes
def generate_random_account():
    # sample data lists
    first_names = ["trung", "bob", "krishna", "diana", "ethan", "fiona", "george", "hannah", "ivan", "julia"]
    last_names = ["smith", "johnson", "williams", "brown", "jones", "garcia", "miller", "davis"]
    colleges = ["grinnell college", "harvard university", "boston college", "ripon college", "yale university", "princeton university"]

    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    college = random.choice(colleges)
    # random phone: xxx-xxx-xxxx
    phone = f"{random.randint(100,999)}-{random.randint(100,999)}-{random.randint(1000,9999)}"
    user_id = random.randint(1000, 9999)
    username = first_name + str(random.randint(10,99))
    creation_time = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")

    return {
        'First_name': first_name,
        'Last_name': last_name,
        'PhoneNumber': phone,
        'School': college,
        'UserID': user_id,
        'Username': username,
        'dateTime_creation': creation_time
    }

def print_all_accounts():
    # print each account
    ref = get_db_root()
    accounts = ref.child('Account').get()
    if not accounts:
        print("no accounts found")
        return
    for key, account in accounts.items():
        print(f"account key: {key}")
        for field, value in account.items():
            print(f"  {field}: {value}")
        print("-" * 20)

# generate and add random account
new_random_account = generate_random_account()
add_account(new_random_account)
print_all_content()
print_all_accounts()
