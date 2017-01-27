import * as pino from 'pino'
import * as chalk from 'chalk'

interface IPinoLog {
    pid: number
    hostname: string
    level: number
    time: string
    msg: string
    v: number
    method: string
    url: string
    statusCode: number
    duration: number
}

const levels = {
    default: 'USERLVL',
    60: 'FATAL',
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE',
    5: 'REQUEST'
}

const echoLevel = (level: number): string => {
    switch (level) {
        case 5:
            return chalk.yellow(levels[level])
        case 30:
            return chalk.green(levels[level])
        case 50:
            return chalk.red(levels[level])
        default:
            return chalk.green(levels[level])
    }
}

const echoStatus = (status: number): string => {
    switch (true) {
        case status >= 500:
            return chalk.red(status.toString())
        case status >= 400:
            return chalk.yellow(status.toString())
        case status >= 300:
            return chalk.gray(status.toString())
        case status >= 200:
            return chalk.green(status.toString())
        default:
            return chalk.green(status.toString())
    }
}

const pretty = pino.pretty({
    formatter: (log: any) => {
        const pinoLog: IPinoLog = <any>log
        if (pinoLog.level === 5) {
            return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)} ` +
                `${pinoLog.method} ${pinoLog.url} - Status: ${echoStatus(pinoLog.statusCode)} in ${pinoLog.duration}ms`
        }

        return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)}  ${chalk.cyan(pinoLog.msg)}`
    }
})

pretty.pipe(process.stdout)

const loggerUtil = () => (pino({
    safe: false,
    level: 'request',
    levelVal: 5
}, pretty))

export default loggerUtil
