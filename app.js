const Discord = require ('discord.js')
const client = new Discord.Client ()

client.on ('ready',  () => {
  console.log (`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  // client.user.setActivity (`Serving 54,849 servers`)
})

const prefix = '🔫 '
const shot = {}
const death_timer = 5 * 60 * 1000

var shots = 0
var players = 0

client.on ('message', async message => {
  // This event will run on every single message received, from any channel or DM.
  if (message.author.bot)
    return

  const id = message.author.id
  const dead = shot[id] && new Date ().getTime () < shot[id] + death_timer

  // prune dead people
  if (!dead) {
    delete shot[id]
  }

  // asking how much longer you're dead in dms
  if (message.channel.recipient) {
    await message.channel.send (
      dead
      ? `You are dead for ${new Date () - shot[id]} more milliseconds`
      : 'You are still alive'
    )
    return
  }

  const msg = message.content
  if (msg.indexOf (prefix) != 0)
    return

  const role = message.guild.roles.find ('name', 'DEAD')

  const command = msg.split (/\s+/)[1]
  const args = msg.split (/\s+/).slice (2)
  ;(({
    reload: async () => {
      shots = Math.floor (Math.random () * parseInt (args[0]))
      await message.channel.send (`The 🔫 has been loaded with a bullet!`)
    },
    shoot: () => {
      !shots--
      ? (async () => {
        shot[id] = new Date ().getTime ()
        message.member.addRole (role).catch (console.error)
        setTimeout (() => message.member.removeRole (role).catch (console.error), death_timer)
        await message.channel.send ('🔫 BANG!')
        await message.channel.send (`${message.author.username} is now dead for ${death_timer} milliseconds!`)
      }) ()
      : (async () => {
        await message.channel.send ('🔫 click!')
        await message.channel.send (`${message.author.username} survives, for now...`)
      }) ()
    },
  })[command] || (() => {})) ()
})

client.login ('NDU0ODA1OTAyMTgxMDA3MzYx.DfyylA.JiZZxL4OsF9asVMwO88Mq2LsZxU')
