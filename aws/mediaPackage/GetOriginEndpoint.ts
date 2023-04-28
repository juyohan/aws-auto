import { DescribeOriginEndpointCommand, DescribeOriginEndpointRequest } from '@aws-sdk/client-mediapackage';
import { AWS_MEDIAPACKAGE_CLIENT } from '../common/awsConfig';

export const getOriginEndpoint = async() => {
    const client = AWS_MEDIAPACKAGE_CLIENT

    const input : DescribeOriginEndpointRequest = {
        Id : 'originEndpoint-10066'
    }

    const command = new DescribeOriginEndpointCommand(input)
    try {
        const response = await client.send(command)
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}

getOriginEndpoint()