import fs from 'fs'
import path from 'path'

export default function Head() {
  const gtmHeadScript = fs.readFileSync(
    path.resolve(process.cwd(), 'scripts/gtm-head.txt'),
    'utf-8'
  )
  console.log(gtmHeadScript)
  return (
    <>
      <title>O Detetive do instagram</title>
      <meta name="description" content="Descubra quem está espionando seu perfil do instagram" />
      <div dangerouslySetInnerHTML={{ __html: gtmHeadScript }} />
    </>
  )
}
