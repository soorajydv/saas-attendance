import sendPushNotification from "./pushNotification";

export const batchSendNotifications = async (
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>
) => {
    const chunkSize = 500; // Firebase limit per request
    for (let i = 0; i < tokens.length; i += chunkSize) {
        const chunk = tokens.slice(i, i + chunkSize);
        try {
            const response = await sendPushNotification(chunk, title, body, data);
            console.log(`Batch ${i / chunkSize + 1} processed:`, response);
        } catch (error) {
            console.error(`Error in batch ${i / chunkSize + 1}:`, error);
        }
    }
};
