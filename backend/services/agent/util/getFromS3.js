import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3.js";
import { Bucket$, GetObjectCommand } from "@aws-sdk/client-s3";

// return string-in the case that is url 
//  means it is a promise of url from this 
export const getFromS3 = async (fileName,expiresIn=600)=>{
    return await getSignedUrl(
        s3,
        new GetObjectCommand({
                Bucket:process.env.AWS_BUCKET_NAME,
                Key:fileName,

            }
            
        ),{expiresIn}
    )
}