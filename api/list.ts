// import { request } from '@/utils/request'

function generateData(count: number) {
  const data = []
  for (let i = 0; i < count; i++) {
    const id = i + 1
    const title = `Title ${i}`
    const desc = `Description ${i}`
    const images = ['https://tdesign.gtimg.com/site/images/breathe-bottom.png']
    const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const tag = Math.floor(Math.random() * 10) // Random tag between 0 and 9
    data.push({ id, title, desc, time, tag, images })
  }
  return data
}

export function getExampleList(data: { pageSize: number; pageNum: number }) {
  return {
    content: generateData(data.pageSize),
    total: data.pageNum * 50
  }
}
