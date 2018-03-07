<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <h2>Overview</h2>

        <p>Describe components and architecture here.</p>
        <p class="mb-1 white">
          <img class="diagram-align" src="@/assets/component-diagram.jpg" alt="Component diagram"
               :style="{ width:  zoom + '%' }" @click="toggleZoom"/>
          <img class="diagram-align" src="@/assets/authentication-sequence-diagram.png" alt="Authentication sequence diagram"
               :style="{ width:  zoom + '%' }" @click="toggleZoom"/>
        </p>
        <p class="caption">(Click to toggle zoom)</p>

        <h2>API and usage</h2>

        <p>Describe API here, including how to select the parameters (hash algorithm, UI language).
          <code style="width: 100%">
    &lt;script&gt;
      try {
        var eid = ... initialize the eID object, pass hash algorithm and UI language ...;

        var authentication_cert = await eid.get_authentication_certificate();
        var authentication_token = await eid.sign_with_authentication_key(authentication_challenge_from_server);

        var signing_cert = await eid.get_signing_certificate();
        var signature = await eid.sign_with_signing_key(document_hash_from_server);

      } catch (error) {
        alert("eID error: " + error);
      }
    &lt;/script&gt;
          </code>
        </p>

        <h2>Authentication</h2>

        <p class="mt-2">Authentication sequence:</p>
        <ol class="ml-4">
          <li>Browser initializes the eID object</li>
          <li>Browser gets the authentication certficate from the eID object</li>
          <li>Browser sends the authentication certificate to the server</li>
          <li>Server verifies the validity of the certificate with OCSP</li>
          <li>If the certificate is valid, server sends the authentication challenge (an UUID/nonce) to the browser</li>
          <li>Browser asks the eID object to sign the authentication challenge with the authentication private key</li>
          <li>eID object returns the signature to the browser</li>
          <li>Browser sends the signature to the server</li>
          <li>Server verifies the signature using the public key from the authentication certificate</li>
          <li>If signature verification succeeds, the user is authenticated</li>
        </ol>

        <h3 class="mt-4">
          <v-chip small>1</v-chip>
          Get authentication certificate
        </h3>
        <v-btn class="mt-3">Try it</v-btn>
        <p class="mt-3"><b>Output: </b>
          <span v-if="authenticationCertificate">
            <code style="width: 100%; overflow-wrap: break-word">{{authenticationCertificate}}</code>
          </span>
          <span v-else>
            <code>...</code>
            <v-chip
              small text-color="grey" color="grey lighten-3"
              @click="fillAuthenticationCertficate">Click to fill example value</v-chip>
          </span>
        </p>
        <p>Convert the hex-encoded certificate bytes from the output above to DER encoded certificate:
          <code style="width: 100%">
    echo '&uparrow; copy-paste hex-encoded certificate from output above &uparrow;' | xxd -r -p > cert.der
          </code>
        </p>
        <p>Verify and view the certificate:
          <code style="width: 100%">
    openssl x509 -in cert.der -inform der -text -noout
          </code>
        </p>
        <p>Extract the public key from the certificate:
          <code style="width: 100%">
    openssl x509 -in cert.der -inform der -pubkey -noout > pubkey.pem
          </code>
        </p>

        <h3 class="mt-4">
          <v-chip small>2</v-chip>
          Authenticate with challenge
        </h3>
        <v-btn class="mt-3">Try it</v-btn>
        <div class="mt-3"><v-text-field
          class="mb-0"
          :disabled=authenticationChallengeDisabled
          :label=authenticationChallengeLabel
          :value=authenticationChallengeValue
        ></v-text-field></div>
        <p><b>Output: </b>
          <span v-if="authenticationSignature">
            <code style="width: 100%; overflow-wrap: break-word">{{authenticationSignature}}</code>
          </span>
          <span v-else>
            <code>...</code>
            <v-chip
              small text-color="grey" color="grey lighten-3"
              @click="fillAuthenticationSignature">Click to fill example value</v-chip>
          </span>
        </p>
        <p>Convert the hex-encoded authentication signature bytes from the output above to binary file:
          <code style="width: 100%">
    echo '&uparrow; copy-paste hex-encoded signature from output above &uparrow;' | xxd -r -p > sigfile
          </code>
        </p>
        <p>Decrypt the signature and send the output to file <code>challenge.rsautl-decrypted</code>:
          <code style="width: 100%">
    openssl rsautl -verify -in sigfile -pkcs -inkey pubkey.pem -pubin > challenge.rsautl-decrypted
          </code>
        </p>
        <p>Save the challenge to file <code>challenge</code> (if the bytes are hex-encoded, then decode with <code>xxd</code>)
          and verify that the challenge file and decrypted file are identical:
          <code style="width: 100%">
    diff --report-identical-files challenge challenge.rsautl-decrypted
          </code>
        </p>
        <p>If the files are identical, the user identity is verified.</p>

        <h2 class="mt-4">Signing</h2>

        <h3 class="mt-4">
          <v-chip small>3</v-chip>
          Get signing certificate
        </h3>
        <v-btn>Try it</v-btn>
        <p class="mt-3"><b>Output: </b><code>...</code></p>
        <p>TODO: Like
          <v-chip small outline>1</v-chip>
          above
        </p>

        <h3 class="mt-4">
          <v-chip small>4</v-chip>
          Sign document hash
        </h3>
        <v-btn>Try it</v-btn>
        <p class="mt-3"><b>Output: </b><code>...</code></p>
        <p>TODO: Like
          <v-chip small outline>2</v-chip>
          above, but describe how to prefix ASN.1 OID as needed during signature verification:
          <code style="width: 100%">
    sha1_asn1_prefix_hex = '3021300906052b0e03021a05000414'
    document_hash_hex = '...'
    echo "${sha1_asn1_prefix_hex}${document_hash_hex}" | xxd -r -p > data_to_sign
          </code>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        zoom: 49,
        authenticationCertificate: null,
        authenticationSignature: null,
        authenticationChallengeDisabled: false,
        authenticationChallengeLabel: 'Authentication challenge',
        authenticationChallengeValue: 'Hello, eID!',
        signingCertificate: null,
        signingSignature: null
      }
    },
    methods: {
      toggleZoom () {
        this.zoom = this.zoom === 49 ? 100 : 49
      },
      fillAuthenticationCertficate () {
        this.authenticationCertificate = '308204f4308203dca00302010202044d359fb9300d06092a864886f70d0101050500305f310b300906035504061302454531223020060355040a1319415320536572746966697473656572696d69736b65736b7573311a3018060355040b131154657374736572746966696b61616469643110300e06035504031307544553542d534b301e170d3131303131383134313230395a170d3132303430373131343231375a3081c0310b300906035504061302454531143012060355040a130b544553542d45535445494431173015060355040b130e61757468656e7469636174696f6e3141303f06035504031e38004d00c4004e004e0049004b002c004d004100520049002d004c004900490053002c003300370031003000310030003100300030003300333115301306035504041e0c004d00c4004e004e0049004b31123010060355042a13094d4152492d4c494953311430120603550405130b333731303130313030333330820122300d06092a864886f70d01010105000382010f003082010a028201008d48e33e80b0ac1b2008e95dac0a7b778a9286eddb7085a07cd0fab69e09e818ae27efe25a9f228d16ca5fed6619de39f33fc9fc15cb6ec21d0f8d7c89848ad618b72a654efd9da016d9eee25c4c9cb6d72d56fe83234e62698e3f1c3fbabdb0056c3e273bfd5f9ce44b25cce08f105827f1c06c409cbf864178285bef17bd0f774425801f5dd2b3b5aa788a47b54b93db35df494b70aa47ac4f6e3eff3bf28b49ab3819d8ea48713942b76a96bea3b9d5356631067b0367749c04863d1727270cfc656d75eab0b417e0cbb54347d15487a0614cd89efb1fcead483b1f0c18a921c8ac3bb11411e8e5e4aec6f56b70224d18380105df41dc6a3f28dbc4ed16dd02047bb8fde3a382015430820150300e0603551d0f0101ff040403020490301d0603551d250416301406082b0601050507030206082b0601050507030430330603551d1f042c302a3028a026a0248622687474703a2f2f7777772e736b2e65652f63726c732f746573742f63726c2e63726c30260603551d11041f301d811b6d6172692d6c6969732e6d616e6e696b2e374065657374692e6565305d0603551d20045630543052060b2b06010401ce1f030101013043301e06082b0601050507020230121a1054657374736572746966696b6161742e302106082b060105050702011615687474703a2f2f7777772e736b2e65652f6370732f301806082b06010505070103040c300a3008060604008e460101301f0603551d23041830168014020527dda87287b782c05b392a7fe338f2fa5209301d0603551d0e04160414b4a9a669cdea056c4de78f31183e2cb0eae4514e30090603551d1304023000300d06092a864886f70d010105050003820101004bbdd3e9e7718d7b84afa95026b4966e8d66f6a5f9cd5b7749c32d88f84080b8707e000826985713687172b39a0bea4b85636636d29aead705d6d1d802b243bdfa2f316b2c3319cc502e2f025101091f23200fbc611f3d5ac3a6a96adf9eaf20816e0d0e596bf4f1bfd7c77097b4c3a9677070f89c1126e12f806f2d21ed8528c3800ba9dfa04b0300604ede8ddf8251473c11e173284fb30568500f2abd6f786b902aaf138228f5ad690a3872176bdcd43e9656c87adb9586689c0c534b52b0804844735133b0362c188a42b1f80966fa1d8c46cc1fe60efd0fede684059867e832b1da4f40bfc6248e72ae797935f9f3473dc7afa6a0b8fc1316e81460d578'
      },
      fillAuthenticationSignature () {
        this.authenticationChallengeLabel += ' (hex-encoded bytes)'
        this.authenticationChallengeValue = '1234567890123456789012345678901234567890'
        this.authenticationChallengeDisabled = true
        this.authenticationSignature = '06171fc41aa174a4a8c69204c290614b9227c8af282defe7212f20f1ca35c8e03559760d4f9bdbb5a8eeb7c4fbba9b7cb599c75362e691d33617d061fb9ab2239dd789f83e8d894ba6866317dbbc9f84ef8342002fdf2204c8c60005ef0106d06cff8bd3dd677ebbcb79a75bde0026a91e72bdabf13703faadf2c8b7e17647ae59a5394860e10c0771eaad44cf68adeb6e0b05190be2c9cec8195fba2e54d029ff82f588aef0193e425fe6d58ba35f326cde8b30f7e6c9f3fcbbab8442e4cbde17ee6dcb742c034395b5917bf92ec1602334521ad1a73e650720db8a60229c20162d374f5e34e37f7fca07eba46d354bc385e8d08a3a831836e18a7468a2b71e'
      }
    }
  }
</script>

<style scoped>
  .diagram-align {
    vertical-align: middle
  }
</style>
