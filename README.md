
# Order Management API

This project demonstrates how to build a serverless API for managing orders using AWS Lambda, API Gateway, and DynamoDB, utilizing the AWS Serverless Application Model (SAM).

```
[Client] --> [API Gateway] --> [AWS Lambda Functions] --> [DynamoDB]
                           --> [S3 (for static content)]
                           --> [CloudWatch (for monitoring and logging)]
```

## Prerequisites

Before you begin, ensure you have the following tools installed:

- **AWS CLI**: [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- **AWS SAM CLI**: [Install AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- **Node.js and npm**: [Install Node.js](https://nodejs.org/)

## Project Structure

The project is organized as follows:

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

To start, initialize a new SAM project using the AWS SAM CLI:

```bash
sam init
```

When prompted, provide the following inputs:

1. **Template Source**:
    ```
    1- AWS Quick Start Templates
    2- Custom Template Location
    ```
    Select option `1`.

2. **AWS Quick Start Application Template**:
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
    Select option `7`.

3. **Runtime**:
    ```
    1- dotnet8
    2- dotnet6
    3- nodejs20.x
    4- nodejs18.x
    5- nodejs16.x
    ```
    Select option `3`.

4. **Enable X-Ray Tracing**: `y`
5. **Enable CloudWatch Application Insights**: `y`
6. **Set Structured Logging in JSON Format**: `y`
7. **Project Name**: `order-api`

After creating the project, delete any unnecessary folders and files to clean up the directory.

![alt text](image-1.png)


### 2. Navigate to the Project Directory

Move into your project directory:

```bash
cd order-api
```

### 3. Install AWS SDK

Install the AWS SDK to interact with AWS services like DynamoDB:

```bash
npm install aws-sdk
```

### 4. Navigate to the SRC Directory

Ensure the directory structure is correctly set up:

```bash
cd src
```

### 5. Create the `orders.js` Handler

Create the `orders.js` file in the `src` directory and add your Lambda function logic.

### 6. Update the `template.yaml`

Ensure your `template.yaml` file in the root directory is properly configured.

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

During the deployment, you will be prompted to provide various configuration details. Below is an example of the prompts and the recommended responses:

1. **Stack Name**: `order-api`
2. **AWS Region**: `ap-southeast-2`
3. **Confirm changes before deploy**: `y`
4. **Allow SAM CLI IAM role creation**: `y`
5. **Disable rollback**: `n`
6. **OrdersFunction has no authentication. Is this okay?**: `y`
7. **Save arguments to configuration file**: `y`
8. **SAM configuration file**: `samconfig.toml`
9. **SAM configuration environment**: `default`

Here's an example of how the prompt responses might look:

```text
        Setting default arguments for 'sam deploy'
        =========================================
        Stack Name [order-api]: 
        AWS Region [ap-southeast-2]:
        # Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [Y/n]: y
        # SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: y
        # Preserves the state of previously provisioned resources when an operation fails
        Disable rollback [y/N]: n
        OrdersFunction has no authentication. Is this okay? [y/N]: y
        Save arguments to configuration file [Y/n]: y
        SAM configuration file [samconfig.toml]:
        SAM configuration environment [default]:
```

Follow the prompts to configure the deployment settings. Once the deployment is complete, SAM will output the API Gateway endpoint URL.

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
