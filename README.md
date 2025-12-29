# BeyondChats Articles - Assignment

This repository contains the backend (Laravel), a Node.js scraper, and later a React frontend for the BeyondChats assignment.

## Overview
- Phase 1: Scrape the last page of https://beyondchats.com/blogs/ (5 oldest articles), store in DB, expose CRUD APIs.
- Phase 2: NodeJS script to fetch these articles, Google top-2 articles, scrape them, call an LLM to update original article, and publish via the CRUD API.
- Phase 3: React frontend to display original + updated articles.

## Structure
- backend/        -> Laravel API
- scripts/        -> Node scripts (scrapers, workers)
- frontend/       -> React app (Phase 3)

# Backend (Laravel)

## Setup
1. `cd backend`
2. Copy `.env.example` to `.env` and set DB credentials.
3. `composer install`
4. `php artisan key:generate`
5. `php artisan migrate`
6. `php artisan serve` (runs at http://127.0.0.1:8000)

## API
- GET /api/articles
- GET /api/articles/{id}
- POST /api/articles
- PUT /api/articles/{id}
- DELETE /api/articles/{id}

