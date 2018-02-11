<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <h2>Overview</h2>
        <p>Describe components and architecture here.</p>
        <p><img src="@/assets/component-diagram.jpg" alt="Component diagram" style="width: 100%"/></p>
        <h2>API</h2>
        <p>Describe API here.</p>
        <code style="width: 100%">
    &lt;script&gt;
      var eid = ...;

      var authentication_cert = eid.get_authentication_certificate();
      var authentication_token = eid.sign_with_authentication_key(nonce_from_server);

      var signing_cert = eid.get_signing_certificate();
      var signature = eid.sign_with_signing_key(document_hash_from_server);

    &lt;/script&gt;
        </code>
        <h2 class="mt-4">
          <v-chip>1</v-chip>
          Get authentication certificate
        </h2>
        <v-btn>Try it</v-btn>
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

