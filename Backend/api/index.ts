import server from '../src/index'

export default function handler(req: any, res: any) {
    server.emit('request', req, res);
}