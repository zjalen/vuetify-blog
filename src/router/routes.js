const routes = [
    {name: '/',path: '/', component: () => import('../views/Articles')},
    {name: 'index',path: '/', component: () => import('../views/Articles')},
    {name: 'cate', path: '/cates/:cate', component: () => import('../views/Articles')},
    {name: 'topic', path: '/topics/:topic', component: () => import('../views/Articles')},
    {name: 'tag', path: '/tags/:tag', component: () => import('../views/Articles')},
    {name: 'article',path: '/cates/:cate/articles/:id', component: () => import('../views/Article')},
    // {name: 'about',path: '/about', component: resolve=>require(["./components/contents/About.vue"], resolve)},
    // {name: 'link',path: '/link', component: resolve=>require(["./components/contents/Link.vue"], resolve)}
    // {name: 'article', path: '/article/:id', component: ArticlePage},
];

export default routes;