import { clickable, collection, fillable, text, selectable, isPresent } from 'ember-cli-page-object';

import fields from './form-field';

export default {
  ...fields,
  scope: '.config-pki-ca',
  text: text('[data-test-text]'),
  title: text('[data-test-title]'),

  hasTitle: isPresent('[data-test-title]'),
  hasError: isPresent('[data-test-error]'),
  hasSignIntermediateForm: isPresent('[data-test-sign-intermediate-form]'),

  replaceCA: clickable('[data-test-go-replace-ca]'),
  replaceCAText: text('[data-test-go-replace-ca]'),
  setSignedIntermediateBtn: clickable('[data-test-go-set-signed-intermediate]'),
  signIntermediateBtn: clickable('[data-test-go-sign-intermediate]'),
  caType: selectable('[data-test-input="caType"]'),
  submit: clickable('[data-test-submit]'),
  back: clickable('[data-test-back-button]'),

  signedIntermediate: fillable('[data-test-signed-intermediate]'),
  downloadLinks: collection('[data-test-ca-download-link]'),
  rows: collection('[data-test-table-row]'),
  rowValues: collection('[data-test-row-value]'),
  csr: text('[data-test-row-value="CSR"]', { normalize: false }),
  csrField: fillable('[data-test-input="csr"]'),
  certificate: text('[data-test-row-value="Certificate"]', { normalize: false }),
  commonNameIsPresent: isPresent('[data-test-row-value="Common name"]'),
  uploadCert: clickable('[data-test-input="uploadPemBundle"]'),
  enterCertAsText: clickable('[data-test-text-toggle]'),
  pemBundle: fillable('[data-test-text-file-textarea]'),
  commonName: fillable('[data-test-input="commonName"]'),
  toggleOptions: clickable('[data-test-toggle-group="Options"]'),
  keyType: fillable('[data-test-input="keyType"]'),
  keyBits: fillable('[data-test-input="keyBits"]'),

  issueDateIsPresent: text('[data-test-row-value="Issue date"]'),
  expiryDateIsPresent: text('[data-test-row-value="Expiration date"]'),

  async generateCA(commonName = 'PKI CA', type = 'root') {
    if (type === 'intermediate') {
      return await this.replaceCA().commonName(commonName).caType('intermediate').submit();
    }
    return await this.replaceCA().commonName(commonName).submit();
  },

  async generateCAKeyTypeEC(commonName = 'PKI CA EC') {
    return await this.replaceCA().commonName(commonName).toggleOptions().keyType('ec').keyBits(256).submit();
  },

  async uploadCA(pem) {
    return await this.replaceCA().uploadCert().enterCertAsText().pemBundle(pem).submit();
  },

  async signIntermediate(commonName) {
    return await this.signIntermediateBtn().commonName(commonName);
  },
};
