export type MediaPackageInfo = {
  id: string;
  domainName?: string;
  endpoints?: MediaPackageEndpoints;
  arn: string;
};

export type MediaPackageEndpointInfo = {
  cloudUrl: string,
  channelId: string,
  id: string,
  arn: string,
  createdAt: Date | string,
};
