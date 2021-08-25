const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const { Crab } = require('./models')

main()

async function main() {
  const allLinks = await getAllLinks()
  for (let i = 0; i < allLinks.length; i++) {
    const item = allLinks[i]
    try {
      const { data } = await axios.get(item)
      const $ = cheerio.load(data)
      const link = $('.pb20 a').attr('href') || $('.left_info a').attr('href')
      const pageData = await getPageData(link)
      await new Crab(pageData).save()
      console.log(link, 'successful.')
    } catch (err) {
      console.log(item, 'failed.', err)
    }
  }
}

async function getPageData(link) {
  const { data } = await axios.get(link)
  const $ = cheerio.load(data)
  const tds = $('.art_content td')

  return {
    date: path.basename(path.parse(link).dir),
    name: '河蟹',
    price: tds.eq(1).text().trim(),
    unit: '元/公斤',
    change: tds
      .eq(tds.length - 1)
      .text()
      .trim()
  }
}

async function getAllLinks() {
  const { data } = await axios.get(
    'https://jiage.cngold.org/shuichan/xie/list_3179_all.html'
  )
  const $ = cheerio.load(data)
  const links = []
  $('.history_news_content a').each((index, item) => {
    links.push($(item).attr('href'))
  })
  return links
}
