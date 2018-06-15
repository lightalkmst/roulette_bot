const Discord = require ('discord.js')
const client = new Discord.Client ()

const roulette = require ('./src/roulette')
const jinx = require ('./src/jinx')
const bottle = require ('./src/bottle')

client.on ('ready',  () => {
  console.log (`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setActivity (`Trolling ${client.guilds.size} server${client.guilds.size - 1 ? 's' : ''}`)
})

client.on ('message', async message => {
  if (message.author.bot)
    return

  (() => {
    const send = message.channel.send.bind (message.channel)
    message.channel.send = s => send (s).catch (console.error)
  }) ()

  ;[roulette, jinx, bottle].forEach (x => x (message))
})

client.login ('NDU0ODA1OTAyMTgxMDA3MzYx.DfyylA.JiZZxL4OsF9asVMwO88Mq2LsZxU')
