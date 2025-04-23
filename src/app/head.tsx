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
      <title>Minha App</title>
      <meta name="description" content="Minha descrição" />
      <div dangerouslySetInnerHTML={{ __html: gtmHeadScript }} />
    </>
  )
}
