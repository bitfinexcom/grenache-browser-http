# grenache-browser-http

<img src="logo.png" width="15%" />

In Grenache, `grenache-nodejs-link` communicates with the DHT.

### Requirements

Install `Grenache Grape`: https://github.com/bitfinexcom/grenache-grape:

```bash
npm i -g grenache-grape
```

```
// Start 2 Grapes
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

### Class: Link

#### new Link(options)

 - `options` &lt;Object&gt; Options for the link
    - `grape` &lt;String&gt; Address of the Grenache Grape instance. Communication is done via WebSocket or HTTP.
    - `requestTimeout` &lt;Number&gt; Default timeout for requests to Grape,
    - `pingTimeout` &lt;Number&gt; Ping connection timeout to Grape (triggers reconnect attempt),
    - `lruMaxSizeLookup` &lt;Number&gt; Maximum size of the cache,
        checked by applying the length function to all values
        in the cache
    - `lruMaxAgeLookup` &lt;Number&gt; Maximum cache age in ms.

#### link.start()

Sets up a connection to the DHT. Emits a `connect` event on
successful connection.

#### link.stop()

Stops the connection to the DHT. Emits a `disconnect` event on
successful disconnection.

#### link.announce(name)

  - `name` &lt;String&gt; Name of the service, used to find the service
    from other peers

Used to announce a service, e.g. a [RPC Server](#class-peerrpcserver).

#### link.put(data, callback)

  - `data`
    - `v`: &lt;String&gt; value to store
  - `callback` &lt;function&gt;

Puts a value into the DHT.
[Example](https://github.com/bitfinexcom/grenache-nodejs-ws/tree/master/examples/put_get.js).

#### link.putMutable(data, opts, callback)

  - `data`
    - `v`: &lt;String&gt; value to store
    - `s`: &lt;Number&gt; sequence number
  - `opts`
    - `keys`: &lt;Object&gt; contains `ed25519-supercop` private and public key
      - `publicKey`: &lt;Buffer&gt; public key
      - `secretKey`: &lt;Buffer&gt; private key
  - `callback` &lt;function&gt;

Provides sugar for storing mutable, signed data in the DHT.

[Example raw put](https://github.com/bitfinexcom/grenache-nodejs-ws/tree/master/examples/put_get_mutable_raw.js)
<br/>
[Example with putMutable](https://github.com/bitfinexcom/grenache-nodejs-ws/tree/master/examples/put_get_mutable.js)

#### link.get(hash, callback)

  - `hash` &lt;String&gt; Hash used for lookup
  - `callback` &lt;function&gt;

Retrieves a stored value from the DHT via a `hash` &lt;String&gt;.
Callback returns `err` &lt;Object&gt; and data &lt;Object&gt;.
[Example](https://github.com/bitfinexcom/grenache-nodejs-ws/tree/master/examples/put_get.js).
