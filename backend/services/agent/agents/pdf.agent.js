import { getModel } from "../config/llmmodels.js"
import { generatePdf } from "../util/generatePDF.js";
import { getFromS3 } from "../util/getFromS3.js";
import { uploadToS3 } from "../util/uploadToS3.js";

export const pdfAgent = async(state)=>{
    try {
        const llm = await getModel("pdf")

        const prompt = `
            you are expert documetn writer
            Return ONLY valid JSON.

                Do NOT return markdown.
                Do NOT return explanations.
                Structure:
                {
                    "title":"",
                    "subtitle":"",
                    "sections":[
                    {
                        "heading":"",
                        "points":[]
                    }
                    ]
                }
                    Generate 4-8 sections.
                    Each section should have 3-6 concise bullet points.
                    Topic:${state.prompt}    `

            const res  = await llm.invoke(prompt);
            // console.log(JSON.parse(res?.content))

            const cleaned = res.content
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/, "")
            .trim();
                
            console.log(cleaned);

            const data = JSON.parse(cleaned);
            // data is in the form of Buffer
            const pdfBuffer=await generatePdf(data) 

            const fileName = `pdf-${Date.now()}.pdf` 
            // upload to s3

            await uploadToS3(fileName,pdfBuffer,"application/pdf")

            const downloadUrl = await getFromS3(fileName,24*60)

            return {
                ...state,
                aiResponse:`# PDF generated
**${data.title}**
[Download PDF](${downloadUrl})
_Link expires in 10 minutes._
                `
            }


    } catch (error) {
        console.log(error)
        return{
            ...state,
            aiResponse:"❌Failed to generate PDF"
        }
    }
}