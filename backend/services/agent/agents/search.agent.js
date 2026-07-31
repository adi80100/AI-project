import { searchTool } from "../config/tavily.js";

export const searchAgent = async (state) => {
    try {
        console.log("========== SEARCH AGENT ==========");
    console.log("Query:", state.prompt);
        const results = await searchTool.invoke({
            query: state.prompt,
        });

        console.log("Tavily Results:", results);

        return {
            ...state,
            searchResults: results,
            images: results.images || [],
        };
    } catch (error) {
        console.error(error);

        return {
            ...state,
            searchResults: null,
            images: [],
        };
    }
};