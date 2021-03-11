import axios from 'axios';

class Authentication {
    private readonly hostname = 'https://sso.quiches.ovh/api/application-users';

    private readonly publicKey: string;

    constructor(publicKey: string) {
        this.publicKey = publicKey;
    }

    private injectPublicKey(url: string): string {
        return `${url}?=publicKey=${this.publicKey}`;
    }

    login = async ({ mail, password }: { mail: string; password: string }): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { mail, password },
            method: 'POST',
            url: this.injectPublicKey(`${this.hostname}/login`),
        };

        // @ts-ignore
        const result = await axios(config);
    }
}

export default Authentication;
