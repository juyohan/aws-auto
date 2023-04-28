import {
	DeleteInputCommand,
	DeleteInputRequest,
} from '@aws-sdk/client-medialive'
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig'

export const deleteInput = async (id: string) => {
	const client = AWS_MEDIALIVE_CLIENT

	const input: DeleteInputRequest = {
		InputId: id,
	}
	const command = new DeleteInputCommand(input)

	await client.send(command).catch((err) => {
		console.log(err)
		throw new Error('MediaLive 채널 삭제 오류')
	})
}

deleteInput('10066')
