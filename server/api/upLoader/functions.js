import fs from 'fs'
export function createDir(body) {
    let dir = `./static/upload/${body.dep}/${body.time}`
    if (!fs.existsSync(dir)) {
        console.log(dir + 'not find')
        fs.mkdirSync(dir, { recursive: true })
    } else {
        console.log(dir + 'already exist')
    }
    return dir
}
