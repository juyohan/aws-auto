import {
	DescribeInputCommand,
	DescribeInputRequest,
} from '@aws-sdk/client-medialive'
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig'
import { MediaLiveInputInfo } from '../../common/types/MediaLive'

export const getInput = async (id: string): Promise<MediaLiveInputInfo> => {
	const client = AWS_MEDIALIVE_CLIENT

	const input: DescribeInputRequest = {
		InputId: id,
	}

	const command = new DescribeInputCommand(input)

	var mediaLiveInputInfo: MediaLiveInputInfo = await client
		.send(command)
		.then((res) => {
			return {
				id: res.Id!,
				name: res.Name!,
				arn: res.Arn!,
				destination: res.Destinations!,
			}
		})
		.catch((err) => {
			console.log(err)
			throw new Error('MediaLive 접근 실패')
		})

	console.log(mediaLiveInputInfo)

	return mediaLiveInputInfo
}

getInput('4962083')
