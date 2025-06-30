// scripts/testCompare.ts
import bcrypt from 'bcryptjs'

const inputPassword = ''
const hash = ''

bcrypt.compare(inputPassword, hash).then((result) => {
  console.log(result ? '✅ MATCH' : '❌ NO MATCH')
})
  

