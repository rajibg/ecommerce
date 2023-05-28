import crypto from 'crypto'
import path from 'path';
import fs from 'fs'
export function getClientIp(req) {
    let ip = '';
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    return ip;
}

export function createEncryptToken() {
    const iv = Buffer.from('70d12978905c5d9febd71a46578e8254', 'hex');
    const key = Buffer.from('afc4231b21076b84ba9e706fc881368630efbadcdc78fbd69e29b8ef931c87c4', 'hex');
    const token = crypto.randomBytes(20).toString('hex')
    const encryptedToken = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv))
        .update(token, 'utf-8', 'hex').toString('hex')
    return {
        token,
        encryptedToken
    }
}
export function createDecryptToken(token) {
    const iv = Buffer.from('70d12978905c5d9febd71a46578e8254', 'hex');
    const key = Buffer.from('afc4231b21076b84ba9e706fc881368630efbadcdc78fbd69e29b8ef931c87c4', 'hex');
    let encryptedText = Buffer.from(token, 'hex');
    const decryptedToken = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv))
        .update(encryptedText, 'hex', 'utf-8')
        .toString('hex')
    return {
        token,
        decryptedToken
    }
}

export async function fileUpload(file, uploadPath) {
    if (!file || file.size <= 0) {
        return null;
    }
    try {
        const filename = crypto.randomBytes(10).toString('hex') + new Date().getTime() + path.extname(file.originalFilename)
        const fileUploadPath = path.resolve('public', uploadPath)
        if (!fs.existsSync(fileUploadPath)) {
            await fs.promises.mkdir(fileUploadPath, { recursive: true })
        }
        await fs.promises.copyFile(file.path, fileUploadPath + '/' + filename)
        return filename
    } catch (err) {
        throw err
    }
}