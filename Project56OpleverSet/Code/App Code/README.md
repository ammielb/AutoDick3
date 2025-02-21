# App Code

## Waar welke code:
De benodigde codes voor het builden van de app zijn hier ook weer onder verschillende mapjes verdeeld.

Alle visuele pagina's zitten in de map: [./app/(tabs)](https://github.com/ammielb/AutoDick3/tree/master/Project56OpleverSet/Code/App%20Code/app/(tabs)). Hier bevind zich ook de code voor het loggen van alle vlaggen.

In de map [Components](https://github.com/ammielb/AutoDick3/tree/master/Project56OpleverSet/Code/App%20Code/components) kan je de [Timer functions](https://github.com/ammielb/AutoDick3/blob/master/Project56OpleverSet/Code/App%20Code/components/Timer.tsx), de [BLE functions](https://github.com/ammielb/AutoDick3/blob/master/Project56OpleverSet/Code/App%20Code/components/DeviceConnectionModal.tsx) en de styling voor de [navbar](https://github.com/ammielb/AutoDick3/blob/master/Project56OpleverSet/Code/App%20Code/components/NavBar.tsx).

In de map [assets](https://github.com/ammielb/AutoDick3/tree/master/Project56OpleverSet/Code/App%20Code/assets) kunnen de gebruikte fonts en images gevonden worden.


## If you want to change the admin account.
1. In app.json and eas.json. change the owner to the new owner account.
2. In app.json. change the project id to the new owners account ID. in their expo.dev account.



## Show keystore and build credentials
1. Use command 'eas credentials'


## Tutorial to turn this project into a APK
https://www.youtube.com/watch?v=3j9DcRCxrFg


## Script to make a build and get an APK in expo go
```
 eas build --profile preview  --platform android
```

## Ble CODES
De Ble codes worden aangegeven doormiddel van 3 of 4 cijferige getallen.\
Bijvoorbeeld: 2501\
Het eerste getal weergeeft de vlag in dit geval dus de 2 welke de klassenvlag representeert.\
Het middelstegetal of getallen weergeven het aantal seconden wat nog op de timer staat in dit geval dus nog 50 seconden.\
Het laatste getal weergeeft de actie 1 betekent hijsen 0 betekend strijken.\

### 00 Series: Toeter
- **01**: 1 kort  
- **02**: 1 lang    

### 2 Series: Klassevlag
- **2301**: 30 seconden tot hijsen  
- **2301**: 10 seconden tot hijsen  
- **251**: 5 seconden countdown hijsen  
- **2300**: 30 seconden tot strijken  
- **2100**: 10 seconden tot strijken  
- **251**: 5 seconden countdown strijken  

### 4 Series: Uniformvlag
- **4301**: 30 seconden tot hijsen  
- **4101**: 10 seconden tot hijsen  
- **451**: 5 seconden countdown hijsen  
- **4300**: 30 seconden tot strijken  
- **4100**: 10 seconden tot strijken  
- **450**: 5 seconden countdown strijken

### 5 Series: Zwartevlag
- **5301**: 30 seconden tot hijsen
- **5201**: 20 seconden tot hijsen
- **5101**: 10 seconden tot hijsen
- **5300**: 30 seconden tot strijken
- **5200**: 20 seconden tot strijken
- **5100**: 10 seconden tot strijken

### 6 Series: Papavlag
- **6301**: 30 seconden tot hijsen
- **6201**: 20 seconden tot hijsen
- **6101**: 10 seconden tot hijsen
- **6300**: 30 seconden tot strijken
- **6200**: 20 seconden tot strijken
- **6100**: 10 seconden tot strijken

## SD card sounds 

Op de SD kaart staan de files op volgorde maar voor het afspelen geld een andere volgorde waar nog naar gekeken moet worden.

    01. 30 seconden tot hijsen uniformvlag
    02. 10 seconden tot hijsen uniformvlag
    03. heisen uniformvlag
    04. 30 seconden tot strijken uniformvlag
    05. 10 seconden tot strijken uniformvlag
    06. strijken uniformvlag
    07. 30 seconden tot strijken zwartevlag
    08. 30 seconden tot hijsen klassenvlag
    09. 10 seconden tot hijsen klassenvlag
    10. heisen klassenvlag
    11. 30 seconden tot hijsen klassenvlag
    12. 10 seconden tot hijsen klassenvlag
    13. strijken klassenvlag
    14. 30 seconden tot hijsen papavlag
    15. 10 seconden tot hijsen papavlag
    16. heisen papavlag
    17. 30 seconden tot strijken papavlag
    18. 10 seconden tot strijken papavlag
    19. strijken papavlag
    20. zwartevlag heisen
    21. 10 seconden tot strijken zwartevlag
    22. zwartevlag strijken
    23. 60 seconden tot start
    24. 50 seconden tot start
    25. 40 seconden tot start
    26. 20 seconden tot start
    27. oranje vlag hijsen
    28. oranje vlag strijken
    29. 30 seconden tot strijken oranjevlag 
    30. 10 seconden tot strijken oranjevlag
    31. 30 seconden tot hijsen zwartevlag
    32. 10 seconden tot hijsen zwartevlag
    33. 10 seconden tot hijsen oranjevlag
    34. 30 seconden tot hijsen oranjevlag




## changelog
| Wie | Wijzegingen| Wanneer | 
|-----|--------|--|
|Ivo Bruinsma| Toevoegen "Waar welke code" |21-02-2025|