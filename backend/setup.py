from setuptools import setup, find_packages

setup(
    name="reuseu-backend",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "flask",
        "flask-cors",
    ]
)
