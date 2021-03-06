
function generateCommand(lang) { // !command add duo Estou duo com X e o elo dele é: (_ELO2_)
    var commandName = String(getElementById("command_name").value).trim().replace(" ", "").replace("!", ""),
            commandType = getElementById("command_type"),
            cooldown = getElementById("command_cooldown").value > 0 && getElementById("command_cooldown").value >= 5 && getElementById("command_cooldown").value <= 300 ? defaultFor(getElementById("command_cooldown").value, 25) : String(commandType.value).toLowerCase() === "currentmatch" ? 25 : 5;
            playerName = getElementById("player_name"), // Usar o PaladinsGuru para ver se o player existe: https://github.com/Protovision/paladins_scouter/blob/master/paladins_scouter.c
            platform = getElementById("platform_form"),
            language = getElementById("language_form"), // int
            botName = getElementById("bot_name"), // int
            userLevel = getElementById("user_access"),
            userCanUse = getElementById("user_can_use");
    lang = defaultFor(lang, defaultFor(typeof $("#generate_command").attr("data-lang"), defaultFor(getElementById("generate_command").getAttribute("data-lang"), "en")));
    
    var endpointLink = getEndpoint() + String(commandType.value);
    $("#result-warning").show();
    if (commandName.length > 0 && String(playerName.value).trim().replace(" ", "").length > 3) {
        var permLvl = "", cmd = "", cmdChat = "";
        switch(botName.value) {
            /*case "2": // Deepbot
                switch(userLevel.value) {
                    case "2" : default: permLvl = "%1"; break;
                    case "3" : permLvl = "%2"; break;
                    case "4" :  case "5" : "%8"; break;
                }
                cmdChat += "!addcom !{CMD_NAME} {PERM_LVL} ".replace("{CMD_NAME}", commandName).replace("{PERM_LVL}", permLvl);
                cmd += userCanUse.checked ? "@customapi@[{ENDPOINT_LINK}?player=@target@[1]&platform=@target@[3]&champion=@target@[2]&language={LANGUAGE})" : "@customapi@[{ENDPOINT_LINK}?player={PLAYER_NAME}&platform={PLATFORM}&language={LANGUAGE})";
            break;*/
            case botName["0"].value.toLowerCase(): // Botisimo
                cmdChat += "!command add !{CMD_NAME} $[cooldown {CD}] ".replace("{CD}", cooldown).replace("{CMD_NAME}", commandName);
                
                customAPICode = "$(fetch {ENDPOINT_LINK}?{PARAMS})";
                params = "player={PLAYER_NAME}&platform={PLATFORM}&language={LANGUAGE}";
                if(userCanUse.checked)
                    params = "query=$(urlencode $(query 1))&" + params;
                cmd += customAPICode.replace("{PARAMS}", params);
            break;
            case botName["2"].value.toLowerCase():
                switch(userLevel.value) {
                    case "2" : permLvl = 300; break;
                    case "3" : permLvl = 250; break;
                    case "4" : permLvl = 500; break;
                    case "5" : permLvl = 2000; break;
                    case "6" : permLvl = 1000; break;
                    default: permLvl = 100;
                }
                cmdChat += "!command add !{CMD_NAME} ".replace("{CMD_NAME}", commandName).replace("{PERM_LVL}", permLvl);
                customAPICode = "${customapi.{ENDPOINT_LINK}?{PARAMS}}";

                params = "player={PLAYER_NAME}&platform={PLATFORM}&language={LANGUAGE}";
                if(userCanUse.checked && commandType.value !== commandType["0"].value)
                    params = "query=$(queryencode $(1:))&" + params;
                cmd += customAPICode.replace("{PARAMS}", params);
            break;
            case botName["3"].value.toLowerCase(): /*case "5"*:*/ //Streamlabs / Ankbot
                switch(userLevel.value) {
                    case "2" : permLvl = "+r"; break;
                    case "3" : permLvl = "+s"; break;
                    case "4" : permLvl = "+m"; break;
                    case "5" : permLvl = botName.value === "7" ? "+e" : "+c"; break;
                    default: permLvl = "+a";
                }
                cmdChat += "!command add !{CMD_NAME} {PERM_LVL} ".replace("{CMD_NAME}", commandName).replace("{PERM_LVL}", permLvl);

                customAPICode = "$readapi({ENDPOINT_LINK}?{PARAMS})";
                params = "player={PLAYER_NAME}&platform={PLATFORM}&language={LANGUAGE}";
                if(userCanUse.checked && commandType.value !== commandType["0"].value)
                    params = "query=$dummyormsg&" + params;
                cmd += customAPICode.replace("{PARAMS}", params);
            break;
            default:
                switch(userLevel.value) {
                    case "2" : permLvl = "reg"; break;
                    case "3" : permLvl = "susbcriber"; break;
                    case "4" : permLvl = "mod"; break;
                    case "5" : permLvl = "owner"; break;
                    default: permLvl = "everyone";
                }
                cmdChat += "!addcom -cd={CD} -ul={PERM_LVL} !{CMD_NAME} ".replace("{CD}", cooldown).replace("{PERM_LVL}", permLvl).replace("{CMD_NAME}", commandName);
                
                customAPICode = "$(customapi {ENDPOINT_LINK}?{PARAMS})";
                params = "player={PLAYER_NAME}&platform={PLATFORM}&language={LANGUAGE}";
                if(userCanUse.checked)
                    params = "query=$(querystring)&" + params;
                cmd += customAPICode.replace("{PARAMS}", params);
            break;
        }
        addAlert("{CMD_CREATED}".replace("{CMD_CREATED}", getTranslatedString(lang, "cmdCreated").replace("{CMD_NAME}", commandName)), "alert-success", true, true, "#result-warning", lang);//, 1 * 60);
        cmd = cmd.replace("{ENDPOINT_LINK}", endpointLink).replace("{PLAYER_NAME}", encodeURI(playerName.value)).replace("{PLATFORM}", platform.value).replace("{LANGUAGE}", language.value).replace("{BOT_NAME}", botName[botName.value - 1].text.replace(" ", ""));
        cmd = cmd.replace("{ENDPOINT_LINK}", endpointLink).replace("{LANGUAGE}", language.value).replace("{BOT_NAME}", botName[botName.value - 1].text.replace(" ", ""));
        addCommandOutput(cmdChat + cmd, cmd, botName[botName.value - 1].text, lang);
    } else {
        if(commandName.length <= 0) {
            addAlert("{INVALID_CMD_NAME}".replace("{INVALID_CMD_NAME}", getTranslatedString(lang, "invalidCmdName")), "alert-danger", true, true, "#result-warning", lang);
            $("#command_name").focus();
        } else {
            addAlert("{INVALID_PLAYER_NAME}".replace("{INVALID_PLAYER_NAME}", getTranslatedString(lang, "invalidPlayerName")), "alert-danger", true, true, "#result-warning", lang);
            //$("#result").html("");
            $("#player_name").focus();
        }
    }
}
