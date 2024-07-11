
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

####Then it will give a summary for the project
```
    -----------------------
    Generating application:
    -----------------------
    Name: order-api
    Runtime: nodejs20.x
    Architectures: x86_64
    Dependency Manager: npm
    Application Template: quick-start-web
    Output Directory: .
    Configuration file: order-api/samconfig.toml
```
  
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
Configuring SAM deploy
======================

        Looking for config file [samconfig.toml] :  Found
        Reading default arguments  :  Success

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

        Looking for resources needed for deployment:

        Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-u9umwdgwuf9g
        A different default S3 bucket can be set in samconfig.toml and auto resolution of buckets turned off by setting resolve_s3=False

        Parameter "stack_name=order-api" in [default.deploy.parameters] is defined as a global parameter [default.global.parameters].
        This parameter will be only saved under [default.global.parameters] in E:\qsr-ordering-system\order-api\samconfig.toml.

        Saved arguments to config file
        Running 'sam deploy' for future deployments will use the parameters saved above.
        The above parameters can be changed by modifying samconfig.toml
        Learn more about samconfig.toml syntax at
        https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html

        Uploading to order-api/31848c0dc00b7f21a679bb4ad9548b2f  16613451 / 16613451  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : order-api
        Region                       : ap-southeast-2
        Confirm changeset            : True
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-u9umwdgwuf9g
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to order-api/9b92ef4cfa829d26b1ddb4adc768d570.template  1554 / 1554  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
Operation                                         LogicalResourceId                                 ResourceType                                      Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
+ Add                                             OrderTable                                        AWS::DynamoDB::Table                              N/A
+ Add                                             OrdersFunctionGetOrderPermissionProd              AWS::Lambda::Permission                           N/A
+ Add                                             OrdersFunctionPostOrderPermissionProd             AWS::Lambda::Permission                           N/A
+ Add                                             OrdersFunctionPutOrderPermissionProd              AWS::Lambda::Permission                           N/A
+ Add                                             OrdersFunctionRole                                AWS::IAM::Role                                    N/A
+ Add                                             OrdersFunction                                    AWS::Lambda::Function                             N/A
+ Add                                             ServerlessRestApiDeployment8d89a2308f             AWS::ApiGateway::Deployment                       N/A
+ Add                                             ServerlessRestApiProdStage                        AWS::ApiGateway::Stage                            N/A
+ Add                                             ServerlessRestApi                                 AWS::ApiGateway::RestApi                          N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      


Changeset created successfully. arn:aws:cloudformation:ap-southeast-2:654654270023:changeSet/samcli-deploy1720691930/2969fd9b-2628-4590-82f8-3aa2f3805145


Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]: y 

2024-07-11 19:59:00 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
ResourceStatus                                    ResourceType                                      LogicalResourceId                                 ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
CREATE_IN_PROGRESS                                AWS::CloudFormation::Stack                        order-api                                         User Initiated
CREATE_IN_PROGRESS                                AWS::DynamoDB::Table                              OrderTable                                        -
CREATE_IN_PROGRESS                                AWS::DynamoDB::Table                              OrderTable                                        Resource creation Initiated
CREATE_COMPLETE                                   AWS::DynamoDB::Table                              OrderTable                                        -
CREATE_IN_PROGRESS                                AWS::IAM::Role                                    OrdersFunctionRole                                -
CREATE_IN_PROGRESS                                AWS::IAM::Role                                    OrdersFunctionRole                                Resource creation Initiated
CREATE_COMPLETE                                   AWS::IAM::Role                                    OrdersFunctionRole                                -
CREATE_IN_PROGRESS                                AWS::Lambda::Function                             OrdersFunction                                    -
CREATE_IN_PROGRESS                                AWS::Lambda::Function                             OrdersFunction                                    Resource creation Initiated
CREATE_COMPLETE                                   AWS::Lambda::Function                             OrdersFunction                                    -
CREATE_IN_PROGRESS                                AWS::ApiGateway::RestApi                          ServerlessRestApi                                 -
CREATE_IN_PROGRESS                                AWS::ApiGateway::RestApi                          ServerlessRestApi                                 Resource creation Initiated
CREATE_COMPLETE                                   AWS::ApiGateway::RestApi                          ServerlessRestApi                                 -
CREATE_IN_PROGRESS                                AWS::ApiGateway::Deployment                       ServerlessRestApiDeployment8d89a2308f             -
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionPutOrderPermissionProd              -
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionPostOrderPermissionProd             -
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionGetOrderPermissionProd              -
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionPutOrderPermissionProd              Resource creation Initiated
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionGetOrderPermissionProd              Resource creation Initiated
CREATE_COMPLETE                                   AWS::Lambda::Permission                           OrdersFunctionPutOrderPermissionProd              -
CREATE_IN_PROGRESS                                AWS::Lambda::Permission                           OrdersFunctionPostOrderPermissionProd             Resource creation Initiated
CREATE_COMPLETE                                   AWS::Lambda::Permission                           OrdersFunctionGetOrderPermissionProd              -
CREATE_IN_PROGRESS                                AWS::ApiGateway::Deployment                       ServerlessRestApiDeployment8d89a2308f             Resource creation Initiated
CREATE_COMPLETE                                   AWS::Lambda::Permission                           OrdersFunctionPostOrderPermissionProd             -
CREATE_COMPLETE                                   AWS::ApiGateway::Deployment                       ServerlessRestApiDeployment8d89a2308f             -
CREATE_IN_PROGRESS                                AWS::ApiGateway::Stage                            ServerlessRestApiProdStage                        -
CREATE_IN_PROGRESS                                AWS::ApiGateway::Stage                            ServerlessRestApiProdStage                        Resource creation Initiated
CREATE_COMPLETE                                   AWS::ApiGateway::Stage                            ServerlessRestApiProdStage                        -
CREATE_COMPLETE                                   AWS::CloudFormation::Stack                        order-api                                         -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      

CloudFormation outputs from deployed stack
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
Outputs
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
Key                 OrdersApi
Description         API Gateway endpoint URL for Prod stage
Value               https://vq1via0yi1.execute-api.ap-southeast-2.amazonaws.com/Prod/orders/
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
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
