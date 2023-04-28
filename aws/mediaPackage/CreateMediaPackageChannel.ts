import {
  CreateChannelCommand,
  CreateChannelRequest,
} from "@aws-sdk/client-mediapackage";
import { AWS_MEDIAPACKAGE_CLIENT } from "../common/awsConfig";
import { MediaPackageInfo } from "../common/types/MediaPackage";
import { createOriginEndpoint } from "./CreateOriginEndpoint";

export const createMPChannel = async (
  id: string
): Promise<MediaPackageInfo> => {
  const client = AWS_MEDIAPACKAGE_CLIENT;

  const input: CreateChannelRequest = {
    Id: id,
    Description: `STAYG channel - ${id}`,
  };

  const command = new CreateChannelCommand(input);

  const response = await client.send(command);

  var mediaPackageInfo: MediaPackageInfo = {
    id: response.Id!,
    arn: response.Arn!,
  };

  createOriginEndpoint(id, mediaPackageInfo).then((res: MediaPackageInfo) => {
    mediaPackageInfo = res;
  });

  console.log(response);

  return mediaPackageInfo;
};
