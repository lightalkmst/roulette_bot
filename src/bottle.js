const util = require ('./util')
const fs = require ('fs')

const questions = fs.readFileSync ('src/bottle/questions.txt', 'utf8').split ('\n').filter (x => x)

module.exports = async message => {
  util.exec ([[
    /^!spin$/, async match => {
      const target = message.guild.members.filter (user => user.presence.status == 'online' && !user.bot).random ().user
      const question = questions[Math.floor (Math.random () * questions.length)]
      await message.channel.send (`<@${target.id}> has been chosen to answer a question!`)
      await message.channel.send (question)
    },
  ]]) (message)
}
