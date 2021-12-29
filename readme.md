# Welcome Message

Welcome, our package was made to make developement easier to start out. Instead of having to worry about making a server end everytime you start a new project. You can use this package to have a modular based server end. Our package supports both CommonJS and ES6. We do not do anything on the client side. If you want to use a client you can do so by using our [Proxy Module](https://www.npmjs.com/package/@aio-server/proxy).

## Getting Started

To get started please run the following commands from your project directory. If you havent done so yet please make sure you have [NodeJS](https://nodejs.org/en/) installed. Please make sure you `init` your project by using the command below.

`npm init --yes`

Now in order to get started using our package as your server. Please run the following command.

`npm i @shinerzoch/server-core`

This command will install our package inside your application. This will allow you to use the below coding to get started.

**Javascript NodeJS Module**

```js
// index.mjs

import Server from '../serverLibrary/index.js';
const port = 8080;

    // App logic goes here...    

Server.start(port);
```

**Javascript NodeJS**

```js
// index.js

const Server = require('../serverLibrary/index.js');

(async () => {
    const port = 8080;
    
        // App logic goes here...   

    Server.start(port);
})();
```

# Table Of Contents

### Database

- [Create Mysql Instance](#database-create-mysql-instance)
- [Create Local Instance](#database-create-local-instance)

#### Functions

[`Query`](#database-query)
[`Find One`](#database-find-one)
[`Find Many`](#database-find-many)
[`Find By IDs`](#database-find-by-ids)
[`Save`](#database-save)
[`Update`](#database-update)
[`Delete`](#database-delete)
[`Count`](#database-count)
[`Clear`](#database-clear)

### Auto Routes

- [Install Module](#auto-routes-module)

### Cookies

- [Install Module](#cookies-module)

### Session

- [Install Module](#session-module)

### Server Side Events

- [Install Module](#server-side-events-module)

### Web Sockets

- [Install Module](#web-sockets-module)

# Database Module

- [Create Mysql Instance](#database-create-mysql-instance)
- [Create Local Instance](#database-create-local-instance)

#### Database Functions

[`Query`](#database-query)
[`Find One`](#database-find-one)
[`Find Many`](#database-find-many)
[`Find By IDs`](#database-find-by-ids)
[`Save`](#database-save)
[`Update`](#database-update)
[`Delete`](#database-delete)
[`Count`](#database-count)
[`Clear`](#database-clear)

You can set the default database by setting `Server.db = DatabaseInstance`. This is not a requirement, but it is recommended if you plan on using the database as your main projects database.

#### Database Create Mysql Instance

```js
const db = await Server.Database.create("mysql", {
    modelsPath: "models",
    name: "default",
    host: "localhost",
    port: 3306,
    username: "testing",
    password: "testing",
    database: "testing",
});
```

---

#### Database Create Local Instance

This is a database that is completely file based and the contents are stored within your project. or any directory of choosing.

```js
const db = await Server.Database.create("local", {
    name: "default", // Must be unqiue if not default.
    modelsPath: "models"
});
```

---

#### Database Query

Executes a raw SQL query.

```js
const rawData = await Server.db.query(`SELECT * FROM USERS`);
```

---

#### Database Find One

Finds the first entity that matches some id or find options.

```js
const response = await Server.db.table("users").findOne({
    where: {
        username: "test"
    }
})
```

---

#### Database Find Many

Finds entities that match given options.

```js
const userData = await Server.db.table("users").find({ username: "admin" });
```

---

#### Database Find By IDs

Finds multiple entities by id.

```js
const count = await Server.db.table("users").findByIds([1, 2, 3]);
```

---

#### Database save

Saves a given entity or array of entities. If the entity already exists in the database, then it's updated. If the entity does not exist in the database yet, it's inserted. It saves all given entities in a single transaction. Also supports partial updating since all undefined properties are skipped. In order to make a value NULL, you must manually set the property to equal null.

```js
const userID = await Server.db.table("users").save({ username: "admin", password: "admin" });

const userIDs = await Server.db.table("users").save([
    { username: "admin", password: "admin" },
    { username: "test", password: "test" }
]);
```

---

#### Database update

Partially updates entity by a given update options or entity id.

```js
const newData = await Server.db.table("users").update({ id: 1 }, { username: "superadmin" });

const newData = await Server.db.table("users").update(1, { username: "superadmin" });
```

---

#### Database delete

Deletes entities by entity id, ids or given conditions:

```js
await Server.db.table("users").delete(1);
await Server.db.table("users").delete([1, 2, 3]);
await Server.db.table("users").delete({ id: 1 });
await Server.db.table("users").delete([{ id: 1 }, { username: "test" }]);
```

---

#### Database count

Counts entities that match given options. Useful for pagination.

```js
const count = await Server.db.table("users").count({ active: true });
```

---

#### Database clear

Clears all the data from the given table (truncates/drops it).

```js
const count = await Server.db.table("users").clear();
```

# Auto Routes Module

This module is created to auto generate routes based of a directory.

```js
await Server.AutoRoutes.install({
    path: "routes" // Optional Defaults to "routes", you can use something like "client/routes".
});
```

# Cookies Module

This module allows our server and you to interact with cookies on the clients browser.

```js
await Server.Cookies.install();
```

# Session Module

This module requires [Cookies](#cookies-module) module to be enabled. This module created a session storage for you to use.

```js
await Server.Session.install({
    secret: "somethingrandom"
});
```

# Server Side Events Module

This module adds Server Side Events to the servers router.

```js
await Server.ServerSideEvents.install();
```

# Web Sockets Module

This module adds Web Sockets to the servers router.

```js
await Server.WebSockets.install();
```
