jsframework-talks
==============

#### Learning Nodejs, Express and Backbone.js one step at a time.

Installing Nodejs
```
http://nodejs.org/ 
click on install button
```

#### First, we start with the server side of things, and make our first Nodejs/Express app

Creating your first app: firstapp/app-1.js 
```
mkdir firstapp
cd firstapp
create new package.json file with these lines:
{
  "name": "first-app",
  "description": "my first node-express app",
  "version": "0.0.1",
  "dependencies": {
    "express": "3.x"
  }
}
npm install express
(this creates the node_modules folder in firstapp)
create app-1.js 
run your node server
node app-1.js
(runs server on port 4730)
open browser with this location: localhost:4730
http://localhost:4730
```

Basic routing, data: server-talks/app-2.js
```
create app-2.js
run your node server
node app-2.js
```

New route for random quote: server-talks/app-3.js
```
create app-3.js
run your node server
node app-3.js
http://localhost:4730/quote/random
```

New route for get specific quote: server-talks/app-4.js
```
create app-4.js
run your node server
node app-4.js
http://localhost:4730/quote/1
```

New route for posting a new quote: server-talks/app-5.js
```
install chrome extension 'Dev Http Client'
https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm?hl=en
create app-5.js
run your node server
node app-5.js
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'localhost:4730/quote'
Change method to: 'POST'
Add headers: 'Content-Type' : 'application/json' with body:
{ "author" : "GBear", "text" : "Node node node" }
click send… should see 200 OK (see app-5.png)
check if new quote was added
http://localhost:4730/
```

New route for deleting a quote: server-talks/app-6.js
```
create app-6.js
run your node server
node app-6.js
check that you currently have 4 quotes
http://localhost:4730/
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'localhost:4730/quote/2'
Change method to: 'DELETE'
click send… should see 200 OK
check if a quote was deleted (should only have 3 quotes now)
```

Installing Homebrew - to install mongodb
```
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
brew doctor
```

Installing mongodb with Brew command
```
brew install mongodb
<when brew ends it will tell you the directory where mondodb was installed>
cd /usr/local/Cellar/mongodb/2.4.6 
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
sudo chown macgmercer:everyone /usr/local/bin/brew
brew info mongodb
cd /usr/local/opt/mongodb
cd /data/db
chmod 777 for all of /data and /data/db
```

Running mongod
```
/usr/local/opt/mongodb/mongod
``` 
 
Running mongo shell
```
gregs-mac:~$ mongo
MongoDB shell version: 2.4.6
connecting to: test
```

mongo shell commands - where quotes is a collection in the test database
```
> show databases
> use test
> show collections
> db.quotes.find({})
> exit
```

Create the servertalk database in mongo
```
gregs-mac:server-talks$ mongo --eval "db.getSiblingDB('servertalk').addUser('root', 'root');"
MongoDB shell version: 2.4.6
connecting to: test
{
	"user" : "root",
	"readOnly" : false,
	"pwd" : "2a8025f0885adad5a8ce0044070032b3",
	"_id" : ObjectId("5225e1a1d2c9b3f14fe70b81")
}
```

Check that the servertalk database exists in mongo
```
gregs-mac:server-talks$ mongo
MongoDB shell version: 2.4.6
connecting to: test
> show databases
local	0.078125GB
servertalk	0.203125GB
test	0.203125GB
```

Add connection to mongodb: server-talks/app-7.js
```
install mongoose module
gregs-mac:server-talks$ npm install mongoose
create app-7.js
run your node server
node app-7.js
you should see something like this when the app starts:
gregs-mac:server-talks$ node app-7.js
'numQuotes = 0'
'adding quotes'
'index = 0'
'index = 1'
{ __v: 0,
  author: 'Audrey Hepburn',
  text: 'Nothing is impossible, the word itself says \'I\'m possible\'!',
  year: 2011,
  hasCreditCookie: true,
  _id: 5225e29a88d525cfde000001 }
{ __v: 0,
  author: 'Walt Disney',
  text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you',
  year: 2012,
  hasCreditCookie: true,
  _id: 5225e29a88d525cfde000002 }
open your browser to:
http://localhost:4730/
it should show this: 
"hello from app-7.js"
```

Displaying all quotes from mongo: server-talks/app-8.js
```
create app-8.js
run your node server
node app-8.js
open your browser to:
http://localhost:4730/
it should show this: 
[
  {
    "author": "Audrey Hepburn",
    "text": "Nothing is impossible, the word itself says 'I'm possible'!",
    "year": 2011,
    "hasCreditCookie": true,
    "_id": "5225e29a88d525cfde000001",
    "__v": 0
  },
  {
    "author": "Walt Disney",
    "text": "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you",
    "year": 2012,
    "hasCreditCookie": true,
    "_id": "5225e29a88d525cfde000002",
    "__v": 0
  }
]
```

Adding the get by id, post, and delete by id operations: server-talks/app-9.js
```
create app-9.js
run your node server
node app-9.js
open your browser to:
http://localhost:4730/
it should show this: 
[
  {
    "author": "Audrey Hepburn",
    "text": "Nothing is impossible, the word itself says 'I'm possible'!",
    "year": 2011,
    "hasCreditCookie": true,
    "_id": "5225e29a88d525cfde000001",
    "__v": 0
  },
  {
    "author": "Walt Disney",
    "text": "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you",
    "year": 2012,
    "hasCreditCookie": true,
    "_id": "5225e29a88d525cfde000002",
    "__v": 0
  }
]
to test the get by id, copy one of the ids shown in your browser
on my system it happens to have this id: 5225e29a88d525cfde000002
your id will most likely be different
open your browser to:
http://localhost:4730/quote/5225e29a88d525cfde000002
it should show this: 
[
  {
    "author": "Walt Disney",
    "text": "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you",
    "year": 2012,
    "hasCreditCookie": true,
    "_id": "5225e29a88d525cfde000002",
    "__v": 0
  }
]
to test the delete by id, copy one of the ids shown in your browser
I'll use this id again: 5225e29a88d525cfde000002
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'localhost:4730/quote/5225e29a88d525cfde000002'
Change method to: 'DELETE'
click send… should see 200 OK
check if a quote was deleted (should only have 1 quote now)
to test the post
run chrome extension 'Dev Http Client'
Change request select to: 'HTTP'
Change location to: 'localhost:4730/quote'
Change method to: 'POST'
Add headers: 'Content-Type' : 'application/json' with body:
{ "author" : "GBear", "text" : "Node node node", "year": 2013 }
click send… should see 200 OK (see app-5.png)
check if new quote was added
http://localhost:4730/
```

todo: Notes for client-talk section coming soon.









