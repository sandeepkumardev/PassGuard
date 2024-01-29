## Overview

Forgetting passwords is a common inconvenience faced by many individuals. This documentation outlines the functionality and usage of a password finder app designed to alleviate the frustration of repeatedly attempting the same incorrect password.

## Table of Contents

1. [Features](#features)
1. [Usage](#usage)
1. [Dependencies](#dependencies)
1. [Getting Started](#getting-started)
1. [Setup Server](#setup-server)
1. [Setup Client](#setup-client)

## Features:

1. <b>Prevent Repetitive Password Attempts:</b>

   The primary function of this app is to prevent users from repeatedly attempting the same incorrect password. By keeping track of previously attempted passwords, users can avoid wasting time and effort on unsuccessful login attempts.

2. <b>Efficient Password Management:</b>

   Users can create new items (domains) within the app to store passwords for different accounts or services. This helps organize passwords and ensures they are readily accessible when needed.

3. <b>Simple User Interface:</b>

   The app features a user-friendly interface with intuitive controls. Users can easily add new items, enter passwords, and mark attempts as either failed or resolved.

## Usage:

1. <b>Creating a New Item (Domain):</b>

   - Click the <code>+</code> icon located in the header to initiate the process of adding a new item.
   - Enter the relevant domain name or identifier for the password being managed.

2. <b>Entering Passwords:</b>

   - Once a new item (domain) is created, users can input potential passwords in the designated input section.
   - The app will automatically check if the entered password has been used before. If it's a new password, users can proceed with login attempts.

3. <b>Recording Attempt Results:</b>
   - After attempting a password, users can mark the outcome of the attempt by selecting one of the provided options: failed attempt or resolved.
   - This helps maintain a history of password attempts and their outcomes for future reference.

## Dependencies

Main dependencies

### Frontend Dependencies

- react
- @apollo/client
- graphql
- @chakra-ui

### Backend Dependencies

- express
- graphql
- apollo-server-express
- sequelize
- pg

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sandeepkumardev/password-finder.git
```

## Setup Server

```bash
# Navigate to Server directory
cd server

# Install dependencies
yarn install

# Configure Env Variables
# Create the copy of `.env.example` file & rename it to `.env`.

# Add Database Config here
DB_NAME="postgres"
DB_USERNAME="postgres"
DB_PASSWORD="password"
DB_DIALECT="postgres"

# Start Development Server
yarn dev
```

## Setup Client

```bash
# Navigate to Client directory
cd client

# Install dependencies
yarn install

# Configure Env Variables
# Create the copy of `.env.example` file & rename it to `.env`.
# No change required here in .env

# Start Server
yarn start
```

## Conclusion:

The password finder app preventing users from repeatedly attempting the same incorrect password. By streamlining the login process and promoting efficient password management practices, the app aims to enhance user productivity and security.
