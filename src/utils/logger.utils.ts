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

const echoLevel = (level: number): string => {
    switch (level) {
        case 30:
            return chalk.green(levels[level])
        case 50:
            return chalk.red(levels[level])
        default:
            return chalk.green(levels[level])
    }
}

const pretty = pino.pretty({
    formatter: (log: any) => {
        const pinoLog: IPinoLog = <any>log

        return `[${new Date(pinoLog.time).toISOString()}]  ${echoLevel(pinoLog.level)}  ${chalk.cyan(pinoLog.msg)}`
    }
})

pretty.pipe(process.stdout)

const loggerUtil = () => (pino({
    safe: false,
}, pretty))

export default loggerUtil
