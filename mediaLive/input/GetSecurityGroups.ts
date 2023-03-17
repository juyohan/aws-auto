import { MediaLiveClient, ListInputSecurityGroupsCommand, ListInputSecurityGroupsRequest } from "@aws-sdk/client-medialive";

export const getSecurityGroups = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })

    const input : ListInputSecurityGroupsRequest= {}

    const command = new ListInputSecurityGroupsCommand(input)
    try {
        const data = await client.send(command)
        console.log(data.InputSecurityGroups)
    } catch (err) {
        console.log(err)
    }
}

getSecurityGroups();