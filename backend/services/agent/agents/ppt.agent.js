
import { getModel } from "../config/llmmodels.js"
import { generatePPT } from "../util/generatePPT.js"
import { getFromS3 } from "../util/getFromS3.js"
import { uploadToS3 } from "../util/uploadToS3.js"

export const pptAgent = async(state)=>{
    try {
        const llm = await getModel("ppt")

        const prompt=`You are a professional presentation designer.
            Return ONLY valid JSON.
            Format:
            {

            "title":"",
            "subtitle":"",
            "slides":[
            {
            "title":"",
            "points":[
            "",
            "",
            "",
            ""
            ]
            }
            ]
            }
            Rules:
            -Generate exactly 6 content slides.
            -Each slide should have 4-6 concise bullet points.
            -No markdown.
            -No explanation.
            -No code block.
            -Return ONLY JSON.
            Topic:${state.prompt}`

        const res = await llm.invoke(prompt)
        // console.log(JSON.parse(res.content))
        const cleaned = res.content
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/, "")
            .trim();
                
            console.log(cleaned);
        const data = JSON.parse(cleaned);

        // console.log(JSON.stringify(data, null, 2));
// console.log(data.slides.length);
        const ppt =await generatePPT(data)
        
        // ppt buffer
        const buffer = await ppt.write({
            outputType:"nodebuffer"
        })

        const fileName = `ppt-${Date.now()}.pptx`
        
        await uploadToS3 (fileName, buffer, "application/vnd.openxmlformats-officedocument.presentationml.presentation")

        const downloadUrl = await getFromS3(fileName,24*60*60)

        return {
                ...state,
                aiResponse:`# PPT generated
**${data.title}**
[Download PPT](${downloadUrl})
_Link expires in 10 minutes._`
            }

    } catch (error) {
        console.log(error)
        return{
            ...state,
            aiResponse:"❌Failed to generate PPT"
        }
    }
}

    
    