import { anotherRestTestForMe } from './functions/another-rest-test-for-me/resource'
import { functionFromHere } from './functions/function-from-here/resource.ts'
import { testFunctionTest1 } from './functions/test-function-test1/resource.ts'
import { defineBackend } from '@aws-amplify/backend';

import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  anotherRestTestForMe,
  functionFromHere,
  testFunctionTest1,
  auth,
  data,
  storage,
});

const apiStack = backend.createStack("api-stack");
const restAPI = new RestApi(apiStack, "RestApi", {
  restApiName: "myRestApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, 
    allowMethods: Cors.ALL_METHODS, 
    allowHeaders: Cors.DEFAULT_HEADERS, 
  },  
})
const cognitoAuth = new CognitoUserPoolsAuthorizer(apiStack, "CognitoAuth", {
    cognitoUserPools: [backend.auth.resources.userPool]
})

const lambdaAnotherRestTestForMe = new LambdaIntegration(
    backend.anotherRestTestForMe.resources.lambda
)

const anotherRestTestForMePath = restAPI.root.addResource('another-rest-test-for-me');


anotherRestTestForMePath.addMethod("POST", lambdaAnotherRestTestForMe, {
                          authorizationType: AuthorizationType.COGNITO, 
                          authorizer: cognitoAuth});

anotherRestTestForMePath.addProxy({
    anyMethod: true,
    defaultIntegration: lambdaAnotherRestTestForMe
});

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [restAPI.restApiName]: {
        endpoint: restAPI.url,
        region: Stack.of(restAPI).region,
        apiName: restAPI.restApiName,
      },
    },
  },
});

