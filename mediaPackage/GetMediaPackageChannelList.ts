import { ListChannelsCommand } from '@aws-sdk/client-mediapackage';
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig';

export const getMPChannelList = async() => {
    const client = AWS_MEDIAPACKAGE_CLIENT

    const input = {}
    
    const command = new ListChannelsCommand(input)

    try {
        const response = await client.send(command)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

getMPChannelList();