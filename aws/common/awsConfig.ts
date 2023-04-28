import { MediaLiveClient } from "@aws-sdk/client-medialive"
import { MediaPackageClient } from "@aws-sdk/client-mediapackage"
import { CloudFrontClient } from "@aws-sdk/client-cloudfront"

export const AWS_MEDIALIVE_CLIENT : MediaLiveClient = new MediaLiveClient({
    region : "ap-northeast-2"
})

export const AWS_MEDIAPACKAGE_CLIENT : MediaPackageClient = new MediaPackageClient({
    region : "ap-northeast-2"
})

export const AWS_CLOUDFRONT_CLIENT : CloudFrontClient = new CloudFrontClient({
    region : "ap-northeast-2"
})