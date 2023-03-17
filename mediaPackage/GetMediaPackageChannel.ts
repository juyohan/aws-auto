import { DescribeChannelCommand, DescribeChannelRequest } from '@aws-sdk/client-mediapackage';
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig';


export const getMPChannel = async() => {
    const client = AWS_MEDIAPACKAGE_CLIENT

    const input : DescribeChannelRequest = {
        Id : "sdk-test-mediapackage"
    }

    const command = new DescribeChannelCommand(input)

    try {
        const response = await client.send(command)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}


getMPChannel()