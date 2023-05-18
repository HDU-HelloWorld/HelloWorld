import fs from 'fs'
export function createDir(body) {
    let dir = `./static/upload/${body.dep}/${body.time}`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    return dir
}
