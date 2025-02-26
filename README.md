Mongo DB 
------------

-database used to store and manage data

SQL
-------------------

- Relational/SQL RDNMS
-store data in table with rows and column
-Uses fixed schema
-optimized for complex join and transaction
-support rich set of data types
-ACID(Atomicity,Concistency,Isolation,Durability)
-Uses traditional buisness app




MONGO DB
-------------------

-Document oriented / NoSQL DB
-store data as collection of JSON document
-uses dynamic schema
-optimized for scalabilty and performance
-limited set of data types
-CAP(Concistancy,durability,Partial Tolerence)
-used in bigdata and real time application


---------------------------
mongo db comands

-- show databases :-        is used to  show all databases
-- use 'databasename':-     is used to access that database
-- show collections :-      is used to collections in the data base
-- db.'collection'.find():- is used to show the document in collection
-- db.'collection'.find({key:value}):- is used to show the document in collection with specific key:value
-- db.'collection'.find({key:{$gte:value}}):- '$gte' is used to show the document in collection which is greater than or equal to value
-- db.'collection'.find({key:{$in:["value","value"]}}):- '$in' is used to find if a key has a perticular value.  [] is used if there is multiple value to be found
-- db.'collection'.find({key:{$gt:value,$lt:value}):-  it is used to find document between two value
-- db.users.find({$expr:{$gt:["$key","$key2"]}}):- '$expr' is used to compare , and $ before key is given to take the number of the key
-- db.users.updateMany({age:21},{$set:{age:25}}):- 'updateMany()' is used to upade the value of multiple document with same value for same key and change it using' $set'



-- db.'collection'.findOne({key:"value"}):-     is used to find a specific document using a specific conditons
-- db.users.inserOne({"key":"value"}):-         it is used to insert a single document.it needs to be passed as a JSON data
-- db.users.insertMany([

    {"key":"value"},{"key":"value"}
    
    ]):-            it is used to pass multiple documents at a time. the doment needs to be passed in a array
-- db.'collection'.countDocuments():-            is used to find the number of documents in the collection
-- db.'collection'.find().limit(number):-              is used to find a certaine number of items
-- db.'collection'.find().sort({key:1}/{key:-1}):-      it is used to sort the document based on the given key .If given 1 it is asending and -1 is decending order
-- db.'collection'.find().sort().skip(number):-         it is used to skip a certain number of documnets after sorting
-- db.'collection'.updateOne({name:"njnj"},{$push:{key:"value"}}):- '$push' is used to push a new data to the document
-- db.'collection'.deleteOne({key:"value"}):- it is used to delete one document
-- db.'collectio0n'.deleteMany({key:{$exists:true}}):- deleteMany is used to delete many at once,
                                               '$exists:true' is used to delete only the document which only have the given key
--db.'collection'.aggregate({

    $lookup:{

        from :"collection to join" eg:projects,

        localField:" field from the
           input document" eg:email,

        foreignField:" eg:userEmailID

        as:""  eg:projects
    }
})                                          :- 'aggregate()' is used to join to db
--findByIdAndUpdate:- it is used to upadate and show the data

------------------------------------------------------------------------------------------------------
NODE JS -  SERVER/BACKEND
-------------------------------------------

-js runtime environment + js library
-features

            -extremly fast , v8 engine which is is used in chrome is used here
            -asynchronous
            -Single Threaded event loop 
            -highly scalable
            -open source

-Node js global objects

        -it can be accessed anywhere from your node app without exporting/importing
                eg: console.log()

-Node module system

        -a file is considered as a module in node, to access data from one file it has to export from there,
         and before using it in another file it should be import there
        - to import file: require('module name/path)
        -to export file: module.export/exports          export:- for multipile module to exported at a time
                                                         exports:- for single module to exported at a time

-built- in modules in node

        -file system module(fs):handling file related events
        -http:  used to create web SERVER
        -https: (Hyper Text Transfer Protocol Secure) : used to create web SERVER
        -crupto: providing tools like hashing,encryption etc.
        -events: works with eventEmitter
        -process: shares information about the currently running process in node app,it holds environmental module(confidential data)
                -environmental variable: used to hold configuration/confidential information regarding the project. to acca environmental variable through out the app use 'process.env.variable_name'
-node js package:  used to resolve common problem
        -install packages via npm
        -it adds package.json,package-lock.json,node_modules in your application
-Back-end concepts:
        --client-server architecture
        --REST application
        --CRUD OPERATION(Create(POST),Read(GET),Update(PUT),Delete(delete))
        --CORS(Cross Origin Resourse Sharing) must be enabled in the server

--------------------------------------------------------------------------------------------------------------------------

EXPRESS     -node js framework
--------------------------------------------------

-used in client-server architecture as web server
-steps to create server using EXPRESS

        1.create a folder for back-end
        2.create package.json file using the comand  ' npm init -y   '
        3.update package.json "script" value as "start":"node index.js" instead of test
        4.install packages for creating express server

                -express: npm i express
                -cors   : npm i cors
                -dotenv : npm i dotenv
        5.create .env file
        6. create .gitignore file and type( node_modules and .env)
        7.create index.js to define express file and import 'dotenv' 
                 (require('dotenv').config)
        8. import express and cors in index.js 
                (
                    const express=require('express')
                    const cors=require('cors')
                 )
        9.place express to a variable to create a server index.js
                    (
                        const pfserver=express()

                    )
        10.use cors in express server
                    (
                        pfserver.use(cors())
                        
                    )
        11. use middleware in express server
                    (
                        pfserver.use(express.json())

                    )
        12. create port for server app
                    (
                        const port=3000  ||  process.env.PORT 

                    )
        13.run the port
                    (
                        pfserver.listen(PORT,()=>{
                             console.log(`pfserver succesfully running at port ${PORT}`);
    
                        })
                    )
        14. create a router folder and init a router.js file     

                    -import express library      
                    -create an object of router class of express:router object is capable of defining route for the app
                    -export router from the file 
                    -import in index.js file
                    -use router in pfserver
        15.create a controller folder to define the logic to solve  
          client request
        16. create a mongoose folder init create a model(collection)
                -create a schema using mongoose.Scheme()
                -enter the required documents of the collection
                -create users using mongoose.model
-----------------------------------
IMP --- watch class 07/02/25
-------------------------------

--------------------------------------------------------------------------------------------------------

MONGOOSE-Object Data Model(ODM) for node js
-------------------------------------------------------------------

-install mongoose using : npm i mongoose
-

---------------------------------
JSON-WEBTOKEN
-------------------------------------------------------------
-it is used for generate and verification of token
-Library used for authentication in client-server request
-used to securely transfer information over the web
-generate token if login success
            -token creating using jwt: use sign 
            (payload,password)
                    -payload: it is the data that we want to store inside a token
                    -password: can be any data that has to define in .env file

--------------------------------------------------------------------------------------

MIDDLEWARE
--------------------------------------------------------------------

-used to controll request-response cycle in server before resolving a request server can perform any task 
  (authorization, data fomat changing etc..) using midleware
-midleware are function with three arguments request,response,next

    -request: will give you client request
    -response: object will give you response from server
    -next : method used to control request

- middleware can be of  two types

    -application specific middleware: middleware will active for all client request(ex: express.json)

    -router specific middleware: middleware will active for selected client request

-verify token using jsonwebtoken
    -using verify (token,password)method, if token verify return response else error

-----------------
MULTER
----------------------------

-a middleware provided by node.js used to distructure multipart/form-data

    - install:- npm i multer
-multer add body & file key to the request object
-multer can be used to define storage space for uploaded file
-multer places thr file type data to file key and the string to reqbody

--to handle multipart/form-data request using multer

        -create js file
        -import multer in the file
        -create a 'upload' folder inside server folder for storing upload file
        -define multer storage object in js file
        -multer.diskStorage is used to store file in storage
                -destination is used to specify the location



                -------------------------------------------IMP ----------- WATCH CLS 18/2/25



--------------------------------------------------------------------------------------------------------

CONTEXT API-- Data sharing technique in react
----------------------------------------------------
- use context to share data between components, avoid props drilling
- providing a centralised way to manage state across componenets
- share specific info:(like state or function) with multiple components without props drilling

--steps------------------

        -create a context :create a context using createContect() hook
        -provide the context: use provider of context, so that it helps to provide data to component
        -consuming the context : to access/ use shared data using context API, use useContext() hook