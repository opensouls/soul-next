export const SOUL_DEBUG = process.env.NEXT_PUBLIC_SOUL_ENGINE_DEV === 'true';
export const SOUL_LOCAL = process.env.NEXT_PUBLIC_SOUL_ENGINE_LOCAL === 'true'

export const envProps: any = {
    organization: process.env.NEXT_PUBLIC_SOUL_ENGINE_ORGANIZATION as string,
    token: SOUL_DEBUG ? process.env.NEXT_PUBLIC_SOUL_ENGINE_APIKEY : undefined,
    soulId: SOUL_DEBUG ? 'dev' : undefined,
    debug: SOUL_DEBUG,
    local: SOUL_LOCAL ? true : undefined,
}

export const samantha: any = {
    ...envProps,
    blueprint: 'samantha-learns',
}

export const souls = {
    samantha
}