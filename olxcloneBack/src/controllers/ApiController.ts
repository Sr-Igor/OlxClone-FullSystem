import {Response, Request} from 'express'

export const ping = (req: Request, res: Response) => {
    res.status(200)
    res.json({pong: true})
}