import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';


export class ChannelApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });

    const instance = new ec2.Instance(this, 'channelInstance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
    });
    
    const rdsSG = new ec2.SecurityGroup(this, 'RdsSG', { vpc });

    new rds.DatabaseInstance(this, 'ChannelApiRDS', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromGeneratedSecret('channelapi'),
      vpc,
      vpcSubnets: {
        subnetGroupName: 'Private',
      },
      securityGroups: [rdsSG],
      allocatedStorage: 20,
      storageType: rds.StorageType.GP2,
      deletionProtection: false,
    })
  }
}