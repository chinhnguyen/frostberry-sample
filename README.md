# frostberry-sample

## Description
Sample project to demonstrate the Master/Detail UI using Material design specialized for [AngularJS](https://material.angularjs.org/latest/). 
Bundled with Webpack and deployed with [S3](https://aws.amazon.com/s3/).
The backend is built upon [DynamoDB](https://aws.amazon.com/dynamodb/) with [Lambda](https://aws.amazon.com/lambda/) and [API Gateway](https://aws.amazon.com/api-gateway/).
Client's SDK is generated with [OpenAPI3](https://github.com/OAI/OpenAPI-Specification) and [code generator](https://github.com/OpenAPITools/openapi-generator).

The live project can be found [here](http://frostberry-sample.s3-website.eu-north-1.amazonaws.com).

## Build

```
npm run build
```

## Update SDK
1. Go to AWS Gateway API
1. Select the API
1. Select Stages -> Export -> OpenAPI3 -> YAML
1. Copy the content of new YAML file to CompaniesAPI.yaml
1. Run
```
npm run update-sdk
```

Note that ```openapi-generator``` has been installed already

## Develop 

```
npm run start
```

## Deploy S3 

```
npm run deploy
```

Make sure AWS has been properly configured using:

```
aws configure
```



## References

1. Material AngularJS - https://material.angularjs.org/latest/
1. AWS S3 - https://aws.amazon.com/s3/
1. AWS Lambda - https://aws.amazon.com/lambda/
1. AWS DynamoDB - https://aws.amazon.com/dynamodb/
1. AWS API Gateway - https://aws.amazon.com/api-gateway/
1. Open API - https://github.com/OAI/OpenAPI-Specification
1. Open API Generator - https://github.com/OpenAPITools/openapi-generator
