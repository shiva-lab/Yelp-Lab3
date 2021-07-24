# Yelp-Grphql
Yelp prototype using Graphql


## Technologies Used:
  * Front End : ReactJS, HTML, CSS, Bootstrap
  * Back End  : GraphQL, NodeJS, ExpressJS, Passport-JWT
  * Database  : MongoDB

#### Architecture diagram

GraphQL Server Provides the React client with a predefined schema. The GraphQL Schema serves as a middle ground between the Node server and the React client. One of the biggest advantages of GraphQL is its speed. It's also a great fit for complex systems and microservices. Another benefit of GraphQL is a developer can request all the required data in a single API Call. 
 
![image](https://user-images.githubusercontent.com/60765427/126858148-c8102bb5-dece-4ab2-9ca3-8e7a9c569aa2.png)

#### Handling multipart data

I have used mutation with GraphQL to get a signed URL with AWS-SDK on the backend. On the backed, used the signed URL and file from frontend with Rest service i.e. Axios put the file to AWS S3 Bucket. In the case of uploading a single multipart data, we only perform signing for one file at a time and use the put method with the same signed request to upload the file to S3 Bucket. In the case of multiple files, I have iterated the mutations and used put call each time to upload the data to S3 Bucket. Please refer to the image below for the end-to-end the flow of the method.

![image](https://user-images.githubusercontent.com/60765427/126858185-d23d3f99-d7d6-420a-a9db-5bd3522f23cc.png)

