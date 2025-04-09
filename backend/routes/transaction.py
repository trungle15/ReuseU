from flask import Blueprint, jsonify, request
from ..services import transaction_service

transactions_bp = Blueprint('transactions_bp', __name__)

@transactions_bp.route('/', methods=['GET'])
def get_transactions():
    # Note: The transaction service doesn't have a get_all_transactions function yet
    # This would need to be implemented in the transaction_service.py file
    # For now, returning a placeholder response
    return jsonify({"message": "Get all transactions endpoint - service function not implemented"}), 501

@transactions_bp.route('/<string:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    transaction_data = transaction_service.get_transaction(int(transaction_id))
    if transaction_data:
        return jsonify(transaction_data), 200
    else:
        return jsonify({"message": f"Transaction {transaction_id} not found"}), 404

@transactions_bp.route('/', methods=['POST'])
def create_transaction():
    transaction_data = request.json
    try:
        transaction_service.add_transaction(transaction_data)
        return jsonify({"message": "Transaction created successfully", "transaction_id": transaction_data.get('ListingID')}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@transactions_bp.route('/<string:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    transaction_data = request.json
    # Note: The transaction service doesn't have an update_transaction function yet
    # This would need to be implemented in the transaction_service.py file
    # For now, returning a placeholder response
    return jsonify({"message": f"Update transaction endpoint - service function not implemented"}), 501

@transactions_bp.route('/<string:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    try:
        transaction_service.delete_transaction(int(transaction_id))
        return jsonify({"message": f"Transaction {transaction_id} deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
