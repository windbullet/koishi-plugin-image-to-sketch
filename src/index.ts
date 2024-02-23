import { Context, Schema, h } from 'koishi'

export const name = 'image-to-sketch'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('sketch <img:image>')
    .action(async ({ session }, img) => {
      let buffer = Buffer.from(await ctx.http.get(img.src, { responseType: "arraybuffer" }))
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `url=${encodeURIComponent(buffer.toString('base64'))}`
      }
      let res = await ctx.http('post', 'https://api.xingzhige.com/API/xian/', config)
      return h.image(res.data, res.headers.get('content-type'))
    })
}
