<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <h2>Overview</h2>
        <p>Describe components and architecture here.</p>
        <p><img src="@/assets/component-diagram.jpg" alt="Component diagram" style="width: 100%"/></p>
        <p><img src="@/assets/authentication-sequence-diagram.png" alt="Component diagram" style="width: 100%"/></p>
        <h2>API</h2>
        <p>Describe API here.
          <code style="width: 100%">
    &lt;script&gt;
    var eid = ...;

    var authentication_cert = await eid.get_authentication_certificate();
    var authentication_token = await eid.sign_with_authentication_key(nonce_from_server);

    var signing_cert = await eid.get_signing_certificate();
    var signature = await eid.sign_with_signing_key(document_hash_from_server);

    &lt;/script&gt;
          </code>
        </p>
        <h2 class="mt-4">
          <v-chip>1</v-chip>
          Get authentication certificate
        </h2>
        <v-btn class="mt-3">Try it</v-btn>
        <p class="mt-3">Convert the hex-encoded certificate bytes from the line above to DER encoded certificate in Python 3 with:
          <code style="width: 100%">
    hex_encoded_cert_from_browser = '''... copy-paste bytes from line above ...'''
    with open('cert.der', 'wb') as cert_file:
        cert_file.write(bytes.fromhex(hex_encoded_cert_from_browser))
          </code>
        </p>
        <p>Verify and view the DER encoded certificate with:
          <code style="width: 100%">
    openssl x509 -in cert.der -inform der -text -noout
          </code>
        </p>
        <h2 class="mt-4">
          <v-chip>2</v-chip>
          Authenticate with server-sent challenge
        </h2>
        <v-btn>Try it</v-btn>
        <h2 class="mt-4">
          <v-chip>3</v-chip>
          Get signing certificate
        </h2>
        <v-btn>Try it</v-btn>
        <h2 class="mt-4">
          <v-chip>4</v-chip>
          Sign document hash
        </h2>
        <v-btn>Try it</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

