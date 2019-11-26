import Mock from 'mockjs'

const List = []
const count = 202

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // id: '@increment',
    // timestamp: +Mock.Random.date('T'),
    // author: '@first',
    // reviewer: '@first',
    // title: '@title(5, 10)',
    // content_short: 'mock data',
    content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft', 'deleted'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform'],

    category: {id: 5, name: "系统相关"},
    category_id: 5,
    cover: image_uri,
    created_at: '@datetime',
    description: '@title(10,120)',
    id: '@increment',
    is_top: true,
    title: '@title(5, 10)',
    topic: {id: 3, name: "Vuetify 入门教程"},
    topic_id: 3,
    tags: ['前端', 'vue', 'js']
  }))
}

const Menus = [
  {
      id: 0,
      name: '首页',
      url: '',
      children: [],
  },
  {
    id: 1,
    name: '前端',
    url: '',
    children: [],
  },
  {
    id: 2,
    name: 'PHP',
    url: '',
    children: [],
  },
  {
    id: 3,
    name: 'IOS',
    url: '',
    children: [],
  },
  {
    id: 4,
    name: 'Android',
    url: '',
    children: [],
  },
  {
    id: 5,
    name: '系统相关',
    url: '',
    children: [],
  },
  {
    id: 6,
    name: '杂谈',
    url: '',
    children: [],
  },
];

export default [
    {
      url: '/articles',
      type: 'get',
      response: config => {
        const { importance, type, title, page = 1, limit = 20, sort, tag_name, topic_name } = config.query
  
        let mockList = List.filter(item => {
          if (importance && item.importance !== +importance) return false
          if (type && item.type !== type) return false
          if (title && item.title.indexOf(title) < 0) return false
          if (topic_name && item.topic.name !== topic_name) return false
          if (tag_name && item.tags.indexOf(tag_name)) return false
          return true
        })
  
        if (sort === '-id') {
          mockList = mockList.reverse()
        }
  
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
  
        return {
          code: 200,
          data: {
            count: mockList.length,
            articles: pageList,
            cate_name: "",
            tag_name: "",
            topic_name: "",
          }
        }
      }
    },

    {
      url: '/menus',
      type: 'get',
      response: () => {
  
        return {
          code: 200,
          data: Menus
        }
      }
    },
  
    {
      url: '/articles/',
      type: 'get',
      response: config => {
        const { id } = config.query
        for (const article of List) {
          if (article.id === +id) {
            return {
              code: 200,
              data: article
            }
          }
        }
      }
    },
  
    {
      url: '/article/pv',
      type: 'get',
      response: () => {
        return {
          code: 200,
          data: {
            pvData: [
              { key: 'PC', pv: 1024 },
              { key: 'mobile', pv: 1024 },
              { key: 'ios', pv: 1024 },
              { key: 'android', pv: 1024 }
            ]
          }
        }
      }
    },
  
    {
      url: '/article/create',
      type: 'post',
      response: () => {
        return {
          code: 20000,
          data: 'success'
        }
      }
    },
  
    {
      url: '/article/update',
      type: 'post',
      response: () => {
        return {
          code: 20000,
          data: 'success'
        }
      }
    }
  ]