import firebase_admin
from firebase_admin import credentials, db

service_account_path = "path/to/your/serviceAccountKey.json"

cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://reuseu-e42b8-default-rtdb.firebaseio.com/'
})

ref = db.reference('/')
data = ref.get()

print("Database content:", data)