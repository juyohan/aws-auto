import { ListDistributionsCommand, ListDistributionsRequest } from '@aws-sdk/client-cloudfront';
import { AWS_CLOUDFRONT_CLIENT } from '../common/awsConfig';

export const getDistributionList = async() => {
    const clinet = AWS_CLOUDFRONT_CLIENT

    const input : ListDistributionsRequest= {}
    const command = new ListDistributionsCommand(input)
    try {
        const response = await clinet.send(command)
        console.log(response.DistributionList?.Items)
    } catch (err) {
        console.log(err)
    }
}

getDistributionList()