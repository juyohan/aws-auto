import {
  CacheBehavior,
  CreateDistributionCommand,
  CreateDistributionRequest,
  CustomOriginConfig,
  DefaultCacheBehavior,
  DistributionConfig,
  Origin,
  OriginProtocolPolicy,
  Origins,
  ViewerProtocolPolicy,
} from "@aws-sdk/client-cloudfront";
import { AWS_CLOUDFRONT_CLIENT } from "../common/awsConfig";
import { MediaPackageInfo } from "../common/types/MediaPackage";

export const createDistribution = async (
  mediaPackageInfo: MediaPackageInfo
) => {
  const client = AWS_CLOUDFRONT_CLIENT;

  const cache: CacheBehavior = {
    PathPattern: "",
    TargetOriginId: "",
    ViewerProtocolPolicy: ViewerProtocolPolicy.allow_all,
  };

  const cacheBehavior: DefaultCacheBehavior = {
    TargetOriginId: "",
    ViewerProtocolPolicy: "",
  };

  const originConfig: CustomOriginConfig = {
    HTTPPort: 80,
    HTTPSPort: 443,
    OriginProtocolPolicy: OriginProtocolPolicy.https_only,
  };

  const origin: Origin[] = [
    {
      Id: mediaPackage.id,
      DomainName: mediaPackage.domainName,
      CustomOriginConfig: originConfig,
    },
  ];

  const origins: Origins = {
    Quantity: 2,
    Items: origin,
  };

  const dist: DistributionConfig = {
    Enabled: false,
    CallerReference: "",
    Origins: origins,
    DefaultCacheBehavior: cacheBehavior,
    Comment: "",
  };

  const input: CreateDistributionRequest = {
    DistributionConfig: dist,
  };

  const command = new CreateDistributionCommand(input);

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const mediaPackage: MediaPackageInfo = {
  id: "",
  domainName: "",
  arn: "",
};

createDistribution(mediaPackage);
