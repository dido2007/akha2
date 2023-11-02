/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3500',
            pathname: '/**', // Si vous voulez autoriser n'importe quel chemin sur ce serveur
          },
        ],
    },
}

module.exports = nextConfig
