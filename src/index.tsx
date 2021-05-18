import * as React from 'react'
import { Helmet } from 'react-helmet'

interface RelayPaymentResult {
  txid: string;
  rawTx: string;
  amount: number;
  satoshis: number;
  currency: string;
  identity: string;
  paymail: string;
}

interface RelaySwipeProps {
  to?: string
  amount?: number
  currency?: string
  opReturn?: any[] | string
  outputs?: any[]
  onPayment?: (payment: RelayPaymentResult) => void
  onError?: () => void
  onLoad?: () => void
  editable?: boolean
  disabled?: boolean
  devMode?: boolean
}

interface RelaySendProps {
  to: string
  amount: number
  currency: string
  opReturn?: any[] | string
  outputs?: any[]
  editable?: boolean
  disabled?: boolean
  devMode?: boolean
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
    // @ts-ignore // SUPPRESS EL ISSUE
    RelayOne.render(this.el, this.props)
  }

  // @ts-ignore // SUPPRESS react ISSUE
  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children) {
      // @ts-ignore // SUPPRESS EL ISSUE
      RelayOne.render(this.el, this.props)
    }
  }

  render() {
    return (
      // @ts-ignore // SUPPRESS EL ISSUE
      <div ref={el => this.el = el}/>
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

    // @ts-ignore // SUPPRESS EL ISSUE
    static render(el, props) {
      // @ts-ignore // SUPPRESS relayone import
      relayone.render(el, props)
    }

    // @ts-ignore // SUPPRESS relayone import
    static isLinked = async (): Promise<boolean> => await relayone.isLinked();
    // @ts-ignore // SUPPRESS relayone import
    static getBalance = async (): Promise<string> => await relayone.getBalance();
    // @ts-ignore // SUPPRESS relayone import
    static send = async (options: RelaySendProps): Promise<RelaySendResult> => await relayone.send(options);
    // @ts-ignore // SUPPRESS relayone import
    static quote = async (options: RelaySendProps): Promise<RelayQuoteResult> => await relayone.quote(options);
    // @ts-ignore // SUPPRESS relayone import
    static sign = async (message: string): Promise<RelaySignResult> => await relayone.sign(message);
    // @ts-ignore // SUPPRESS relayone import
    static encrypt = async (message: string, paymail: string, encoding?: string): Promise<RelayEncryptResult> => await relayone.encrypt(message, paymail, encoding ?? undefined);
    // @ts-ignore // SUPPRESS relayone import
    static decrypt = async (message: string): Promise<RelayDecryptResult> => await relayone.decrypt(message);
    // @ts-ignore // SUPPRESS relayone import
    static authBeta = async (withGrant: boolean): Promise<string> => await relayone.authBeta(withGrant ?? undefined);
    // @ts-ignore // SUPPRESS relayone import
    static isLowFunds = async (e: Error): Promise<boolean> => await relayone.errors.isLowFunds(e);

}
