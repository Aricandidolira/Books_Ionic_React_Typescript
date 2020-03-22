class Config {
    readonly baseUrl = 'https://api.backendless.com'

    readonly appId = '8BB8A220-5E77-4489-FFD7-B5E981B0DE00'

    readonly appSecret = '283A9050-4D06-4FF2-9CB5-8A19DF95BD5A'

    dataUrl = (forEntity: string) => {
        return [
            this.baseUrl, this.appId, this.appSecret,
            'data', forEntity
        ].join('/')
    }
}

export const ServiceConfig = new Config()