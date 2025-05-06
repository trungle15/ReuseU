'''
Blob Storage:
- This file will handle the blob storage for ReuseU, meaning the storage for
  image files that the website will use to display.

Author(s): Peter Murphy
'''
import json
import re
import os
import base64
import random

import numpy as np

"""
# Disabled blob_storage implementation to cut down deployment size
import logging
logger = logging.getLogger(__name__)
class cv2:
    @staticmethod
    def imdecode(data, flags):
        logger.debug("Stub cv2.imdecode")
        return None
    @staticmethod
    def imencode(ext, img):
        logger.debug("Stub cv2.imencode")
        return (True, b"")

class boto3:
    @staticmethod
    def resource(service_name):
        logger.debug(f"Stub boto3.resource {service_name}")
        return None
"""

def connect_to_blob_db_resource():
    # Get the absolute path to the credentials file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.dirname(current_dir)
    cred_path = os.path.join(backend_dir, "pk2.json")
    
    with open(cred_path, "r") as f:
        cfg = json.load(f)

    s3 = boto3.resource(
        "s3",
        endpoint_url=cfg["endpoint_url"],
        aws_access_key_id=cfg["aws_access_key_id"],
        aws_secret_access_key=cfg["aws_secret_access_key"],
        region_name=cfg.get("region_name", "auto"),
        config={"signature_version": "s3v4", "s3": {"addressing_style": "path"}}
    )
    return s3


def get_all_files(s3_resource):
    bucket_name = "listing-images"
    all_files = []
    bucket = s3_resource.Bucket(bucket_name)
    for obj_summary in bucket.objects.filter(Prefix=""):
        all_files.append(
            (obj_summary.key,
             obj_summary.get()["Body"].read())
        )
    return all_files


def get_files_listing_id(s3_resource, listing_id):
    bucket = s3_resource.Bucket("listing-images")
    listing_indicator = "x%Tz^Lp&"
    name_indicator    = "*Gh!mN?y"

    # here we use a regex to find all files with a particular listing id
    pattern = re.compile(
        r"^" +
        re.escape(listing_indicator) +
        re.escape(str(listing_id)) +
        re.escape(name_indicator) +
        r"(.+)$"
    )

    matched_files = []
    for obj_summary in bucket.objects.filter(Prefix=""):
        key = obj_summary.key
        m = pattern.match(key)
        if not m:
            continue
        # key matches this listing_id then fetch its bytes
        data = obj_summary.get()["Body"].read()
        matched_files.append((key, data))
    return matched_files


# this should not be used...could cause duplicatation errors, use upload_files instead
def upload_file_to_bucket(s3_resource, listing_id, data_bytes):
    bucket = s3_resource.Bucket("listing-images")
    listing_indicator = "x%Tz^Lp&"
    name_indicator = "*Gh!mN?y"
    
    # Convert base64 string to bytes if needed
    if isinstance(data_bytes, str):
        # Remove data URL prefix if present
        if data_bytes.startswith('data:image'):
            data_bytes = data_bytes.split(',')[1]
        data_bytes = base64.b64decode(data_bytes)
    
    data_bytes = compress_image(data_bytes, 10)
    image_name = str(random.randint(10000, 99999))
    bucket.put_object(Key=(listing_indicator + str(listing_id) + name_indicator + image_name), Body=data_bytes)


def upload_files_to_bucket(s3_resource, listing_id, data_bytes_list):
    bucket = s3_resource.Bucket("listing-images")
    listing_indicator = "x%Tz^Lp&"
    name_indicator = "*Gh!mN?y"

    def pad_base64(b64_string):
        """Pad base64 string to correct length for decoding."""
        return b64_string + '=' * (-len(b64_string) % 4)

    uploaded_keys = []
    name_counter = 1
    for data_bytes in data_bytes_list:
        if isinstance(data_bytes, str):
            # Remove data URL prefix if present
            if data_bytes.startswith('data:image'):
                data_bytes = data_bytes.split(',')[1]
            # Ensure correct base64 padding before decoding
            data_bytes = base64.b64decode(pad_base64(data_bytes))
        key = listing_indicator + str(listing_id) + name_indicator + str(name_counter)
        bucket.put_object(Key=key, Body=data_bytes)
        uploaded_keys.append(key)
        name_counter += 1
    return uploaded_keys


def get_images_from_bucket(s3_resource, listing_id):
    listing_indicator = "x%Tz^Lp&"
    bucket = s3_resource.Bucket("listing-images")
    prefix = listing_indicator + str(listing_id)
    images = []
    for obj_summary in bucket.objects.filter(Prefix=prefix):
        data = obj_summary.get()["Body"].read()
        images.append((obj_summary.key, data))
    return images


# Generate a signed URL to access a private image file
def get_image_url_from_key(key: str, s3_resource=None) -> str:
    bucket_name = "listing-images"
    s3_resource = s3_resource or connect_to_blob_db_resource()
    return s3_resource.meta.client.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': key},
        ExpiresIn=3600  # 1 hour
    )


# downscale an image with default return of 90% pixels
def downscale_image(img, scale=0.9):
    h, w = img.shape[:2]
    new_dim = (int(w * scale), int(h * scale))
    return cv2.resize(img, new_dim)


# return a compressed image until we have the correct size
def compress_image(img, max_kb):
    # Convert input to numpy array if it's not already
    if isinstance(img, (bytes, bytearray)):
        arr = np.frombuffer(img, dtype=np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Could not convert the given data to an image")
    elif isinstance(img, str):
        # Handle base64 string
        if img.startswith('data:image'):
            img = img.split(',')[1]
        img_bytes = base64.b64decode(img)
        arr = np.frombuffer(img_bytes, dtype=np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Could not convert the given base64 string to an image")

    max_bytes = max_kb * 1024
    compressed = img.copy()

    # Keep downscaling until we hit the correct bytesize
    while True:
        ok, buf = cv2.imencode('.jpg', compressed)
        if not ok:
            break
        size = len(buf)
        if size <= max_bytes:
            return buf.tobytes()
        compressed = downscale_image(compressed)


if __name__ == "__main__":
    s3 = connect_to_blob_db_resource()
    files = get_all_files(s3)
    print("Downloaded", len(files), "objects.")
    for key, data in files:
        print(key, len(data), "bytes")

    # with open("/Users/pmurphy01/Desktop/howies_meat.jpg", "rb") as f:
    #     data = f.read()

    # data = compress_image(data,1000)

    # upload_file_to_bucket(s3,"howies_meat_1mb_limit", 1, data)  -> start here
