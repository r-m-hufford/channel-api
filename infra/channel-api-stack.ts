import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';


export class ChannelApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const channelLambda = new lambda.Function(this, 'ChannelApiLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
    });

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 })

    new rds.DatabaseInstance(this, 'ChannelApiRDS', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12_5
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      vpc,
      allocatedStorage: 20,
      storageType: rds.StorageType.GP2,
      deletionProtection: false,
    })

    const channelApi = new apigateway.RestApi(this, 'ChannelApi');

    const usersResource = channelApi.root.addResource('users');
    usersResource.addMethod('GET', new apigateway.LambdaIntegration(channelLambda));
    usersResource.addMethod('POST', new apigateway.LambdaIntegration(channelLambda));
    usersResource.addMethod('PUT', new apigateway.LambdaIntegration(channelLambda));
    usersResource.addMethod('DELETE', new apigateway.LambdaIntegration(channelLambda));
    
    const articlesResource = channelApi.root.addResource('articles');
    articlesResource.addMethod('GET', new apigateway.LambdaIntegration(channelLambda));
    articlesResource.addMethod('POST', new apigateway.LambdaIntegration(channelLambda));
    articlesResource.addMethod('PUT', new apigateway.LambdaIntegration(channelLambda));
    articlesResource.addMethod('DELETE', new apigateway.LambdaIntegration(channelLambda));
    
    // const authResource = channelApi.root.addResource('auth');

    // const commentsResource = channelApi.root.addResource('comments');
    
    // const followsResource = channelApi.root.addResource('follows');
    
    // const passwordResource = channelApi.root.addResource('password');
    
    // const profilesResource = channelApi.root.addResource('profiles');
    
    // const topicsResource = channelApi.root.addResource('topics');
  }
}