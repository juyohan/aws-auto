import { ListChannelsCommand, MediaLiveClient, Channel } from "@aws-sdk/client-medialive"

export const getMLChannelList = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })

    const params = {}
    const command = new ListChannelsCommand(params)

    try {
        const data = await client.send(command)
        const channels : Channel[] | undefined = data.Channels
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

getMLChannelList()