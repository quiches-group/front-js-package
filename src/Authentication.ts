import axios from 'axios';

type RegisterParameters = { mail: string; password: string; firstname: string; lastname: string }
type LoginParameters = { mail: string; password: string }

class Authentication {
    private readonly hostname = 'https://sso.quiches.ovh/api/application-users';

    private readonly publicKey: string;

    private readonly localStorageKey = 'quiche-sso-login';

    constructor(publicKey: string) {
        this.publicKey = publicKey;
    }

    private injectPublicKey(url: string): string {
        return `${url}?publicKey=${this.publicKey}`;
    }

    login = async ({ mail, password }: LoginParameters): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: { mail, password },
            method: 'POST',
            url: this.injectPublicKey(`${this.hostname}/login`),
        };

        try {
            // @ts-ignore
            const result = await axios(config);
            const { token, refreshToken } = result.data.data;

            this.setToken(token, refreshToken);
        } catch (e) {
            throw new Error();
        }
    }

    register = async ({
        mail, password, firstname, lastname,
    }: RegisterParameters): Promise<void> => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                mail, password, firstname, lastname,
            },
            method: 'PUT',
            url: this.injectPublicKey(this.hostname),
        };

        try {
            // @ts-ignore
            await axios(config);
        } catch (e) {
            throw new Error();
        }
    }

    // user = async (): Promise<void> => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         method: 'PUT',
    //         url: this.injectPublicKey(this.hostname),
    //     };
    //
    //     try {
    //         // @ts-ignore
    //         await axios(config);
    //     } catch (e) {
    //         throw new Error();
    //     }
    // }

    private setToken = (token: string, refreshToken: string): void => {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem(this.localStorageKey, JSON.stringify({ token, refreshToken }));
    }

    getToken = (): string | null => {
        // eslint-disable-next-line no-undef
        const localStorageData = window.localStorage.getItem(this.localStorageKey);

        if (!localStorageData) {
            return null;
        }

        const parsedData = JSON.parse(localStorageData);

        return parsedData.token ?? null;
    }
}

export default Authentication;
