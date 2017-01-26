import * as express from 'express'
import * as pino from 'pino'
import * as chalk from 'chalk'

interface IPinoLog {
    pid: number
    hostname: string
    level: number
    time: string
    msg: string
    v: number
}

const serverPort = 5050
const pretty = pino.pretty({
    formatter: (log: any) => {
        const pinoLog: IPinoLog = <any>log
        const levels = {
            default: 'USERLVL',
            60: 'FATAL',
            50: 'ERROR',
            40: 'WARN',
            30: 'INFO',
            20: 'DEBUG',
            10: 'TRACE'
        }
        return `[${new Date(pinoLog.time).toISOString()}]  ${chalk.green(levels[pinoLog.level])}  ${chalk.cyan(pinoLog.msg)}`
    }
})
pretty.pipe(process.stdout)
const pinoInstance = pino({
    safe: false,
}, pretty)

let server = express()

server.listen(serverPort, () => pinoInstance.info(`Server is running on port ${serverPort}...`))
