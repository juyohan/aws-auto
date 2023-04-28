import {
	DescribeChannelCommand,
	DescribeChannelRequest,
} from '@aws-sdk/client-mediapackage'
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig'
import { MediaPackageInfo } from '../common/types/MediaPackage'

export const getMPChannel = async (id: string): Promise<MediaPackageInfo> => {
	const client = AWS_MEDIAPACKAGE_CLIENT

	const input: DescribeChannelRequest = {
		Id: id,
	}

	const command = new DescribeChannelCommand(input)

	var mediaPackageInfo: MediaPackageInfo

	mediaPackageInfo = await client
		.send(command)
		.then((res) => {
			console.log(res)
			return {
				id: res.Id!,
				arn: res.Arn!,
			}
		})
		.catch((err) => {
			console.log(err)
			throw new Error('MediaPackage 못가져옴')
		})
	return mediaPackageInfo
}

getMPChannel('10066')
