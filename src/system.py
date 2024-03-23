from sys import getprofile
import requests
import json
import math


# https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=1
# Return just the player nicknames

def searchPlayer(nickname):
    query = {
        'game': 'aoe2de',
        'leaderboard_id': '3',
        'start': '1',
        'count': '10000',
        'search': nickname
    }

    response = requests.get("https://aoe2.net/api/leaderboard", params=query)

    players = response.json()

    nicks = {"Name":[]}

    for y in range(len(players['leaderboard'])):
        nicks["Name"].append(players['leaderboard'][y]["name"] + " - " + str(players['leaderboard'][y]["rating"]))
    
    return nicks
 ############################################################################### 


# https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=1
# Player details

def getPlayer(nickname):
    query = {
        'game': 'aoe2de',
        'leaderboard_id': '3',
        'start': '1',
        'count': '10000',
        'search': nickname
    }

    response = requests.get("https://aoe2.net/api/leaderboard", params=query)

    return response.json()
 ###############################################################################   

 # https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=1
# Player steam_id

def getPlayerProfile_id(nickname):
    player = ""

    query = {
        'game': 'aoe2de',
        'leaderboard_id': '3',
        'start': '1',
        'count': '10000',
        'search': nickname
    }

    response = requests.get("https://aoe2.net/api/leaderboard", params=query)
       
    players = response.json()

    for y in range(len(players['leaderboard'])):
        if players['leaderboard'][y]["name"]==nickname:
            player = players['leaderboard'][y]["profile_id"]

    return player
 ###############################################################################  


#https://aoe2.net/api/player/matches?game=aoe2de&steam_id=76561199003184910&count=5
# Player Match History

def getMatchHist(nickname,count_start,count_end):
    
    player = getPlayerProfile_id(nickname);
    
    query = {
        'game': 'aoe2de',
        'profile_id': player,
        'leaderboard_id': 3,
        'start': count_start,
        'count': count_end
    }

    response = requests.get("https://aoe2.net/api/player/matches", params=query)

    return response.json()
####################################################################################


def getMatchHistQty(nickname):
    
    player = getPlayerProfile_id(nickname);
    
    query = {
        'game': 'aoe2de',
        'leaderboard_id': 3,
        'profile_id': player,

    }

    response = requests.get("https://aoe2.net/api/leaderboard", params=query)

    matches = response.json()

    return matches["leaderboard"][0]["games"]

####################################################################################


## 1 vs 1 Match statistics
def matchStats(nick1,nick2):

    player1 = 0
    player2 = 0
    newlist = []

    nick1Qty = getMatchHistQty(nick1)
    nick2Qty = getMatchHistQty(nick2)

    qtyMatches = nick1Qty if (nick1Qty > nick2Qty) else nick2Qty

    searchTimes = math.ceil(qtyMatches / 1000)

    print("SearchTimes: ", searchTimes)

    matchNick = nick1 if (nick1Qty > nick2Qty) else nick2
    matchNick2 = nick1 if (nick1Qty < nick2Qty) else nick2

    print(matchNick)
    print(matchNick2)

    for i in range(searchTimes):
        if (i==0):
            matches = getMatchHist(matchNick,1,1000)
        else:
            matches = getMatchHist(matchNick,i*1000,i*1000+1000);        

        for y in range(len(matches)):
            if(matches[y]["num_players"]==2):
                if matches[y]["players"][0]["name"]==matchNick2 or matches[y]["players"][1]["name"]==matchNick2:
                    newlist.append(matches[y])

    for elem in newlist:
        if(elem["players"][0]["name"] == matchNick):
            if(elem["players"][0]["won"]):
                player1 = player1 + 1; 
            else:
                player2 = player2 + 1
        else:
            if(elem["players"][0]["won"]):
                player2 = player2 + 1
            else:
                player1 = player1 + 1

    thisdict = {
        "Matches": player1 + player2,
        "Player1": matchNick,
        "Player2": matchNick2,
        "Wins1": player1,
        "Wins2": player2
    }
   
    return thisdict
    
    

#print(matchStats("[bK] Paganini", "Survivalist"))
#print(matchStats("TchachaBR", "ello"))
#print(matchStats("miguel", "Survivalist"))



#print(getMatchHistQty("miguel"))
#print(getMatchHistQty("Survivalist"))

