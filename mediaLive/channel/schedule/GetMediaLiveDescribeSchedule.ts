import { MediaLiveClient, DescribeScheduleCommand, DescribeScheduleRequest } from "@aws-sdk/client-medialive"

export const getMediaLiveDescribeSchedule = async() => {
    const client = new MediaLiveClient({
        region : "ap-northeast-2"
    })

    const input : DescribeScheduleRequest = {
        ChannelId: "6297043"
    }

    const command = new DescribeScheduleCommand(input)

    try {
        const data = await client.send(command)
        console.log(data.ScheduleActions)
    } catch (err) {
        console.log(err);
    }
}

getMediaLiveDescribeSchedule()