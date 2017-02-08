import * as bcrypt from 'bcrypt'

const emailPattern = new RegExp(['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
    '[a-zA-Z]{2,}))$'].join(''))

export const emailValidator = (email: string): boolean => emailPattern.test(email)

export const emailAndPasswordValidator = (data: ILoginData): boolean =>
    (data.email && data.password && emailValidator(data.email) && data.password.length > 6)

export const passwordValidator = (password: string, hash: string) => bcrypt.compare(password, hash)
