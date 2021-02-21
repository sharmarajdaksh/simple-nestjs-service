import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';

const baseGenerateJWT = (
  payload: any,
  privateKey: string | Buffer,
  signOptions: SignOptions,
) => {
  return sign(payload, privateKey, signOptions);
};

interface generateJWTArguments {
  payload: any;
  privateKey: string | Buffer;
  expirySeconds: string | number;
  subject?: string;
  issuer?: string;
  audience?: string;
}

export const generateJWT = ({
  payload,
  privateKey,
  expirySeconds,
  subject,
  issuer,
  audience,
}: generateJWTArguments) => {
  const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: expirySeconds,
  };

  if (issuer) {
    signOptions.issuer = issuer;
  }

  if (audience) {
    signOptions.audience = audience;
  }

  if (subject) {
    signOptions.subject = subject;
  }

  return baseGenerateJWT(payload, privateKey, signOptions);
};

const baseVerifyJWT = (
  jwt: string,
  publicKey: string | Buffer,
  verifyOptions: VerifyOptions,
) => {
  verify(jwt, publicKey, verifyOptions);
};

interface verifyJWTArgs {
  jwt: string;
  publicKey: string | Buffer;
  subject?: string;
  issuer?: string;
  audience?: string;
}

export const verifyJWT = ({
  jwt,
  publicKey,
  subject,
  issuer,
  audience,
}: verifyJWTArgs): any => {
  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  if (audience) {
    verifyOptions.audience = audience;
  }

  if (issuer) {
    verifyOptions.issuer = issuer;
  }

  if (subject) {
    verifyOptions.subject = subject;
  }

  return baseVerifyJWT(jwt, publicKey, verifyOptions);
};
