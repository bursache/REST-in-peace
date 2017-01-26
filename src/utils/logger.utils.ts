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

const levels = {
    default: 'USERLVL',
    60: 'FATAL',
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE'
}

const pretty = pino.pretty({
    formatter: (log) => {
        const pinoLog: IPinoLog = <any>log

        return `[${new Date(pinoLog.time).toISOString()}]  ${chalk.green(levels[pinoLog.level])}  ${chalk.cyan(pinoLog.msg)}`
    }
})

pretty.pipe(process.stdout)

 const logger = pino({
    safe: false,
}, pretty)

export default logger
