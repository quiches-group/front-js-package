import axios from 'axios';
import IndexedDBService from '../tools/IndexedDBService';

type RegisterParameters = { mail: string; password: string; firstname: string; lastname: string }
type LoginParameters = { mail: string; password: string }

class Authentication {
    private readonly hostname = 'https://sso.quiches.ovh/api/application-users';

    private readonly publicKey: string;

    private readonly indexedDBService = IndexedDBService;

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

            await this.setToken(token, refreshToken);
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

    private setToken = (token: string, refreshToken: string): Promise<void> =>
        this.indexedDBService.addToken({ token, refreshToken })

    getToken = async (): Promise<string> => {
        try {
            const { token } = await this.indexedDBService.getToken();

            return token;
        } catch {
            throw new Error();
        }
    }
}

export default Authentication;
