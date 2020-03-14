/**
 * Mock Service Worker.
 * This Service Worker is meant for development usage only.
 * Make sure not to include it on production.
 */
self.addEventListener('install', event => {
  return self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('%c[MSW] Activated!', 'color:green;font-weight:bold;');
  return self.clients.claim();
});

const messageClient = (client, message) => {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = event => {
      if (event.data && event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(JSON.stringify(message), [channel.port2]);
  });
};

self.addEventListener('fetch', async event => {
  /**
   * @var request: Request;
   * @var req: Request;
   */
  const { clientId, request: req } = event;
  const getOriginalResponse = () => fetch(req);

  const shouldMockRequest = req.headers.get('x-mock-response');

  if (shouldMockRequest) {
    event.respondWith(
      new Promise(async resolve => {
        const client = await event.target.clients.get(clientId);

        if (!client) {
          return resolve(getOriginalResponse());
        }

        /**
         * Converts "Headers" to the plain Object to be stringified.
         * @todo See how this handles multipe headers with the same name.
         */
        const reqHeaders = {};
        req.headers.forEach((value, name) => {
          reqHeaders[name] = value;
        });

        /**
         * If the body cannot be resolved (either as JSON or to text/string),
         * the default value will be undefined.
         */
        const json = await req.json().catch(() => void 0);
        const text = await req.text().catch(() => void 0);

        const clientResponse = await messageClient(client, {
          url: req.url,
          method: req.method,
          headers: reqHeaders,
          cache: req.cache,
          mode: req.mode,
          credentials: req.credentials,
          redirect: req.redirect,
          referrer: req.referrer,
          referrerPolicy: req.referrerPolicy,
          body: json || text
        });

        var responseInit = {
          // status/statusText default to 200/OK, but we're explicitly setting them here.
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
            // Purely optional, but we return a custom response header indicating that this is a
            // mock response. The controlled page could check for this header if it wanted to.
            'X-Mock-Response': 'yes'
          }
        };

        if (clientResponse === null) {
          return resolve(getOriginalResponse());
        }

        setTimeout(resolve.bind(this, new Response(clientResponse, responseInit)), 1500);
      }).catch(error => {
        console.error('[MSW] Failed to mock a "%s" request to "%s": %s', req.method, req.url, error);
      })
    );
  }
});
