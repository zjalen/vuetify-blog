import Mock from 'mockjs'

const List = []
const count = 100

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
    description: 'mock data',
    id: '@increment',
    is_top: false,
    title: '@title(5, 10)',
    topic: null,
    topic_id: null,
  }))
}

export default [
    {
      url: '/articles',
      type: 'get',
      response: config => {
        const { importance, type, title, page = 1, limit = 20, sort } = config.query
  
        let mockList = List.filter(item => {
          if (importance && item.importance !== +importance) return false
          if (type && item.type !== type) return false
          if (title && item.title.indexOf(title) < 0) return false
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