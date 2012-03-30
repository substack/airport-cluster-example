airport cluster example
=======================

I used this example for a talk at [js.la](http://js.la/) on March 29, 2012.

install
=======

First install the necessary libraries with [npm](http://npmjs.org):

```
$ npm install .
$ npm install -g fleet
```

running the pieces with airport directly
========================================

Spin up the processes directly yourself (in any order):

```
$ node bouncer.js &
$ node auth.js &
$ node web.js 'ahoy thar!' &
```

Use curl to verify that the service works:

```
$ curl http://localhost:8080
ahoy thar!
```

things to try
-------------

* Spin up more web.js services and automatically load balance between them!

* Kill services and bring them back again on different hosts and airport figures
out how to route everything properly.

using fleet to run the services
===============================

In an empty new directory start a fleet hub:

```
$ fleet hub --secret=beepboop --port=7001
```

Now spin up as many fleet drones as you please in a new empty directory on any
server and point the drones to where your hub is running:

```
$ fleet drone --secret=beepboop --hub=localhost:7001
```

In this git repo, check in node_modules then deploy the code:

```
$ git add node_modules
$ git commit -m'checked in node_modules'
$ fleet deploy
```

Now spawn up each of the services:

```
$ fleet spawn -- node bouncer.js
$ fleet spawn -- node auth.js
$ fleet spawn -- node web.js RAWR
```

Verify that everything works:

```
$ curl http://localhost:8080
```

things to try
-------------

* Commit new code, `fleet deploy` the changes, and spin up more services that
use the new code.

* Use `fleet stop` to bring down old services.

* Use semvers in the service names to restrict which versions are acceptable to
* connect to.

* Experiment sending custom host headers with `curl -H host:xxx
http://localhost:8080`.

* Use `fleet monitor` to show what's happening everywhere across your cluster.
