from flask import Blueprint, jsonify, request
from services import listing_service
from services.jwt_middleware import jwt_required

listings_bp = Blueprint('listing_bp', __name__)

# takes in listing_id integer
@listings_bp.route('/<string:listing_id>', methods=['GET'])
@jwt_required
def get_listing(current_user, listing_id):
    listing_data = listing_service.get_listing(listing_id)
    if listing_data:
        return jsonify(listing_data), 200
    else:
        return jsonify({"message": f"Listing {listing_id} not found"}), 404


# returns all listings
@listings_bp.route('/', methods=['GET'])
@jwt_required
def get_listings(current_user):
    listing_data = listing_service.get_all_listings_total()
    if listing_data:
        return jsonify(listing_data), 200
    else:
        return jsonify([]), 200


# gets all listings for a specific user by account ID
@listings_bp.route('/user/<string:account_id>', methods=['GET'])
@jwt_required
def get_account_listing(current_user, account_id):
    listing_data = listing_service.get_all_listings_user(account_id)
    if listing_data:
        return jsonify(listing_data), 200
    else:
        return jsonify([]), 200


# creates a listing
# request.json should return object of form:
# {'Category': {1: 'Dinnerware', 2: 'Storage', 3: 'Above $500'},
#  'CreateTime': '2025-04-08T21:11:00.569312Z',
#  'Description': 'Still in good condition, barely used.',
#  'Images': {7: 'image3.png'},
#  'Price': '279.72',
#  'SellStatus': 1,
#  'Title': 'Vintage Leather Jacket',
#  'UserID': 412}
@listings_bp.route('/', methods=['POST'])
@jwt_required
def create_listing(current_user):
    listing_data = request.json
    try:
        listing_service.add_listing(listing_data)
        return jsonify({"message": "Listing created successfully", "listing_id": listing_data.get('ListingID')}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# update listing (not implemented yet in service)
@listings_bp.route('/<string:listing_id>', methods=['PUT'])
@jwt_required
def update_listing(current_user, listing_id):
    listing_data = request.json
    return jsonify({"message": f"Update listing endpoint - service function not implemented"}), 501


# deletes a listing
@listings_bp.route('/<string:listing_id>', methods=['DELETE'])
@jwt_required
def remove_listing(current_user, listing_id):
    try:
        listing_service.del_listing(listing_id)
        return jsonify({"message": f"Listing {listing_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
