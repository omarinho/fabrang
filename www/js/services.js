// This library is a sort of "facade" to make API calls 

/***
 ***
 ***      
      INITIALLY THIS IS NOT CALLING ANY REAL API - IT IS WORKING WITH HARDCODED DATA. 
      YOU NEED TO REPLACE THIS WITH THE PROPER API CALLS. 
 ***
 ***                                            
 ***/
 var HARDCODED_DATABASE = [
                {id:"98", name:"Farbeissen", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:"0.1", todaySchedule:"7AM - 7PM"},
                {id:"51", name:"Chai Town", waitTime:"20", cuisineTypes:"Chinese", minimunPrice:"10.00", pricesLevel:"4", rating:"4.0", live_deal:true, endingTime:'O:14:05', distance:"0.4", todaySchedule:"7AM - 8PM"},
                {id:"112", name:"Gorin's Cafe", waitTime:"25", cuisineTypes:"Israel", minimunPrice:"7.80", pricesLevel:"3", rating:"2.0", live_deal:false, endingTime:'', distance:"1.0", todaySchedule:"8AM - 9PM"},
                {id:"1", name:"A&W Restaurants", waitTime:"9", cuisineTypes:"American", minimunPrice:"3.00", pricesLevel:"1", rating:"4.0", live_deal:false, endingTime:'', distance:"3.6", todaySchedule:"9AM - 10PM"},
                {id:"2", name:"America's Incredible Pizza Company", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"3", name:"Amigos/Kings Classic", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"4", name:"Applebee's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"5", name:"Arby's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"6", name:"Arctic circle restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"7", name:"Arthur treacher's fish & chips", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"8", name:"Atlanta bread company", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"9", name:"Auntie anne's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"10", name:"Bahama breeze", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"11", name:"Baja fresh", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"12", name:"Bakers square", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"13", name:"Baskin-robbins", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"14", name:"Beef o'brady's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"15", name:"Ben & jerry's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"16", name:"Benihana", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"17", name:"Bennigan's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"18", name:"Bertucci's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"19", name:"Big boy", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"20", name:"Bikinis sports bar & grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"21", name:"Bj's restaurant & brewery", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"22", name:"Black angus steakhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"23", name:"Black-eyed pea", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"24", name:"Blake's lotaburger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"25", name:"Blimpie", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"26", name:"Bob evans restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"27", name:"Bojangles' famous chicken 'n biscuits", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"28", name:"Bonefish grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"29", name:"Boston market", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"30", name:"Braum's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"31", name:"Bravo! cucina italiana", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"32", name:"Brio", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"33", name:"Bubba gump shrimp company", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"34", name:"Buca di beppo", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"35", name:"Buffalo wild wings", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"36", name:"Burger king", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"37", name:"Burger street", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"38", name:"Burgerville", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"39", name:"Cafe rio", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"40", name:"California pizza kitchen", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"41", name:"California tortilla", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"42", name:"Camille's sidewalk cafe", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"43", name:"The capital grille", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"44", name:"Captain d's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"45", name:"Carino's italian grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"46", name:"Carl's jr.", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"47", name:"Carrabba's italian grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"48", name:"Carrows", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"49", name:"Carvel ice cream", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"50", name:"Champps americana", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"52", name:"Charlie brown's fresh grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"53", name:"Checkers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"54", name:"Cheddar's casual café", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"55", name:"Cheeburger cheeburger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"56", name:"Cheeseburger in paradise", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"57", name:"Cheesecake factory", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"58", name:"Chester fried chicken", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"59", name:"Chick-fil-a", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"61", name:"Chicken express", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"62", name:"Chili's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"64", name:"Chipotle mexican grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"65", name:"Chronic tacos", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"66", name:"Chuck-a-rama", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"67", name:"Chuck e. cheese's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"68", name:"Church's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"69", name:"Cici's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"70", name:"Cinnabon", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"71", name:"Claim jumper", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"72", name:"Coco's bakery", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"73", name:"Cold stone creamery", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"74", name:"Copeland's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"75", name:"Cotton patch café", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"76", name:"Country buffet", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"77", name:"Cracker barrel old country store", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"78", name:"Culver's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"79", name:"Dairy queen", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"80", name:"Damon's grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"81", name:"Dave & buster's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"82", name:"Del taco", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"83", name:"Denny's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"84", name:"Dixie chili and deli", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"85", name:"Domino's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"86", name:"Don pablo's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"87", name:"Donatos pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"88", name:"Dunkin' donuts", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"89", name:"East of chicago pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"90", name:"Eat'n park", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"91", name:"Eatzi's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"92", name:"Eegee's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"93", name:"El chico", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"94", name:"El pollo loco", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"95", name:"El taco tote", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"96", name:"Elephant bar", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"97", name:"Famous dave's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"99", name:"Fatburger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"100", name:"Fatz", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"101", name:"Fazoli's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"102", name:"Five guys famous burgers and fries", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"103", name:"Fleming's prime steakhouse & wine bar", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"104", name:"Freddy's frozen custard & steakburgers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"105", name:"Freebirds world burrito", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"106", name:"Fresh choice", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"107", name:"Friendly's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"108", name:"Fuddruckers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"109", name:"Gameworks", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"110", name:"Gatti's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"111", name:"Gino's pizza and spaghetti", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"113", name:"Gold star chili", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"114", name:"Golden chick", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"115", name:"Golden corral", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"116", name:"Green burrito", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"117", name:"Ground round", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"118", name:"Ha'achim Yarden Ve'Shia Restaurant", waitTime:"20", cuisineTypes:"Cafe, Dairy", minimunPrice:"5.00", pricesLevel:"1", rating:"3", live_deal:false, endingTime:'', distance:"1.2"},
                {id:"119", name:"Hardee's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"120", name:"Hobee's restaurant", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"121", name:"Hooters", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"122", name:"Houlihan's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"123", name:"Houston's restaurant", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"124", name:"Howard johnson's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"125", name:"Huddle house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"126", name:"Huhot mongolian grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"127", name:"Hungry howie's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"128", name:"Hwy 55 burgers shakes & fries", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"129", name:"Ihop", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"130", name:"In-n-out burger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"131", name:"Jack in the box", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"132", name:"Jack's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"133", name:"Jamba juice", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"134", name:"Jason's deli", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"135", name:"Jerry's subs & pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"136", name:"Jersey mike's subs", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"137", name:"Jet's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"138", name:"Jimmy john's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"139", name:"Jim's restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"140", name:"Joe's crab shack", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"141", name:"Johnny rockets", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"142", name:"John's incredible pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"143", name:"Ker's winghouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"144", name:"Kfc", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"145", name:"Krispy kreme", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"146", name:"Krystal", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"147", name:"L&l hawaiian barbecue", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"148", name:"Landry's restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"149", name:"Ledo pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"150", name:"Lee roy selmon's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"151", name:"Lee's famous recipe chicken", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"152", name:"Little caesars", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"153", name:"Logan's roadhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"154", name:"Lone star steakhouse & saloon", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"155", name:"Long john silver's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"156", name:"Longhorn steakhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"157", name:"Luby's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"158", name:"Lyon's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"159", name:"Maggiano's little italy", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"160", name:"Marie callender's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"161", name:"Mazzio's italian eatery", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"162", name:"Max & erma's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"163", name:"Mcalister's deli", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"164", name:"Mcdonald's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"165", name:"The melting pot", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"166", name:"Miller's ale house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"167", name:"Milo's hamburgers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"168", name:"Mitchell's fish market", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"169", name:"Moe's southwest grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"170", name:"Monical's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"171", name:"Montana mike's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"172", name:"Mr. hero", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"173", name:"Mrs. fields", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"174", name:"National coney island", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"175", name:"Naugles", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"176", name:"Noodles & company", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"177", name:"O'charley's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"178", name:"Old country buffet", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"179", name:"The old spaghetti factory", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"180", name:"Olive garden", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"181", name:"On the border mexican grill & cantina", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"182", name:"The original italian pie", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"183", name:"The original pancake house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"184", name:"Outback steakhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"185", name:"P. f. chang's china bistro", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"186", name:"Panda express", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"187", name:"Panera bread", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"188", name:"Papa gino's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"189", name:"Papa john's pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"190", name:"Papa murphy's take 'n' bake pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"191", name:"Pei wei asian diner", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"192", name:"Penn station east coast subs", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"193", name:"Perkins restaurant and bakery", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"194", name:"Pita pit", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"195", name:"Pizza hut", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"196", name:"Pizza inn", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"197", name:"Pizza ranch", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"198", name:"Planet hollywood", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"199", name:"Ponderosa steakhouse and bonanza steakhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"200", name:"Popeyes chicken & biscuits", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"201", name:"Port of subs", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"202", name:"Portillo's restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"203", name:"Potbelly sandwich works", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"204", name:"Qdoba mexican grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"205", name:"Quaker steak & lube", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"206", name:"Quiznos", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"207", name:"Ra sushi", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"208", name:"Rainforest cafe", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"209", name:"Raising cane's chicken fingers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"210", name:"Rally's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"211", name:"Rax", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"212", name:"Red hot & blue", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"213", name:"Red lobster", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"214", name:"Red robin", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"215", name:"Redstone american grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"216", name:"Robeks", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"217", name:"Rock bottom", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"218", name:"Romano's macaroni grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"219", name:"Round table pizza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"220", name:"Roy rogers restaurants", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"221", name:"Roy's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"222", name:"Rubio's fresh mexican grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"223", name:"Ruby tuesday", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"224", name:"Runza", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"225", name:"Ruth's chris steak house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"226", name:"Saladworks", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"227", name:"Sbarro", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"228", name:"Schlotzsky's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"229", name:"Seasons 52", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"230", name:"Seattle's best coffee", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"231", name:"Shake shack", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"232", name:"Shane's rib shack", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"233", name:"Shoney's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"234", name:"Showmars", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"235", name:"Sizzler", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"236", name:"Skyline chili", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"237", name:"Smashburger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"238", name:"Smokey bones", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"239", name:"Sneaky pete's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"240", name:"Sonic drive-in", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"241", name:"Souplantation and sweet tomatoes", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"242", name:"Spaghetti warehouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"243", name:"Spangles", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"244", name:"St. louis bread company", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"245", name:"Starbucks", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"246", name:"Steak 'n shake", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"247", name:"Sticky fingers", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"248", name:"Stir crazy", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"249", name:"Sub station ii", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"250", name:"Subway", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"251", name:"Sweet tomatoes", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"252", name:"Swensen's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"253", name:"Swensons", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"254", name:"T.G.I. friday's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"255", name:"Taco bell", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"256", name:"Taco bueno", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"257", name:"Taco john's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"259", name:"Taco mayo", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"260", name:"Taco tico", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"261", name:"Taco time", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"262", name:"Texas roadhouse", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"263", name:"Tijuana flats", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"264", name:"Tilted kilt", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"265", name:"Tony roma's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"266", name:"Trader vic's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"267", name:"Twin peaks", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"268", name:"Umami burger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"269", name:"Uncle maddio's pizza joint", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"270", name:"Uno chicago grill", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"271", name:"Valentino's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"272", name:"Village inn", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"273", name:"Waffle house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"274", name:"Wendy's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"275", name:"Wetzel's pretzels", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"276", name:"Whataburger", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"277", name:"Which wich?", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"278", name:"White castle", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"279", name:"Wienerschnitzel", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"280", name:"Wild wing cafe", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"281", name:"York steak house", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"282", name:"Zaxby's", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"},
                {id:"283", name:"Zip's drive-in", waitTime:"15", cuisineTypes:"Chassidic", minimunPrice:"7.70", pricesLevel:"2", rating:"1.6", live_deal:false, endingTime:'', distance:'5.2', todaySchedule:"6AM-7PM"}
          ]

angular.module('starter.services',[])

.factory('SearchService', 
  ['$http', 
    function( $http ) {
                                 
      var functions = {
      
        /**
        * getCuisineFilters - Get all possible filters for cuisine type 
        * @param scope - Ionic scope
        * @returns {*} - will return an array of objects. Each object is a cuisine filter  
        */       
        getCuisineFilters: function() {
           return [{name:'CHINESE', type:'CUISINE'}, {name:'ISRAELI', type:'CUISINE'}, {name:'THAI', type:'CUISINE'}, {name:'JAPANESE', type:'CUISINE'}];
        },

        /**
        * getDietFilters - Get all possible filters for diet type 
        * @param scope - Ionic scope
        * @returns {*} - will return an array of objects. Each object is a cuisine filter  
        */       
        getDietFilters: function() {
           return [{name:'VEGAN', type:'DIET'}, {name:'KOSHER', type:'DIET'}, {name:'NON-GMO', type:'DIET'}, {name:'VEGETARIAN', type:'DIET'}];
        },

        /**
        * getSettingFilters - Get all possible filters for setting type 
        * @param scope - Ionic scope
        * @returns {*} - will return an array of objects. Each object is a cuisine filter  
        */       
        getSettingFilters: function() {
           return [{name:'TAKE-OUT', type:'SETTING'}, {name:'FANCY', type:'SETTING'}, {name:'BUFFET', type:'SETTING'}, {name:'FAST FOOD', type:'SETTING'}];
        },

        /**
        * getFeaturesFilters - Get all possible filters for features type 
        * @param scope - Ionic scope
        * @returns {*} - will return an array of objects. Each object is a cuisine filter  
        */       
        getFeaturesFilters: function() {
           return [{name:'REWARDS', type:'FEATURES'}, {name:'NO MIN', type:'FEATURES'}, {name:'SALE', type:'FEATURES'}, {name:'INAUGURATION', type:'FEATURES'}];
        },

        /**
        * getLocationsAndPlaces - Get all locations and places available to search (enter manually) 
        * @param scope - Ionic scope
        * @returns {*} - will return an array of objects. Each object is a place or location and has an id and a name  
        */       
        getLocationsAndPlaces: function($scope) {
           $scope.places = HARDCODED_DATABASE;
        }
      
      }
      
      return functions;

    }
  ]
)

.factory('ResultsService', 
  ['$http', 
    function( $http ) {
      
      var functions = {
      
        /**
        * getLocationsByProximity - Get places close to the user location, sorted by distance
        * @param scope - Ionic scope
        * @param activeFilters - Active filters (miscelaneous)
        * @param activeServiceType - Active filters (Service type: 'DELIVERY', 'PICK UP', 'RESERVATION')
        * @param activePriceRange - Active filters (Prices level: 1, 2, 3, 4 with 1=less expensive and 4=more expensive) 
        * @param filterRating - Active filter for ratings (get only places with 'n' stars with 'n' = filterRating)
        * @returns {*} - will return an array of objects. Each object is a place or location and has an id, a name, distance, wait time, cuisine types, minimum price, prices level, rating, if ending, and endingTime   
        */       
        getLocationsByProximity: function(
          $scope,
          activeFilters, 
          activeServiceType, 
          activePriceRange, 
          filterRating          
        ) {
          $scope.closePlaces = HARDCODED_DATABASE.slice(0, 10);;
        }
      
      }
      
      return functions;
    
    }
  ]
)
 
.factory('FavoritesService', 
  ['$http', 
    function( $http, $rootScope ) {
      
      var functions = {
      
        /**
        * saveStore - Save store in the user favorites
        * @param scope - Ionic scope
        * @param storeID - ID of store
        * @returns {*} - Return true   
        */       
        saveStore: function($scope, storeID) {
          $scope.alerti('Store saved in your favorites!','Success');          
          return true; 
        }
      
      }
      
      return functions;
    
    }
  ]
)

.factory('StoreService', 
  ['$http', 
    function( $http ) {
      
      var functions = {
      
        /**
        * getStoreData - Get data of a store 
        * @param scope - Ionic scope
        * @param storeID - ID of store
        * @returns {*} - Return true   
        */       
        getStoreData: function($scope, storeID) {
          $scope.store = searchObjectByID(storeID, HARDCODED_DATABASE)     
          return true; 
        },
        
        /**
        * getStoreMoreInfo - Get moreInfo (todaySchedule, address and phone) of a store 
        * @param scope - Ionic scope
        * @param storeID - ID of store
        * @returns {*} - will complete the variable $scope.store    
        */       
        getStoreMoreInfo: function($scope, storeID) {
          $scope.store.weekSchedule = [
            {dayIndex:0, dayName:'Sunday', hours:'10 am - 8 pm'},
            {dayIndex:1, dayName:'Monday', hours:'6 am - 12 pm'},
            {dayIndex:2, dayName:'Tuesday', hours:'6 am - 12 pm'},
            {dayIndex:3, dayName:'Wednesday', hours:'6 am - 12 pm'},
            {dayIndex:4, dayName:'Thursday', hours:'10 am - 8 pm'},
            {dayIndex:5, dayName:'Friday', hours:'7 am - 7 pm'},
            {dayIndex:6, dayName:'Saturday', hours:'10 am - 8 pm'}
          ] 
          $scope.store.address = '1414 President St';
          $scope.store.location = 'Brooklin';
          $scope.store.state = 'NY';
          $scope.store.zipCode = '11213';
          $scope.store.phone = '718-770-7770';
        }, 
        
        /**
        * getStoreReviews - Get reviews of a store  
        * @param scope - Ionic scope
        * @param storeID - ID of store
        * @param userID - ID of logged user (to identify reviews donde by himself)
        * @param sort -  'ASC' (oldest to newest) or 'DESC' (newest to oldest). 'DESC' is the default 
        * @returns {*} - Objects array in $scope.store.reviews    
        */       
        getStoreReviews: function($scope, storeID, userID, sort) {
          if (sort == 'DESC') { 
            $scope.store.reviews = [
              {id:1, userid:1, username:"J.K. Rowling", rating:"4.0", title:"Crazy awesome!!!", date:"July 7, 2016", content:"Excuse my french but This. Is. The. Sh*t! Utterly crazy. I've never been to a place with such a great variery of every blah blah blah  blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"},
              {id:2, userid:2, username:"Gary H.",  rating:"3.0", title:"Good Food!", date:"August 13, 2016", content:"Great stuff, loved it!"},
              {id:3, userid:3, username:"Gary H.",  rating:"4.0", title:"Delicious, yeee", date:"August 10, 2016", content:""}
            ]
          }
          if (sort == 'ASC') {
            $scope.store.reviews = [
              {id:3, userid:3, username:"Gary H.",  rating:"4.0", title:"Delicious, yeee", date:"August 10, 2016", content:""},
              {id:2, userid:2, username:"Gary H.",  rating:"3.0", title:"Good Food!", date:"August 13, 2016", content:"Great stuff, loved it!"},
              {id:1, userid:1, username:"J.K. Rowling", rating:"4.0", title:"Crazy awesome!!!", date:"July 7, 2016", content:"Excuse my french but This. Is. The. Sh*t! Utterly crazy. I've never been to a place with such a great variery of every blah blah blah  blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"}
            ]
          }
        }        
      
      }
      
      return functions;
    
    }
  ]
)

.factory('UsersService', 
  ['$http', 
    function( $http ) {
      
      var functions = {
      
        /**
        * getUserID - Get the ID of current logged user (most probably will be stored in localStorage collection)
        * @returns {*} - Return current user ID   
        */       
        getUserID: function() {
          return 1; 
        }
      
      }
      
      return functions;
    
    }
  ]
)

.factory('SessionService',
  ['$http',
    function($http){
      return {
        set:function(key,value) {
          return localStorage.setItem(key,JSON.stringify(value));
        },
        get:function(key) {
          return JSON.parse(localStorage.getItem(key));
        },
        destroy:function(key) {
          return localStorage.removeItem(key);
        },
      };
    }
  ]
)

;