/**
 * Copyright (c) 2021, Ethan Elliott
 */

import { environment } from '@UpNext/environment';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class TokenService {
  private static readonly ALGORITHM = 'HS512';

  private static readonly EXPIRY = '24h';

  private static readonly ISSUER = environment.app.name;
  
  private readonly secretKey: string = environment.app.key;

  private readonly encryptionOptions: SignOptions = {
    algorithm: TokenService.ALGORITHM,
    expiresIn: TokenService.EXPIRY,
    issuer: TokenService.ISSUER
  };

  private readonly decryptionOptions: VerifyOptions = {
    algorithms: [ TokenService.ALGORITHM ],
    issuer: TokenService.ISSUER
  };

  public generate<T>(
    data: T, 
    expire: string = TokenService.EXPIRY
  ): string {
    return sign(
      data, 
      this.secretKey, 
      {
        ...this.encryptionOptions,
        expiresIn: expire
      } as SignOptions
    );
  }

  public verify<T>(jwt: string): T {
    try {
      return verify(
        jwt, 
        this.secretKey, 
        this.decryptionOptions
      );
    } catch (error_) {
      throw new Error(`Invalid token.\n${error_.name}\n${error_.message}`);
    }
  }
}
