import { MediaLiveInputInfo } from '../../common/types/MediaLive'
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig'
import { InputSourceRequest } from '@aws-sdk/client-medialive'
import {
	CreateInputRequest,
	CreateInputCommand,
	InputType,
	InputDestinationRequest,
} from '@aws-sdk/client-medialive'

export const createInput = async (
	id: string,
	type: string
): Promise<MediaLiveInputInfo> => {
	const client = AWS_MEDIALIVE_CLIENT

	const input: CreateInputRequest = type.match('live')
		? getRTMP(id)
		: getURL(id)

	const command = new CreateInputCommand(input)

	var mediaLiveInputInfo: MediaLiveInputInfo = await client
		.send(command)
		.then((res) => {
			return {
				id: res.Input?.Id!,
				arn: res.Input?.Arn!,
				name: res.Input?.Name!,
				destination: res.Input?.Destinations!,
			}
		})
		.catch((err) => {
			console.log(err)
			throw new Error('MediaLive Input 생성 실패')
		})

	console.log(mediaLiveInputInfo)
	return mediaLiveInputInfo
}

const getRTMP = (id: string): CreateInputRequest => {
	// RTMP 주소 값 추가
	const dest: InputDestinationRequest[] = [
		{
			StreamName: `stayg/${id}`,
		},
	]

	const input: CreateInputRequest = {
		Name: id,
		InputSecurityGroups: ['1052957'],
		Type: InputType.RTMP_PUSH,
		Destinations: dest,
	}

	return input
}

const getURL = (id: string): CreateInputRequest => {
	// S3 주소 값 추가
	const sources: InputSourceRequest[] = [
		{
			Url: '',
		},
	]

	const input: CreateInputRequest = {
		Sources: sources,
		Name: id,
		Type: InputType.URL_PULL,
		InputSecurityGroups: ['1052957'],
	}

	return input
}

createInput('10066', 'rtmp')
