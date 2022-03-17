# Capstone: Restaurant Reservation System

## Live application URL
`https://starter-restaurant-reservation-front-end-rho.vercel.app/dashboard`

## Technology Used
### Frontend
- ReactJS
- CSS
- JSX

### Backend
- Postgres (knex)
- NodeJS
- Express

<br>

## Summary
Periodic Tables is a restaurant schedule management application that allows a restaurant manager to create/document tables and reservations. It provides the ability to filter reservations by phone number, sort reservations by those that are booked, seated, and completed.

Users can also create tables and assign capacity to reflect the tables in the restaurant.

<br>

## Installation Instructions

### Frontend
- `cd` into `Thinkful-Final-Capstone/front-end`
  - run `npm install`
  - run `npm start` to start the application

### Backend
- `cd` into `Thinkful-Final-Capstone/back-end`
  - run `npm install`
  - run `knex migrate:latest` and `knex seed:run`
  - run `npm start` to start the application

<br>

# Features

## Creating A Reservation
Creating a reservations is done by clicking 'New Reservation' on the navigation bar. This requires the customer's first name, last name, reservation date, reservation time, quantity of guests, and phone number.

![newReservation](https://github.com/SamuelJSherman/starter-restaurant-reservation/blob/main/images/newres.png)


## Managing Reservations
Managing reservations can be done via the dashboard.

The dashboard by default will list the reservations for today. Use the previous and next buttons on the top right of the reservations table to look at reservations in the past or future.

The tables and their availability are listed in the list on the on the far right of the page.

![dashboard](https://github.com/SamuelJSherman/starter-restaurant-reservation/blob/main/images/dashboard.png)

## Searching for a Specific Reservation
Users can search for a particular reservation by the mobile number associated with the reservation. This can be done by clicking the 'Search' option in the left-hand navigation.

![searchByMobile](https://github.com/SamuelJSherman/starter-restaurant-reservation/blob/main/images/search.png)

## Managing Tables
Expanding the restaurant? Create new tables by selecting the 'New Table' option in the left-hand navigation.

![newTable](https://github.com/SamuelJSherman/starter-restaurant-reservation/blob/main/images/tableres.png)


# API

## Create Reservation
**POST** `/reservations`
  - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `first_name` | `str` |
    | `last_name` | `str` |
    | `party` | `int` |
    | `reservation_date` | `date` |
    | `reservation_time` | `str` |
    | `mobile_number` | `str` |




## Get Reservations by Date
**GET** `/reservations?date=<reservation_date>`

Returns reservations for a particular date



## Get Reservations by Id
 `/reservations/:reservation_id`

### Available Methods
- **GET** - Returns a reservation given an existing reservation Id
- **PUT** - Modifies an existing reservation given an existing reservation Id
  - Required params:
    - `reservation_id (int)`
  - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `first_name` | `str` |
    | `last_name` | `str` |
    | `party` | `int` |
    | `reservation_date` | `date` |
    | `reservation_time` | `str` |
    | `mobile_number` | `str` |



## Get Reservation Status
**GET** `/reservations/:reservation_id/status`

Returns a status of [ `booked, seated, finished, cancelled` ] for the particular reservation



## Get Tables
- **GET** `/tables`

Returns the available tables.



## Create Table
- **POST** `/tables`

Creates a table to be listed in the table list.

 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `table_name` | `str` |
    | `capacity` | `int` |



## Update Table Status
- **PUT** `/tables/:table_id/seat`

Sets table status to 'occupied' and ties a `restaurant_id` to it.

 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `reservation_id` | `int` |



## Finish Table
- **DELETE** `/tables/:table_id/seat`

Sets the table status to `free` and the accompanying reservation status to `finished`
 - Required body:
    | Param      |  type     |
    | ---------- | ---------- |
    | `reservation_id` | `int` |
