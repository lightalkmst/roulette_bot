const util = require ('./util')
const fs = require ('fs')

const questions = fs.readFileSync ('src/bottle/questions.txt', 'utf8').split ('\n').filter (x => x)

module.exports = async message => {
  const ask_question = async () => {
    const question = questions[Math.floor (Math.random () * questions.length)]
    await message.channel.send (question)
  }

  util.exec ([[
    /^!spin$/, async match => {
      const target = message.guild.members.filter (member => member.presence.status == 'online' && !member.user.bot).random ().user
      await message.channel.send (`<@${target.id}> has been chosen to answer a question!`)
      await ask_question ()
    },
  ], [
    /^!question$/, ask_question,
  ]]) (message)
}
