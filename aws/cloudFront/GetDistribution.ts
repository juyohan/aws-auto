import { GetDistributionCommand, GetDistributionRequest, DistributionConfig, Origin } from '@aws-sdk/client-cloudfront';
import { AWS_CLOUDFRONT_CLIENT } from '../common/awsConfig';


export const getDistribution = async() => {
    const client = AWS_CLOUDFRONT_CLIENT
    const input : GetDistributionRequest = {
        Id : "E340KG8OALTZE6"
    }
    const command = new GetDistributionCommand(input)
    try {
        const response = await client.send(command)
        console.log(response.Distribution?.DistributionConfig?.Origins)
    } catch (err) {
        console.log(err)
    }
}

getDistribution()