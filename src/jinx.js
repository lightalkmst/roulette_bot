const util = require ('./util')

const role_name = 'Jinxed'
const strength = 3
const jinxed = {}

module.exports = async message => {
  // asking how much longer you're jinxed in dms
  if (message.channel.recipient) {
    await message.channel.send (`You have to be mentioned ${jinxed[message.author.id] + 1} more times to be freed`)
    return
  }

  const role = message.guild.roles.find ('name', role_name)

  util.exec ([[
    /^jinx <@!?\d{17,19}>$/, async match => {
      const target = message.mentions.users.first ()
      jinxed[target.id] = strength - 1
      await message.guild.members.find ('id', target.id).addRole (role)
      await message.channel.send (`${target.username} has been jinxed by ${message.author.username}!`)
      await message.channel.send (`${target.username} has to be mentioned ${strength} time${strength - 1 ? 's' : ''} to be freed`)
    },
  ], [
    /<@!?\d{17,19}>/, async match => {
      message.mentions.users.array ().filter (user => user.id in jinxed)
        .forEach (user => {
          !jinxed[user.id]--
          ? (async () => {
            delete jinxed[user.id]
            await message.channel.send (`${user.username} has been freed from their jinx!`)
            await message.guild.members.find ('id', user.id).removeRole (role)
          }) ()
          : (
            message.channel.send (`${user.username} has to be mentioned ${jinxed[user.id] + 1} more time${jinxed[user.id] ? 's' : ''} to be freed`)
          )
      })
    },
  ]]) (message)
}
