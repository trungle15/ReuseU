from flask import Blueprint, jsonify, request
# Import services once they're implemented
# from services.review_service import create_review, get_review, update_review, delete_review
<<<<<<< HEAD
=======
from ..services import review_service
>>>>>>> backend_work

reviews_bp = Blueprint('reviews_bp', __name__)

@reviews_bp.route('/', methods=['GET'])
def get_reviews():
<<<<<<< HEAD
    # Mock implementation
    return jsonify({"reviews": [
        {"id": "review1", "user_id": "user123", "target_id": "user456", "rating": 5, "comment": "Great seller, fast shipping!", "created_at": "2025-04-07T10:00:00Z"},
        {"id": "review2", "user_id": "user789", "target_id": "user456", "rating": 4, "comment": "Good experience overall", "created_at": "2025-04-06T15:30:00Z"}
    ]}), 200

@reviews_bp.route('/<string:review_id>', methods=['GET'])
def get_review(review_id):
    # Mock implementation
    return jsonify({
        "id": review_id,
        "user_id": "user123",
        "target_id": "user456",
        "rating": 5,
        "comment": "Great seller, fast shipping!",
        "created_at": "2025-04-07T10:00:00Z"
    }), 200
=======
    review_data = review_service.get_all_reviews()
    #notice review data is of form: (listing of reviews)
    #[{'ListingID': '195', 'Rating': 2, 'Review': 'Condition was okay, but definitely used more than stated.', 'ReviewDate': '2025-04-08T19:02:50.166324Z', 'ReviewerID': 17074, 'SellerID': 61273}, {'ListingID': '199', 'Rating': 4, 'Review': 'There were some scratches not shown in the photos.', 'ReviewDate': '2025-04-08T19:02:47.130622Z', 'ReviewerID': 12615, 'SellerID': 73825}, {'ListingID': '200', 'Rating': 4, 'Review': 'Item works, but smells strongly of perfume for some reason.', 'ReviewDate': '2025-04-08T19:02:59.793813Z', 'ReviewerID': 50329, 'SellerID': 65603}]]
    return jsonify(review_data), 200

@reviews_bp.route('/<string:review_id>', methods=['GET'])
def get_review(listing_id):
    review_data = review_service.get_review(int(listing_id))
    #review is of form:
    #{'ListingID': '17', 'Rating': 4, 'Review': 'Had more dents than I was expecting.', 'ReviewDate': '2025-04-08T19:02:24.036344Z', 'ReviewerID': 29280, 'SellerID': 62416}
    return jsonify(review_data), 200
>>>>>>> backend_work

@reviews_bp.route('/', methods=['POST'])
def create_review():
    review_data = request.json
<<<<<<< HEAD
    # Mock implementation
    # In a real implementation, would call: create_review(review_data)
    return jsonify({"message": "Review created successfully", "review_id": "new_review_id"}), 201

@reviews_bp.route('/<string:review_id>', methods=['PUT'])
def update_review(review_id):
    review_data = request.json
    # Mock implementation
    # In a real implementation, would call: update_review(review_id, review_data)
    return jsonify({"message": f"Review {review_id} updated successfully"}), 200

@reviews_bp.route('/<string:review_id>', methods=['DELETE'])
def delete_review(review_id):
    # Mock implementation
    # In a real implementation, would call: delete_review(review_id)
    return jsonify({"message": f"Review {review_id} deleted successfully"}), 200
=======
    #review data should have form:
    #{'ListingID': '121', 'Rating': 4, 'Review': 'Not bad, but buying process took a while.', 'ReviewDate': '2025-04-08T21:20:27.011530Z', 'ReviewerID': 18949, 'SellerID': 59130}
    review_service.add_review(review_data)
    return jsonify({"message": "Review created successfully", "review_id": "new_review_id"}), 201

#not implemented in services
@reviews_bp.route('/<string:review_id>', methods=['PUT'])
def update_review(listing_id):
    review_data = request.json
    # Mock implementation
    # In a real implementation, would call: update_review(review_id, review_data)
    return jsonify({"message": f"Review {listing_id} updated successfully"}), 200

#expects listing
@reviews_bp.route('/<string:review_id>', methods=['DELETE'])
def delete_review(listing_id):
    review_service.del_review(int(listing_id))
    return jsonify({"message": f"Review {listing_id} deleted successfully"}), 200
>>>>>>> backend_work
