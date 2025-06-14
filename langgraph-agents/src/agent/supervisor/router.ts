import { z } from "zod"
import { ChatOpenAI } from "@langchain/openai"
import { ALL_TOOL_DESCRIPTIONS } from "."
import { SupervisorState, SupervisorUpdate } from "./types"
import { formatMessages } from "../format-messages"

export async function router(state: SupervisorState): Promise<Partial<SupervisorUpdate>> {
    const routerDescription = `
     The route to take based on the user's input. 
     ${ALL_TOOL_DESCRIPTIONS}
     - chat: handles all other cases where the above tools do not apply
    `;

    const routerSchema = z.object({
        route: z
            .enum([
                "jobNotification",
                "search"
            ])
            .describe(routerDescription)
    })

    const routerTool = {
        name: "router",
        description: "A tool to route the user's query to the appropriate tool.",
        schema: routerSchema
    }

    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0.8,
        streaming: true
    })
        .bindTools([routerTool], { tool_choice: "router" })
        .withConfig({ tags: ["langsmith:nostream"] })

    const prompt = `You are a highly AI assistant, tasked with routing the user's query to the appropriate tool.
       You should analyse the user's input, and choose the appropriate tool to use.
    `

    const allMessagesButLast = state.messages.slice(0, 1)
    const lastMessage = state.messages.at(-1)

    const formattedPreviousMessages = formatMessages(allMessagesButLast)
    const formattedLastMessage = lastMessage ? formatMessages([lastMessage]) : ""

    const humanMessage = `Here is the full conversation, excluding the most recent message:

    ${formattedPreviousMessages}

    Here is the most recent message:

    ${formattedLastMessage}

    Please pick the proper route based on the most recent message, in the context of the entire conversation.
    `

    const response = await llm.invoke([
        { role: "system", content: prompt },
        { role: "user", content: humanMessage }
    ])

    const toolCall = response.tool_calls?.[0]?.args as
        | z.infer<typeof routerSchema> | undefined

    if (!toolCall) {
        throw new Error("No tool call found in response")
    }

    return {
        next: toolCall.route
    }
}