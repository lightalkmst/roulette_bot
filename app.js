const Discord = require ('discord.js')
const client = new Discord.Client ()

const roulette = require ('./src/roulette')
const jinx = require ('./src/jinx')
const bottle = require ('./src/bottle')

client.on ('ready',  () => {
  console.log (`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setActivity (`Trolling ${client.guilds.size} servers`)
})

client.on ('message', async message => {
  // This event will run on every single message received, from any channel or DM.
  if (message.author.bot)
    return

  ;[roulette, jinx, bottle].forEach (x => x (message))
})

client.login ('NDU0ODA1OTAyMTgxMDA3MzYx.DfyylA.JiZZxL4OsF9asVMwO88Mq2LsZxU')
