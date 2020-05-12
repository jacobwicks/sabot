const smileyString = `
:(
:)
:11tea:

:30bux:

:3:

:a2m:

:aaa:

:aaaaa:

:actually:

:agesilaus:

:airquote:

:allbuttons:

:allears:

:am:

:angel:

:anime:

:anttony:

:argh:

:arghfist:

:awesomelon:

:bahgawd:

:bang:

:banjo:

:batuka:

:biglips:

:bird:

:birdthunk:

:black101:

:blastu:

:blush:

:boobeer:

:boom:

:bravo2:

:burger:

:butt:

:butts:

:c00lbutt:

:captainpop:

:carol:

:catholic:

:cawg:

:cb:

:cenobite:

:chanpop:

:chaostrump:

:cheeky:

:cheers:

:chef:

:choco:

:circlefap:

:ck5:

:classiclol:

:clint:

:coal:

:coffee:

:colbert:

:comeback:

:commissar:

:confuoot:

:confused:

:cool:

:coolfish:

:cop:

:crossarms:

:cry:

:cthulhu:

:D

:d2a:

:dance:

:derp:

:derptiel:

:devil:

:dings:

:discourse:

:dogbutton:

:doh:

:doit:

:downs:

:downsgun:

:downswords:

:drac:

:dukedoge:

:eek:

:emo:

:eng101:

:eng99:

:engleft:

:eyepop:

:f5:

:f5h:

:fap:

:fedora:

:fh:

:flame:

:fork:

:frogdunce:

:gary:

:gay:

:geno:

:gerty:

:ghost:

:gibs:

:gizz:

:glomp:

:goku:

:goleft:

:golfclap:

:gonk:

:goshawk:

:greatgift:

:greenangel:

:greencube:

:grin:

:guillotine:

:guinness:

:gurf:

:haw:

:hawaaaafap:

:hb:

:hchatter:

:hehe:

:henget:

:heysexy:

:hf:

:hfive:

:hist101:

:holy:

:homebrew:

:honk:

:horse:

:hotpickle:

:hr:

:huh:

:hydrogen:

:imunfunny:

:ins:

:j:

:jecht:

:jerkbag:

:jerky:

:jewish:

:jihad:

:keke:

:kiddo:

:kimchi:

:kingsley:

:koos:

:lolplant:

:love:

:mad:

:madmax:

:maga:

:magemage:

:magical:

:mamacita:

:marc:

:margeball:

:mcnally:

:megadeath:

:melter:

:mmmhmm:

:monar:

:monocle:

:moonrio:

:morning:

:mrgw:

:mrwhite:

:munch:

:neckbeard:

:newfap:

:newlol:

:nexus:

:niggly:

:ninja:

:nono:

:nsa:

:nyd:

:o:

:ocelot:

:ohdear:

:ohdearsass:

:one:

:ovr:

:palmon:

:pedo:

:perjury:

:pervert:

:phone:

:phoneb:

:phoneline:

:pipe:

:pirate:

:piss:

:pray:

:prepop:

:pseudo:

:pusheen:

:q:

:question:

:rackem:

:raise:

:rant:

:razzy:

:redass:

:redhammer:

:regd13:

:regd16:

:regd20:

:reject:

:respek:

:rimshot:

:robble:

:roboluv:

:rock:

:roflolmao:

:rolleye:

:rolleyes:

:saddowns:

:sadwave:

:sassargh:

:sax:

:science:

:shepspends:

:shlick:

:shobon:

:shrek:

:shrug:

:sickos:

:sigh:

:silent:

:siren:

:slick:

:sludgepal:

:smugdon:

:smuggo:

:smugjones:

:smugmrgw:

:sotw:

:sparkles:

:spergin:

:spooky:

:ssh:

:ssj:

:stadia:

:stare:

:sterv:

:stoked:

:stonk:

:stonkhat:

:stonklol:

:suicide:

:sun:

:supaburn:

:sweatdrop:

:swoon:

:sympathy:

:tbear:

:thermidor:

:thunk:

:thunkgun:

:thunkher:

:tif:

:tinfoil:

:tipshat:

:tizzy:

:toot:

:tootzzz:

:toughguy:

:tutbutt:

:twisted:

:v:

:viggo:

:vince:

:votegop:

:wave:

:what:

:whip:

:whitewater:

:wiggle:

:witch:

:woop:

:words:

:worship:

:wth:

:xbone:

:xd:

:yarg:

:yarr:

:yikes:

:yotj:

:yum:

:zak:

:zombie:

:zoro:

;)

;-*

:10bux:

:20bux:

:69snypa:

:bagl:

:bandwagon:

:banme:

:bignews:

:bigwhat:

:biotruths:

:bisonyes:

:bitcoin:

:blessed:

:bunt:

:bustem:

:byewhore:

:byob:

:cadfan:

:camera6:

:ccp:

:chillout:

:chiyo:

:clegg:

:cmon:

:coupons:

:cumpolice:

:damn:

:darksouls:

:dealwithit:

:dice:

:dmca:

:downsowned:

:edi:

:effort:

:effortless:

:emoticon:

:evil:

:feelsgood:

:filez:

:firstpost:

:frogon:

:frogout:

:ftbrg:

:FYH:

:gas:

:gb2byob:

:gb2fyad:

:gb2gbs:

:gb2hd2k:

:getout:

:godwin:

:goof:

:google:

:goon:

:goonboot:

:gtfoycs:

:hellyeah:

:hirez:

:histdowns:

:holymoley:

:hurr:

:iceburn:

:iia:

:iiaca:

:iiam:

:iiapa:

:irony:

:itwaspoo:

:justpost:

:krad:

:laffo:

:lmao:

:lol:

:lurkmore:

:m10:

:master:

:milk:

:milkie:

:mitt:

:moments:

:mordin:

:moreevil:

:moustache:

:ms:

:nattyburn:

:nms:

:nws:

:objection:

:omarcomin:

:ortiz:

:owned:

:page3:

:pedophiles:

:protarget:

:pt:

:regd04:

:regd05:

:regd06:

:regd07:

:regd08:

:regd10:

:rice:

:rip:

:rms:

:russbus:

:sadfan:

:sbahj:

:shibewow:

:sicknasty:

:sidvicious:

:smugndar:

:soe:

:speculate:

:stoke:

:synpa:

:tetten:

:their:

:thx:

:toxx:

:vd:

:w00t:

:w2byob:

:waycool:

:whatup:

:whoptc:

:wom:

:woof:

:wow:

:wrongful:

:wtc:

:wtf:

:yohoho:

:zerg:

:aslol:

:awesome:

:baby:

:backtowork:

:barf:

:boonie:

:bravo:

:btroll:

:buddy:

:byobear:

:byodame:

:byodood:

:c00l:

:c00lbert:

:cabot:

:can:

:catbert:

:catstare:

:ccb:

:chiefsay:

:chord:

:corsair:

:cripes:

:crow:

:dawkins101:

:devilchild:

:dogout:

:dong:

:douche:

:downsbravo:

:downsrim:

:drum:

:duckie:

:dukedog:

:fail:

:fella:

:fiesta:

:flaccid:

:flag:

:forkbomb:

:freep:

:frog:

:frogbon:

:frogc00l:

:froggonk:

:frogsiren:

:fuckoff:

:furcry:

:fyadride:

:gbsmith:

:george:

:getin:

:ghitler:

:gifttank:

:goatsecx:

:gooncamp:

:goonsay:

:guitar:

:hampants:

:happyelf:

:havlat:

:jeb:

:jebstare:

:jiggled:

:kamina:

:killdozer:

:krakentoot:

:krakken:

:mmmsmug:

:mrapig:

:mrgw2:

:mump:

:negative:

:parrot:

:pluto:

:pranke:

:psyberger:

:psyboom:

:psyduck:

:psypop:

:pwm:

:pwn:

:qq:

:qqsay:

:radcat:

:razz:

:reddit:

:regd09:

:regd11:

:rodimus:

:rubshands:

:sharpton:

:shibaz:

:shivdurf:

:sissies:

:smith:

:smithcloud:

:smithfrog:

:smithicide:

:smithmouth:

:smug:

:smugbert:

:smugbird:

:smugdog:

:smugissar:

:smugspike:

:smugteddie:

:solanadumb:

:sonia:

:stalker:

:staredog:

:stoat:

:suspense:

:sweep:

:synthy:

:syoon:

:taco:

:tastykake:

:temporary:

:thejoke:

:thumbsup:

:troll:

:ughh:

:uhaul:

:unsmigghh:

:unsmith:

:viconia:

:wink:

:wmwink:

:wooper:

:wotwot:

:yayclod:

:yaycloud:

:yosbutt:

:911:

:anarchists:

:ancap:

:australia:

:beck:

:belarus:

:britain:

:ca:

:canada:

:cheat:

:china:

:denmark:

:ese:

:eurovision:

:finland:

:fireman:

:france:

:fsmug:

:geert:

:godwinning:

:gop:

:helladid:

:hitler:

:italy:

:japan:

:mason:

:mexico:

:mil101:

:newt:

:niger:

:nitecrew:

:norway:

:patriot:

:pilot:

:poland:

:quebec:

:scotland:

:spain:

:sweden:

:tf:

:tfrxmas:

:tito:

:ussr:

:vuvu:

:woz:

:zpatriot:

:aatrek:

:anasta:

:asoiaf:

:axe:

:bape:

:bioware:

:bloodborne:

:bsdsnype:

:bsg:

:bubblewoop:

:c:

:cedric:

:corrupt:

:csgo:

:cult:

:d:

:doclouis:

:doink:

:doom:

:dota101:

:flashfact:

:flashfap:

:foxnews:

:fry:

:fsn:

:fut:

:gaben:

:gogtears:

:golgo:

:gonchar:

:gowron:

:h:

:hawksin:

:intv:

:ironicat:

:itjb:

:iw:

:joel:

:jp:

:kakashi:

:kratos:

:laugh:

:legion:

:lesnick:

:liara:

:livintrope:

:lost:

:lovewcc:

:lron:

:lumpen:

:manning:

:mario:

:mcnabb:

:megaman:

:mensch:

:mufasa:

:nixon:

:nolan:

:notch:

:notfunny:

:nyan:

:nyoron:

:orks101:

:orks:

:patssay:

:pcgaming1:

:pcgaming:

:pgi:

:psydwarf:

:psylon:

:punto:

:qfg:

:qirex:

:quagmire:

:ramsay:

:ranbowdash:

:retrogames:

:riker:

:riot:

:rms2:

:rolldice:

:romo:

:rudebox:

:russo:

:s:

:sg:

:shepface:

:shepicide:

:shopkeeper:

:signings:

:smaug:

:smugdroid:

:smugwizard:

:snoop:

:spidey:

:stat:

:steam:

:sugartits:

:tali:

:techno:

:thurman:

:todd:

:torgue:

:toxogond:

:tubular:

:turianass:

:tviv:

:tvtropes:

:twentyfour:

:ubisoft:

:valvebeta:

:vick:

:wal:

:wankah:

:wcc:

:wcw:

:wookie:

:xcom:

:xie:

:yoshi:

:zaeed:

:zoid:

:arnie:

:bick:

:bigdog:

:byob1:

:kheldragar:

:trumppop:

:2bong:

:350:

:420:

:beerpal:

:berned:

:bernin:

:birddrugs:

:catdrugs:

:chillpill:

:coffeepal:

:dominic:

:drugnerd:

:ducksiren:

:frogdowns:

:lsd:

:obama:

:okpos:

:rory:

:rznv:

:shroom:

:tinsley:

:weed:

:abrathink:

:abuela:

:acab:

:agreed:

:alexa:

:ali:

:aliexpress:

:aronrex:

:atlus:

:auspol:

:baath:

:baduk:

:barry:

:basta:

:bern101:

:bernchloe:

:bernget20:

:berninator:

:bernout:

:bernpop:

:bgc:

:blindside:

:boehner:

:borked:

:boston:

:brainworms:

:brainworms:

:brexit:

:brnsndcstl:

:brrring:

:bsloppy:

:bungie:

:burgerpug:

:buttfame:

:byoscience:

:c2b:

:capitalism:

:caro:

:catte:

:centrism:

:chast2b:

:cheerdoge:

:chickbutt:

:chloe:

:chome:

:chud:

:cloud:

:co:

:cocaine:

:comfyoot:

:comfysamus:

:comfyzelda:

:commcbg:

:concerned:

:coolspot:

:corona:

:cosmic2day:

:crab:

:crafty:

:crenshaw:

:crnasickos:

:crobear:

:crossange:

:cursed:

:dadjoke:

:dale:

:dare:

:daryl:

:dbuddy:

:deadmau5:

:decorum:

:dehumanize:

:destiny:

:distonk:

:dksays:

:dogcited:

:dogge:

:doggo:

:dogtits:

:dogwhistle:

:downsa:

:dudsmile:

:dunkedon:

:dva:

:egosoft:

:elongate:

:emptyquote:

:emptyquote:

:enkidel:

:eonwe:

:evilbuddy:

:eyepoop:

:fag:

:farf:

:fatshark:

:females:

:ffg:

:ffgqa:

:fishmech:

:five:

:fivecbux:

:flip:

:flipoff:

:fluffy:

:freakfuta:

:freakout:

:frogleave:

:frolf:

:frontear:

:fuckthis:

:fuzzknot:

:gaysper:

:gaz:

:gb2nitecru:

:gb2tfr:

:gdj:

:gerard:

:getgud:

:gethill:

:gitgud:

:gitgudhorn:

:glompoff:

:goatdrugs:

:golf:

:goodshit:

:goofy:

:goose:

:great:

:gritin:

:gritty:

:grovertoot:

:hai:

:haibrow:

:happened:

:harambe:

:hek:

:help:

:heritage:

:hmbol:

:hmmno:

:hmmorks:

:hmmyes:

:honked:

:how:

:hundi:

:hydrated:

:ice:

:iceland:

:iiasb:

:iiasm:

:iidx:

:iiniku:

:iit:

:itoilet:

:jackbud:

:jackin:

:jail2:

:jail:

:jamez:

:jebcry:

:jerry:

:jollywell:

:jpmf:

:judas:

:justass:

:justflu:

:justpub:

:justtrans:

:kav:

:kayak:

:kazooieass:

:killemall:

:killing:

:kiss:

:knope:

:krust:

:landy:

:letsplay:

:lewd:

:lewis:

:liberalism:

:lofty:

:lrpage2:

:luca:

:luckyducky:

:majorminor:

:matters:

:mayo:

:mediocre:

:member:

:meowth:

:metis:

:mets:

:miedo:

:minnie:

:mods:

:mome:

:mood:

:mummyface:

:murder:

:myballs:

:nah:

:nallears:

:namazu:

:neelix:

:neet:

:newdanger:

:nfpa:

:nice:

:nomates:

:nsacloud:

:nsallears:

:nsamad:

:nsavince:

:ntlised:

:nutshot:

:nz:

:oh:

:ohno:

:ohyeah:

:ok:

:orb:

:pants:

:peace:

:peanut:

:pepper:

:pepsi:

:perfect:

:petdog:

:pgabz:

:piaa:

:pigoff:

:pisstape:

:pkmnwhy:

:poolgirl:

:popeye:

:posthaste:

:potg:

:pram:

:preacher:

:proof:

:protogas:

:pubstove:

:puckin:

:puckout:

:purfect:

:qqpeters:

:quig:

:randno:

:randpop:

:randstare:

:randvince:

:razorback2:

:razorback:

:razorfront:

:redflag:

:refurb:

:rgb:

:right:

:rockstar:

:rodtronics:

:rowdytrout:

:sad:

:sadcoke:

:sadday:

:sadpeanut:

:salt:

:same:

:sandance:

:sanix:

:schotty:

:scott:

:scrunt:

:secondpost:

:secsmug:

:sever:

:shehuck:

:sherman:

:shibe:

:shillary:

:shitman:

:shittydog:

:shittypop:

:shucks:

:shuckyes:

:shudder:

:si:

:skeltal:

:sloppy:

:smallbarf:

:smilie:

:smoobles:

:smooth:

:sniff:

:snod:

:snoo:

:sora:

:spiderguy:

:splotter:

:spock:

:squawk:

:stwoon:

:success:

:sueme:

:suezo:

:suicide101:

:sureboat:

:swanlake:

:swinson:

:swish:

:tandp:

:tem:

:tesla:

:teslaget:

:texas:

:thanks:

:thatsrad:

:thembeans:

:therapy:

:theroni:

:thesperg:

:thinkdorm:

:torygov:

:treemike:

:trumpfap:

:trumpsmug:

:trustme:

:twisty:

:ullerrm:

:umberto:

:un:

:vapes:

:vomarine:

:vrfrog:

:war:

:weasel:

:wedass:

:weedass:

:weiner:

:wellpiss:

:whatfor:

:widowsnypa:

:wms:

:woomy:

:wrong:

:wrongcity:

:wtchris:

:wtfdude:

:yaybutt:

:yeah:

:yeeclaw:

:yeshaha:

:yiikes:

:yokotaro:

:yooge:

:yosnice:

:yossame:

:yowie:

:zaurg:

:zenpop:

:zoomed:
`;

const arr = smileyString.split('\n');

console.log(arr.length);

const smileyArray = arr.filter((item) => !!item.length);

console.log(smileyArray.length);

const smilies = JSON.stringify(smileyArray);

const fs = require('fs');

fs.writeFile('smiley', smilies, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('The file was saved!');
});
