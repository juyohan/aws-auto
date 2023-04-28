import {
	S3Client,
	SelectObjectContentCommand,
	SelectObjectContentRequest,
} from '@aws-sdk/client-s3'

export const selectObjectContent = async () => {
	const client = new S3Client({
		region: 'ap-northeast-2',
	})

	const input: SelectObjectContentRequest = {
		Bucket: 'live-logs-backup',
	}

	const command = new SelectObjectContentCommand(input)
}
