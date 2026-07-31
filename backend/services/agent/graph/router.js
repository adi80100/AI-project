const searchKeywords = [
    "search", "news", "latest", "today", "current", "web", "internet", "weather", "stock", "youtube", "github", "time", "clock", "date"
]

export const router = async (state) => {
    if (state?.agent && state.agent !== "auto") {
        return {
            ...state,
            agent: state.agent
        }
    }

    const prompt = (state?.prompt || "").toLowerCase()
    const shouldRouteToSearch = searchKeywords.some((keyword) => prompt.includes(keyword))
       console.log("========== ROUTER ==========");
    console.log("Prompt:", state.prompt);
    console.log("Selected Agent:", agent);

    return {
        ...state,
        agent: shouldRouteToSearch ? "search" : "chat"
    }
}
