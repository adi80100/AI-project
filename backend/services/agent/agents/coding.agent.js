import { getModel } from "../config/llmmodels.js";

export const codingAgent = async (state) => {
  const intentLLM = await getModel("intent");
  const llm = await getModel("coding");
  const intentRes = await intentLLM.invoke(`

            You are an intent classifier.
            Return ONLY one of these values.
            CODE_GENERATION, 
            CODE_REVIEW
            CODE_EXPLANATION
            DEBUGGING
            OPTIMIZATION
            CONVERSION
            DOCUMENTATION
            User Request:${state.prompt}`);

  const intent = intentRes.content.trim();
  // console.log(intent)

//   this is all for code generation
    if (intent == "CODE_GENERATION") {
        const prompt = `
                You are Unified Ai-workspace Coding Agent.

                Generate the requested project.

                Default stack:
                    -HTML
                    -CSS
                    -JavaScript

                    Use React / Next.js / Vue ONLY if explicitly requested.
        Rules:
            -Responsive
            -Modern UI
            -CSS Variables
            -Flexbox/Grid
            -Smooth Scroll
            -Hover Effects
            -Beautiful spacing
            -Single page unless user asks otherwise.
            - Use real image URLs from Unsplash.
            - Do NOT use placeholder images.
            - Do NOT invent image URLs.
            - If a suitable image URL cannot be generated, leave the image src empty ("").


            Return ONLY valid JSON.

            Schema:
                    {
                    "files":[
                        {
                            "name":"index.html", 
                            "content":"..."
                        },
                        {
                            "name":"style.css",
                            "content":"..."
                        },
                        {
                            "name":"script.js",
                            "content":"..."
                        }
                    ]
                    }
                Rules:
                    -Output must start with {
                    -Output must end with }
                    -No markdown
                    -No explanation
                    -No extra text
                    -No
                    -Never mention intent

                    User Request:${state.prompt}`

        
        const res = await llm.invoke(prompt)
console.log("========== RAW MODEL RESPONSE ==========");
console.log(res.content);
console.log("========================================");const cleaned = res.content
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/, "")
  .trim();
     
console.log(cleaned);

const data = JSON.parse(cleaned);        
        // console.log(JSON.parse(res.content))

        return{
            ...state,
            aiResponse:"Code generated Successfully",
            artifacts:[
                {
                    id:Date.now(),
                    type:"Project",
                    files:data.files||[],
                    title:state.prompt
                    
                }
            ]

        }
    }

    // 
    const res = await llm.invoke(`
        The users Reques is 
        ${intent}
        Return Markdown only.
        Never generate project fil
        Use headings like:
        # Overview
        ## Explanation
        ## Problems
        ## Improvements
        ## Best Practices
        ## Optimized Code (if needed)

        User Request:${state.prompt}`)

        const data = res.content
        return{
            ...state,
            aiResponse:data,
            artifacts:[]
        }
};
