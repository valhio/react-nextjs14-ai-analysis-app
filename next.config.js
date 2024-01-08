/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {buildId , dev , isServer , defaultLoaders , webpack}) => { // This is needed so that the pdf's can be loaded in the browser without throwing an error
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    }
}

module.exports = nextConfig
