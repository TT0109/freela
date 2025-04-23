import gtmHead from '@/scripts/gtm-head'
import fs from 'fs'
import path from 'path'

export default function Head() {
  return (
    <>
      <title>O Detetive do instagram</title>
      <meta name="description" content="Descubra quem está espionando seu perfil do instagram" />
      <div dangerouslySetInnerHTML={{ __html: gtmHead }} />
    </>
  )
}
