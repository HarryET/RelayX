import * as React from 'react'
import { Helmet } from 'react-helmet'

interface RelaySwipeProps {
  to: string
  amount: number
  currency: string
  opReturn: any[] | string
  outputs: any[]
  onPayment: () => void
  onError: () => void
  onLoad: () => void
  editable: boolean
  disabled: boolean
  devMode: boolean
}

interface RelaySendProps {
  to: string
  amount: number
  currency: string
  opReturn: any[] | string
  outputs: any[]
  editable: boolean
  disabled: boolean
  devMode: boolean
}

interface RelaySendResult {
  txid: string;
  rawTx: string;
  amount: number; // amount spent in button currency
  currency: string; // button currency
  satoshis: number; // amount spent in sats
  paymail: string; // user paymail deprecated
  identity: string; // user pki deprecated
}

interface RelaySignResult {
  algorithm: string;
  key: string;
  data: string; // data you passed in
  value: string; // signature
}

interface RelayQuoteResult {
  estimateSatoshis: number;
  estimate: number;
}

interface RelayEncryptResult {
  algorithm: "electrum-ecies";
  key: "identity";
  value: string; // hex encoded encrypted data
  publicKey: string; // pki
  paymail: string; // paymail you passed
}

interface RelayDecryptResult {
  algorithm: "electrum-ecies";
  key: "identity";
  data: string; // message you passed
  value: string; // decrypted data
  publicKey: string; // pki
}

export class RelaySwipe extends React.Component<RelaySwipeProps, any> {
  componentDidMount() {
    RelayOne.render(this.el, this.props)
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children) {
      RelayOne.render(this.el, this.props)
    }
  }

  render() {
    return (
      <div ref={el => this.el = el}></div>
    );
  }
}

export class RelayOne {

    static head() {
      return (
        <Helmet>
          <script src="https://one.relayx.io/relayone.js" />
        </Helmet>
      );
    }

    static render(el, props) {
      relayone.render(el, props)
    }

    static isLinked = (): boolean => await relayone.isLinked();
    static getBalance = (): string => await relayone.getBalance();
    static send = (options: RelaySendProps): RelaySendResult => await relayone.send(options);
    static quote = (options: RelaySendProps): RelayQuoteResult => await relayone.quote(options);
    static sign = (message: string): RelaySignResult => await relayone.sign(message);
    static encrypt = (message: string, paymail: string, encoding?: string): RelayEncryptResult => await relayone.encrypt(message, paymail, encoding ?? undefined);
    static decrypt = (message: string): RelayDecryptResult => await relayone.decrypt(message);
    static authBeta = (withGrant: boolean): string => await relayone.authBeta(withGrant ?? undefined);
    static isLowFunds = (e: Error): boolean => await relayone.errors.isLowFunds(e);

}
