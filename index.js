const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  ButtonBuilder,
  ButtonStyle,
  userMention,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
  Message,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  messageLink,
} = require("discord.js");
const replaceJSONProperty = require("replace-json-property");
const { Probot, tax } = require("discord-probot-transfer");

const client = new Client({
  intents: 131071,
});
/* ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ */
/* Complete this fields */
const config = require("./config.json");
const guild = client.guilds.cache.get("1028063425697419305");
const prefix = config.prefix;
const line = config.line;
const linechannel = config.linechannel;
/* ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ */

/* BOT INFORMATIONS */
/* ---------------- */
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!
    Index.js  ✅
    Config.js ✅
    `);
  client.user.setActivity(" اي شي ", {
    type: "STREAMING",
    url: "تويتش",
  });
  // client.user.setStatus("idle");
});
/* --------------------- */
/* --------------------- */

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "come")) {
    if (message.author.bot) return;
    if (!message.member.roles.cache.has(config.roleadmin))
      if (!message.member.permissions.has("ADMINISTRATOR"))
        // ايدي الرتبة الي تقدر تستعمل الامر
        return;
    let user = message.mentions.members.first();
    if (!user) return message.reply(`**Usage: \`${prefix}come\` @user**`);
    user.send(`**Please Come To <#${message.channel.id}> \nFor ${user}**`);
    const embed = new EmbedBuilder()
      .setTitle("RANK SHOP")
      .setColor("Random")
      .setDescription(`**✅ Done Send To ${user}**`);
    message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content == prefix + "line") {
    message.delete();
    message.channel.send(line);
  } else if (message.content == "line") {
    message.delete();
    message.channel.send(line);
  } else if (message.content == "خط") {
    message.delete();
    message.channel.send(line);
  } else if (message.content == "-") {
    message.delete();
    message.channel.send(line);
  }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (!linechannel.includes(message.channel.id)) return;
  message.channel.send(line);
  return;
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "rc")) {
    let args = message.content.toLowerCase().split(" ");
    const user = message.mentions.users.first(args[1]);
    if (!user) return message.channel.send("I CANT FIND THE USER ");
    const user01 = message.mentions.users.first();

    message.guild.channels
      .create({
        name: `〢❃・${user01.username}`,
        type: "0",
      })
      .then((channel) => {
        channel.setParent(config.private_room_catgr);
        channel.permissionOverwrites.create(channel.guild.roles.everyone, {
          ViewChannel: true,
          SendMessages: false,
        });
        channel.permissionOverwrites.create(user01, {
          ViewChannel: true,
          SendMessages: true,
        });

        const pr_tck_emb = new EmbedBuilder()
          .setTitle("Private Room")
          .setColor("Random")
          .addFields(
            {
              name: "* owner ROOM",
              value: `${user01}`,
            },
            {
              name: "* ROOM maked by :",
              value: `${message.author}`,
            },
            {
              name: "* time of Room",
              value: `${args[2]}`,
            }
          );
        setTimeout(function () {
          channel.send({
            content: `✅ ${user01}, room has been created`,
            embeds: [pr_tck_emb],
          });
          channel.send("عدم تشفير الكلمات = تحذير⚠️");
          channel.send(line);
        }, 1000);
        message.reply("✅Room has been maked succefuly ");
      });
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "set-c")) {
    let args = message.content.toLowerCase().split(" ");
    const catgid = args[1];
    replaceJSONProperty.replace("./config.json", "private_room_catgr", catgid);
    message.reply("✅ Private ROOMS category has been updated");
  }
});

client.on("messageCreate", (message) => {
  if (message.content == prefix + "اخفاء") {
    message.channel.permissionOverwrites.set([
      {
        id: message.channel.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
    ]);
    message.reply("✅ this room has been hidden");
  } else if (message.content == prefix + "اظهار") {
    message.channel.permissionOverwrites.set([
      {
        id: message.channel.guild.roles.everyone,
        allow: [PermissionsBitField.Flags.ViewChannel],
      },
    ]);
    message.reply("✅ this room has been shown");
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "embed")) {
    let say = message.content.split(" ").slice(1).join(" ");
    if (!say) message.reply("❌ Please Put Text");
    let embed = new EmbedBuilder()
      .setAuthor({
        name: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setImage(line)
      .setColor("Random")
      .setDescription(`**${say}**`);
    message.delete();
    message.channel.send({ embeds: [embed] });
  } else if (message.content.startsWith(prefix + "say")) {
    let say = message.content.split(" ").slice(1).join(" ");
    if (!say) message.reply("❌ Please Put Text");
    message.delete();
    message.channel.send(`** ${say} **`);
  }
});

client.on("messageCreate", (message) => {
  if (message.content == prefix + "bot") {
    const botinfo = new EmbedBuilder()
      .setTitle("🤖 **System Bot**")
      .setDescription("🧑🏻‍💻 This Bot developed by : ``` fxdark1. ```  ")
      .addFields(
        {
          name: `come`,
          value: `prefix + come + mention user`,
        },
        {
          name: "line",
          value: `خط`,
        },
        {
          name: "private room",
          value: `prefix + rc + mention user + time of room`,
        },
        {
          name: `set category of private rooms`,
          value: `prefix + set-c + category ID`,
        },
        {
          name: "hide room",
          value: `prefix + hide`,
        },
        {
          name: "show room",
          value: `prefix + show`,
        },
        {
          name: `embed`,
          value: `prefix + embed + message`,
        },
        {
          name: "say",
          value: `prefix + say + message`,
        },
        {
          name: "bot info",
          value: `prefix + bot`,
        },
        {
          name: `probot tax`,
          value: `prefix + tax + amount`,
        },
        {
          name: "order",
          value: `prefix + طلب + product`,
        }
      )
      .setColor("#ffff00");
    message.reply({
      content: "💁🏻‍♂️ BOT INFO",
      embeds: [botinfo],
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "tax")) {
    let Args = message.content.toLowerCase().split(" ");
    const Args2 = Args[1]
      .replace("k", "000")
      .replace("K", "000")
      .replace("m", "000000")
      .replace("M", "000000")
      .replace("b", "000000000000")
      .replace("B", "000000000000");
    const Tax1 = Math.floor((Args2 * 20) / 19 + 1);
    const Tax2 = Math.floor((Args2 * 20) / 19 - 1 - Args2);
    const Tax3 = Math.floor((Tax2 * 20) / 19);

    const taxembed = new EmbedBuilder()
      .setTitle("ProBot Tax :")
      .setDescription(
        `
                      **💳المبلغ دون ضريبة : ${Args2}

                      💵الضريبة: ${Tax3}

                      💰المبلغ بالضريبة : ${Tax1}**
                      `
      )
      .setColor("Random");
    const id = message.author.id;
    const taxuser = userMention(id);
    message.channel.send({
      content: taxuser,
      embeds: [taxembed],
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.channelId == config.taxch) {
    if (message.author.bot) return;
    const Args2 = message.content
      .replace("k", "000")
      .replace("K", "000")
      .replace("m", "000000")
      .replace("M", "000000")
      .replace("b", "000000000000")
      .replace("B", "000000000000");
    const Tax1 = Math.floor((Args2 * 20) / 19 + 1);
    const Tax2 = Math.floor((Args2 * 20) / 19 - 1 - Args2);
    const Tax3 = Math.floor((Tax2 * 20) / 19);
    const taxembed = new EmbedBuilder()
      .setTitle("ProBot Tax :")
      .setDescription(
        `
                        **💳المبلغ دون ضريبة : ${Args2}
  
                        💵الضريبة: ${Tax3}
  
                        💰المبلغ بالضريبة : ${Tax1}**
                        `
      )
      .setColor("Random");

    const id = message.author.id;
    const taxuser = userMention(id);
    message.channel.send({
      content: taxuser,
      embeds: [taxembed],
    });
    message.channel.send(line);
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "طلب")) {
    let say = message.content.split(" ").slice(1).join(" ");
    if (!say) message.reply("❌ Please Put order");
    message.reply("Invalid command").then((msg) => {
      msg.delete({ timeout: 10000 });
    });

    let embed = new EmbedBuilder()
      .setTitle("طلب جديد 🔔")
      .setAuthor({
        name: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setImage(line)
      .setColor("Random")
      .setDescription(`**${say}**`);
    message.delete();
    message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.channelId == config.feedback) {
    if (message.author.bot) return;
    const embedprogrammings = new EmbedBuilder()
      .setTitle("**🌹 Thanks For Feedback**")
      .setDescription(`${message.content}`)
      .setColor("Random");
    const id = message.author.id;
    const feedbackuser = userMention(id);
    message.channel.send({
      content: feedbackuser,
      embeds: [embedprogrammings],
    });
    message.delete()
    message.channel.send(line);
  }
});
client.login(config.token);
