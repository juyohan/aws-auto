import { UpdateInputCommand, UpdateInputRequest, InputSourceRequest } from "@aws-sdk/client-medialive";
import { AWS_MEDIALIVE_CLIENT } from "../../common/awsConfig";

export const updateMediaLiveInput = async() => {
    const client = AWS_MEDIALIVE_CLIENT

    const sources : InputSourceRequest[] = [
        {
            Url: "s3://live-platform-drm/livevod/test/john/2_test/Charlie_Puth_I_Dont_Think_That_I_Like_Her.m3u8"
        }
    ]

    const input : UpdateInputRequest = {
        InputId : "4117227",
        Sources : sources
    }
    const command : UpdateInputCommand = new UpdateInputCommand(input)

    try { 
        const response = await client.send(command)
        console.log(response.Input)
    } catch (err) {
        console.log(err)
    }
}
updateMediaLiveInput();