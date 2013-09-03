backbone-talks
==============

Learning Backbone.js one step at a time.

Installing node
```
http://nodejs.org/ 
click on install button
```

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
<when brew ends with will tell you the directory where mondodb was installed>
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
