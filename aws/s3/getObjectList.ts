import {
	ListObjectsCommand,
	S3Client,
	ListObjectsRequest,
} from '@aws-sdk/client-s3'

export const getObjectList = async () => {
	const client = new S3Client({
		region: 'ap-northeast-2',
	})

	const input: ListObjectsRequest = {
		Bucket: 'live-logs-backup',
		Delimiter: 'test/VOD/KCON/자막/',
	}

	const command = new ListObjectsCommand(input)

	try {
		const data = await client.send(command)
		console.log(data)
	} catch (err) {
		console.log(err)
	}
}

getObjectList()
