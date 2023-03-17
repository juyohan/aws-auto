import { MediaLiveClient, DeleteInputCommand, DeleteInputRequest } from "@aws-sdk/client-medialive";

export const deleteMediaLiveInput = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })
    const input : DeleteInputRequest = {
        InputId : "4117227"
    }
    const command = new DeleteInputCommand(input)

    try { 
        const data = client.send(command).then()
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

deleteMediaLiveInput();