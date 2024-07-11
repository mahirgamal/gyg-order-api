
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

Create the `orders.js` file in the `src/handlers` directory and add your Lambda function logic:

```javascript
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const { httpMethod, pathParameters, body } = event;

  switch (httpMethod) {
    case 'POST':
      return await createOrder(JSON.parse(body));
    case 'GET':
      if (pathParameters && pathParameters.orderId) {
        return await getOrder(pathParameters.orderId);
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "orderId path parameter is required" }),
        };
      }
    case 'PUT':
      return await updateOrder(pathParameters.orderId, JSON.parse(body));
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: `Unsupported method: ${httpMethod}` }),
      };
  }
};

const createOrder = async (order) => {
  const params = {
    TableName: TABLE_NAME,
    Item: order,
  };

  try {
    await dynamoDb.put(params).promise();
    console.log("Order created:", order);
    return {
      statusCode: 201,
      body: JSON.stringify(order),
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const getOrder = async (orderId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { orderId },
  };

  try {
    const { Item } = await dynamoDb.get(params).promise();
    if (Item) {
      console.log("Order retrieved:", Item);
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
      };
    } else {
      console.log("Order not found:", orderId);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const updateOrder = async (orderId, order) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { orderId },
    UpdateExpression: 'set #attr = :val',
    ExpressionAttributeNames: {
      '#attr': 'quantity', // Assuming you are updating the quantity
    },
    ExpressionAttributeValues: {
      ':val': order.quantity,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const { Attributes } = await dynamoDb.update(params).promise();
    console.log("Order updated:", Attributes);
    return {
      statusCode: 200,
      body: JSON.stringify(Attributes),
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
```

### 6. Update the `template.yaml`

Ensure your `template.yaml` file in the root directory is configured as follows:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  OrderTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub 'Orders-${AWS::StackName}'  # Use a unique table name
      AttributeDefinitions:
        - AttributeName: orderId
          AttributeType: S
      KeySchema:
        - AttributeName: orderId
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST

  OrdersFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/orders.handler
      Runtime: nodejs18.x
      Timeout: 10
      Environment:
        Variables:
          TABLE_NAME: !Ref OrderTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref OrderTable
      Events:
        PostOrder:
          Type: Api
          Properties:
            Path: /orders
            Method: POST
        GetOrder:
          Type: Api
          Properties:
            Path: /orders/{orderId}
            Method: GET
        PutOrder:
          Type: Api
          Properties:
            Path: /orders/{orderId}
            Method: PUT

Outputs:
  OrdersApi:
    Description: "API Gateway endpoint URL for Prod stage"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/orders/"
```

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
