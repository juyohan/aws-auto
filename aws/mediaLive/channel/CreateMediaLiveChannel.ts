import { CreateChannelCommand, CreateChannelRequest, ChannelClass, InputCodec, InputResolution, InputMaximumBitrate, InputAttachment, OutputDestination } from "@aws-sdk/client-medialive";
import { AWS_MEDIALIVE_CLIENT } from '../../common/awsConfig';

export const createMediaLiveChannel = async() => {
    const client = AWS_MEDIALIVE_CLIENT

    const inputAttachments: InputAttachment[] = [{
        
    }]

    const outputDestinations: OutputDestination[] = [{

    }]

    const input: CreateChannelRequest = {
        Name: "",
        ChannelClass: ChannelClass.SINGLE_PIPELINE,
        InputSpecification: {
            Codec: InputCodec.AVC,
            MaximumBitrate: InputMaximumBitrate.MAX_10_MBPS,
            Resolution: InputResolution.HD
        },
        InputAttachments: inputAttachments, // MediaLive Input 연결
        Destinations: outputDestinations // MediaPackage Output 설정
    }

    const command = new CreateChannelCommand(input)

    try { 
        const data = client.send(command)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}