const CACHE_NAME = 'star-studio-v3';
const ASSETS = [
    '/',
    '/index.html',
    '/outro/index.html',
    '/manifest.json',
    '/logo.png',
    '/Icon.png',
    '/styles.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
];

// Instala o Service Worker e armazena os arquivos em cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
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

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna o recurso do cache se disponível
                if (response) {
                    return response;
                }

                // Se não estiver no cache, busca na rede e armazena em cache
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
                    .catch(() => {
                        // Se a rede falhar, tenta retornar a página inicial
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Lida com notificações push
self.addEventListener('push', (event) => {
    const title = 'Star Studio Car';
    const options = {
        body: event.data.text(),
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [100, 50, 100],
        data: { primaryKey: 1 }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
