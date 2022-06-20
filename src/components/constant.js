export const MONITORLIST = [
  {
    'id': 1,
    'name': '',
     
  },
  {
    'id': 2,
    'name': '',
  },
  {
    'id': 3,
    'name': '',
  },
  {
    'id': 4,
    'name': '',
  },
  {
    'id': 5,
    'name': '',
  },
  {
    'id': 6,
    'name': '',
  },
]

export const USERS = [
  {
    'id': 1,
    'name': 'aliang',
     'address':'阿亮的老家',
     'lan':120.39629,
     'lat':36.30744,
     'village':[
      {
        'id': 1,
        'name': '村空中概览',
        'url':'https://720yun.com/vr/a242aaakmbg'
      },
      {
        'id': 2,
        'name': '村路口',
        'url':'https://720yun.com/vr/7cd2aaakm1g'
      },
      {
        'id': 3,
        'name': '村祠堂',
        'url':'https://720yun.com/vr/b782baakm1s'
      },
      {
        'id': 4,
        'name': '村大榕树',
        'url':'https://720yun.com/vr/c9421aakm1a'
      },
      {
        'id': 5,
        'name': '村池塘',
        'url':'https://720yun.com/vr/69e26aakm1i'
      },
      {
        'id': 6,
        'name': '村廊桥水岸',
        'url':'https://720yun.com/vr/bb52daakm1w'
      },
      {
        'id': 7,
        'name': '村巷江文里',
        'url':'https://720yun.com/vr/7b62caakm1r'
      }
      ],
      'hometown':[
        {
          'id': 1,
          'name': '楼顶小院',
          'url':'https://720yun.com/vr/10c2baakm4f'
        },
        {
          'id': 2,
          'name': '厨房',
          'url':'https://720yun.com/vr/e342baakm4v'
        },
        {
          'id':3,
          'name': '客厅',
          'url':'https://720yun.com/vr/91023aakm46'
        },
        {
          'id':4,
          'name': '书房',
          'url':'https://720yun.com/vr/1ce28aakm4s'
        },
        {
          'id': 5,
          'name': '漫游全景',
          'url':'https://www.4dkankan.com/spc.html?m=KK-aJe3CwBbf0&lang=zh'
        },
        ],
  },
  {
    'id': 2,
    'name': 'xiaoming',
     'address':'小明的老家',
     'lan':113.27324,
     'lat':23.15792,
     'village':[
      {
        'id': 1,
        'name': '村空中概览1',
        'url':'https://720yun.com/vr/a242aaakmbg'
      },
      {
        'id': 2,
        'name': '村路口1',
        'url':'https://720yun.com/vr/7cd2aaakm1g'
      },
      {
        'id': 3,
        'name': '村祠堂1',
        'url':'https://720yun.com/vr/b782baakm1s'
      },
      {
        'id': 4,
        'name': '村大榕树1',
        'url':'https://720yun.com/vr/c9421aakm1a'
      },
      {
        'id': 5,
        'name': '村池塘1',
        'url':'https://720yun.com/vr/69e26aakm1i'
      }
      ],
      'hometown':[
        {
          'id': 1,
          'name': '楼顶小院1',
          'url':'https://720yun.com/vr/10c2baakm4f'
        },
        {
          'id': 2,
          'name': '厨房1',
          'url':'https://720yun.com/vr/e342baakm4v'
        },
        {
          'id':3,
          'name': '客厅1',
          'url':'https://720yun.com/vr/91023aakm46' 
        },
        {
          'id':4,
          'name': '书房1',
          'url':'https://720yun.com/vr/1ce28aakm4s'
        }
        ],
  },
  {
    'id': 2,
    'name': '',
  },
  {
    'id': 3,
    'name': '',
  },
  {
    'id': 4,
    'name': '',
  },
  {
    'id': 5,
    'name': '',
  },
  {
    'id': 6,
    'name': '',
  },
]


export function queryNodeById (id) {
  let targetNode = null
  let node, nodes = ALGORITHM_TYPES.slice()
  
  while (nodes.length) {
    node = nodes.shift()

    if (node.id === id) {
      targetNode = node
      break
    }

    if (node.children && node.children.length) {
      nodes.push(...node.children)
    }
  }

  return targetNode
}