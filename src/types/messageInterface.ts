export interface messageInterface{
    senderId?: string
    text?: string,
}

export interface conversationInterface {
    createdAt: string;
    message: string;
    recieverId: string;
    senderId: string;
    updatedAt: string;
    _id: string;
}