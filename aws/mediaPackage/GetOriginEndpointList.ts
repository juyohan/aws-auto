import {
	ListOriginEndpointsCommand,
	ListOriginEndpointsRequest,
} from '@aws-sdk/client-mediapackage'
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig'
import {
	MediaPackageEndpointInfo,
	MediaPackageInfo,
} from '../common/types/MediaPackage'

export const getOriginEndpointList = async (info: MediaPackageInfo) => {
	const client = AWS_MEDIAPACKAGE_CLIENT

	const input: ListOriginEndpointsRequest = {
		ChannelId: info.id,
	}

	const command = new ListOriginEndpointsCommand(input)

	const mediaPackageInfo = await client.send(command).then((res) => {
		// console.log(res)
		info.endpoints = res.OriginEndpoints!.map((endpoint) => {
			return {
				cloudUrl: endpoint.Url!,
				channelId: endpoint.ChannelId!,
				id: endpoint.Id!,
				arn: endpoint.Arn!,
				createdAt: endpoint.CreatedAt!,
			}
		})
		return info
	})

	console.log(mediaPackageInfo)

	return mediaPackageInfo
}

const mediaTest: MediaPackageInfo = {
	id: '10066',
	arn: '',
}

getOriginEndpointList(mediaTest)
