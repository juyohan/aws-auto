import { ListInputSecurityGroupsCommand, ListInputSecurityGroupsRequest } from "@aws-sdk/client-medialive";
import { AWS_MEDIALIVE_CLIENT } from "../../common/awsConfig";

export const getSecurityGroups = async() => {
    const client = AWS_MEDIALIVE_CLIENT

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