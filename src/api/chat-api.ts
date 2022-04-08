let subscribers = [] as SubscriberType[]

let ws: WebSocket;

const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}
function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
}

export const chatApi = {
    subscribe(callback: SubscriberType){
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType){
        subscribers = subscribers.filter(s => s !== callback)
    }
}

//TYPES
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
type SubscriberType = (messages: ChatMessageType[]) => void