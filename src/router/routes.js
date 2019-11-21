const routes = [
    {name: '/',path: '/', component: () => import('../views/Articles')},
    {name: 'index',path: '/page/:page', component: () => import('../views/Articles')},
    // {name: 'cate', path: '/cate/:cate/page/:page', component: ArticleList},
    // {name: 'topic', path: '/topic/:topic/page/:page', component: ArticleList},
    // {name: 'tag', path: '/tag/:tag/page/:page', component: ArticleList},
    // {name: 'article',path: '/cate/:cate/article/:id', component: resolve=>require(["./components/contents/Article.vue"], resolve)},
    // {name: 'about',path: '/about', component: resolve=>require(["./components/contents/About.vue"], resolve)},
    // {name: 'link',path: '/link', component: resolve=>require(["./components/contents/Link.vue"], resolve)}
    // {name: 'article', path: '/article/:id', component: ArticlePage},
];

export default routes;