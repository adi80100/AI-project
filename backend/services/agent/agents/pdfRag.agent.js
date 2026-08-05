import fs from "fs/promises"
import {PDFParse} from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/vectordb.js";
import { getModel } from "../config/llmmodels.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../util/deductCredits.js";

export const pdfRag = async(state)=>{
    try {
        const buffer = await fs.readFile(state.file?.path)

        const pdf = new PDFParse(
            {
                data:buffer,

            }
        )
        // i get pdf here

        const result = await pdf.getText()
        // const result = await pdf(buffer)

        // i take all the text from this
        const text = result.text
        // i split the text into smaller chunk as per the ratio
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize:1000,
            chunkOverlap:200,

        })

        // now create doc of the chunks
        const docs = await splitter.createDocuments([text])
        const collectionName = `pdf-${Date.now()}`
        // now we store all the pdf here
        const store=await vectorStore(docs,collectionName)

        // now we can do simialerity serch to find the relevernat documetn and found the 

        const relevernatDocs = await store.similaritySearch(state.prompt,5)

        //  now relevantDocs is the collectins of all the releveant data in the array
        // so we will bring all them togeterh in the one context
        // we will make it together and put the gap of 2 lines sp that it is easy to understsand

        const context = relevernatDocs.map(d=>d.pageContent).join('/n/n')
        
        const llm = await getModel("pdfRag")
        
        const messages = [

            new SystemMessage (`You are Unified-Ai PDF Assistant.

            Rules:
            Answer ONLY from the uploaded PDF.
            Never make up information.
            I
            If the answer is not present in the PDF, reply:
            "I couldn't find this information in the uploaded PDF."
            Use Markdown formatting.`
            ),

            new HumanMessage(`Context:${context} Question:${state.prompt}`)
        ]

        const response = await llm.invoke(messages)
        await deductCredits(state,state.userId,"pdf")
        return {
            ...state,
            aiResponse:response.content
        }
    } catch (error) {
        console.log("error from pdfRag",error)
        return {
            ...state,
            aiResponse:"Failed to analyze pdf"
        }
    }
    finally {
    if (state.file?.path) {
        try {
            await fs.unlink(state.file.path);
        } catch (err) {
            console.error(err);
        }
    }
}
}