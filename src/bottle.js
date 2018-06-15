const util = require ('./util')

const questions = []

module.exports = async message => {
  util.exec ([[
    /^$/, async match => {
      const target = message.guild.members.filter (user => user.presence.status == 'online').random ()
      const question = questions[Math.floor (Math.random () * questions.length)]
      await message.channel.send (`${target.username} has been chosen to answer a question!`)
      await message.channel.send (question)
    },
  ]]) (message)
}
