import {
  CreateOriginEndpointCommand,
  CreateOriginEndpointRequest,
  HlsPackage,
  PlaylistType,
} from "@aws-sdk/client-mediapackage";
import { AWS_MEDIAPACKAGE_CLIENT } from "../common/awsConfig";
import {
  MediaPackageEndpointInfo,
  MediaPackageInfo,
} from "../common/types/MediaPackage";

export const createOriginEndpoint = async (
  id: string,
  mediaPackageInfo: MediaPackageInfo
): Promise<MediaPackageInfo> => {
  const client = AWS_MEDIAPACKAGE_CLIENT;

  const hlsPackage: HlsPackage = {
    PlaylistType: PlaylistType.EVENT,
    SegmentDurationSeconds: 2,
    PlaylistWindowSeconds: 6,
  };

  const input: CreateOriginEndpointRequest = {
    ChannelId: id,
    Id: `originEndpoint-${id}`,
    Description: `originEndpoint - ${id}`,
    ManifestName: "master",
    HlsPackage: hlsPackage,
    StartoverWindowSeconds: 1209600,
  };

  const command = new CreateOriginEndpointCommand(input);

  const response = await client.send(command);
  const endpoint: MediaPackageEndpointInfo[] = [
    {
      cloudUrl: response.Url!,
      createdAt: response.CreatedAt!,
      id: response.Id!,
      channelId: response.ChannelId!,
      arn: response.Arn!,
    },
  ];
  mediaPackageInfo.endpoints = endpoint;
  console.log(response);

  return mediaPackageInfo;
};