var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const Compteur = require("./compteurs/enfant.js");
var cron = require('node-cron');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/Zarude',{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client();
bot.login(auth.token);
bot.on('ready', async function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


const prefixZ = "z";
const prefixA = "a";
const prefixR = "r";
const prefixU = "u";
const prefixD = "d";
const prefixE = "e";
const prefixP = "p";
const prefixPing = "t'es là ?";
const test = '02 21 1 1 *';
var onoff = false;
const prefixONOFF = "hop hop";

///////////////////////
// Début de la Quête //
///////////////////////

  //cron.schedule(test, async () => {
  cron.schedule('7 18 6 1 *', async () => {
    const guild = bot.guilds.cache.get(auth.guild);
    const channel = bot.channels.cache.get(auth.salon.affichage);

                      //await channel.send("https://www.youtube.com/watch?v=d5X4iAAE0uU");
                      channel.send("*Ceci est un indice !* <@&"+auth.role.ping+">");
});

  //cron.schedule(test, async () => {
  cron.schedule('0 18 13 1 *', async () => {
    const guild = bot.guilds.cache.get(auth.guild);
    const channel = bot.channels.cache.get(auth.salon.affichage);

                      await channel.send("https://www.dailymotion.com/video/xihv6d");
                      channel.send("Je dis ça je dis rien : C'est ceux qui en parlent le **plus**, qui en reçoivent le **plus** !! <@&"+auth.role.ping+">");
});


bot.on('message', async function (message, user) {

    petitMessage = message.content.toLowerCase();

    // arrête la lecture du message si l'auteur est le bot.
    if (message.author.bot) return;

    if(petitMessage.startsWith(prefixONOFF)&&message.author.id==auth.staff.doowy){
        onoff=!onoff;
    }

    if(petitMessage.startsWith(prefixPing)&&message.member.roles.cache.has(auth.role.distrib)){
        message.reply("Yep ! Tu as besoin de quelque chose ?");
    }


    if (petitMessage.includes(prefixZ)&&message.member.roles.cache.has(auth.role.distrib)&&message.channel.id!=auth.salon.lecoin){
        message.channel.send("*Ceci est un indice*");
        return;
    }

    if (onoff==true){
        if (message.member.roles.cache.has(auth.role.distrib)&&message.channel.id!=auth.salon.lecoin){
            message.channel.send("*Ceci n'est pas un indice*");
            return;
        }
    }

    if(petitMessage.includes(prefixZ)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            create(message);

            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé Z----- ---- !");

            return;
        }
    }


    if(petitMessage.includes(prefixA)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 1){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 2});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZA---- ---- !");
            return;
        }else if (fiche.count == 7){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 8});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUDE PA-- !");
            return;
        }else if (fiche.count == 9){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 10});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUDE PAPA !");

            await message.guild.members.fetch(message.author.id).then((donneRole) => {
                     donneRole.roles.add(auth.role.zarude);})
            
            var textVictoire = "Bravo <@"+message.author.id+"> ! Tu as réussi à atteindre le salon secret du Zarude Papa !\rMerci de lire le premier message pour savoir comment récupérer ton lot auprès de <@"+auth.staff.vanilla+"> :arrow_up: .";
            console.log(message.guild.channels.cache.get(auth.salon.zarude).send(textVictoire));

            return;
        }
    }

    if(petitMessage.includes(prefixR)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 2){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 3});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZAR--- ---- !");
            return;
        }
    }

    if(petitMessage.includes(prefixU)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 3){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 4});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARU-- ---- !");
            return;
        }
    }

    if(petitMessage.includes(prefixD)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 4){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 5});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUD- ---- !");
            return;
        }
    }

    if(petitMessage.includes(prefixE)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 5){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 6});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUDE ---- !");
            return;
        }
    }

    if(petitMessage.includes(prefixP)&&!message.member.roles.cache.has(auth.role.zarude)&&!message.member.roles.cache.has(auth.role.distrib)){

        var fiche = await Compteur.findOne({idDiscord: message.author.id});
        console.log ('fiche de l utlisateur : '+fiche);

        if (!fiche) { 
            return;
        }else if (fiche.count == 6){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 7});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUDE P--- !");
            return;
        }else if (fiche.count == 8){
            //message.channel.send("coucou");
            await Compteur.findOneAndUpdate({idDiscord: message.author.id}, {count : 9});
            bot.channels.cache.get(auth.salon.carbon).send("<@"+message.author.id+"> a tapé ZARUDE PAP- !");
            return;
        }
    }


});


function create(message) {
    
    const ficheCompteur = new Compteur({
        _id : mongoose.Types.ObjectId(),
        trainer: message.author.username,
        idDiscord : message.author.id,
        count : 1,
        time: message.createdAt
    });

    ficheCompteur.save().then(result => console.log(result)).catch(err => console.log(err));

};




