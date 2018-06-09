const Discord = require ('discord.js')
const client = new Discord.Client ()

client.on ('ready',  () => {
  console.log (`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  // client.user.setActivity (`Serving 54,849 servers`)
})

const prefix = '🔫'
const shot = {}
const death_timer = 1000000

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

  // deleting dead messages in channel
  if (dead) {
    await message.delete ()
      .catch (console.log.bind (console))
    return
  }

  const msg = message.content
  if (msg.indexOf (prefix) != 0)
    return

  const command = msg.split (/\s+/)[0].substr (prefix.length)
  const args = msg.split (/\s+/).slice (1)
  ;(({
    reload: async () => {
      shots = Math.floor (Math.random () * parseInt (command))
      await message.channel.send (`The 🔫 has been loaded with a bullet!`)
    },
    shoot: () => {
      !shots--
      ? (async () => {
        shot[id] = new Date ().getTime ()
        await message.channel.send (':gun:BANG!')
        await message.channel.send (`${message.author.username} is now dead for ${death_timer} milliseconds!`)
      }) ()
      : (async () => {
        await message.channel.send (':gun:click!')
        await message.channel.send (`${message.author.username} survives, for now...`)
      }) ()
    },
  })[command] || (() => {})) ()
})

client.login ('NDU0ODA1OTAyMTgxMDA3MzYx.DfyylA.JiZZxL4OsF9asVMwO88Mq2LsZxU')
