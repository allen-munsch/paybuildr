from setuptools import setup, find_packages

setup(
    name="django-stripe-kong",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Django>=5.0.0",
        "djangorestframework>=3.14.0",
        "stripe>=7.0.0",
        "requests>=2.31.0",
    ],
    author="James Munsch",
    author_email="james.munsch@ccsconsulting.rocks",
    description="A Django app for integrating Stripe payments and Kong API management",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/allen-munsch/django-stripe-kong",
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Django",
        "Framework :: Django :: 5.0",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.12",
        "Topic :: Internet :: WWW/HTTP",
    ],
    python_requires=">=3.12",
)