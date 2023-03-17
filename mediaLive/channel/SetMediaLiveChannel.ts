import { CreateChannelCommand, CreateChannelRequest } from "@aws-sdk/client-medialive";
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig';

export const setMediaLiveChannel = async() => {
    const client = AWS_MEDIALIVE_CLIENT

    const input : CreateChannelRequest = {

    }

    const command = new CreateChannelCommand(input)

    try { 
        const data = client.send(command)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}