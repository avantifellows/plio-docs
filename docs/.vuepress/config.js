module.exports = {
    lang: 'en-US',
    title: 'Plio',
    head: [['link', { rel: 'icon', href: 'https://plio-assets.s3.ap-south-1.amazonaws.com/images/logo.svg' }]],

    themeConfig: {
        logo: 'https://plio-assets.s3.ap-south-1.amazonaws.com/images/logo.svg',
        sidebar: [
        '/',
        '/getting-started/',
        '/guide/',
        '/plio-for-teams/',
        '/whats-new/',
        ]
    },
    extendsMarkdown: (md) => {
        // use more markdown-it plugins!
        md.use(require('markdown-it-include'))
    }
}