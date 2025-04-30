from flask import Blueprint, jsonify, request
from flask_cors import CORS
from firebase_admin import auth
from database import ref
from datetime import datetime
import uuid
import json
import traceback

chats_bp = Blueprint('chats_bp', __name__)
CORS(chats_bp)

def get_user_info(user_id):
    try:
        user = auth.get_user(user_id)
        return {
            'username': user.display_name or user.email.split('@')[0],
            'avatar': user.photo_url
        }
    except Exception:
        return {'username': 'Unknown User', 'avatar': None}


from services.jwt_middleware import jwt_required

@chats_bp.route('/user/<string:current_user_id>', methods=['GET'])
@jwt_required
def get_user_chats(current_user, current_user_id):
    chats_ref = ref.child('Chat')
    all_chats = chats_ref.get() or {}

    user_chats = []
    for chat_id, chat_data in all_chats.items():
        participants = chat_data.get('Participants', [])
        if current_user_id in participants:
            other_user_id = next((uid for uid in participants if uid != current_user_id), None)

            messages = chat_data.get('Messages', {})
            last_message = None

            if isinstance(messages, dict) and messages:
                last_msg_key = sorted(messages.keys())[-1]
                msg_data = messages[last_msg_key]
                last_message = {
                    'text': msg_data.get('Content', ''),
                    'timestamp': msg_data.get('Timestamp', '')
                }

            user_chats.append({
                'id': chat_id,
                'listing_id': chat_data.get('ListingID'),
                'other_user': get_user_info(other_user_id) if other_user_id else None,
                'last_message': last_message
            })

    return jsonify({"chats": user_chats}), 200


@chats_bp.route('/<string:chat_id>', methods=['GET'])
@jwt_required
def get_chat_messages(current_user, chat_id):
    try:
        chat_ref = ref.child('Chat').child(chat_id)
        chat = chat_ref.get()

        if not chat:
            return jsonify({"error": "Chat not found"}), 404

        messages_data = chat.get('Messages', {}) or {}
        message_list = []

        for msg_id, msg in sorted(messages_data.items()):
            message_list.append({
                'id': msg.get('MessageID', msg_id),
                'sender_id': msg.get('SenderID', ''),
                'message': msg.get('Content', ''),
                'timestamp': msg.get('Timestamp', ''),
                'read': msg.get('Read', False)
            })

        return jsonify({
            'chat_id': chat_id,
            'listing_id': chat.get('ListingID', ''),
            'messages': message_list
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@chats_bp.route('/start', methods=['POST'])
@chats_bp.route('/start', methods=['POST'])
@jwt_required
def start_or_get_chat(current_user):
    data = request.json
    listing_id = data.get('listing_id')
    seller_id = data.get('seller_id')
    buyer_id = data.get('buyer_id')

    if not listing_id or not seller_id or not buyer_id:
        return jsonify({"error": "Missing listing_id, seller_id, or buyer_id"}), 400

    chats_ref = ref.child('Chat')
    existing_chats = chats_ref.get() or {}

    existing_chat_id = None
    for chat_id, chat_data in existing_chats.items():
        if str(chat_data.get('ListingID')) == str(listing_id) and buyer_id in chat_data.get('Participants', []):
            existing_chat_id = chat_id
            break

    if existing_chat_id:
        chat_id = existing_chat_id
    else:
        new_chat = {
            'ListingID': listing_id,
            'Participants': [buyer_id, seller_id],
            'CreatedAt': datetime.utcnow().isoformat(),
            'Messages': {}
        }
        new_chat_ref = chats_ref.push(new_chat)
        chat_id = new_chat_ref.key

    seller_info = get_user_info(seller_id)

    return jsonify({
        'id': chat_id,
        'listing_id': listing_id,
        'buyer_id': buyer_id,
        'seller_id': seller_id,
        'other_user': seller_info,
        'created_at': datetime.utcnow().isoformat()
    }), 200


@chats_bp.route('', methods=['POST'])
@chats_bp.route('/', methods=['POST'])
@jwt_required
def create_chat(current_user):
    data = request.json
    listing_id = data.get('listing_id')
    seller_id = data.get('seller_id')
    buyer_id = data.get('buyer_id')

    if not listing_id or not seller_id or not buyer_id:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        chats_ref = ref.child('Chat')
        existing_chats = chats_ref.get() or {}

        for chat_id, chat_data in existing_chats.items():
            if str(chat_data.get('ListingID')) == str(listing_id) and set(chat_data.get('Participants', [])) == {buyer_id, seller_id}:
                return jsonify({
                    'id': chat_id,
                    'listing_id': listing_id,
                    'buyer_id': buyer_id,
                    'seller_id': seller_id,
                    'created_at': chat_data.get('CreatedAt', datetime.utcnow().isoformat())
                }), 200

        new_chat = {
            'ListingID': listing_id,
            'Participants': [buyer_id, seller_id],
            'CreatedAt': datetime.utcnow().isoformat(),
            'Messages': {}
        }

        new_chat_ref = chats_ref.push(new_chat)
        new_chat_id = new_chat_ref.key

        return jsonify({
            'id': new_chat_id,
            'listing_id': listing_id,
            'buyer_id': buyer_id,
            'seller_id': seller_id,
            'created_at': new_chat['CreatedAt']
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@chats_bp.route('/<string:chat_id>/messages', methods=['POST'])
@chats_bp.route('/<string:chat_id>', methods=['POST'])
@jwt_required
def send_chat_message(current_user, chat_id):
    data = request.json
    print("[send_chat_message] Received data:", data)

    message = data.get('content')
    sender_id = data.get('sender_id')

    if not message:
        return jsonify({"error": "Message content cannot be empty"}), 400
    if not sender_id:
        return jsonify({"error": "sender_id is required"}), 400

    try:
        message_id = str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()

        message_data = {
            "MessageID": message_id,
            "SenderID": sender_id,
            "Content": message,
            "Timestamp": timestamp,
            "Read": False
        }

        # Store message under Chat/<chat_id>/Messages/<message_id>
        chats_ref = ref.child("Chat").child(chat_id).child("Messages")
        chats_ref.child(message_id).set(message_data)

        # Optional: update chat root with latest timestamp
        ref.child("Chat").child(chat_id).update({"LastMessageAt": timestamp})

        return jsonify({
            "message_id": message_id,
            "sender_id": sender_id,
            "message": message,
            "timestamp": timestamp
        }), 201

    except Exception as e:
        print("[send_chat_message] Exception:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@chats_bp.route('/<string:chat_id>', methods=['DELETE'])
@chats_bp.route('/<string:chat_id>', methods=['DELETE'])
@jwt_required
def delete_chat(current_user, chat_id):
    try:
        chat_ref = ref.child('Chat').child(chat_id)
        chat_ref.delete()
        return jsonify({"message": f"Chat {chat_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
