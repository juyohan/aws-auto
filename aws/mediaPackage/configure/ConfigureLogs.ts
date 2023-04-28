import { ConfigureLogsCommand, ConfigureLogsRequest } from '@aws-sdk/client-mediapackage';
import { AWS_MEDIAPACKAGE_CLIENT } from '../../common/awsConfig';


export const configureLogs = async(id: string) => {
    const clinet = AWS_MEDIAPACKAGE_CLIENT

    const input : ConfigureLogsRequest = {
        Id : id,
        EgressAccessLogs : {
            LogGroupName : "/aws/MediaPackage/EgressAccessLogs"
        },
        IngressAccessLogs : {
            LogGroupName : "/aws/MediaPackage/IngressAccessLogs"
        }
    }

    const command = new ConfigureLogsCommand(input)

    try {
        const response = await clinet.send(command)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

configureLogs('10066')
