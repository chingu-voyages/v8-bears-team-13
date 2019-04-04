# Bears 13 (V8)
**Do not push to master**. Push commits to `dev` and create feature branches as needed.


## Installation
In the root directory, run:
```
1. `npm install`, which will install `concurrently` and `nodemon`
2. `npm run install:all`, which will install the api and client dependencies
```

## Database Setup
Instructions obtained from this post: https://www.byteconf.com/blog/building-a-full-stack-application-with-react-and-node

### Download & Install
**Windows**  
Download from here: https://www.postgresql.org/download/windows/

**Mac**  
1. Install Homebrew: https://brew.sh
2. Then, run `brew install postgresql` in your terminal
3. After installing Postgres with Brew, run `brew services start postgresql` in your terminal

### Create The Database
In your terminal, make sure you're in the root directory of the project. Run: `createdb <dbname>`. **Do not include the angle brackets < >!**

### Add A Migration
In your terminal, run: `psql -d <dbname> -f api/db/migrations/migration-1553750532676.sql`. 
This will setup the table with the data in the `api/migrations/migration-*.sql` file.

### Populate Data With A Seed
In your terminal, run: `psql -d <dbname> -f api/db/seeds/users.sql`. This will insert a user into the database.

### Set Database Name
In the `api/config` folder, you should see two files: `keys.js` and `keys_prod.js`.  
In `api/config`, create a new file called `keys_dev.js`. Put this inside:

```javascript
module.exports = {
  databaseName: '<dbname>' // Where dbname == the name of the database you created in Postgres
};
```


## Starting The App
Make sure you're in the root directory.

To start both the server and the client, run:
```
npm run dev
```

To start just the API server, run:
```
npm run start:api
```

To start just the React client, run:
```
npm run start:client
```