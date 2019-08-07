Step 1 : Create Cluster
    Build New Cluster --> AWS --> Select any region --> Select free Cluster Tier --> Name your cluster 
Step 2 : Create User 
    PROJECT --> Clusters --> Security --> ADD NEW USER --> Enter UserName & Password --> User      Priveleges --> Read and write to any DB --> Add User

Step 3 : Set IP Address
    IP Whitelist --> IP Address --> Add Current IP Address/Or Whitelist Entry = 0.0.0.0 --> confirm

Step 4 : Connect Cluster
    Connect --> Connect your Application --> Sort SRV connection string --> CopySRV Address

Step 5 : Get package.json file
    npm init -y

Step 6 : Setting dependencies required for the project
    npm i express bcryptjs passport passport-local ejs express-ejs-layouts mongoose connect-flash express-session  

Step 7 : Setting dev dependency
    npm i -D nodemon

Step 8 : Starting server
    npm run dev

For MongoURI in keys.js file under config folder
    go to cluster --> connect --> connect your application --> short SRV connection string --> copy SRV address

    change <PASSWORD>


MongoURI = mongodb+srv://Rockstarsud:<password>@passportauthenticationcluster-wbh42.mongodb.net/test?retryWrites=true&w=majority

Note:- Wherever, we require promise, we always make use of then and catch

        newUser.save()
            .then(user => {
                res.redirect('/users/login');
            })
            .catch(err => console.log(err));