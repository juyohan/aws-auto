import { CreateChannelCommand, CreateChannelRequest } from '@aws-sdk/client-mediapackage';
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig';

export const createMPChannel = async() => {
    const client = AWS_MEDIAPACKAGE_CLIENT

    const input : CreateChannelRequest = {
        Id : "sdk-test-mediapackage",
        Description : "sdk-test-mediapackage"
    }

    const command = new CreateChannelCommand(input)
    try {
        const response = await client.send(command)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

createMPChannel()