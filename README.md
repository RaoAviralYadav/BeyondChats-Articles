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

## Local setup (short)
1. Clone repo
2. Install Laravel later (see backend/README.md)
3. Install Node for scripts
