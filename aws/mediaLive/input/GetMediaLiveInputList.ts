import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig'
import { ListInputsCommand, Input } from '@aws-sdk/client-medialive'

export const getInputList = async (id: string) => {
	const client = AWS_MEDIALIVE_CLIENT

	const params = {}

	const command = new ListInputsCommand(params)
	try {
		const data = await client.send(command)
		const inputList: Input[] | undefined = data.Inputs
		console.log(inputList)
		return inputList
	} catch (err) {
		console.log(err)
	}
}

getInputList('10066')
