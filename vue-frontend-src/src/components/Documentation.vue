<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <h2>Overview</h2>
        <p>Describe components and architecture here.</p>
        <p><img src="@/assets/component-diagram.jpg" alt="Component diagram" style="width: 100%"/></p>
        <p><img src="@/assets/authentication-sequence-diagram.png" alt="Component diagram" style="width: 100%"/></p>
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
          <li>If the certificate is valid, server sends the authentication challenge (an UUID) to the browser</li>
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
        <p class="mt-3"><b>Output: </b><code>...</code></p>
        <p>Convert the hex-encoded certificate bytes from the line above to DER encoded certificate:
          <code style="width: 100%">
    echo '&uparrow; copy-paste hex-encoded certificate from line above &uparrow;' | xxd -r -p > cert.der
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
        <p class="mt-3"><b>Output: </b><code>...</code></p>
        <p>Convert the hex-encoded signature bytes from the line above to binary file:
          <code style="width: 100%">
    echo '&uparrow; copy-paste hex-encoded signature from line above &uparrow;' | xxd -r -p > sigfile
          </code>
        </p>
        <p>Decrypt the signature and send the output to file <code>challenge.rsautl-decrypted</code>:
          <code style="width: 100%">
    openssl rsautl -verify -in sigfile -pkcs -inkey pubkey.pem -pubin > challenge.rsautl-decrypted
          </code>
        </p>
        <p>Save the challenge to file <code>challenge</code> and verify that the challenge file and decrypted file are identical:
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
        <p>TODO: Like <v-chip small outline>1</v-chip> above</p>
        <h3 class="mt-4">
          <v-chip small>4</v-chip>
          Sign document hash
        </h3>
        <v-btn>Try it</v-btn>
        <p class="mt-3"><b>Output: </b><code>...</code></p>
        <p>TODO: Like <v-chip small outline>2</v-chip> above, but describe how to prefix ASN.1 OID as needed during signature verification:
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

