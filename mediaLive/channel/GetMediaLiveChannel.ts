import { DescribeChannelCommand, DescribeChannelRequest, OutputDestination, OutputDestinationSettings } from '@aws-sdk/client-medialive';
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig';

export const getMLChannel = async() => {
    const client = AWS_MEDIALIVE_CLIENT
    
    const input : DescribeChannelRequest = {
        ChannelId : "6410839"
    }

    const command = new DescribeChannelCommand(input)
    try {
        const response = await client.send(command)
        const destination : OutputDestination[] | undefined = response.Destinations
        const setting : OutputDestinationSettings[] | undefined = destination?.[0].Settings
        console.log(destination)
        console.log(setting)
    } catch (err) {
        console.log(err)
    }
}

getMLChannel()