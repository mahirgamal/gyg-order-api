
# Order Management API

This project demonstrates how to build a serverless API for managing orders using AWS Lambda, API Gateway, and DynamoDB with the AWS Serverless Application Model (SAM).

```
[Client] --> [API Gateway] --> [AWS Lambda Functions] --> [DynamoDB]
                           --> [S3 (for static content)]
                           --> [CloudWatch (for monitoring and logging)]
```

## Prerequisites

- AWS CLI: [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- AWS SAM CLI: [Install AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js and npm: [Install Node.js](https://nodejs.org/)

## Project Structure

```
order-api/
│
├── src/
│   └── orders.js
│
├── template.yaml
└── package.json
```

## Step-by-Step Guide

### 1. Initialize the Project with SAM

Use AWS SAM CLI to initialize a new project:

```bash
sam init
```
#### Answer to the these steps:

##### Which template source would you like to use?
```
      1- AWS Quick Start Templates
      2- Custom Template Location
```
##### Choice: 1
##### Choose an AWS Quick Start application template
```
1- Hello World Example
2- Data processing
3- Hello World Example with Powertools for AWS Lambda
4- Multi-step workflow
5- Scheduled task
6- Standalone function
7- Serverless API
8- Infrastructure event management
9- Lambda Response Streaming
10- Serverless Connector Hello World Example
11- Multi-step workflow with Connectors
12- GraphQLApi Hello World Example
13- Full Stack
14- Lambda EFS example
15- DynamoDB Example
16- Machine Learning
```
##### Template: 7
##### Which runtime would you like to use?
```
1- dotnet8
2- dotnet6
3- nodejs20.x
4- nodejs18.x
5- nodejs16.x
```
##### Runtime: 3
##### Would you like to enable X-Ray tracing on the function(s) in your application?  [y/N]: y
##### Would you like to enable monitoring using CloudWatch Application Insights?
##### Would you like to set Structured Logging in JSON format on your Lambda functions?  [y/N]: y
##### Project name [sam-app]: order-api

#### After creating the project, delete all unnecessary folders and files.  
![alt text](image-1.png)


### 2. Navigate to the Project Directory

Navigate into your project directory:

```bash
cd order-api
```

### 3. Install AWS SDK

Install the AWS SDK, which is required to interact with AWS services like DynamoDB:

```bash
npm install aws-sdk
```

### 4. Navigate to the SRC Directory

Ensure the necessary directory structure is in place:

```bash
cd src
```

### 5. Create the `orders.js` Handler

Create the [`orders.js`](https://github.com/mahirgamal/gyg-order-api/blob/main/src/orders.js) file in the `src` directory and add your Lambda function logic:


### 6. Update the `template.yaml`

Ensure your [`template.yaml`](https://github.com/mahirgamal/gyg-order-api/blob/main/template.yaml) file in the root directory is configured as follows:


### 7. Build and Deploy with AWS SAM

#### Build the Application

Use AWS SAM CLI to build the application:

```bash
sam build
```

#### Deploy the Application

Deploy the application using SAM CLI. The `--guided` flag will prompt you for deployment configurations:

```bash
sam deploy --guided

        Setting default arguments for 'sam deploy'
        =========================================
        Stack Name [order-api]: 
        AWS Region [ap-southeast-2]:
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [Y/n]: y
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: y
        #Preserves the state of previously provisioned resources when an operation fails
        Disable rollback [y/N]: n
        OrdersFunction has no authentication. Is this okay? [y/N]: y
        OrdersFunction has no authentication. Is this okay? [y/N]: y
        OrdersFunction has no authentication. Is this okay? [y/N]: y
        Save arguments to configuration file [Y/n]: y
        SAM configuration file [samconfig.toml]:
        SAM configuration environment [default]:


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: y 
```

Follow the prompts to configure the deployment settings (e.g., stack name, AWS region, etc.). Once the deployment is complete, SAM will output the API Gateway endpoint URL.

### 8. Testing the API

You can test the API endpoints using tools like `curl`, Postman, or any HTTP client. Here are some example commands:

#### Create a New Order

```bash
curl -X POST https://<api-gateway-id>.execute-api.<region>.amazonaws.com/Prod/orders -d '{"orderId": "123", "item": "Burger", "quantity": 2}' -H "Content-Type: application/json"
```

#### Get an Order by ID

```bash
curl https://<api-gateway-id>.execute-api.<region>.amazonaws.com/Prod/orders/123
```

#### Update an Order by ID

```bash
curl -X PUT https://<api-gateway-id>.execute-api.<region>.amazonaws.com/Prod/orders/123 -d '{"quantity": 3}' -H "Content-Type: application/json"
```

## Conclusion

By following these steps, you can successfully set up and deploy a serverless API using AWS SAM. This architecture leverages AWS Lambda, API Gateway, and DynamoDB to provide a scalable, highly available, and cost-effective solution for order management.
