# metaphor
Metaphor LLM-based recommender

# Clone the directory
# Backend
  ## Get into the `metaphor-backend` directory
  ### install dependencies
  ```code
    yarn or npm install
  ```
  ### First add the required env variables then Run the app using the below command
  ```code
      yarn start:dev or npm run start:dev
  ```
  # Required Environment variables
  ```
  DATABASE_URL=<POSTGRESQL_URL> //If you don't have please install Postgres
  METAPHOR_API=<CREATE AN Account on Metaphor>
  ```
# Frontend
  ## Get into the `metaphore-api` directory
  ### install dependencies
  ```code
    yarn or npm install
  ```
  ### First add the required env variables then Run the app using the below command
  ```code
      yarn dev or npm run dev
  ```
  # Required Environment variables in case of an update of port please update below URL according to you changes 
  ```code
  NEXT_PUBLIC_BACKEND_URI=http://localhost:5000
  ```
