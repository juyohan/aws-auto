import { MediaLiveClient, CreateInputRequest, CreateInputCommand, InputType, InputSourceRequest } from "@aws-sdk/client-medialive";

export const setMediaLiveInput = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })

    const sources : InputSourceRequest[] = [
        {
            Url : "s3://live-platform-drm/livevod/test/john/1_test/Charlie_Puth_We_Dont_Talk_AnymoreMusic_Test.m3u8"
        }
        // {
        //     Url : "s3://live-platform-drm/livevod/test/john/1_test/Charlie_Puth_We_Dont_Talk_AnymoreMusic_Test.m3u8"
        // }
    ]

    const input : CreateInputRequest = {
        Name : "sdkTest_1",
        InputSecurityGroups : ["1052957"],
        Type : InputType.URL_PULL,
        Sources : sources,
    }

    const command = new CreateInputCommand(input)
    try {
        const data = await client.send(command)
        console.log(data.Input)
    } catch (err) {
        console.log(err)
    }
}

setMediaLiveInput();