import Authentication from './Authentication';

type QuicheStackReturn = { Authentication: Authentication };

const QuicheStack = (publicKey: string): QuicheStackReturn => ({
    Authentication: new Authentication(publicKey),
});

export default QuicheStack;

export {
    Authentication,
};
