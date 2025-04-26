import admin from 'firebase-admin';

// Define the possible return types explicitly
interface PushSuccessSingle {
    target: string;
    status: 'success';
    response: string;
}

interface PushErrorSingle {
    target: string;
    status: 'error';
    errorCode: string;
    errorMessage: string;
}

interface PushSuccessMulti {
    token: string;
    status: 'success';
    response: string;
}

interface PushErrorMulti {
    token: string;
    status: 'error';
    errorCode: string;
    errorMessage: string;
}

// Union types for single and multi-token results
type PushNotificationSingleResult = PushSuccessSingle | PushErrorSingle;
type PushNotificationMultiResult = PushSuccessMulti | PushErrorMulti;
type PushNotificationResult = PushNotificationSingleResult | PushNotificationMultiResult[];

const sendPushNotification = async (
    target: string | string[], // FCM token(s) or topic
    title: string,
    body: string,
    data: Record<string, string> = {}, // Ensure data is always initialized as an object
    isTopic = false // Indicate if the target is a topic
): Promise<PushNotificationResult> => {
    // Add the current timestamp to the data
    const timestamp = new Date().toLocaleTimeString();
    data.timestamp = timestamp;

    if (Array.isArray(target)) {
        // Handle multiple tokens using a loop
        const responses: PushNotificationMultiResult[] = [];
        for (const token of target) {
            const message: admin.messaging.Message = {
                notification: { title, body: `${body}\n ${timestamp}` },
                data,
                token,
            };
            try {
                const response = await admin.messaging().send(message);
                responses.push({ token, status: 'success', response });
                console.log(`Notification sent to ${token}:`, response);
            } catch (error: any) {
                const errorCode = error.code || 'unknown';
                const errorMessage = error.message || 'Unknown error';
                responses.push({ token, status: 'error', errorCode, errorMessage });
                console.error(`Failed to send notification to ${token}:`, errorMessage);

                if (errorCode === 'messaging/registration-token-not-registered') {
                    console.warn(`Token ${token} is outdated or unregistered. Consider removing it.`);
                }
            }
        }
        return responses;
    } else {
        // Handle a single token or topic
        const message: admin.messaging.Message = {
            notification: { title, body },
            data,
            ...(isTopic ? { topic: target } : { token: target }),
        };

        try {
            const response = await admin.messaging().send(message);
            console.log('Single notification sent:', response);
            return { target, status: 'success', response };
        } catch (error: any) {
            const errorCode = error.code || 'unknown';
            const errorMessage = error.message || 'Unknown error';
            console.error(`Failed to send notification to ${target}:`, errorMessage);
            return { target, status: 'error', errorCode, errorMessage };
        }
    }
};

export default sendPushNotification;