import Authentication from './Authentication';

type QuicheStackReturn = { auth: Authentication };

const QuicheStack = (publicKey: string): QuicheStackReturn => ({
    auth: new Authentication(publicKey),
});

export default QuicheStack;

export { Authentication };
