from flask import Blueprint, jsonify, request
from services.listing_service import add_listing, del_listing, get_all_listings_total

listings_bp = Blueprint('listings', __name__)

@listings_bp.route('/', methods=['GET'])
def get_listings():
    try:
        listings = get_all_listings_total()
        if listings is None:
            return jsonify({"listings": []}), 200
        return jsonify({"listings": listings}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@listings_bp.route('/<string:listing_id>', methods=['GET'])
def get_listing(listing_id):
    try:
        listings = get_all_listings_total()
        if listings is None:
            return jsonify({"error": "No listings found"}), 404
            
        for listing in listings:
            if listing is not None and str(listing.get('ListingID')) == str(listing_id):
                return jsonify(listing), 200
                
        return jsonify({"error": "Listing not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@listings_bp.route('/', methods=['POST'])
def create_listing():
    try:
        listing_data = request.get_json()
        
        # Validate required fields
        required_fields = ['Category', 'Description', 'Price', 'SellStatus', 'Title', 'UserID']
        for field in required_fields:
            if field not in listing_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Add the listing using the service
        add_listing(listing_data)
        return jsonify({"message": "Listing created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@listings_bp.route('/<string:listing_id>', methods=['PUT'])
def update_listing(listing_id):
    try:
        listing_data = request.get_json()
        
        # First check if listing exists
        listings = get_all_listings_total()
        listing_exists = False
        for listing in listings:
            if listing is not None and str(listing.get('ListingID')) == str(listing_id):
                listing_exists = True
                break
                
        if not listing_exists:
            return jsonify({"error": "Listing not found"}), 404
            
        # Delete the old listing
        del_listing(listing_id)
        
        # Create new listing with updated data
        listing_data['ListingID'] = listing_id
        add_listing(listing_data)
        
        return jsonify({"message": f"Listing {listing_id} updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@listings_bp.route('/<string:listing_id>', methods=['DELETE'])
def delete_listing(listing_id):
    try:
        # First check if listing exists
        listings = get_all_listings_total()
        listing_exists = False
        for listing in listings:
            if listing is not None and str(listing.get('ListingID')) == str(listing_id):
                listing_exists = True
                break
                
        if not listing_exists:
            return jsonify({"error": "Listing not found"}), 404
            
        del_listing(listing_id)
        return jsonify({"message": f"Listing {listing_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400