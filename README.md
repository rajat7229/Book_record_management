# Book_record_management

This is a book record management API Backend for the management of records and books

# Routes and Endpoints
✅: means completed this task

## /users

POST: Create a new user ✅
GET: GET all list of users ✅

## /users/{id}

example: /users/1, /users/2

GET: GET a user by id ✅

PUT: Update a user by id ✅

DELETE: Delete a user by id (check if he/she still has an issued book) (is there any fine to be paid)

## /users/subscription-details/{id}

GET: GET user subscription details 
1. Date of subscription 
2. Valid till 
3. Fine if any 

## /books

GET: GET all the books ✅

POST: Create/Add a new book 

## /books/{id}

GET: GET a book by id ✅

PUT: Update a book by id 

## /books/issued

GET: Get all the issued books ✅

## /books/issued/withFine
GET: Get all the books with fine

# Subscription plans
Basic (3 months)

Standard (6 months)

Premium (12 months)

# NOTE
If the subscription date is 01/08/22

and subscription type is standard

the valid till date will be 01/02/23

If he has issued book and the issued is to be returned at 01/01/23
and he missed the date of return, then he gets a fine of Rs. 100/-

If he has issued book and the issued is to be returned at 01/01/23
if he missed the date of return, and his subscription also expires, then he will get a fine of Rs. 200/-

# API Documentation link of server: 
https://documenter.getpostman.com/view/23030920/VUr1GCTH