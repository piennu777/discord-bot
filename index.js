const http = require("http");
http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Bot is active \n");
  })
  .listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: Object.values(
    Discord.GatewayIntentBits,
    Discord.Guilds,
    Discord.GuildMembers,
    Discord.MessageContent
  ),
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("n!help");
});

client.on("ready", async () => {
  const data = [
    {
      name: "help",
      description: "ヘルプを表示します。",
    },
    {
      name: "invite",
      description: "招待リンクを表示します。",
    },
    {
      name: "ping",
      description: "pingを計測します。",
    },
  ];
  await client.application.commands.set(data);
  console.log("ok!");
});

client.on("interactionCreate", async (Interaction) => {
  if (!Interaction.isCommand()) {
    return;
  }
  if (Interaction.commandName === "help") {
    const { EmbedBuilder } = require("discord.js");
    const exampleEmbed = new EmbedBuilder()
      .setColor(0xfef8bf)
      .setTitle("ヘルプ")
      .setImage()
      .setDescription(
        "ネタ路線のBOT予定だったのがなんか本気で作りたくなったやつです。\nこれからも開発していきます。\nアイディアやバグなどがありましたらPIENNU#0721までお知らせください。"
      )
      .setTimestamp();
    await Interaction.reply({ embeds: [exampleEmbed] });
  }
  if (Interaction.commandName === "invite") {
    const { EmbedBuilder } = require("discord.js");
    const exampleEmbed = new EmbedBuilder()
      .setColor(0xfef8bf)
      .setTitle("招待リンク")
      .setDescription(
        "下のリンクを踏むと導入できます。\nhttps://discord.com/api/oauth2/authorize?client_id=1060901864473903134&permissions=2199022731255&scope=bot%20applications.commands"
      )
      .setTimestamp();
    await Interaction.reply({ embeds: [exampleEmbed] });
  }
  if (Interaction.commandName === "ping") {
    await Interaction.reply(`ping ${client.ws.ping}ms`);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.includes("ハロー")) {
    message.channel.send(
      "ハロー！"
    );
  }
});

client.login(process.env.TOKEN);
