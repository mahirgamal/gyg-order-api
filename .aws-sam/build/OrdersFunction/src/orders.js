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