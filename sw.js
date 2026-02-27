const CACHE_NAME = 'star-studio-v5';
const BASE_PATH = '/Star';
const ASSETS = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/manifest.json`,
    `${BASE_PATH}/Icon.png`,
    `${BASE_PATH}/logo.png`,
    `${BASE_PATH}/styles.css`,
    `${BASE_PATH}/pwa-styles.css`,
    `${BASE_PATH}/image-optimization.css`,
    `${BASE_PATH}/image/agenda.jpg`,
    `${BASE_PATH}/image/adicionar-serviços.jpg`,
    `${BASE_PATH}/image/historico.jpg`,
    `${BASE_PATH}/image/serviços.jpg`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
];

// Instala o Service Worker e armazena os arquivos em cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                // Adiciona os arquivos ao cache individualmente para melhor tratamento de erros
                return Promise.all(
                    ASSETS.map(url => {
                        return cache.add(url).catch(err => {
                            console.warn(`Não foi possível armazenar ${url} no cache:`, err);
                        });
                    })
                );
            })
            .then(() => self.skipWaiting())
            .catch(err => {
                console.error('Falha ao instalar o Service Worker:', err);
            })
    );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker ativado e pronto para controlar os clientes');
            return self.clients.claim();
        })
    );
});

// Intercepta as requisições
self.addEventListener('fetch', (event) => {
    // Ignora requisições que não são GET
    if (event.request.method !== 'GET') return;

    // Ignora requisições de terceiros
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then((response) => {
                // Retorna o recurso do cache se disponível
                if (response) {
                    return response;
                }

                // Se não estiver no cache, busca na rede
                return fetch(event.request)
                    .then((response) => {
                        // Verifica se recebemos uma resposta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clona a resposta para armazenar em cache
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('Fetch falhou; retornando página offline.', error);
                        // Se for uma navegação, retorna a página inicial
                        if (event.request.mode === 'navigate') {
                            return caches.match(`${BASE_PATH}/index.html`);
                        }
                        return new Response('Erro de conexão. Você está offline.', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' },
                        });
                    });
            })
    );
});

// Lida com notificações push
self.addEventListener('push', (event) => {
    const title = 'Star Studio Car';
    const options = {
        body: event.data.text(),
        icon: '/Star/Icon.png',
        badge: '/Star/Icon.png',
        vibrate: [100, 50, 100],
        data: { primaryKey: 1 }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
