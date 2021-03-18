import { Router, Request } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import { root } from '../../../config/paths'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/path/:id', async(req: Request, res: any) => {
    const { id } = req.params

    // service
    const service = (() => {
        const getPath = async(id: string) => {
            const data = fs.readFileSync(path.join(root, '../data/files.json'), 'utf-8')
            let queryString = ''
        
            switch(id) {
                case '0': 
                    queryString = 'queryRoot'
                    break
            default:
                    queryString = `query${id}`
                    break
            }
            return await new Promise(res => setTimeout(res, 1000, (JSON.parse(data)[`${queryString}`])))
        };
        return {
            getPath
        }
    })()
    //
    const result = await service.getPath(id)

    res.json(result)
})

export default router