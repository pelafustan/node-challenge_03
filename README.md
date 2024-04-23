# NodeJS and Express.js

## Challenge 3

### Context

There is a new social media holding trying to take their piece of the cake. There asked us to implement an API capable of handling the creation, modification and retrieval of user generated content. The data is stored on a `postgres` database.

#### Disclaimer

Again, I didn't like the frontend provided. I created a new one and I'm still not happy, but it's better than the provided one.

#### Prerequisites

Since this is a `node` app, you need to have installed `node` before anything else. You also need to have a `postgres` instance running. Additionally, you need to have installed `nodemon` globally.

You're free to run the database instance as you like. In my case, I'm using the `postgres` docker image. The `pg` pool is created using env variables, and have the option to fallback to default `postgres` values.

TODO: create containers for each service and then deploy them using one of the available orchestration tools.

### How can I run this ~~piece of shit~~ amazing software?

Well, first of all you need to have installed `node` before running anything. Also, you need to clone this repo.

Once you have cloned this repo, `cd` into it. Here, you'll find two folders: one for the frontend (`client`) and one for the backend (`server`). First, you need to start the server, then the front. To start the backend, you need to:

```bash
cd server && npm install && nodemon index.js localhost PORT
```
where `PORT` is the port where your API will be running.

Once the backend is running, open a new terminal –or send the previous started process to the background– and `cd` into the `client` directory and then run

```bash
npm install && npm run dev
```

#### Observation

I used env variables to deal with URLs, credentials, and ports in the front and the back. Nonetheless, I added the following defaults:

* `postgres` is running on port `5432` of `localhost`.
* `express` is running on port `3000` of `localhost`.
* `vite` is running on port `5473` of `localhost`.
* Your database user is `postgres`.
* The database password is `postgres`.
* The database is called `posts`.
* The table is called `posts`.
* The columns of `posts` are:
  * `id TEXT NOT NULL PRIMARY KEY`.
  * `title TEXT NOT NULL`.
  * `body TEXT NOT NULL`.
  * `header-image TEXT NOT NULL`.

Now, you're ready to play with the app. Have fun!

---

### Author

* [Patricio Parada](https://github.com/pelafustan)

### Acknowledgement

* Black coffee.
* Green tea (when tummy hurt).
* [Desafío Latam](https://desafiolatam.com/)
