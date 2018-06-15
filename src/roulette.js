const util = require ('./util')

const role_name = 'DEAD'
const death_timer = 5 * 60 * 1000
const shot = {}

var shots = 0
var chambers = 0
var players = 0

module.exports = async message => {
  const id = message.author.id
  const dead = shot[id] && new Date ().getTime () < shot[id] + death_timer

  // asking how much longer you're dead in dms
  if (message.channel.recipient) {
    await message.channel.send (
      dead
      ? `You are dead for ${new Date () - shot[id]} more milliseconds`
      : 'You are still alive'
    )
    return
  }

  const role = message.guild.roles.find ('name', role_name)

  util.exec ([[
    /^🔫 reload ([0-9]+)$/, async match => {
      chambers = parseInt (match[1])
      shots = Math.floor (Math.random () * chambers)
      await message.channel.send (`The 🔫 has been loaded with a bullet!`)
    },
  ], [
    /^🔫 shoot$/, async match => {
      !shots--
      ? (async () => {
        shot[id] = new Date ().getTime ()
        await message.member.addRole (role)
        await message.channel.send ('🔫 BANG!')
        await message.channel.send (`<@${message.author.id}> is now dead for ${death_timer} milliseconds!`)
        setTimeout (() => {
          message.member.removeRole (role)
          delete shot[id]
        }, death_timer)
      }) ()
      : (async () => {
        await message.channel.send ('🔫 click!')
        await message.channel.send (`<@${message.author.id}> survives, for now...`)
        await message.channel.send (`${chambers-- - 1} chambers remain`)
      }) ()
    },
  ]]) (message)
}
