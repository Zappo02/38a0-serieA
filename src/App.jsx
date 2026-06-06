import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";

// =================================================================
// SERIE A 38-0 — Build The Greatest Serie A XI
// Dataset: 720 giocatori reali, stagioni 2023-24 / 2024-25 / 2025-26
// =================================================================

const PLAYERS = [{"id":0,"n":"N. Barella","c":"Inter","s":"2025-26","r":"CM","rt":88,"rg":["CDM","CM"],"pid":0},{"id":1,"n":"L. Martínez","c":"Inter","s":"2025-26","r":"ST","rt":88,"rg":["ST"],"pid":1},{"id":2,"n":"A. Bastoni","c":"Inter","s":"2025-26","r":"CB","rt":87,"rg":["CB"],"pid":2},{"id":3,"n":"M. Maignan","c":"AC Milan","s":"2025-26","r":"GK","rt":87,"rg":["GK"],"pid":3},{"id":4,"n":"K. De Bruyne","c":"Napoli","s":"2025-26","r":"CM","rt":87,"rg":["CAM","CM"],"pid":4},{"id":5,"n":"Y. Sommer","c":"Inter","s":"2025-26","r":"GK","rt":86,"rg":["GK"],"pid":5},{"id":6,"n":"H. Çalhanoğlu","c":"Inter","s":"2025-26","r":"CDM","rt":86,"rg":["CDM","CM"],"pid":6},{"id":7,"n":"F. Dimarco","c":"Inter","s":"2025-26","r":"LB","rt":86,"rg":["LB"],"pid":7},{"id":8,"n":"Bremer","c":"Juventus","s":"2025-26","r":"CB","rt":86,"rg":["CB"],"pid":8},{"id":9,"n":"S. McTominay","c":"Napoli","s":"2025-26","r":"CM","rt":86,"rg":["CAM","CDM","CM"],"pid":9},{"id":10,"n":"M. Carnesecchi","c":"Atalanta","s":"2025-26","r":"GK","rt":85,"rg":["GK"],"pid":10},{"id":11,"n":"M. Thuram","c":"Inter","s":"2025-26","r":"ST","rt":85,"rg":["ST"],"pid":11},{"id":12,"n":"L. Modrić","c":"AC Milan","s":"2025-26","r":"CM","rt":85,"rg":["CAM","CDM","CM"],"pid":12},{"id":13,"n":"A. Rabiot","c":"AC Milan","s":"2025-26","r":"CM","rt":85,"rg":["CAM","CDM","CM"],"pid":13},{"id":14,"n":"C. Pulisic","c":"AC Milan","s":"2025-26","r":"RW","rt":85,"rg":["RW","ST"],"pid":14},{"id":15,"n":"P. Dybala","c":"Roma","s":"2025-26","r":"CAM","rt":85,"rg":["CAM","ST"],"pid":15},{"id":16,"n":"D. Dumfries","c":"Inter","s":"2025-26","r":"RB","rt":84,"rg":["RB"],"pid":16},{"id":17,"n":"M. Locatelli","c":"Juventus","s":"2025-26","r":"CDM","rt":84,"rg":["CDM","CM"],"pid":17},{"id":18,"n":"Rafael Leão","c":"AC Milan","s":"2025-26","r":"LW","rt":84,"rg":["LW","ST"],"pid":18},{"id":19,"n":"G. Mancini","c":"Roma","s":"2025-26","r":"CB","rt":84,"rg":["CB"],"pid":19},{"id":20,"n":"M. Svilar","c":"Roma","s":"2025-26","r":"GK","rt":84,"rg":["GK"],"pid":20},{"id":21,"n":"De Gea","c":"Fiorentina","s":"2025-26","r":"GK","rt":84,"rg":["GK"],"pid":21},{"id":22,"n":"H. Mkhitaryan","c":"Inter","s":"2025-26","r":"CM","rt":83,"rg":["CAM","CM"],"pid":22},{"id":23,"n":"S. de Vrij","c":"Inter","s":"2025-26","r":"CB","rt":83,"rg":["CB"],"pid":23},{"id":24,"n":"F. Acerbi","c":"Inter","s":"2025-26","r":"CB","rt":83,"rg":["CB"],"pid":24},{"id":25,"n":"M. Akanji","c":"Inter","s":"2025-26","r":"CB","rt":83,"rg":["CB"],"pid":25},{"id":26,"n":"M. Zaccagni","c":"Lazio","s":"2025-26","r":"LW","rt":83,"rg":["LW"],"pid":26},{"id":27,"n":"I. Provedel","c":"Lazio","s":"2025-26","r":"GK","rt":83,"rg":["GK"],"pid":27},{"id":28,"n":"R. Lukaku","c":"Napoli","s":"2025-26","r":"ST","rt":83,"rg":["ST"],"pid":28},{"id":29,"n":"S. Lobotka","c":"Napoli","s":"2025-26","r":"CM","rt":83,"rg":["CDM","CM"],"pid":29},{"id":30,"n":"G. Di Lorenzo","c":"Napoli","s":"2025-26","r":"RB","rt":83,"rg":["CB","CM","RB"],"pid":30},{"id":31,"n":"A. Zambo Anguissa","c":"Napoli","s":"2025-26","r":"CM","rt":83,"rg":["CAM","CM"],"pid":31},{"id":32,"n":"A. Rrahmani","c":"Napoli","s":"2025-26","r":"CB","rt":83,"rg":["CB"],"pid":32},{"id":33,"n":"R. Orsolini","c":"Bologna","s":"2025-26","r":"RW","rt":83,"rg":["RW"],"pid":33},{"id":34,"n":"M. Kean","c":"Fiorentina","s":"2025-26","r":"ST","rt":83,"rg":["ST"],"pid":34},{"id":35,"n":"C. De Ketelaere","c":"Atalanta","s":"2025-26","r":"CAM","rt":82,"rg":["CAM","CM","ST"],"pid":35},{"id":36,"n":"Éderson","c":"Atalanta","s":"2025-26","r":"CM","rt":82,"rg":["CDM","CM"],"pid":36},{"id":37,"n":"L. Openda","c":"Juventus","s":"2025-26","r":"ST","rt":82,"rg":["CAM","ST"],"pid":37},{"id":38,"n":"K. Yıldız","c":"Juventus","s":"2025-26","r":"CAM","rt":82,"rg":["CAM","CM","LW"],"pid":38},{"id":39,"n":"A. Romagnoli","c":"Lazio","s":"2025-26","r":"CB","rt":82,"rg":["CB"],"pid":39},{"id":40,"n":"A. Meret","c":"Napoli","s":"2025-26","r":"GK","rt":82,"rg":["GK"],"pid":40},{"id":41,"n":"A. Buongiorno","c":"Napoli","s":"2025-26","r":"CB","rt":82,"rg":["CB"],"pid":41},{"id":42,"n":"R. Freuler","c":"Bologna","s":"2025-26","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":42},{"id":43,"n":"W. Falcone","c":"Lecce","s":"2025-26","r":"GK","rt":82,"rg":["GK"],"pid":43},{"id":44,"n":"Nico Paz","c":"Como","s":"2025-26","r":"CAM","rt":82,"rg":["CAM","CM","ST"],"pid":44},{"id":45,"n":"D. Berardi","c":"Sassuolo","s":"2025-26","r":"RW","rt":82,"rg":["RW"],"pid":45},{"id":46,"n":"M. de Roon","c":"Atalanta","s":"2025-26","r":"CM","rt":81,"rg":["CDM","CM"],"pid":46},{"id":47,"n":"P. Zieliński","c":"Inter","s":"2025-26","r":"CM","rt":81,"rg":["CAM","CDM","CM"],"pid":47},{"id":48,"n":"D. Frattesi","c":"Inter","s":"2025-26","r":"CM","rt":81,"rg":["CDM","CM"],"pid":48},{"id":49,"n":"Carlos Augusto","c":"Inter","s":"2025-26","r":"LB","rt":81,"rg":["CB","LB"],"pid":49},{"id":50,"n":"M. Di Gregorio","c":"Juventus","s":"2025-26","r":"GK","rt":81,"rg":["GK"],"pid":50},{"id":51,"n":"J. David","c":"Juventus","s":"2025-26","r":"ST","rt":81,"rg":["ST"],"pid":51},{"id":52,"n":"D. Vlahović","c":"Juventus","s":"2025-26","r":"ST","rt":81,"rg":["ST"],"pid":52},{"id":53,"n":"K. Thuram","c":"Juventus","s":"2025-26","r":"CM","rt":81,"rg":["CDM","CM"],"pid":53},{"id":54,"n":"Mario Gila","c":"Lazio","s":"2025-26","r":"CB","rt":81,"rg":["CB"],"pid":54},{"id":55,"n":"C. Nkunku","c":"AC Milan","s":"2025-26","r":"CAM","rt":81,"rg":["CAM","CM","ST"],"pid":55},{"id":56,"n":"F. Tomori","c":"AC Milan","s":"2025-26","r":"CB","rt":81,"rg":["CB"],"pid":56},{"id":57,"n":"Y. Fofana","c":"AC Milan","s":"2025-26","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":57},{"id":58,"n":"M. Politano","c":"Napoli","s":"2025-26","r":"RW","rt":81,"rg":["RB","RW"],"pid":58},{"id":59,"n":"David Neres","c":"Napoli","s":"2025-26","r":"LW","rt":81,"rg":["LW"],"pid":59},{"id":60,"n":"C. Adams","c":"Torino","s":"2025-26","r":"ST","rt":78,"rg":["ST"],"pid":60},{"id":61,"n":"O. Solet","c":"Udinese","s":"2025-26","r":"CB","rt":78,"rg":["CB"],"pid":61},{"id":62,"n":"Ł. Skorupski","c":"Bologna","s":"2025-26","r":"GK","rt":78,"rg":["GK"],"pid":62},{"id":63,"n":"L. Ferguson","c":"Bologna","s":"2025-26","r":"CDM","rt":78,"rg":["CAM","CDM","CM"],"pid":63},{"id":64,"n":"J. Butez","c":"Como","s":"2025-26","r":"GK","rt":78,"rg":["GK"],"pid":64},{"id":65,"n":"M. Caqueret","c":"Como","s":"2025-26","r":"CM","rt":78,"rg":["CAM","CDM","CM"],"pid":65},{"id":66,"n":"E. Caprile","c":"Cagliari","s":"2025-26","r":"GK","rt":78,"rg":["GK"],"pid":66},{"id":67,"n":"Dodô","c":"Fiorentina","s":"2025-26","r":"RB","rt":78,"rg":["RB"],"pid":67},{"id":68,"n":"A. Guðmundsson","c":"Fiorentina","s":"2025-26","r":"ST","rt":78,"rg":["CAM","LW","ST"],"pid":68},{"id":69,"n":"R. Bellanova","c":"Atalanta","s":"2025-26","r":"RB","rt":77,"rg":["RB","RW"],"pid":69},{"id":70,"n":"L. Samardžić","c":"Atalanta","s":"2025-26","r":"CAM","rt":77,"rg":["CAM","CM"],"pid":70},{"id":71,"n":"N. Zalewski","c":"Atalanta","s":"2025-26","r":"CAM","rt":77,"rg":["CAM","LW"],"pid":71},{"id":72,"n":"P. Sučić","c":"Inter","s":"2025-26","r":"CM","rt":77,"rg":["CDM","CM"],"pid":72},{"id":73,"n":"A. Marušić","c":"Lazio","s":"2025-26","r":"RB","rt":77,"rg":["LB","RB"],"pid":73},{"id":74,"n":"S. Pavlović","c":"AC Milan","s":"2025-26","r":"CB","rt":77,"rg":["CB"],"pid":74},{"id":75,"n":"A. Jashari","c":"AC Milan","s":"2025-26","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":75},{"id":76,"n":"M. Olivera","c":"Napoli","s":"2025-26","r":"LB","rt":77,"rg":["CB","CM","LB"],"pid":76},{"id":77,"n":"E. Elmas","c":"Napoli","s":"2025-26","r":"CAM","rt":77,"rg":["CAM","CM"],"pid":77},{"id":78,"n":"K. Tsimikas","c":"Roma","s":"2025-26","r":"LB","rt":77,"rg":["LB"],"pid":78},{"id":79,"n":"Bryan Zaragoza","c":"Roma","s":"2025-26","r":"LW","rt":77,"rg":["CAM","LW"],"pid":79},{"id":80,"n":"C. Biraghi","c":"Torino","s":"2025-26","r":"LB","rt":77,"rg":["LB"],"pid":80},{"id":81,"n":"J. Odgaard","c":"Bologna","s":"2025-26","r":"CAM","rt":77,"rg":["CAM","CM"],"pid":81},{"id":82,"n":"João Mário","c":"Bologna","s":"2025-26","r":"RB","rt":77,"rg":["RB"],"pid":82},{"id":83,"n":"S. Castro","c":"Bologna","s":"2025-26","r":"ST","rt":77,"rg":["ST"],"pid":83},{"id":84,"n":"Jesús Rodríguez","c":"Como","s":"2025-26","r":"LW","rt":77,"rg":["LW"],"pid":84},{"id":85,"n":"N. Kühn","c":"Como","s":"2025-26","r":"RW","rt":77,"rg":["RW"],"pid":85},{"id":86,"n":"M. Solomon","c":"Fiorentina","s":"2025-26","r":"RW","rt":77,"rg":["LW","RW"],"pid":86},{"id":87,"n":"N. Matić","c":"Sassuolo","s":"2025-26","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":87},{"id":88,"n":"M. Sportiello","c":"Atalanta","s":"2025-26","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":89,"n":"N. Krstović","c":"Atalanta","s":"2025-26","r":"ST","rt":76,"rg":["ST"],"pid":89},{"id":90,"n":"Y. Bisseck","c":"Inter","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":90},{"id":91,"n":"F. Esposito","c":"Inter","s":"2025-26","r":"ST","rt":76,"rg":["ST"],"pid":91},{"id":92,"n":"J. Boga","c":"Juventus","s":"2025-26","r":"LW","rt":76,"rg":["LW","ST"],"pid":92},{"id":93,"n":"Pedro","c":"Lazio","s":"2025-26","r":"RW","rt":76,"rg":["RW"],"pid":93},{"id":94,"n":"S. Gigot","c":"Lazio","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":94},{"id":95,"n":"M. Lazzari","c":"Lazio","s":"2025-26","r":"RB","rt":76,"rg":["RB"],"pid":95},{"id":96,"n":"G. Isaksen","c":"Lazio","s":"2025-26","r":"RW","rt":76,"rg":["RW"],"pid":96},{"id":97,"n":"Nuno Tavares","c":"Lazio","s":"2025-26","r":"LB","rt":76,"rg":["LB"],"pid":97},{"id":98,"n":"Gabriel Strefezza","c":"Parma","s":"2025-26","r":"ST","rt":76,"rg":["RW","ST"],"pid":98},{"id":99,"n":"Adrián Bernabé","c":"Parma","s":"2025-26","r":"CM","rt":76,"rg":["CAM","CDM","CM"],"pid":99},{"id":100,"n":"N. El Aynaoui","c":"Roma","s":"2025-26","r":"CM","rt":76,"rg":["CDM","CM"],"pid":100},{"id":101,"n":"V. Lazaro","c":"Torino","s":"2025-26","r":"RB","rt":76,"rg":["LB","RB"],"pid":101},{"id":102,"n":"G. Simeone","c":"Torino","s":"2025-26","r":"ST","rt":76,"rg":["ST"],"pid":102},{"id":103,"n":"G. Maripán","c":"Torino","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":103},{"id":104,"n":"Saúl Coco","c":"Torino","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":104},{"id":105,"n":"J. Lucumí","c":"Bologna","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":105},{"id":106,"n":"Juan Miranda","c":"Bologna","s":"2025-26","r":"LB","rt":76,"rg":["LB"],"pid":106},{"id":107,"n":"N. Cambiaghi","c":"Bologna","s":"2025-26","r":"LW","rt":76,"rg":["LW"],"pid":107},{"id":108,"n":"L. Montipò","c":"Hellas Verona FC","s":"2025-26","r":"GK","rt":76,"rg":["GK"],"pid":108},{"id":109,"n":"S. Serdar","c":"Hellas Verona FC","s":"2025-26","r":"CM","rt":76,"rg":["CDM","CM"],"pid":109},{"id":110,"n":"A. Al Musrati","c":"Hellas Verona FC","s":"2025-26","r":"CDM","rt":76,"rg":["CDM","CM"],"pid":110},{"id":111,"n":"Sergi Roberto","c":"Como","s":"2025-26","r":"CDM","rt":76,"rg":["CDM","CM","RB"],"pid":111},{"id":112,"n":"M. Vojvoda","c":"Como","s":"2025-26","r":"RB","rt":76,"rg":["RB"],"pid":112},{"id":113,"n":"L. Da Cunha","c":"Como","s":"2025-26","r":"CDM","rt":76,"rg":["CAM","CDM","CM"],"pid":113},{"id":114,"n":"T. Douvikas","c":"Como","s":"2025-26","r":"ST","rt":76,"rg":["ST"],"pid":114},{"id":115,"n":"M. Perrone","c":"Como","s":"2025-26","r":"CDM","rt":76,"rg":["CB","CDM","CM"],"pid":115},{"id":116,"n":"A. Diao","c":"Como","s":"2025-26","r":"LW","rt":76,"rg":["LW","RW"],"pid":116},{"id":117,"n":"Y. Mina","c":"Cagliari","s":"2025-26","r":"CB","rt":76,"rg":["CB"],"pid":117},{"id":118,"n":"R. Mandragora","c":"Fiorentina","s":"2025-26","r":"CM","rt":76,"rg":["CDM","CM"],"pid":118},{"id":119,"n":"N. Fagioli","c":"Fiorentina","s":"2025-26","r":"CM","rt":76,"rg":["CDM","CM"],"pid":119},{"id":120,"n":"A. Tameze","c":"Torino","s":"2025-26","r":"CDM","rt":74,"rg":["CB","CDM","CM"],"pid":120},{"id":121,"n":"Z. Aboukhlal","c":"Torino","s":"2025-26","r":"CAM","rt":74,"rg":["CAM","CM"],"pid":121},{"id":122,"n":"A. Ismajli","c":"Torino","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":122},{"id":123,"n":"K. Davis","c":"Udinese","s":"2025-26","r":"ST","rt":74,"rg":["CAM","ST"],"pid":123},{"id":124,"n":"J. Ekkelenkamp","c":"Udinese","s":"2025-26","r":"CM","rt":74,"rg":["CAM","CM"],"pid":124},{"id":125,"n":"M. Okoye","c":"Udinese","s":"2025-26","r":"GK","rt":74,"rg":["GK"],"pid":125},{"id":126,"n":"A. Atta","c":"Udinese","s":"2025-26","r":"CM","rt":74,"rg":["CAM","CM"],"pid":126},{"id":127,"n":"N. Casale","c":"Bologna","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":127},{"id":128,"n":"S. Sohm","c":"Bologna","s":"2025-26","r":"CM","rt":74,"rg":["CAM","CDM","CM"],"pid":128},{"id":129,"n":"T. Heggem","c":"Bologna","s":"2025-26","r":"CB","rt":74,"rg":["CB","LB"],"pid":129},{"id":130,"n":"T. Pobega","c":"Bologna","s":"2025-26","r":"CM","rt":74,"rg":["CDM","CM"],"pid":130},{"id":131,"n":"M. Vitík","c":"Bologna","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":131},{"id":132,"n":"V. Nelsson","c":"Hellas Verona FC","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":132},{"id":133,"n":"G. Orban","c":"Hellas Verona FC","s":"2025-26","r":"ST","rt":74,"rg":["ST"],"pid":133},{"id":134,"n":"L. Coulibaly","c":"Lecce","s":"2025-26","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":134},{"id":135,"n":"R. Sottil","c":"Lecce","s":"2025-26","r":"LW","rt":74,"rg":["LW"],"pid":135},{"id":136,"n":"Jacobo Ramón","c":"Como","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":136},{"id":137,"n":"Álex Valle","c":"Como","s":"2025-26","r":"LB","rt":74,"rg":["LB"],"pid":137},{"id":138,"n":"A. Belotti","c":"Cagliari","s":"2025-26","r":"ST","rt":74,"rg":["ST"],"pid":138},{"id":139,"n":"M. Folorunsho","c":"Cagliari","s":"2025-26","r":"CM","rt":74,"rg":["CAM","CM","ST"],"pid":139},{"id":140,"n":"S. Kılıçsoy","c":"Cagliari","s":"2025-26","r":"ST","rt":74,"rg":["CAM","LW","ST"],"pid":140},{"id":141,"n":"Aarón Martín","c":"Genoa","s":"2025-26","r":"LB","rt":74,"rg":["LB"],"pid":141},{"id":142,"n":"B. Norton-Cuffy","c":"Genoa","s":"2025-26","r":"RB","rt":74,"rg":["RB"],"pid":142},{"id":143,"n":"T. Baldanzi","c":"Genoa","s":"2025-26","r":"CAM","rt":74,"rg":["CAM","CM"],"pid":143},{"id":144,"n":"M. Aebischer","c":"Pisa","s":"2025-26","r":"CM","rt":74,"rg":["CDM","CM"],"pid":144},{"id":145,"n":"M. Tramoni","c":"Pisa","s":"2025-26","r":"CAM","rt":74,"rg":["CAM","CM","ST"],"pid":145},{"id":146,"n":"U. Garcia","c":"Sassuolo","s":"2025-26","r":"LB","rt":74,"rg":["CB","LB"],"pid":146},{"id":147,"n":"A. Murić","c":"Sassuolo","s":"2025-26","r":"GK","rt":74,"rg":["GK"],"pid":147},{"id":148,"n":"T. Muharemović","c":"Sassuolo","s":"2025-26","r":"CB","rt":74,"rg":["CB"],"pid":148},{"id":149,"n":"Y. Musah","c":"Atalanta","s":"2025-26","r":"CM","rt":73,"rg":["CAM","CDM","CM"],"pid":149},{"id":150,"n":"K. Sulemana","c":"Atalanta","s":"2025-26","r":"CAM","rt":73,"rg":["CAM","CM","ST"],"pid":150},{"id":151,"n":"F. Dele-Bashiru","c":"Lazio","s":"2025-26","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":151},{"id":152,"n":"J. Ondrejka","c":"Parma","s":"2025-26","r":"LW","rt":73,"rg":["LW"],"pid":152},{"id":153,"n":"M. Keita","c":"Parma","s":"2025-26","r":"CDM","rt":73,"rg":["CB","CDM","CM"],"pid":153},{"id":154,"n":"G. Oristanio","c":"Parma","s":"2025-26","r":"CAM","rt":73,"rg":["CAM","CM","RW","ST"],"pid":154},{"id":155,"n":"M. Frigan","c":"Parma","s":"2025-26","r":"ST","rt":73,"rg":["ST"],"pid":155},{"id":156,"n":"M. Pedersen","c":"Torino","s":"2025-26","r":"RB","rt":73,"rg":["RB"],"pid":156},{"id":157,"n":"N. Nkounkou","c":"Torino","s":"2025-26","r":"LB","rt":73,"rg":["LB"],"pid":157},{"id":158,"n":"S. Sazonov","c":"Torino","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":158},{"id":159,"n":"C. Kabasele","c":"Udinese","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":159},{"id":160,"n":"T. Kristensen","c":"Udinese","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":160},{"id":161,"n":"A. Zanoli","c":"Udinese","s":"2025-26","r":"RB","rt":73,"rg":["RB"],"pid":161},{"id":162,"n":"C. Lykogiannis","c":"Bologna","s":"2025-26","r":"LB","rt":73,"rg":["LB"],"pid":162},{"id":163,"n":"N. Zortea","c":"Bologna","s":"2025-26","r":"RB","rt":73,"rg":["RB"],"pid":163},{"id":164,"n":"B. Domínguez","c":"Bologna","s":"2025-26","r":"LW","rt":73,"rg":["LW"],"pid":164},{"id":165,"n":"S. Lovrič","c":"Hellas Verona FC","s":"2025-26","r":"CM","rt":73,"rg":["CDM","CM"],"pid":165},{"id":166,"n":"Pol Lirola","c":"Hellas Verona FC","s":"2025-26","r":"RB","rt":73,"rg":["CB","CM","RB"],"pid":166},{"id":167,"n":"N. Valentini","c":"Hellas Verona FC","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":167},{"id":168,"n":"N. Törnqvist","c":"Como","s":"2025-26","r":"GK","rt":73,"rg":["GK"],"pid":168},{"id":169,"n":"L. Mazzitelli","c":"Cagliari","s":"2025-26","r":"CM","rt":73,"rg":["CDM","CM"],"pid":169},{"id":170,"n":"A. Dossena","c":"Cagliari","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":170},{"id":171,"n":"G. Gaetano","c":"Cagliari","s":"2025-26","r":"CAM","rt":73,"rg":["CAM","CDM","CM"],"pid":171},{"id":172,"n":"G. Zappa","c":"Cagliari","s":"2025-26","r":"RB","rt":73,"rg":["CB","CDM","RB"],"pid":172},{"id":173,"n":"M. Adopo","c":"Cagliari","s":"2025-26","r":"CM","rt":73,"rg":["CDM","CM"],"pid":173},{"id":174,"n":"A. Obert","c":"Cagliari","s":"2025-26","r":"LB","rt":73,"rg":["CB","CDM","LB"],"pid":174},{"id":175,"n":"I. Sulemana","c":"Cagliari","s":"2025-26","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":175},{"id":176,"n":"Zé Pedro","c":"Cagliari","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":176},{"id":177,"n":"J. Harrison","c":"Fiorentina","s":"2025-26","r":"RW","rt":73,"rg":["LW","RW"],"pid":177},{"id":178,"n":"C. Kouamé","c":"Fiorentina","s":"2025-26","r":"ST","rt":73,"rg":["LW","ST"],"pid":178},{"id":179,"n":"M. Pongračić","c":"Fiorentina","s":"2025-26","r":"CB","rt":73,"rg":["CB"],"pid":179},{"id":180,"n":"N. Estévez","c":"Parma","s":"2025-26","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":180},{"id":181,"n":"C. Ordoñez","c":"Parma","s":"2025-26","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":181},{"id":182,"n":"K. Ehizibue","c":"Udinese","s":"2025-26","r":"RB","rt":71,"rg":["RB"],"pid":182},{"id":183,"n":"Oier Zarraga","c":"Udinese","s":"2025-26","r":"CM","rt":71,"rg":["CDM","CM"],"pid":183},{"id":184,"n":"J. Zemura","c":"Udinese","s":"2025-26","r":"LB","rt":71,"rg":["LB"],"pid":184},{"id":185,"n":"R. Sava","c":"Udinese","s":"2025-26","r":"GK","rt":71,"rg":["GK"],"pid":185},{"id":186,"n":"L. De Silvestri","c":"Bologna","s":"2025-26","r":"RB","rt":71,"rg":["RB"],"pid":186},{"id":187,"n":"A. Harroui","c":"Hellas Verona FC","s":"2025-26","r":"CM","rt":71,"rg":["CAM","CDM","CM"],"pid":187},{"id":188,"n":"C. Niasse","c":"Hellas Verona FC","s":"2025-26","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":188},{"id":189,"n":"A. Sarr","c":"Hellas Verona FC","s":"2025-26","r":"ST","rt":71,"rg":["CAM","ST"],"pid":189},{"id":190,"n":"D. Mosquera","c":"Hellas Verona FC","s":"2025-26","r":"ST","rt":71,"rg":["ST"],"pid":190},{"id":191,"n":"J. Rodríguez","c":"Cagliari","s":"2025-26","r":"CB","rt":71,"rg":["CB"],"pid":191},{"id":192,"n":"O. Christensen","c":"Fiorentina","s":"2025-26","r":"GK","rt":71,"rg":["GK"],"pid":192},{"id":193,"n":"S. Sabelli","c":"Genoa","s":"2025-26","r":"RB","rt":71,"rg":["RB"],"pid":193},{"id":194,"n":"J. Onana","c":"Genoa","s":"2025-26","r":"CM","rt":71,"rg":["CDM","CM"],"pid":194},{"id":195,"n":"M. Ellertsson","c":"Genoa","s":"2025-26","r":"CM","rt":71,"rg":["CAM","CM"],"pid":195},{"id":196,"n":"A. Caracciolo","c":"Pisa","s":"2025-26","r":"CB","rt":71,"rg":["CB"],"pid":196},{"id":197,"n":"S. Scuffet","c":"Pisa","s":"2025-26","r":"GK","rt":71,"rg":["GK"],"pid":197},{"id":198,"n":"I. Touré","c":"Pisa","s":"2025-26","r":"RB","rt":71,"rg":["RB"],"pid":198},{"id":199,"n":"A. Šemper","c":"Pisa","s":"2025-26","r":"GK","rt":71,"rg":["GK"],"pid":199},{"id":200,"n":"S. Angori","c":"Pisa","s":"2025-26","r":"LB","rt":71,"rg":["LB"],"pid":200},{"id":201,"n":"M. Bianchetti","c":"Cremonese","s":"2025-26","r":"CB","rt":71,"rg":["CB"],"pid":201},{"id":202,"n":"F. Ceccherini","c":"Cremonese","s":"2025-26","r":"CB","rt":71,"rg":["CB"],"pid":202},{"id":203,"n":"G. Pezzella","c":"Cremonese","s":"2025-26","r":"LB","rt":71,"rg":["LB"],"pid":203},{"id":204,"n":"Y. Maleh","c":"Cremonese","s":"2025-26","r":"CM","rt":71,"rg":["CDM","CM"],"pid":204},{"id":205,"n":"W. Bondo","c":"Cremonese","s":"2025-26","r":"CM","rt":71,"rg":["CDM","CM"],"pid":205},{"id":206,"n":"F. Terracciano","c":"Cremonese","s":"2025-26","r":"CB","rt":71,"rg":["CB","LB","RB"],"pid":206},{"id":207,"n":"T. Barbieri","c":"Cremonese","s":"2025-26","r":"RB","rt":71,"rg":["RB"],"pid":207},{"id":208,"n":"Fali Candé","c":"Sassuolo","s":"2025-26","r":"CB","rt":71,"rg":["CB"],"pid":208},{"id":209,"n":"A. Fadera","c":"Sassuolo","s":"2025-26","r":"LW","rt":71,"rg":["LW"],"pid":209},{"id":210,"n":"L. Bernasconi","c":"Atalanta","s":"2025-26","r":"LB","rt":70,"rg":["LB"],"pid":210},{"id":211,"n":"Alisson","c":"Napoli","s":"2025-26","r":"LW","rt":70,"rg":["CAM","LW","RW"],"pid":211},{"id":212,"n":"R. Vaz","c":"Roma","s":"2025-26","r":"ST","rt":70,"rg":["ST"],"pid":212},{"id":213,"n":"A. Paleari","c":"Torino","s":"2025-26","r":"GK","rt":70,"rg":["GK"],"pid":213},{"id":214,"n":"S. Kulenović","c":"Torino","s":"2025-26","r":"ST","rt":70,"rg":["ST"],"pid":214},{"id":215,"n":"E. Ebosse","c":"Torino","s":"2025-26","r":"CB","rt":70,"rg":["CB"],"pid":215},{"id":216,"n":"G. Gineitis","c":"Torino","s":"2025-26","r":"CM","rt":70,"rg":["CAM","CM"],"pid":216},{"id":217,"n":"L. Miller","c":"Udinese","s":"2025-26","r":"CM","rt":70,"rg":["CAM","CDM","CM"],"pid":217},{"id":218,"n":"R. Belghali","c":"Hellas Verona FC","s":"2025-26","r":"RB","rt":70,"rg":["RB"],"pid":218},{"id":219,"n":"C. Früchtl","c":"Lecce","s":"2025-26","r":"GK","rt":70,"rg":["GK"],"pid":219},{"id":220,"n":"Y. Ramadani","c":"Lecce","s":"2025-26","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":220},{"id":221,"n":"S. Pierotti","c":"Lecce","s":"2025-26","r":"RW","rt":70,"rg":["RB","RW"],"pid":221},{"id":222,"n":"J. Siebert","c":"Lecce","s":"2025-26","r":"CB","rt":70,"rg":["CB"],"pid":222},{"id":223,"n":"L. Banda","c":"Lecce","s":"2025-26","r":"RW","rt":70,"rg":["LW","RW"],"pid":223},{"id":224,"n":"N. Štulić","c":"Lecce","s":"2025-26","r":"ST","rt":70,"rg":["ST"],"pid":224},{"id":225,"n":"J. Addai","c":"Como","s":"2025-26","r":"RW","rt":70,"rg":["RW"],"pid":225},{"id":226,"n":"A. Deiola","c":"Cagliari","s":"2025-26","r":"CM","rt":70,"rg":["CDM","CM"],"pid":226},{"id":227,"n":"B. Siegrist","c":"Genoa","s":"2025-26","r":"GK","rt":70,"rg":["GK"],"pid":227},{"id":228,"n":"C. Ekuban","c":"Genoa","s":"2025-26","r":"ST","rt":70,"rg":["ST"],"pid":228},{"id":229,"n":"A. Marcandalli","c":"Genoa","s":"2025-26","r":"CB","rt":70,"rg":["CB"],"pid":229},{"id":230,"n":"M. Léris","c":"Pisa","s":"2025-26","r":"LB","rt":70,"rg":["LB","RW"],"pid":230},{"id":231,"n":"M. Đurić","c":"Cremonese","s":"2025-26","r":"ST","rt":70,"rg":["ST"],"pid":231},{"id":232,"n":"A. Grassi","c":"Cremonese","s":"2025-26","r":"CM","rt":70,"rg":["CDM","CM"],"pid":232},{"id":233,"n":"F. Romagna","c":"Sassuolo","s":"2025-26","r":"CB","rt":70,"rg":["CB"],"pid":233},{"id":234,"n":"C. Volpato","c":"Sassuolo","s":"2025-26","r":"RW","rt":70,"rg":["RW"],"pid":234},{"id":235,"n":"V. Adžić","c":"Juventus","s":"2025-26","r":"CAM","rt":69,"rg":["CAM","CM"],"pid":235},{"id":236,"n":"C. Pinsoglio","c":"Juventus","s":"2025-26","r":"GK","rt":69,"rg":["GK"],"pid":236},{"id":237,"n":"O. Provstgaard","c":"Lazio","s":"2025-26","r":"CB","rt":69,"rg":["CB"],"pid":237},{"id":238,"n":"Giovane","c":"Napoli","s":"2025-26","r":"ST","rt":69,"rg":["CAM","RW","ST"],"pid":238},{"id":239,"n":"L. Valenti","c":"Parma","s":"2025-26","r":"CB","rt":69,"rg":["CB"],"pid":239},{"id":240,"n":"L. Martínez","c":"Inter","s":"2024-25","r":"ST","rt":88,"rg":["ST"],"pid":1},{"id":241,"n":"Y. Sommer","c":"Inter","s":"2024-25","r":"GK","rt":87,"rg":["GK"],"pid":5},{"id":242,"n":"N. Barella","c":"Inter","s":"2024-25","r":"CM","rt":87,"rg":["CDM","CM"],"pid":0},{"id":243,"n":"A. Bastoni","c":"Inter","s":"2024-25","r":"CB","rt":87,"rg":["CB"],"pid":2},{"id":244,"n":"M. Maignan","c":"AC Milan","s":"2024-25","r":"GK","rt":87,"rg":["GK"],"pid":3},{"id":245,"n":"H. Çalhanoğlu","c":"Inter","s":"2024-25","r":"CDM","rt":86,"rg":["CDM","CM"],"pid":6},{"id":246,"n":"Bremer","c":"Juventus","s":"2024-25","r":"CB","rt":86,"rg":["CB"],"pid":8},{"id":247,"n":"T. Hernández","c":"AC Milan","s":"2024-25","r":"LB","rt":86,"rg":["LB"],"pid":240},{"id":248,"n":"P. Dybala","c":"Roma","s":"2024-25","r":"CAM","rt":86,"rg":["CAM","ST"],"pid":15},{"id":249,"n":"F. Dimarco","c":"Inter","s":"2024-25","r":"LB","rt":85,"rg":["LB"],"pid":7},{"id":250,"n":"Rafael Leão","c":"AC Milan","s":"2024-25","r":"LW","rt":85,"rg":["LW"],"pid":18},{"id":251,"n":"De Gea","c":"Fiorentina","s":"2024-25","r":"GK","rt":85,"rg":["GK"],"pid":21},{"id":252,"n":"A. Lookman","c":"Atalanta","s":"2024-25","r":"ST","rt":84,"rg":["CAM","ST"],"pid":241},{"id":253,"n":"F. Acerbi","c":"Inter","s":"2024-25","r":"CB","rt":84,"rg":["CB"],"pid":24},{"id":254,"n":"B. Pavard","c":"Inter","s":"2024-25","r":"CB","rt":84,"rg":["CB","RB"],"pid":242},{"id":255,"n":"M. Thuram","c":"Inter","s":"2024-25","r":"ST","rt":84,"rg":["ST"],"pid":11},{"id":256,"n":"C. Pulisic","c":"AC Milan","s":"2024-25","r":"RW","rt":84,"rg":["CAM","RW"],"pid":14},{"id":257,"n":"T. Reijnders","c":"AC Milan","s":"2024-25","r":"CM","rt":84,"rg":["CAM","CDM","CM"],"pid":243},{"id":258,"n":"M. Carnesecchi","c":"Atalanta","s":"2024-25","r":"GK","rt":83,"rg":["GK"],"pid":10},{"id":259,"n":"H. Mkhitaryan","c":"Inter","s":"2024-25","r":"CM","rt":83,"rg":["CAM","CM"],"pid":22},{"id":260,"n":"S. de Vrij","c":"Inter","s":"2024-25","r":"CB","rt":83,"rg":["CB"],"pid":23},{"id":261,"n":"D. Dumfries","c":"Inter","s":"2024-25","r":"RB","rt":83,"rg":["RB"],"pid":16},{"id":262,"n":"M. Locatelli","c":"Juventus","s":"2024-25","r":"CDM","rt":83,"rg":["CDM","CM"],"pid":17},{"id":263,"n":"D. Vlahović","c":"Juventus","s":"2024-25","r":"ST","rt":83,"rg":["ST"],"pid":52},{"id":264,"n":"A. Romagnoli","c":"Lazio","s":"2024-25","r":"CB","rt":83,"rg":["CB"],"pid":39},{"id":265,"n":"M. Zaccagni","c":"Lazio","s":"2024-25","r":"LW","rt":83,"rg":["LW"],"pid":26},{"id":266,"n":"I. Provedel","c":"Lazio","s":"2024-25","r":"GK","rt":83,"rg":["GK"],"pid":27},{"id":267,"n":"R. Lukaku","c":"Napoli","s":"2024-25","r":"ST","rt":83,"rg":["ST"],"pid":28},{"id":268,"n":"S. Lobotka","c":"Napoli","s":"2024-25","r":"CM","rt":83,"rg":["CDM","CM"],"pid":29},{"id":269,"n":"G. Di Lorenzo","c":"Napoli","s":"2024-25","r":"RB","rt":83,"rg":["CB","RB"],"pid":30},{"id":270,"n":"G. Mancini","c":"Roma","s":"2024-25","r":"CB","rt":83,"rg":["CB"],"pid":19},{"id":271,"n":"A. Dovbyk","c":"Roma","s":"2024-25","r":"ST","rt":83,"rg":["ST"],"pid":244},{"id":272,"n":"P. Zieliński","c":"Inter","s":"2024-25","r":"CM","rt":82,"rg":["CDM","CM"],"pid":47},{"id":273,"n":"D. Frattesi","c":"Inter","s":"2024-25","r":"CM","rt":82,"rg":["CAM","CM"],"pid":48},{"id":274,"n":"Douglas Luiz","c":"Juventus","s":"2024-25","r":"CM","rt":82,"rg":["CDM","CM"],"pid":245},{"id":275,"n":"T. Koopmeiners","c":"Juventus","s":"2024-25","r":"CM","rt":82,"rg":["CAM","CM"],"pid":246},{"id":276,"n":"M. Guendouzi","c":"Lazio","s":"2024-25","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":247},{"id":277,"n":"K. Walker","c":"AC Milan","s":"2024-25","r":"RB","rt":82,"rg":["RB"],"pid":248},{"id":278,"n":"F. Tomori","c":"AC Milan","s":"2024-25","r":"CB","rt":82,"rg":["CB"],"pid":56},{"id":279,"n":"A. Meret","c":"Napoli","s":"2024-25","r":"GK","rt":82,"rg":["GK"],"pid":40},{"id":280,"n":"D. Zapata","c":"Torino","s":"2024-25","r":"ST","rt":82,"rg":["ST"],"pid":249},{"id":281,"n":"C. De Ketelaere","c":"Atalanta","s":"2024-25","r":"CAM","rt":81,"rg":["CAM","ST"],"pid":35},{"id":282,"n":"Éderson","c":"Atalanta","s":"2024-25","r":"CM","rt":81,"rg":["CAM","CM"],"pid":36},{"id":283,"n":"M. Darmian","c":"Inter","s":"2024-25","r":"RB","rt":81,"rg":["CB","RB"],"pid":250},{"id":284,"n":"M. Di Gregorio","c":"Juventus","s":"2024-25","r":"GK","rt":81,"rg":["GK"],"pid":50},{"id":285,"n":"R. Kolo Muani","c":"Juventus","s":"2024-25","r":"ST","rt":81,"rg":["ST"],"pid":251},{"id":286,"n":"Y. Fofana","c":"AC Milan","s":"2024-25","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":57},{"id":287,"n":"A. Zambo Anguissa","c":"Napoli","s":"2024-25","r":"CM","rt":81,"rg":["CDM","CM"],"pid":31},{"id":288,"n":"David Neres","c":"Napoli","s":"2024-25","r":"LW","rt":81,"rg":["LW"],"pid":59},{"id":289,"n":"S. McTominay","c":"Napoli","s":"2024-25","r":"CM","rt":81,"rg":["CDM","CM"],"pid":9},{"id":290,"n":"A. Buongiorno","c":"Napoli","s":"2024-25","r":"CB","rt":81,"rg":["CB"],"pid":41},{"id":291,"n":"L. Pellegrini","c":"Roma","s":"2024-25","r":"CAM","rt":81,"rg":["CAM","CM"],"pid":252},{"id":292,"n":"R. Freuler","c":"Bologna","s":"2024-25","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":42},{"id":293,"n":"R. Orsolini","c":"Bologna","s":"2024-25","r":"RW","rt":81,"rg":["RW"],"pid":33},{"id":294,"n":"M. Kean","c":"Fiorentina","s":"2024-25","r":"ST","rt":81,"rg":["ST"],"pid":34},{"id":295,"n":"S. Kolašinac","c":"Atalanta","s":"2024-25","r":"CB","rt":80,"rg":["CB","LB"],"pid":253},{"id":296,"n":"M. de Roon","c":"Atalanta","s":"2024-25","r":"CM","rt":80,"rg":["CB","CDM","CM"],"pid":46},{"id":297,"n":"D. Zappacosta","c":"Atalanta","s":"2024-25","r":"LB","rt":80,"rg":["LB","RB"],"pid":254},{"id":298,"n":"M. Pašalić","c":"Atalanta","s":"2024-25","r":"CM","rt":80,"rg":["CAM","CM"],"pid":255},{"id":299,"n":"M. Retegui","c":"Atalanta","s":"2024-25","r":"ST","rt":80,"rg":["ST"],"pid":256},{"id":300,"n":"A. Sánchez","c":"Udinese","s":"2024-25","r":"ST","rt":78,"rg":["ST"],"pid":257},{"id":301,"n":"S. Beukema","c":"Bologna","s":"2024-25","r":"CB","rt":78,"rg":["CB"],"pid":258},{"id":302,"n":"M. Pessina","c":"Monza","s":"2024-25","r":"CM","rt":78,"rg":["CAM","CDM","CM"],"pid":259},{"id":303,"n":"R. Bellanova","c":"Atalanta","s":"2024-25","r":"RB","rt":77,"rg":["RB"],"pid":69},{"id":304,"n":"S. Gigot","c":"Lazio","s":"2024-25","r":"CB","rt":77,"rg":["CB"],"pid":94},{"id":305,"n":"Nuno Tavares","c":"Lazio","s":"2024-25","r":"LB","rt":77,"rg":["LB"],"pid":97},{"id":306,"n":"T. Abraham","c":"AC Milan","s":"2024-25","r":"ST","rt":77,"rg":["ST"],"pid":260},{"id":307,"n":"M. Olivera","c":"Napoli","s":"2024-25","r":"LB","rt":77,"rg":["LB"],"pid":76},{"id":308,"n":"N. Okafor","c":"Napoli","s":"2024-25","r":"ST","rt":77,"rg":["CAM","LW","ST"],"pid":261},{"id":309,"n":"S. Abdulhamid","c":"Roma","s":"2024-25","r":"RB","rt":77,"rg":["RB"],"pid":262},{"id":310,"n":"A. Sanabria","c":"Torino","s":"2024-25","r":"ST","rt":77,"rg":["ST"],"pid":263},{"id":311,"n":"E. Elmas","c":"Torino","s":"2024-25","r":"CAM","rt":77,"rg":["CAM","CM","LW"],"pid":77},{"id":312,"n":"I. Ilić","c":"Torino","s":"2024-25","r":"CM","rt":77,"rg":["CM"],"pid":264},{"id":313,"n":"O. Solet","c":"Udinese","s":"2024-25","r":"CB","rt":77,"rg":["CB"],"pid":61},{"id":314,"n":"D. Ndoye","c":"Bologna","s":"2024-25","r":"LW","rt":77,"rg":["LW"],"pid":265},{"id":315,"n":"Gabriel Strefezza","c":"Como","s":"2024-25","r":"RW","rt":77,"rg":["RW"],"pid":98},{"id":316,"n":"D. Cataldi","c":"Fiorentina","s":"2024-25","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":266},{"id":317,"n":"R. Mandragora","c":"Fiorentina","s":"2024-25","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":118},{"id":318,"n":"Dodô","c":"Fiorentina","s":"2024-25","r":"RB","rt":77,"rg":["RB"],"pid":67},{"id":319,"n":"N. Zaniolo","c":"Fiorentina","s":"2024-25","r":"RW","rt":77,"rg":["RW","ST"],"pid":267},{"id":320,"n":"Y. Adli","c":"Fiorentina","s":"2024-25","r":"CDM","rt":77,"rg":["CAM","CDM","CM"],"pid":268},{"id":321,"n":"L. Samardžić","c":"Atalanta","s":"2024-25","r":"CM","rt":76,"rg":["CAM","CDM","CM"],"pid":70},{"id":322,"n":"Y. Bisseck","c":"Inter","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":90},{"id":323,"n":"N. Zalewski","c":"Inter","s":"2024-25","r":"LB","rt":76,"rg":["LB","RB"],"pid":71},{"id":324,"n":"T. Weah","c":"Juventus","s":"2024-25","r":"RB","rt":76,"rg":["RB"],"pid":269},{"id":325,"n":"K. Yıldız","c":"Juventus","s":"2024-25","r":"CAM","rt":76,"rg":["CAM"],"pid":38},{"id":326,"n":"Pedro","c":"Lazio","s":"2024-25","r":"RB","rt":76,"rg":["LB","RB"],"pid":93},{"id":327,"n":"Patric","c":"Lazio","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":270},{"id":328,"n":"G. Isaksen","c":"Lazio","s":"2024-25","r":"RW","rt":76,"rg":["RW"],"pid":96},{"id":329,"n":"M. Sportiello","c":"AC Milan","s":"2024-25","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":330,"n":"R. Sottil","c":"AC Milan","s":"2024-25","r":"LW","rt":76,"rg":["LW"],"pid":135},{"id":331,"n":"Emerson Royal","c":"AC Milan","s":"2024-25","r":"RB","rt":76,"rg":["RB"],"pid":271},{"id":332,"n":"S. Pavlović","c":"AC Milan","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":74},{"id":333,"n":"G. Simeone","c":"Napoli","s":"2024-25","r":"ST","rt":76,"rg":["ST"],"pid":102},{"id":334,"n":"P. Billing","c":"Napoli","s":"2024-25","r":"CM","rt":76,"rg":["CAM","CDM","CM"],"pid":272},{"id":335,"n":"Hernani","c":"Parma","s":"2024-25","r":"CDM","rt":76,"rg":["CAM","CDM","CM"],"pid":273},{"id":336,"n":"D. Man","c":"Parma","s":"2024-25","r":"RB","rt":76,"rg":["LB","RB"],"pid":274},{"id":337,"n":"Z. Çelik","c":"Roma","s":"2024-25","r":"RB","rt":76,"rg":["CB","RB"],"pid":275},{"id":338,"n":"V. Nelsson","c":"Roma","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":132},{"id":339,"n":"M. Soulé","c":"Roma","s":"2024-25","r":"CAM","rt":76,"rg":["CAM"],"pid":276},{"id":340,"n":"T. Baldanzi","c":"Roma","s":"2024-25","r":"CAM","rt":76,"rg":["CAM","ST"],"pid":143},{"id":341,"n":"G. Maripán","c":"Torino","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":103},{"id":342,"n":"C. Adams","c":"Torino","s":"2024-25","r":"ST","rt":76,"rg":["ST"],"pid":60},{"id":343,"n":"Saúl Coco","c":"Torino","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":104},{"id":344,"n":"J. Bijol","c":"Udinese","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":277},{"id":345,"n":"J. Lucumí","c":"Bologna","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":105},{"id":346,"n":"N. Casale","c":"Bologna","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":127},{"id":347,"n":"T. Dallinga","c":"Bologna","s":"2024-25","r":"ST","rt":76,"rg":["ST"],"pid":278},{"id":348,"n":"L. Montipò","c":"Hellas Verona FC","s":"2024-25","r":"GK","rt":76,"rg":["GK"],"pid":108},{"id":349,"n":"S. Serdar","c":"Hellas Verona FC","s":"2024-25","r":"CM","rt":76,"rg":["CDM","CM"],"pid":109},{"id":350,"n":"J. Karlsson","c":"Lecce","s":"2024-25","r":"LW","rt":76,"rg":["LW"],"pid":279},{"id":351,"n":"F. Baschirotto","c":"Lecce","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":280},{"id":352,"n":"J. Butez","c":"Como","s":"2024-25","r":"GK","rt":76,"rg":["GK"],"pid":64},{"id":353,"n":"J. Ikoné","c":"Como","s":"2024-25","r":"RW","rt":76,"rg":["RW"],"pid":281},{"id":354,"n":"M. Caqueret","c":"Como","s":"2024-25","r":"CM","rt":76,"rg":["CDM","CM"],"pid":65},{"id":355,"n":"Nico Paz","c":"Como","s":"2024-25","r":"CAM","rt":76,"rg":["CAM"],"pid":44},{"id":356,"n":"Y. Mina","c":"Cagliari","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":117},{"id":357,"n":"S. Luperto","c":"Cagliari","s":"2024-25","r":"CB","rt":76,"rg":["CB"],"pid":282},{"id":358,"n":"L. Beltrán","c":"Fiorentina","s":"2024-25","r":"CAM","rt":76,"rg":["CAM","ST"],"pid":283},{"id":359,"n":"N. Fagioli","c":"Fiorentina","s":"2024-25","r":"CDM","rt":76,"rg":["CDM","CM"],"pid":119},{"id":360,"n":"J. Odgaard","c":"Bologna","s":"2024-25","r":"CAM","rt":74,"rg":["CAM"],"pid":81},{"id":361,"n":"T. Pobega","c":"Bologna","s":"2024-25","r":"CM","rt":74,"rg":["CDM","CM"],"pid":130},{"id":362,"n":"G. Fabbian","c":"Bologna","s":"2024-25","r":"CM","rt":74,"rg":["CAM","CM"],"pid":284},{"id":363,"n":"A. Duncan","c":"Venezia","s":"2024-25","r":"CM","rt":74,"rg":["CDM","CM"],"pid":285},{"id":364,"n":"G. Busio","c":"Venezia","s":"2024-25","r":"CM","rt":74,"rg":["CAM","CM"],"pid":286},{"id":365,"n":"C. Tengstedt","c":"Hellas Verona FC","s":"2024-25","r":"ST","rt":74,"rg":["ST"],"pid":287},{"id":366,"n":"J. Tchatchoua","c":"Hellas Verona FC","s":"2024-25","r":"RB","rt":74,"rg":["RB"],"pid":288},{"id":367,"n":"N. Valentini","c":"Hellas Verona FC","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":167},{"id":368,"n":"F. Guilbert","c":"Lecce","s":"2024-25","r":"RB","rt":74,"rg":["LB","RB"],"pid":289},{"id":369,"n":"L. Coulibaly","c":"Lecce","s":"2024-25","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":134},{"id":370,"n":"A. Gallo","c":"Lecce","s":"2024-25","r":"LB","rt":74,"rg":["LB"],"pid":290},{"id":371,"n":"Kialonda Gaspar","c":"Lecce","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":291},{"id":372,"n":"M. Vojvoda","c":"Como","s":"2024-25","r":"RB","rt":74,"rg":["CB","LB","RB"],"pid":112},{"id":373,"n":"A. Dossena","c":"Como","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":170},{"id":374,"n":"L. Da Cunha","c":"Como","s":"2024-25","r":"CM","rt":74,"rg":["CAM","CDM","CM"],"pid":113},{"id":375,"n":"T. Douvikas","c":"Como","s":"2024-25","r":"ST","rt":74,"rg":["ST"],"pid":114},{"id":376,"n":"A. Diao Diaoune","c":"Como","s":"2024-25","r":"RB","rt":74,"rg":["LB","RB"],"pid":292},{"id":377,"n":"M. Silvestri","c":"Empoli","s":"2024-25","r":"GK","rt":74,"rg":["GK"],"pid":293},{"id":378,"n":"E. Gyasi","c":"Empoli","s":"2024-25","r":"ST","rt":74,"rg":["ST"],"pid":294},{"id":379,"n":"T. Ebuehi","c":"Empoli","s":"2024-25","r":"RB","rt":74,"rg":["RB"],"pid":295},{"id":380,"n":"A. Ismajli","c":"Empoli","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":122},{"id":381,"n":"R. Marin","c":"Cagliari","s":"2024-25","r":"CM","rt":74,"rg":["CDM","CM"],"pid":296},{"id":382,"n":"Pablo Marí","c":"Fiorentina","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":297},{"id":383,"n":"M. Pongračić","c":"Fiorentina","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":179},{"id":384,"n":"M. Balotelli","c":"Genoa","s":"2024-25","r":"ST","rt":74,"rg":["ST"],"pid":298},{"id":385,"n":"M. Cornet","c":"Genoa","s":"2024-25","r":"ST","rt":74,"rg":["ST"],"pid":299},{"id":386,"n":"Aarón","c":"Genoa","s":"2024-25","r":"LB","rt":74,"rg":["LB"],"pid":300},{"id":387,"n":"K. De Winter","c":"Genoa","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":301},{"id":388,"n":"F. Miretti","c":"Genoa","s":"2024-25","r":"CM","rt":74,"rg":["CDM","CM","LB"],"pid":302},{"id":389,"n":"A. Izzo","c":"Monza","s":"2024-25","r":"CB","rt":74,"rg":["CB"],"pid":303},{"id":390,"n":"P. Ciurria","c":"Monza","s":"2024-25","r":"CAM","rt":74,"rg":["CAM"],"pid":304},{"id":391,"n":"S. Birindelli","c":"Monza","s":"2024-25","r":"RB","rt":74,"rg":["RB"],"pid":305},{"id":392,"n":"S. Turati","c":"Monza","s":"2024-25","r":"GK","rt":74,"rg":["GK"],"pid":306},{"id":393,"n":"E. Hysaj","c":"Lazio","s":"2024-25","r":"LB","rt":73,"rg":["LB","RB"],"pid":307},{"id":394,"n":"F. Dele-Bashiru","c":"Lazio","s":"2024-25","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":151},{"id":395,"n":"D. Origi","c":"AC Milan","s":"2024-25","r":"ST","rt":73,"rg":["ST"],"pid":308},{"id":396,"n":"C. Ngonge","c":"Napoli","s":"2024-25","r":"CAM","rt":73,"rg":["CAM","ST"],"pid":309},{"id":397,"n":"V. Mihăilă","c":"Parma","s":"2024-25","r":"LW","rt":73,"rg":["LW"],"pid":310},{"id":398,"n":"J. Ondrejka","c":"Parma","s":"2024-25","r":"LW","rt":73,"rg":["LW","RW"],"pid":152},{"id":399,"n":"E. Valeri","c":"Parma","s":"2024-25","r":"LB","rt":73,"rg":["LB"],"pid":311},{"id":400,"n":"E. Shomurodov","c":"Roma","s":"2024-25","r":"ST","rt":73,"rg":["ST"],"pid":312},{"id":401,"n":"M. Pedersen","c":"Torino","s":"2024-25","r":"RB","rt":73,"rg":["RB"],"pid":156},{"id":402,"n":"M. Payero","c":"Udinese","s":"2024-25","r":"CM","rt":73,"rg":["CDM","CM"],"pid":313},{"id":403,"n":"J. Ekkelenkamp","c":"Udinese","s":"2024-25","r":"CM","rt":73,"rg":["CAM","CM"],"pid":124},{"id":404,"n":"C. Lykogiannis","c":"Bologna","s":"2024-25","r":"LB","rt":73,"rg":["LB"],"pid":162},{"id":405,"n":"M. Erlić","c":"Bologna","s":"2024-25","r":"CB","rt":73,"rg":["CB"],"pid":314},{"id":406,"n":"N. Cambiaghi","c":"Bologna","s":"2024-25","r":"LW","rt":73,"rg":["LW","ST"],"pid":107},{"id":407,"n":"B. Domínguez","c":"Bologna","s":"2024-25","r":"LW","rt":73,"rg":["LW"],"pid":164},{"id":408,"n":"Kike Pérez","c":"Venezia","s":"2024-25","r":"CM","rt":73,"rg":["CAM","CDM","CM"],"pid":315},{"id":409,"n":"D. Lazović","c":"Hellas Verona FC","s":"2024-25","r":"CAM","rt":73,"rg":["CAM"],"pid":316},{"id":410,"n":"A. Bernede","c":"Hellas Verona FC","s":"2024-25","r":"CM","rt":73,"rg":["CDM","CM"],"pid":317},{"id":411,"n":"A. Harroui","c":"Hellas Verona FC","s":"2024-25","r":"CM","rt":73,"rg":["CDM","CM","LW"],"pid":187},{"id":412,"n":"F. Daniliuc","c":"Hellas Verona FC","s":"2024-25","r":"CB","rt":73,"rg":["CB","RB"],"pid":318},{"id":413,"n":"A. Rebić","c":"Lecce","s":"2024-25","r":"LW","rt":73,"rg":["LW","ST"],"pid":319},{"id":414,"n":"M. Kempf","c":"Como","s":"2024-25","r":"CB","rt":73,"rg":["CB"],"pid":320},{"id":415,"n":"D. Alli","c":"Como","s":"2024-25","r":"CM","rt":73,"rg":["CAM","CM"],"pid":321},{"id":416,"n":"S. Esposito","c":"Empoli","s":"2024-25","r":"ST","rt":73,"rg":["CAM","ST"],"pid":322},{"id":417,"n":"L. Colombo","c":"Empoli","s":"2024-25","r":"ST","rt":73,"rg":["ST"],"pid":323},{"id":418,"n":"S. Sazonov","c":"Empoli","s":"2024-25","r":"CB","rt":73,"rg":["CB"],"pid":158},{"id":419,"n":"N. Viola","c":"Cagliari","s":"2024-25","r":"CAM","rt":73,"rg":["CAM"],"pid":324},{"id":420,"n":"R. Gagliardini","c":"Monza","s":"2024-25","r":"CDM","rt":72,"rg":["CDM","CM"],"pid":325},{"id":421,"n":"G. Kyriakopoulos","c":"Monza","s":"2024-25","r":"LB","rt":72,"rg":["LB"],"pid":326},{"id":422,"n":"M. Brescianini","c":"Atalanta","s":"2024-25","r":"CM","rt":71,"rg":["CAM","CM"],"pid":327},{"id":423,"n":"I. Sulemana","c":"Atalanta","s":"2024-25","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":175},{"id":424,"n":"M. Đurić","c":"Parma","s":"2024-25","r":"ST","rt":71,"rg":["ST"],"pid":231},{"id":425,"n":"N. Estévez","c":"Parma","s":"2024-25","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":180},{"id":426,"n":"A. Salah-Eddine","c":"Roma","s":"2024-25","r":"LB","rt":71,"rg":["CM","LB"],"pid":328},{"id":427,"n":"N. Pisilli","c":"Roma","s":"2024-25","r":"CM","rt":71,"rg":["CM"],"pid":329},{"id":428,"n":"S. Walukiewicz","c":"Torino","s":"2024-25","r":"CB","rt":71,"rg":["CB","RB"],"pid":330},{"id":429,"n":"Brenner","c":"Udinese","s":"2024-25","r":"ST","rt":71,"rg":["CAM","ST"],"pid":331},{"id":430,"n":"I. Touré","c":"Udinese","s":"2024-25","r":"CB","rt":71,"rg":["CB"],"pid":198},{"id":431,"n":"L. De Silvestri","c":"Bologna","s":"2024-25","r":"RB","rt":71,"rg":["RB"],"pid":186},{"id":432,"n":"J. Joronen","c":"Venezia","s":"2024-25","r":"GK","rt":71,"rg":["GK"],"pid":332},{"id":433,"n":"A. Zerbin","c":"Venezia","s":"2024-25","r":"LB","rt":71,"rg":["LB","RB"],"pid":333},{"id":434,"n":"J. Yeboah","c":"Venezia","s":"2024-25","r":"RW","rt":71,"rg":["CAM","RW"],"pid":334},{"id":435,"n":"J. Idzes","c":"Venezia","s":"2024-25","r":"CB","rt":71,"rg":["CB"],"pid":335},{"id":436,"n":"D. Fila","c":"Venezia","s":"2024-25","r":"ST","rt":71,"rg":["ST"],"pid":336},{"id":437,"n":"C. Condé","c":"Venezia","s":"2024-25","r":"CM","rt":71,"rg":["CDM","CM"],"pid":337},{"id":438,"n":"C. Niasse","c":"Hellas Verona FC","s":"2024-25","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":188},{"id":439,"n":"A. Sarr","c":"Hellas Verona FC","s":"2024-25","r":"ST","rt":71,"rg":["ST"],"pid":189},{"id":440,"n":"D. Mosquera","c":"Hellas Verona FC","s":"2024-25","r":"ST","rt":71,"rg":["ST"],"pid":190},{"id":441,"n":"N. Sansone","c":"Lecce","s":"2024-25","r":"CAM","rt":71,"rg":["CAM","ST"],"pid":338},{"id":442,"n":"I. Van der Brempt","c":"Como","s":"2024-25","r":"RB","rt":71,"rg":["RB"],"pid":339},{"id":443,"n":"M. Braunöder","c":"Como","s":"2024-25","r":"CM","rt":71,"rg":["CDM","CM"],"pid":340},{"id":444,"n":"Y. Engelhardt","c":"Como","s":"2024-25","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":341},{"id":445,"n":"A. Fadera","c":"Como","s":"2024-25","r":"LB","rt":71,"rg":["LB"],"pid":209},{"id":446,"n":"Álex Valle","c":"Como","s":"2024-25","r":"LB","rt":71,"rg":["LB"],"pid":137},{"id":447,"n":"S. Żurkowski","c":"Empoli","s":"2024-25","r":"CM","rt":71,"rg":["CAM","CM"],"pid":342},{"id":448,"n":"M. Viti","c":"Empoli","s":"2024-25","r":"CB","rt":71,"rg":["CB"],"pid":343},{"id":449,"n":"M. Felici","c":"Cagliari","s":"2024-25","r":"LB","rt":71,"rg":["LB"],"pid":344},{"id":450,"n":"M. Adopo","c":"Cagliari","s":"2024-25","r":"CM","rt":71,"rg":["CDM","CM"],"pid":173},{"id":451,"n":"N. Leali","c":"Genoa","s":"2024-25","r":"GK","rt":71,"rg":["GK"],"pid":345},{"id":452,"n":"S. Sabelli","c":"Genoa","s":"2024-25","r":"RB","rt":71,"rg":["RB"],"pid":193},{"id":453,"n":"C. Ekuban","c":"Genoa","s":"2024-25","r":"ST","rt":71,"rg":["RW","ST"],"pid":228},{"id":454,"n":"A. Petagna","c":"Monza","s":"2024-25","r":"ST","rt":71,"rg":["ST"],"pid":346},{"id":455,"n":"Pedro Pereira","c":"Monza","s":"2024-25","r":"RB","rt":71,"rg":["CB","RB"],"pid":347},{"id":456,"n":"A. Carboni","c":"Monza","s":"2024-25","r":"CB","rt":71,"rg":["CB","LB"],"pid":348},{"id":457,"n":"C. Pinsoglio","c":"Juventus","s":"2024-25","r":"GK","rt":70,"rg":["GK"],"pid":236},{"id":458,"n":"Rafa Marín","c":"Napoli","s":"2024-25","r":"CB","rt":70,"rg":["CB"],"pid":349},{"id":459,"n":"B. Balogh","c":"Parma","s":"2024-25","r":"CB","rt":70,"rg":["CB"],"pid":350},{"id":460,"n":"J. Zemura","c":"Udinese","s":"2024-25","r":"LB","rt":70,"rg":["LB"],"pid":184},{"id":461,"n":"R. Sava","c":"Udinese","s":"2024-25","r":"GK","rt":70,"rg":["GK"],"pid":185},{"id":462,"n":"F. Ravaglia","c":"Bologna","s":"2024-25","r":"GK","rt":70,"rg":["GK"],"pid":351},{"id":463,"n":"C. Gytkjær","c":"Venezia","s":"2024-25","r":"ST","rt":70,"rg":["ST"],"pid":352},{"id":464,"n":"Fali Candé","c":"Venezia","s":"2024-25","r":"CB","rt":70,"rg":["CB","LB"],"pid":208},{"id":465,"n":"D. Livramento","c":"Hellas Verona FC","s":"2024-25","r":"ST","rt":70,"rg":["LW","ST"],"pid":353},{"id":466,"n":"M. Frese","c":"Hellas Verona FC","s":"2024-25","r":"LB","rt":70,"rg":["CB","LB"],"pid":354},{"id":467,"n":"D. Bradarić","c":"Hellas Verona FC","s":"2024-25","r":"LB","rt":70,"rg":["LB"],"pid":355},{"id":468,"n":"C. Früchtl","c":"Lecce","s":"2024-25","r":"GK","rt":70,"rg":["GK"],"pid":219},{"id":469,"n":"Y. Ramadani","c":"Lecce","s":"2024-25","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":220},{"id":470,"n":"M. Sala","c":"Lecce","s":"2024-25","r":"LB","rt":70,"rg":["LB","RB"],"pid":356},{"id":471,"n":"Iván Azón","c":"Como","s":"2024-25","r":"ST","rt":70,"rg":["ST"],"pid":357},{"id":472,"n":"L. Henderson","c":"Empoli","s":"2024-25","r":"CM","rt":70,"rg":["CAM","CM"],"pid":358},{"id":473,"n":"A. Grassi","c":"Empoli","s":"2024-25","r":"CM","rt":70,"rg":["CDM","CM"],"pid":232},{"id":474,"n":"V. Kovalenko","c":"Empoli","s":"2024-25","r":"CM","rt":70,"rg":["CAM","CM"],"pid":359},{"id":475,"n":"D. Vásquez","c":"Empoli","s":"2024-25","r":"GK","rt":70,"rg":["GK"],"pid":360},{"id":476,"n":"J. Fazzini","c":"Empoli","s":"2024-25","r":"CM","rt":70,"rg":["CAM","CM"],"pid":361},{"id":477,"n":"J. Jankto","c":"Cagliari","s":"2024-25","r":"LB","rt":70,"rg":["CM","LB","RB"],"pid":362},{"id":478,"n":"A. Obert","c":"Cagliari","s":"2024-25","r":"LB","rt":70,"rg":["CB","LB"],"pid":174},{"id":479,"n":"C. Ndour","c":"Fiorentina","s":"2024-25","r":"CM","rt":70,"rg":["CAM","CM"],"pid":363},{"id":480,"n":"L. Martínez","c":"Inter","s":"2023-24","r":"ST","rt":88,"rg":["ST"],"pid":1},{"id":481,"n":"M. Maignan","c":"AC Milan","s":"2023-24","r":"GK","rt":87,"rg":["GK"],"pid":3},{"id":482,"n":"V. Osimhen","c":"Napoli","s":"2023-24","r":"ST","rt":87,"rg":["ST"],"pid":364},{"id":483,"n":"Y. Sommer","c":"Inter","s":"2023-24","r":"GK","rt":86,"rg":["GK"],"pid":5},{"id":484,"n":"H. Çalhanoğlu","c":"Inter","s":"2023-24","r":"CM","rt":86,"rg":["CDM","CM"],"pid":6},{"id":485,"n":"N. Barella","c":"Inter","s":"2023-24","r":"CM","rt":86,"rg":["CM"],"pid":0},{"id":486,"n":"Rafael Leão","c":"AC Milan","s":"2023-24","r":"LW","rt":86,"rg":["LW","ST"],"pid":18},{"id":487,"n":"K. Kvaratskhelia","c":"Napoli","s":"2023-24","r":"LW","rt":86,"rg":["LW","RW"],"pid":365},{"id":488,"n":"P. Dybala","c":"Roma","s":"2023-24","r":"ST","rt":86,"rg":["ST"],"pid":15},{"id":489,"n":"A. Bastoni","c":"Inter","s":"2023-24","r":"CB","rt":85,"rg":["CB"],"pid":2},{"id":490,"n":"Bremer","c":"Juventus","s":"2023-24","r":"CB","rt":85,"rg":["CB"],"pid":8},{"id":491,"n":"T. Hernández","c":"AC Milan","s":"2023-24","r":"LB","rt":85,"rg":["CB","LB"],"pid":240},{"id":492,"n":"G. Di Lorenzo","c":"Napoli","s":"2023-24","r":"RB","rt":85,"rg":["RB"],"pid":30},{"id":493,"n":"D. Berardi","c":"Sassuolo","s":"2023-24","r":"RW","rt":85,"rg":["RW"],"pid":45},{"id":494,"n":"A. Rabiot","c":"Juventus","s":"2023-24","r":"CM","rt":84,"rg":["CDM","CM"],"pid":13},{"id":495,"n":"F. Chiesa","c":"Juventus","s":"2023-24","r":"ST","rt":84,"rg":["LW","ST"],"pid":366},{"id":496,"n":"D. Vlahović","c":"Juventus","s":"2023-24","r":"ST","rt":84,"rg":["ST"],"pid":52},{"id":497,"n":"C. Immobile","c":"Lazio","s":"2023-24","r":"ST","rt":84,"rg":["ST"],"pid":367},{"id":498,"n":"Luis Alberto","c":"Lazio","s":"2023-24","r":"CM","rt":84,"rg":["CM"],"pid":368},{"id":499,"n":"I. Bennacer","c":"AC Milan","s":"2023-24","r":"CDM","rt":84,"rg":["CAM","CDM","CM"],"pid":369},{"id":500,"n":"F. Tomori","c":"AC Milan","s":"2023-24","r":"CB","rt":84,"rg":["CB"],"pid":56},{"id":501,"n":"C. Smalling","c":"Roma","s":"2023-24","r":"CB","rt":84,"rg":["CB"],"pid":370},{"id":502,"n":"R. Lukaku","c":"Roma","s":"2023-24","r":"ST","rt":84,"rg":["ST"],"pid":28},{"id":503,"n":"F. Acerbi","c":"Inter","s":"2023-24","r":"CB","rt":83,"rg":["CB"],"pid":24},{"id":504,"n":"F. Dimarco","c":"Inter","s":"2023-24","r":"LW","rt":83,"rg":["CB","LW"],"pid":7},{"id":505,"n":"B. Pavard","c":"Inter","s":"2023-24","r":"CB","rt":83,"rg":["CB","RW"],"pid":242},{"id":506,"n":"F. Kostić","c":"Juventus","s":"2023-24","r":"LW","rt":83,"rg":["LW"],"pid":371},{"id":507,"n":"A. Romagnoli","c":"Lazio","s":"2023-24","r":"CB","rt":83,"rg":["CB"],"pid":39},{"id":508,"n":"S. Lobotka","c":"Napoli","s":"2023-24","r":"CM","rt":83,"rg":["CM"],"pid":29},{"id":509,"n":"L. Pellegrini","c":"Roma","s":"2023-24","r":"CAM","rt":83,"rg":["CAM","CM","ST"],"pid":252},{"id":510,"n":"G. Mancini","c":"Roma","s":"2023-24","r":"CB","rt":83,"rg":["CB"],"pid":19},{"id":511,"n":"T. Koopmeiners","c":"Atalanta","s":"2023-24","r":"CM","rt":82,"rg":["CAM","CDM","CM"],"pid":246},{"id":512,"n":"H. Mkhitaryan","c":"Inter","s":"2023-24","r":"CAM","rt":82,"rg":["CAM","CM"],"pid":22},{"id":513,"n":"S. de Vrij","c":"Inter","s":"2023-24","r":"CB","rt":82,"rg":["CB"],"pid":23},{"id":514,"n":"M. Locatelli","c":"Juventus","s":"2023-24","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":17},{"id":515,"n":"M. Zaccagni","c":"Lazio","s":"2023-24","r":"LW","rt":82,"rg":["LW"],"pid":26},{"id":516,"n":"I. Provedel","c":"Lazio","s":"2023-24","r":"GK","rt":82,"rg":["GK"],"pid":27},{"id":517,"n":"C. Pulisic","c":"AC Milan","s":"2023-24","r":"RW","rt":82,"rg":["LW","RW"],"pid":14},{"id":518,"n":"P. Zieliński","c":"Napoli","s":"2023-24","r":"CM","rt":82,"rg":["CAM","CM"],"pid":47},{"id":519,"n":"A. Meret","c":"Napoli","s":"2023-24","r":"GK","rt":82,"rg":["GK"],"pid":40},{"id":520,"n":"A. Lookman","c":"Atalanta","s":"2023-24","r":"ST","rt":81,"rg":["RW","ST"],"pid":241},{"id":521,"n":"M. Carnesecchi","c":"Atalanta","s":"2023-24","r":"GK","rt":81,"rg":["GK"],"pid":10},{"id":522,"n":"M. Darmian","c":"Inter","s":"2023-24","r":"RW","rt":81,"rg":["CB","RW"],"pid":250},{"id":523,"n":"M. Thuram","c":"Inter","s":"2023-24","r":"ST","rt":81,"rg":["ST"],"pid":11},{"id":524,"n":"D. Dumfries","c":"Inter","s":"2023-24","r":"RW","rt":81,"rg":["RW"],"pid":16},{"id":525,"n":"D. Frattesi","c":"Inter","s":"2023-24","r":"CM","rt":81,"rg":["CM"],"pid":48},{"id":526,"n":"Danilo","c":"Juventus","s":"2023-24","r":"CB","rt":81,"rg":["CB","RB"],"pid":372},{"id":527,"n":"A. Milik","c":"Juventus","s":"2023-24","r":"ST","rt":81,"rg":["ST"],"pid":373},{"id":528,"n":"D. Kamada","c":"Lazio","s":"2023-24","r":"CAM","rt":81,"rg":["CAM","CM","ST"],"pid":374},{"id":529,"n":"S. Kjær","c":"AC Milan","s":"2023-24","r":"CB","rt":81,"rg":["CB"],"pid":375},{"id":530,"n":"R. Loftus-Cheek","c":"AC Milan","s":"2023-24","r":"CM","rt":81,"rg":["CAM","CDM","CM"],"pid":376},{"id":531,"n":"Mário Rui","c":"Napoli","s":"2023-24","r":"LB","rt":81,"rg":["LB"],"pid":377},{"id":532,"n":"A. Zambo Anguissa","c":"Napoli","s":"2023-24","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":31},{"id":533,"n":"B. Cristante","c":"Roma","s":"2023-24","r":"CM","rt":81,"rg":["CB","CDM","CM"],"pid":378},{"id":534,"n":"D. Zapata","c":"Torino","s":"2023-24","r":"ST","rt":81,"rg":["ST"],"pid":249},{"id":535,"n":"N. González","c":"Fiorentina","s":"2023-24","r":"RW","rt":81,"rg":["LW","RW"],"pid":379},{"id":536,"n":"M. de Roon","c":"Atalanta","s":"2023-24","r":"CDM","rt":80,"rg":["CB","CDM","CM"],"pid":46},{"id":537,"n":"M. Pašalić","c":"Atalanta","s":"2023-24","r":"CAM","rt":80,"rg":["CAM","CM","ST"],"pid":255},{"id":538,"n":"M. Arnautović","c":"Inter","s":"2023-24","r":"ST","rt":80,"rg":["ST"],"pid":380},{"id":539,"n":"A. Sánchez","c":"Inter","s":"2023-24","r":"ST","rt":80,"rg":["ST"],"pid":257},{"id":540,"n":"S. Posch","c":"Bologna","s":"2023-24","r":"RB","rt":78,"rg":["RB"],"pid":381},{"id":541,"n":"L. Ferguson","c":"Bologna","s":"2023-24","r":"CAM","rt":78,"rg":["CAM","CDM","CM"],"pid":63},{"id":542,"n":"A. Saelemaekers","c":"Bologna","s":"2023-24","r":"RW","rt":78,"rg":["RW"],"pid":382},{"id":543,"n":"G. Ochoa","c":"US Salernitana 1919","s":"2023-24","r":"GK","rt":78,"rg":["GK"],"pid":383},{"id":544,"n":"A. Candreva","c":"US Salernitana 1919","s":"2023-24","r":"ST","rt":78,"rg":["CM","ST"],"pid":384},{"id":545,"n":"A. Belotti","c":"Fiorentina","s":"2023-24","r":"ST","rt":78,"rg":["ST"],"pid":138},{"id":546,"n":"M. Lopez","c":"Fiorentina","s":"2023-24","r":"CM","rt":78,"rg":["CDM","CM"],"pid":385},{"id":547,"n":"G. Castrovilli","c":"Fiorentina","s":"2023-24","r":"CM","rt":78,"rg":["CM"],"pid":386},{"id":548,"n":"Arthur","c":"Fiorentina","s":"2023-24","r":"CM","rt":78,"rg":["CDM","CM"],"pid":387},{"id":549,"n":"A. Barák","c":"Fiorentina","s":"2023-24","r":"CM","rt":78,"rg":["CAM","CM","ST"],"pid":388},{"id":550,"n":"M. Nzola","c":"Fiorentina","s":"2023-24","r":"ST","rt":78,"rg":["ST"],"pid":389},{"id":551,"n":"P. Ciurria","c":"Monza","s":"2023-24","r":"ST","rt":78,"rg":["ST"],"pid":304},{"id":552,"n":"M. Pessina","c":"Monza","s":"2023-24","r":"CM","rt":78,"rg":["CAM","CDM","CM"],"pid":259},{"id":553,"n":"A. Colpani","c":"Monza","s":"2023-24","r":"ST","rt":78,"rg":["CAM","ST"],"pid":390},{"id":554,"n":"A. Consigli","c":"Sassuolo","s":"2023-24","r":"GK","rt":78,"rg":["GK"],"pid":391},{"id":555,"n":"H. Hateboer","c":"Atalanta","s":"2023-24","r":"RW","rt":77,"rg":["RB","RW"],"pid":392},{"id":556,"n":"I. Hien","c":"Atalanta","s":"2023-24","r":"CB","rt":77,"rg":["CB"],"pid":393},{"id":557,"n":"G. Scalvini","c":"Atalanta","s":"2023-24","r":"CB","rt":77,"rg":["CB"],"pid":394},{"id":558,"n":"Alex Sandro","c":"Juventus","s":"2023-24","r":"CB","rt":77,"rg":["CB","LB"],"pid":395},{"id":559,"n":"A. Cambiaso","c":"Juventus","s":"2023-24","r":"LW","rt":77,"rg":["LW"],"pid":396},{"id":560,"n":"N. Fagioli","c":"Juventus","s":"2023-24","r":"CM","rt":77,"rg":["CDM","CM"],"pid":119},{"id":561,"n":"D. Cataldi","c":"Lazio","s":"2023-24","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":266},{"id":562,"n":"M. Vecino","c":"Lazio","s":"2023-24","r":"CM","rt":77,"rg":["CDM","CM"],"pid":397},{"id":563,"n":"N. Rovella","c":"Lazio","s":"2023-24","r":"CM","rt":77,"rg":["CDM","CM"],"pid":398},{"id":564,"n":"M. Sportiello","c":"AC Milan","s":"2023-24","r":"GK","rt":77,"rg":["GK"],"pid":88},{"id":565,"n":"N. Okafor","c":"AC Milan","s":"2023-24","r":"ST","rt":77,"rg":["CAM","LW","ST"],"pid":261},{"id":566,"n":"G. Simeone","c":"Napoli","s":"2023-24","r":"ST","rt":77,"rg":["ST"],"pid":102},{"id":567,"n":"M. Olivera","c":"Napoli","s":"2023-24","r":"LB","rt":77,"rg":["LB"],"pid":76},{"id":568,"n":"R. Karsdorp","c":"Roma","s":"2023-24","r":"RW","rt":77,"rg":["RB","RW"],"pid":399},{"id":569,"n":"T. Baldanzi","c":"Roma","s":"2023-24","r":"CAM","rt":77,"rg":["CAM","ST"],"pid":143},{"id":570,"n":"R. Rodríguez","c":"Torino","s":"2023-24","r":"CB","rt":77,"rg":["CB","LB"],"pid":400},{"id":571,"n":"V. Milinković-Savić","c":"Torino","s":"2023-24","r":"GK","rt":77,"rg":["GK"],"pid":401},{"id":572,"n":"S. Ricci","c":"Torino","s":"2023-24","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":402},{"id":573,"n":"I. Ilić","c":"Torino","s":"2023-24","r":"CM","rt":77,"rg":["CDM","CM","ST"],"pid":264},{"id":574,"n":"Ł. Skorupski","c":"Bologna","s":"2023-24","r":"GK","rt":77,"rg":["GK"],"pid":62},{"id":575,"n":"L. Montipò","c":"Hellas Verona FC","s":"2023-24","r":"GK","rt":77,"rg":["GK"],"pid":108},{"id":576,"n":"S. Luperto","c":"Empoli","s":"2023-24","r":"CB","rt":77,"rg":["CB"],"pid":282},{"id":577,"n":"L. Martínez Quarta","c":"Fiorentina","s":"2023-24","r":"CB","rt":77,"rg":["CB"],"pid":403},{"id":578,"n":"Dodô","c":"Fiorentina","s":"2023-24","r":"RB","rt":77,"rg":["RB"],"pid":67},{"id":579,"n":"J. Ikoné","c":"Fiorentina","s":"2023-24","r":"RW","rt":77,"rg":["RW"],"pid":281},{"id":580,"n":"C. Kouamé","c":"Fiorentina","s":"2023-24","r":"ST","rt":77,"rg":["LW","RW","ST"],"pid":178},{"id":581,"n":"F. Parisi","c":"Fiorentina","s":"2023-24","r":"LB","rt":77,"rg":["LB"],"pid":404},{"id":582,"n":"R. Malinovskyi","c":"Genoa","s":"2023-24","r":"CM","rt":77,"rg":["CM","ST"],"pid":405},{"id":583,"n":"Junior Messias","c":"Genoa","s":"2023-24","r":"CM","rt":77,"rg":["CM","RW"],"pid":406},{"id":584,"n":"M. Retegui","c":"Genoa","s":"2023-24","r":"ST","rt":77,"rg":["ST"],"pid":256},{"id":585,"n":"D. Klaassen","c":"Inter","s":"2023-24","r":"CM","rt":76,"rg":["CAM","CM"],"pid":407},{"id":586,"n":"Y. Bisseck","c":"Inter","s":"2023-24","r":"CB","rt":76,"rg":["CB"],"pid":90},{"id":587,"n":"M. De Sciglio","c":"Juventus","s":"2023-24","r":"RB","rt":76,"rg":["LB","RB"],"pid":408},{"id":588,"n":"Tiago Djaló","c":"Juventus","s":"2023-24","r":"CB","rt":76,"rg":["CB"],"pid":409},{"id":589,"n":"Patric","c":"Lazio","s":"2023-24","r":"CB","rt":76,"rg":["CB"],"pid":270},{"id":590,"n":"E. Hysaj","c":"Lazio","s":"2023-24","r":"LB","rt":76,"rg":["LB","RB"],"pid":307},{"id":591,"n":"Y. Adli","c":"AC Milan","s":"2023-24","r":"CDM","rt":76,"rg":["CAM","CDM","CM"],"pid":268},{"id":592,"n":"M. Thiaw","c":"AC Milan","s":"2023-24","r":"CB","rt":76,"rg":["CB"],"pid":410},{"id":593,"n":"P. Gollini","c":"Napoli","s":"2023-24","r":"GK","rt":76,"rg":["GK"],"pid":411},{"id":594,"n":"H. Traorè","c":"Napoli","s":"2023-24","r":"LW","rt":76,"rg":["CAM","LW"],"pid":412},{"id":595,"n":"J. Lindstrøm","c":"Napoli","s":"2023-24","r":"CAM","rt":76,"rg":["CAM","ST"],"pid":413},{"id":596,"n":"Z. Çelik","c":"Roma","s":"2023-24","r":"RW","rt":76,"rg":["RB","RW"],"pid":275},{"id":597,"n":"R. Kristensen","c":"Roma","s":"2023-24","r":"RB","rt":76,"rg":["CB","RB","RW"],"pid":414},{"id":598,"n":"A. Tameze","c":"Torino","s":"2023-24","r":"CB","rt":76,"rg":["CB","CDM","CM"],"pid":120},{"id":599,"n":"J. Karlsson","c":"Bologna","s":"2023-24","r":"LW","rt":76,"rg":["LW"],"pid":279},{"id":600,"n":"C. Lykogiannis","c":"Bologna","s":"2023-24","r":"LB","rt":74,"rg":["LB","LW"],"pid":162},{"id":601,"n":"N. Moro","c":"Bologna","s":"2023-24","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":415},{"id":602,"n":"V. Kristiansen","c":"Bologna","s":"2023-24","r":"LB","rt":74,"rg":["LB"],"pid":416},{"id":603,"n":"P. Dawidowicz","c":"Hellas Verona FC","s":"2023-24","r":"CB","rt":74,"rg":["CB"],"pid":417},{"id":604,"n":"O. Duda","c":"Hellas Verona FC","s":"2023-24","r":"CM","rt":74,"rg":["CAM","CDM","CM"],"pid":418},{"id":605,"n":"N. Sansone","c":"Lecce","s":"2023-24","r":"CAM","rt":74,"rg":["CAM","ST"],"pid":338},{"id":606,"n":"N. Krstović","c":"Lecce","s":"2023-24","r":"ST","rt":74,"rg":["ST"],"pid":89},{"id":607,"n":"T. Ebuehi","c":"Empoli","s":"2023-24","r":"RB","rt":74,"rg":["RB"],"pid":295},{"id":608,"n":"E. Caprile","c":"Empoli","s":"2023-24","r":"GK","rt":74,"rg":["GK"],"pid":66},{"id":609,"n":"A. Petagna","c":"Cagliari","s":"2023-24","r":"ST","rt":74,"rg":["ST"],"pid":346},{"id":610,"n":"J. Boateng","c":"US Salernitana 1919","s":"2023-24","r":"CB","rt":74,"rg":["CB"],"pid":419},{"id":611,"n":"L. Coulibaly","c":"US Salernitana 1919","s":"2023-24","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":134},{"id":612,"n":"G. Maggiore","c":"US Salernitana 1919","s":"2023-24","r":"CM","rt":74,"rg":["CDM","CM"],"pid":420},{"id":613,"n":"T. Bašić","c":"US Salernitana 1919","s":"2023-24","r":"CM","rt":74,"rg":["CDM","CM"],"pid":421},{"id":614,"n":"A. Duncan","c":"Fiorentina","s":"2023-24","r":"CM","rt":74,"rg":["CDM","CM"],"pid":285},{"id":615,"n":"Aarón","c":"Genoa","s":"2023-24","r":"LW","rt":74,"rg":["LW"],"pid":300},{"id":616,"n":"M. Frendrup","c":"Genoa","s":"2023-24","r":"CM","rt":74,"rg":["CM"],"pid":422},{"id":617,"n":"Josep Martínez","c":"Genoa","s":"2023-24","r":"GK","rt":74,"rg":["GK"],"pid":423},{"id":618,"n":"S. Turati","c":"Frosinone","s":"2023-24","r":"GK","rt":74,"rg":["GK"],"pid":306},{"id":619,"n":"W. Cheddira","c":"Frosinone","s":"2023-24","r":"ST","rt":74,"rg":["ST"],"pid":424},{"id":620,"n":"L. Caldirola","c":"Monza","s":"2023-24","r":"CB","rt":74,"rg":["CB"],"pid":425},{"id":621,"n":"A. Izzo","c":"Monza","s":"2023-24","r":"CB","rt":74,"rg":["CB"],"pid":303},{"id":622,"n":"Dany Mota","c":"Monza","s":"2023-24","r":"ST","rt":74,"rg":["ST"],"pid":426},{"id":623,"n":"S. Birindelli","c":"Monza","s":"2023-24","r":"RW","rt":74,"rg":["RB","RW"],"pid":305},{"id":624,"n":"A. Cragno","c":"Sassuolo","s":"2023-24","r":"GK","rt":74,"rg":["GK"],"pid":427},{"id":625,"n":"A. Pinamonti","c":"Sassuolo","s":"2023-24","r":"ST","rt":74,"rg":["ST"],"pid":428},{"id":626,"n":"N. Bajrami","c":"Sassuolo","s":"2023-24","r":"RW","rt":74,"rg":["CAM","RW"],"pid":429},{"id":627,"n":"J. Doig","c":"Sassuolo","s":"2023-24","r":"LB","rt":74,"rg":["LB","LW"],"pid":430},{"id":628,"n":"D. Boloca","c":"Sassuolo","s":"2023-24","r":"CM","rt":74,"rg":["CDM","CM"],"pid":431},{"id":629,"n":"M. Bakker","c":"Atalanta","s":"2023-24","r":"LW","rt":73,"rg":["LB","LW"],"pid":432},{"id":630,"n":"E. Holm","c":"Atalanta","s":"2023-24","r":"RW","rt":73,"rg":["RB","RW"],"pid":433},{"id":631,"n":"C. Alcaraz","c":"Juventus","s":"2023-24","r":"ST","rt":73,"rg":["CAM","CM","ST"],"pid":434},{"id":632,"n":"S. Iling-Junior","c":"Juventus","s":"2023-24","r":"LB","rt":73,"rg":["LB"],"pid":435},{"id":633,"n":"L. Sepe","c":"Lazio","s":"2023-24","r":"GK","rt":73,"rg":["GK"],"pid":436},{"id":634,"n":"D. Demme","c":"Napoli","s":"2023-24","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":437},{"id":635,"n":"L. Østigård","c":"Napoli","s":"2023-24","r":"CB","rt":73,"rg":["CB"],"pid":438},{"id":636,"n":"P. Mazzocchi","c":"Napoli","s":"2023-24","r":"RB","rt":73,"rg":["LB","RB"],"pid":439},{"id":637,"n":"J. Cajuste","c":"Napoli","s":"2023-24","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":440},{"id":638,"n":"K. Djidji","c":"Torino","s":"2023-24","r":"CB","rt":73,"rg":["CB"],"pid":441},{"id":639,"n":"A. Masina","c":"Torino","s":"2023-24","r":"CB","rt":73,"rg":["CB","LB","LW"],"pid":442},{"id":640,"n":"Brenner","c":"Udinese","s":"2023-24","r":"ST","rt":73,"rg":["ST"],"pid":331},{"id":641,"n":"M. Payero","c":"Udinese","s":"2023-24","r":"CM","rt":73,"rg":["CDM","CM"],"pid":313},{"id":642,"n":"Zarraga","c":"Udinese","s":"2023-24","r":"CM","rt":73,"rg":["CDM","CM"],"pid":443},{"id":643,"n":"L. Lucca","c":"Udinese","s":"2023-24","r":"ST","rt":73,"rg":["ST"],"pid":444},{"id":644,"n":"L. De Silvestri","c":"Bologna","s":"2023-24","r":"RB","rt":73,"rg":["RB","RW"],"pid":186},{"id":645,"n":"J. Odgaard","c":"Bologna","s":"2023-24","r":"ST","rt":73,"rg":["RW","ST"],"pid":81},{"id":646,"n":"D. Ndoye","c":"Bologna","s":"2023-24","r":"RB","rt":73,"rg":["LB","RB"],"pid":265},{"id":647,"n":"T. Suslov","c":"Hellas Verona FC","s":"2023-24","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":445},{"id":648,"n":"P. Almqvist","c":"Lecce","s":"2023-24","r":"RW","rt":73,"rg":["LW","RW","ST"],"pid":446},{"id":649,"n":"V. Gendrey","c":"Lecce","s":"2023-24","r":"RB","rt":73,"rg":["RB"],"pid":447},{"id":650,"n":"F. Caputo","c":"Empoli","s":"2023-24","r":"ST","rt":73,"rg":["ST"],"pid":448},{"id":651,"n":"M. Cancellieri","c":"Empoli","s":"2023-24","r":"LW","rt":73,"rg":["LW","ST"],"pid":449},{"id":652,"n":"N. Cambiaghi","c":"Empoli","s":"2023-24","r":"RW","rt":73,"rg":["RW","ST"],"pid":107},{"id":653,"n":"N. Viola","c":"Cagliari","s":"2023-24","r":"CAM","rt":73,"rg":["CAM","CDM","ST"],"pid":324},{"id":654,"n":"G. Lapadula","c":"Cagliari","s":"2023-24","r":"ST","rt":73,"rg":["ST"],"pid":450},{"id":655,"n":"S. Scuffet","c":"Cagliari","s":"2023-24","r":"GK","rt":73,"rg":["GK"],"pid":197},{"id":656,"n":"A. Dossena","c":"Cagliari","s":"2023-24","r":"CB","rt":73,"rg":["CB"],"pid":170},{"id":657,"n":"Zito Luvumbo","c":"Cagliari","s":"2023-24","r":"ST","rt":73,"rg":["ST"],"pid":451},{"id":658,"n":"A. Makoumbou","c":"Cagliari","s":"2023-24","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":452},{"id":659,"n":"M. Prati","c":"Cagliari","s":"2023-24","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":453},{"id":660,"n":"F. Terracciano","c":"AC Milan","s":"2023-24","r":"RB","rt":71,"rg":["LB","RB"],"pid":206},{"id":661,"n":"M. Lovato","c":"Torino","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":454},{"id":662,"n":"C. Kabasele","c":"Udinese","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":159},{"id":663,"n":"K. Ehizibue","c":"Udinese","s":"2023-24","r":"RW","rt":71,"rg":["RB","RW"],"pid":182},{"id":664,"n":"K. Davis","c":"Udinese","s":"2023-24","r":"ST","rt":71,"rg":["ST"],"pid":123},{"id":665,"n":"E. Ebosse","c":"Udinese","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":215},{"id":666,"n":"M. Okoye","c":"Udinese","s":"2023-24","r":"GK","rt":71,"rg":["GK"],"pid":125},{"id":667,"n":"S. Castro","c":"Bologna","s":"2023-24","r":"ST","rt":71,"rg":["RW","ST"],"pid":83},{"id":668,"n":"F. Bonazzoli","c":"Hellas Verona FC","s":"2023-24","r":"ST","rt":71,"rg":["ST"],"pid":455},{"id":669,"n":"F. Centonze","c":"Hellas Verona FC","s":"2023-24","r":"RB","rt":71,"rg":["RB","RW"],"pid":456},{"id":670,"n":"Rúben Vinagre","c":"Hellas Verona FC","s":"2023-24","r":"LB","rt":71,"rg":["LB","LW"],"pid":457},{"id":671,"n":"J. Cabal","c":"Hellas Verona FC","s":"2023-24","r":"LB","rt":71,"rg":["CB","LB"],"pid":458},{"id":672,"n":"D. Coppola","c":"Hellas Verona FC","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":459},{"id":673,"n":"L. Venuti","c":"Lecce","s":"2023-24","r":"RB","rt":71,"rg":["RB"],"pid":460},{"id":674,"n":"R. Piccoli","c":"Lecce","s":"2023-24","r":"ST","rt":71,"rg":["ST"],"pid":461},{"id":675,"n":"Joan González","c":"Lecce","s":"2023-24","r":"CM","rt":71,"rg":["CM"],"pid":462},{"id":676,"n":"A. Grassi","c":"Empoli","s":"2023-24","r":"CM","rt":71,"rg":["CDM","CM"],"pid":232},{"id":677,"n":"S. Bastoni","c":"Empoli","s":"2023-24","r":"CM","rt":71,"rg":["CM","LB","RB"],"pid":463},{"id":678,"n":"L. Cacace","c":"Empoli","s":"2023-24","r":"LB","rt":71,"rg":["LB","LW"],"pid":464},{"id":679,"n":"M. Wieteska","c":"Cagliari","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":465},{"id":680,"n":"G. Oristanio","c":"Cagliari","s":"2023-24","r":"ST","rt":71,"rg":["CAM","ST"],"pid":154},{"id":681,"n":"F. Fazio","c":"US Salernitana 1919","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":466},{"id":682,"n":"N. Gyömbér","c":"US Salernitana 1919","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":467},{"id":683,"n":"J. Sambia","c":"US Salernitana 1919","s":"2023-24","r":"RW","rt":71,"rg":["RB","RW"],"pid":468},{"id":684,"n":"D. Bradarić","c":"US Salernitana 1919","s":"2023-24","r":"LW","rt":71,"rg":["LB","LW"],"pid":355},{"id":685,"n":"L. Pirola","c":"US Salernitana 1919","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":469},{"id":686,"n":"S. Sabelli","c":"Genoa","s":"2023-24","r":"RW","rt":71,"rg":["RW"],"pid":193},{"id":687,"n":"E. Bohinen","c":"Genoa","s":"2023-24","r":"CM","rt":71,"rg":["CDM","CM"],"pid":470},{"id":688,"n":"S. Romagnoli","c":"Frosinone","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":471},{"id":689,"n":"K. Bonifazi","c":"Frosinone","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":472},{"id":690,"n":"Reinier","c":"Frosinone","s":"2023-24","r":"CAM","rt":71,"rg":["CAM","ST"],"pid":473},{"id":691,"n":"G. Caso","c":"Frosinone","s":"2023-24","r":"LW","rt":71,"rg":["LW"],"pid":474},{"id":692,"n":"M. Đurić","c":"Monza","s":"2023-24","r":"ST","rt":71,"rg":["ST"],"pid":231},{"id":693,"n":"G. Donati","c":"Monza","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":475},{"id":694,"n":"A. Zerbin","c":"Monza","s":"2023-24","r":"LW","rt":71,"rg":["LW"],"pid":333},{"id":695,"n":"Pedro Obiang","c":"Sassuolo","s":"2023-24","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":476},{"id":696,"n":"M. Viti","c":"Sassuolo","s":"2023-24","r":"CB","rt":71,"rg":["CB"],"pid":343},{"id":697,"n":"R. Di Gennaro","c":"Inter","s":"2023-24","r":"GK","rt":70,"rg":["GK"],"pid":477},{"id":698,"n":"J. Zemura","c":"Udinese","s":"2023-24","r":"LW","rt":70,"rg":["LB","LW"],"pid":184},{"id":699,"n":"T. Kristensen","c":"Udinese","s":"2023-24","r":"CB","rt":70,"rg":["CB"],"pid":160},{"id":700,"n":"F. Ebosele","c":"Udinese","s":"2023-24","r":"RW","rt":70,"rg":["RB","RW"],"pid":478},{"id":701,"n":"A. Touba","c":"Lecce","s":"2023-24","r":"CB","rt":70,"rg":["CB"],"pid":479},{"id":702,"n":"Y. Ramadani","c":"Lecce","s":"2023-24","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":220},{"id":703,"n":"M. Kaba","c":"Lecce","s":"2023-24","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":480},{"id":704,"n":"M. Destro","c":"Empoli","s":"2023-24","r":"ST","rt":70,"rg":["ST"],"pid":481},{"id":705,"n":"V. Kovalenko","c":"Empoli","s":"2023-24","r":"CM","rt":70,"rg":["CAM","CM"],"pid":359},{"id":706,"n":"S. Walukiewicz","c":"Empoli","s":"2023-24","r":"CB","rt":70,"rg":["CB"],"pid":330},{"id":707,"n":"L. Pavoletti","c":"Cagliari","s":"2023-24","r":"ST","rt":70,"rg":["ST"],"pid":482},{"id":708,"n":"Paulo Azzi","c":"Cagliari","s":"2023-24","r":"LB","rt":70,"rg":["LB","LW"],"pid":483},{"id":709,"n":"B. Radunović","c":"Cagliari","s":"2023-24","r":"GK","rt":70,"rg":["GK"],"pid":484},{"id":710,"n":"G. Zappa","c":"Cagliari","s":"2023-24","r":"RB","rt":70,"rg":["RB","RW"],"pid":172},{"id":711,"n":"I. Sulemana","c":"Cagliari","s":"2023-24","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":175},{"id":712,"n":"R. Haps","c":"Genoa","s":"2023-24","r":"LW","rt":70,"rg":["LB","LW"],"pid":485},{"id":713,"n":"A. Vogliacco","c":"Genoa","s":"2023-24","r":"CB","rt":70,"rg":["CB"],"pid":486},{"id":714,"n":"K. De Winter","c":"Genoa","s":"2023-24","r":"CB","rt":70,"rg":["CB","RW"],"pid":301},{"id":715,"n":"R. Marchizza","c":"Frosinone","s":"2023-24","r":"LB","rt":70,"rg":["LB"],"pid":487},{"id":716,"n":"E. Barrenechea","c":"Frosinone","s":"2023-24","r":"CDM","rt":70,"rg":["CDM","CM"],"pid":488},{"id":717,"n":"E. Valeri","c":"Frosinone","s":"2023-24","r":"LB","rt":70,"rg":["LB","LW"],"pid":311},{"id":718,"n":"Kaio Jorge","c":"Frosinone","s":"2023-24","r":"ST","rt":70,"rg":["ST"],"pid":489},{"id":719,"n":"D. Maldini","c":"Monza","s":"2023-24","r":"CAM","rt":70,"rg":["CAM","ST"],"pid":490},{"id":720,"n":"M. Maignan","c":"AC Milan","s":"2022-23","r":"GK","rt":87,"rg":["GK"],"pid":3},{"id":721,"n":"W. Szczęsny","c":"Juventus","s":"2022-23","r":"GK","rt":86,"rg":["GK"],"pid":491},{"id":722,"n":"C. Immobile","c":"Lazio","s":"2022-23","r":"ST","rt":86,"rg":["ST"],"pid":367},{"id":723,"n":"S. Milinković-Savić","c":"Lazio","s":"2022-23","r":"CM","rt":86,"rg":["CM"],"pid":492},{"id":724,"n":"P. Dybala","c":"Roma","s":"2022-23","r":"ST","rt":86,"rg":["CAM","ST"],"pid":15},{"id":725,"n":"N. Barella","c":"Inter","s":"2022-23","r":"CM","rt":85,"rg":["CM"],"pid":0},{"id":726,"n":"L. Martínez","c":"Inter","s":"2022-23","r":"ST","rt":85,"rg":["ST"],"pid":1},{"id":727,"n":"M. Škriniar","c":"Inter","s":"2022-23","r":"CB","rt":85,"rg":["CB"],"pid":493},{"id":728,"n":"T. Hernández","c":"AC Milan","s":"2022-23","r":"LB","rt":85,"rg":["LB"],"pid":240},{"id":729,"n":"V. Osimhen","c":"Napoli","s":"2022-23","r":"ST","rt":85,"rg":["ST"],"pid":364},{"id":730,"n":"R. Lukaku","c":"Inter","s":"2022-23","r":"ST","rt":84,"rg":["ST"],"pid":28},{"id":731,"n":"H. Çalhanoğlu","c":"Inter","s":"2022-23","r":"CM","rt":84,"rg":["CDM","CM"],"pid":6},{"id":732,"n":"M. Brozović","c":"Inter","s":"2022-23","r":"CDM","rt":84,"rg":["CDM"],"pid":494},{"id":733,"n":"A. Bastoni","c":"Inter","s":"2022-23","r":"CB","rt":84,"rg":["CB"],"pid":2},{"id":734,"n":"Á. Di María","c":"Juventus","s":"2022-23","r":"ST","rt":84,"rg":["RW","ST"],"pid":495},{"id":735,"n":"P. Pogba","c":"Juventus","s":"2022-23","r":"CM","rt":84,"rg":["CDM","CM"],"pid":496},{"id":736,"n":"F. Kostić","c":"Juventus","s":"2022-23","r":"LW","rt":84,"rg":["LW"],"pid":371},{"id":737,"n":"F. Chiesa","c":"Juventus","s":"2022-23","r":"LW","rt":84,"rg":["LW","RW"],"pid":366},{"id":738,"n":"D. Vlahović","c":"Juventus","s":"2022-23","r":"ST","rt":84,"rg":["ST"],"pid":52},{"id":739,"n":"Luis Alberto","c":"Lazio","s":"2022-23","r":"CM","rt":84,"rg":["CM"],"pid":368},{"id":740,"n":"F. Tomori","c":"AC Milan","s":"2022-23","r":"CB","rt":84,"rg":["CB"],"pid":56},{"id":741,"n":"S. Tonali","c":"AC Milan","s":"2022-23","r":"CDM","rt":84,"rg":["CDM","CM"],"pid":497},{"id":742,"n":"Rafael Leão","c":"AC Milan","s":"2022-23","r":"LW","rt":84,"rg":["LW","ST"],"pid":18},{"id":743,"n":"D. Berardi","c":"Sassuolo","s":"2022-23","r":"RW","rt":84,"rg":["RW"],"pid":45},{"id":744,"n":"E. Džeko","c":"Inter","s":"2022-23","r":"ST","rt":83,"rg":["ST"],"pid":498},{"id":745,"n":"S. de Vrij","c":"Inter","s":"2022-23","r":"CB","rt":83,"rg":["CB"],"pid":23},{"id":746,"n":"A. Onana","c":"Inter","s":"2022-23","r":"GK","rt":83,"rg":["GK"],"pid":499},{"id":747,"n":"Bremer","c":"Juventus","s":"2022-23","r":"CB","rt":83,"rg":["CB"],"pid":8},{"id":748,"n":"O. Giroud","c":"AC Milan","s":"2022-23","r":"ST","rt":83,"rg":["ST"],"pid":500},{"id":749,"n":"I. Bennacer","c":"AC Milan","s":"2022-23","r":"CDM","rt":83,"rg":["CAM","CDM","CM"],"pid":369},{"id":750,"n":"P. Zieliński","c":"Napoli","s":"2022-23","r":"CAM","rt":83,"rg":["CAM","CM"],"pid":47},{"id":751,"n":"G. Di Lorenzo","c":"Napoli","s":"2022-23","r":"RB","rt":83,"rg":["RB"],"pid":30},{"id":752,"n":"C. Smalling","c":"Roma","s":"2022-23","r":"CB","rt":83,"rg":["CB"],"pid":370},{"id":753,"n":"L. Pellegrini","c":"Roma","s":"2022-23","r":"CAM","rt":83,"rg":["CAM","CM","ST"],"pid":252},{"id":754,"n":"D. Zapata","c":"Atalanta","s":"2022-23","r":"ST","rt":82,"rg":["ST"],"pid":249},{"id":755,"n":"S. Handanovič","c":"Inter","s":"2022-23","r":"GK","rt":82,"rg":["GK"],"pid":501},{"id":756,"n":"F. Acerbi","c":"Inter","s":"2022-23","r":"CB","rt":82,"rg":["CB"],"pid":24},{"id":757,"n":"L. Bonucci","c":"Juventus","s":"2022-23","r":"CB","rt":82,"rg":["CB"],"pid":502},{"id":758,"n":"A. Rabiot","c":"Juventus","s":"2022-23","r":"CM","rt":82,"rg":["CM","LB"],"pid":13},{"id":759,"n":"M. Locatelli","c":"Juventus","s":"2022-23","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":17},{"id":760,"n":"A. Romagnoli","c":"Lazio","s":"2022-23","r":"CB","rt":82,"rg":["CB"],"pid":39},{"id":761,"n":"S. Lobotka","c":"Napoli","s":"2022-23","r":"CM","rt":82,"rg":["CDM","CM"],"pid":29},{"id":762,"n":"A. Zambo Anguissa","c":"Napoli","s":"2022-23","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":31},{"id":763,"n":"G. Mancini","c":"Roma","s":"2022-23","r":"CB","rt":82,"rg":["CB"],"pid":19},{"id":764,"n":"M. Arnautović","c":"Bologna","s":"2022-23","r":"ST","rt":82,"rg":["ST"],"pid":380},{"id":765,"n":"Rafael Tolói","c":"Atalanta","s":"2022-23","r":"CB","rt":81,"rg":["CB"],"pid":503},{"id":766,"n":"H. Mkhitaryan","c":"Inter","s":"2022-23","r":"CAM","rt":81,"rg":["CAM","CM"],"pid":22},{"id":767,"n":"D. Dumfries","c":"Inter","s":"2022-23","r":"RW","rt":81,"rg":["RW"],"pid":16},{"id":768,"n":"J. Cuadrado","c":"Juventus","s":"2022-23","r":"RB","rt":81,"rg":["RB","RW"],"pid":504},{"id":769,"n":"Danilo","c":"Juventus","s":"2022-23","r":"RB","rt":81,"rg":["CB","RB"],"pid":372},{"id":770,"n":"A. Milik","c":"Juventus","s":"2022-23","r":"ST","rt":81,"rg":["ST"],"pid":373},{"id":771,"n":"S. Kjær","c":"AC Milan","s":"2022-23","r":"CB","rt":81,"rg":["CB"],"pid":375},{"id":772,"n":"M. Politano","c":"Napoli","s":"2022-23","r":"RW","rt":81,"rg":["RW"],"pid":58},{"id":773,"n":"H. Lozano","c":"Napoli","s":"2022-23","r":"RW","rt":81,"rg":["RW"],"pid":505},{"id":774,"n":"A. Meret","c":"Napoli","s":"2022-23","r":"GK","rt":81,"rg":["GK"],"pid":40},{"id":775,"n":"K. Kvaratskhelia","c":"Napoli","s":"2022-23","r":"LW","rt":81,"rg":["CAM","LW"],"pid":365},{"id":776,"n":"L. Spinazzola","c":"Roma","s":"2022-23","r":"LW","rt":81,"rg":["LW"],"pid":506},{"id":777,"n":"T. Abraham","c":"Roma","s":"2022-23","r":"ST","rt":81,"rg":["ST"],"pid":260},{"id":778,"n":"Ibañez","c":"Roma","s":"2022-23","r":"CB","rt":81,"rg":["CB"],"pid":507},{"id":779,"n":"Deulofeu","c":"Udinese","s":"2022-23","r":"ST","rt":81,"rg":["ST"],"pid":508},{"id":780,"n":"A. Florenzi","c":"AC Milan","s":"2022-23","r":"RB","rt":78,"rg":["RB"],"pid":509},{"id":781,"n":"Junior Messias","c":"AC Milan","s":"2022-23","r":"RW","rt":78,"rg":["RW"],"pid":406},{"id":782,"n":"A. Saelemaekers","c":"AC Milan","s":"2022-23","r":"RW","rt":78,"rg":["RW"],"pid":382},{"id":783,"n":"G. Simeone","c":"Napoli","s":"2022-23","r":"ST","rt":78,"rg":["ST"],"pid":102},{"id":784,"n":"S. El Shaarawy","c":"Roma","s":"2022-23","r":"LW","rt":78,"rg":["LW"],"pid":510},{"id":785,"n":"N. Vlašić","c":"Torino","s":"2022-23","r":"ST","rt":78,"rg":["CAM","ST"],"pid":511},{"id":786,"n":"R. Orsolini","c":"Bologna","s":"2022-23","r":"ST","rt":78,"rg":["ST"],"pid":33},{"id":787,"n":"S. Amrabat","c":"Fiorentina","s":"2022-23","r":"CDM","rt":78,"rg":["CDM","CM"],"pid":512},{"id":788,"n":"G. Castrovilli","c":"Fiorentina","s":"2022-23","r":"CM","rt":78,"rg":["CM"],"pid":386},{"id":789,"n":"M. Nzola","c":"Spezia","s":"2022-23","r":"ST","rt":78,"rg":["ST"],"pid":389},{"id":790,"n":"M. Di Gregorio","c":"Monza","s":"2022-23","r":"GK","rt":78,"rg":["GK"],"pid":50},{"id":791,"n":"M. Pessina","c":"Monza","s":"2022-23","r":"CAM","rt":78,"rg":["CAM","CM","ST"],"pid":259},{"id":792,"n":"M. Lopez","c":"Sassuolo","s":"2022-23","r":"CM","rt":78,"rg":["CDM","CM"],"pid":385},{"id":793,"n":"D. Frattesi","c":"Sassuolo","s":"2022-23","r":"CM","rt":78,"rg":["CDM","CM"],"pid":48},{"id":794,"n":"B. Djimsiti","c":"Atalanta","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":513},{"id":795,"n":"J. Boga","c":"Atalanta","s":"2022-23","r":"LW","rt":77,"rg":["LW","ST"],"pid":92},{"id":796,"n":"J. Mæhle","c":"Atalanta","s":"2022-23","r":"LW","rt":77,"rg":["LW"],"pid":514},{"id":797,"n":"M. Demiral","c":"Atalanta","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":515},{"id":798,"n":"D. D'Ambrosio","c":"Inter","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":516},{"id":799,"n":"J. Correa","c":"Inter","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":517},{"id":800,"n":"D. Cataldi","c":"Lazio","s":"2022-23","r":"CDM","rt":77,"rg":["CDM"],"pid":266},{"id":801,"n":"M. Thiaw","c":"AC Milan","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":410},{"id":802,"n":"Diego Llorente","c":"Roma","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":518},{"id":803,"n":"N. Zalewski","c":"Roma","s":"2022-23","r":"RB","rt":77,"rg":["LB","RB"],"pid":71},{"id":804,"n":"A. Miranchuk","c":"Torino","s":"2022-23","r":"ST","rt":77,"rg":["CAM","ST"],"pid":519},{"id":805,"n":"I. Ilić","c":"Torino","s":"2022-23","r":"CM","rt":77,"rg":["CM","ST"],"pid":264},{"id":806,"n":"Rodrigo Becão","c":"Udinese","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":520},{"id":807,"n":"D. Udogie","c":"Udinese","s":"2022-23","r":"LW","rt":77,"rg":["LW"],"pid":521},{"id":808,"n":"Ł. Skorupski","c":"Bologna","s":"2022-23","r":"GK","rt":77,"rg":["GK"],"pid":62},{"id":809,"n":"R. Soriano","c":"Bologna","s":"2022-23","r":"CAM","rt":77,"rg":["CAM","ST"],"pid":522},{"id":810,"n":"N. Domínguez","c":"Bologna","s":"2022-23","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":523},{"id":811,"n":"M. Barrow","c":"Bologna","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":524},{"id":812,"n":"Gabriel Strefezza","c":"Lecce","s":"2022-23","r":"RW","rt":77,"rg":["RW"],"pid":98},{"id":813,"n":"M. Hjulmand","c":"Lecce","s":"2022-23","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":525},{"id":814,"n":"F. Parisi","c":"Empoli","s":"2022-23","r":"LB","rt":77,"rg":["LB"],"pid":404},{"id":815,"n":"R. Saponara","c":"Fiorentina","s":"2022-23","r":"LW","rt":77,"rg":["LW"],"pid":526},{"id":816,"n":"L. Martínez Quarta","c":"Fiorentina","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":403},{"id":817,"n":"L. Jović","c":"Fiorentina","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":527},{"id":818,"n":"Dodô","c":"Fiorentina","s":"2022-23","r":"RB","rt":77,"rg":["RB"],"pid":67},{"id":819,"n":"J. Ikoné","c":"Fiorentina","s":"2022-23","r":"RW","rt":77,"rg":["RW"],"pid":281},{"id":820,"n":"C. Kouamé","c":"Fiorentina","s":"2022-23","r":"ST","rt":77,"rg":["LW","RW","ST"],"pid":178},{"id":821,"n":"Igor","c":"Fiorentina","s":"2022-23","r":"CB","rt":77,"rg":["CB"],"pid":528},{"id":822,"n":"B. Drągowski","c":"Spezia","s":"2022-23","r":"GK","rt":77,"rg":["GK"],"pid":529},{"id":823,"n":"M. Carnesecchi","c":"Cremonese","s":"2022-23","r":"GK","rt":77,"rg":["GK"],"pid":10},{"id":824,"n":"G. Caprari","c":"Monza","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":530},{"id":825,"n":"A. Petagna","c":"Monza","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":346},{"id":826,"n":"P. Ciurria","c":"Monza","s":"2022-23","r":"ST","rt":77,"rg":["ST"],"pid":304},{"id":827,"n":"N. Rovella","c":"Monza","s":"2022-23","r":"CM","rt":77,"rg":["CDM","CM"],"pid":398},{"id":828,"n":"A. Laurienté","c":"Sassuolo","s":"2022-23","r":"LW","rt":77,"rg":["LW","RW","ST"],"pid":531},{"id":829,"n":"M. Sportiello","c":"Atalanta","s":"2022-23","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":830,"n":"J. Palomino","c":"Atalanta","s":"2022-23","r":"CB","rt":76,"rg":["CB"],"pid":532},{"id":831,"n":"M. De Sciglio","c":"Juventus","s":"2022-23","r":"RB","rt":76,"rg":["LB","RB"],"pid":408},{"id":832,"n":"N. Fagioli","c":"Juventus","s":"2022-23","r":"CDM","rt":76,"rg":["CAM","CDM","CM"],"pid":119},{"id":833,"n":"F. Gatti","c":"Juventus","s":"2022-23","r":"CB","rt":76,"rg":["CB"],"pid":533},{"id":834,"n":"Patric","c":"Lazio","s":"2022-23","r":"CB","rt":76,"rg":["CB","RB"],"pid":270},{"id":835,"n":"E. Hysaj","c":"Lazio","s":"2022-23","r":"LB","rt":76,"rg":["LB","RB"],"pid":307},{"id":836,"n":"C. De Ketelaere","c":"AC Milan","s":"2022-23","r":"CAM","rt":76,"rg":["CAM","ST"],"pid":35},{"id":837,"n":"S. Dest","c":"AC Milan","s":"2022-23","r":"RB","rt":76,"rg":["LB","RB"],"pid":534},{"id":838,"n":"T. Pobega","c":"AC Milan","s":"2022-23","r":"CM","rt":76,"rg":["CM"],"pid":130},{"id":839,"n":"Juan Jesus","c":"Napoli","s":"2022-23","r":"CB","rt":76,"rg":["CB"],"pid":535},{"id":840,"n":"I. Success","c":"Udinese","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":536},{"id":841,"n":"S. Lovrič","c":"Udinese","s":"2022-23","r":"CM","rt":74,"rg":["CDM","CM"],"pid":165},{"id":842,"n":"S. Posch","c":"Bologna","s":"2022-23","r":"RB","rt":74,"rg":["CB","RB"],"pid":381},{"id":843,"n":"J. Lucumí","c":"Bologna","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":105},{"id":844,"n":"M. Aebischer","c":"Bologna","s":"2022-23","r":"CM","rt":74,"rg":["CM","RB"],"pid":144},{"id":845,"n":"N. Moro","c":"Bologna","s":"2022-23","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":415},{"id":846,"n":"A. Cambiaso","c":"Bologna","s":"2022-23","r":"LB","rt":74,"rg":["LB","LW","RB"],"pid":396},{"id":847,"n":"Miguel Veloso","c":"Hellas Verona FC","s":"2022-23","r":"CM","rt":74,"rg":["CM"],"pid":537},{"id":848,"n":"S. Verdi","c":"Hellas Verona FC","s":"2022-23","r":"ST","rt":74,"rg":["CAM","ST"],"pid":538},{"id":849,"n":"F. Ceccherini","c":"Hellas Verona FC","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":202},{"id":850,"n":"A. Tameze","c":"Hellas Verona FC","s":"2022-23","r":"CM","rt":74,"rg":["CDM","CM"],"pid":120},{"id":851,"n":"O. Duda","c":"Hellas Verona FC","s":"2022-23","r":"CM","rt":74,"rg":["CAM","CM","ST"],"pid":418},{"id":852,"n":"T. Henry","c":"Hellas Verona FC","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":539},{"id":853,"n":"Y. Maleh","c":"Lecce","s":"2022-23","r":"CM","rt":74,"rg":["CM"],"pid":204},{"id":854,"n":"M. Pongračić","c":"Lecce","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":179},{"id":855,"n":"P. Stojanović","c":"Empoli","s":"2022-23","r":"RB","rt":74,"rg":["RB"],"pid":540},{"id":856,"n":"K. Günter","c":"Sampdoria","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":541},{"id":857,"n":"T. Vilhena","c":"US Salernitana 1919","s":"2022-23","r":"CM","rt":74,"rg":["CAM","CM"],"pid":542},{"id":858,"n":"K. Piątek","c":"US Salernitana 1919","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":543},{"id":859,"n":"L. Coulibaly","c":"US Salernitana 1919","s":"2022-23","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":134},{"id":860,"n":"F. Daniliuc","c":"US Salernitana 1919","s":"2022-23","r":"CB","rt":74,"rg":["CB","RB"],"pid":318},{"id":861,"n":"E. Gyasi","c":"Spezia","s":"2022-23","r":"RW","rt":74,"rg":["LW","RW","ST"],"pid":294},{"id":862,"n":"D. Verde","c":"Spezia","s":"2022-23","r":"RW","rt":74,"rg":["CAM","RW"],"pid":544},{"id":863,"n":"E. Ampadu","c":"Spezia","s":"2022-23","r":"CB","rt":74,"rg":["CB","CDM","CM"],"pid":545},{"id":864,"n":"E. Shomurodov","c":"Spezia","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":312},{"id":865,"n":"S. Meïté","c":"Cremonese","s":"2022-23","r":"CM","rt":74,"rg":["CDM","CM"],"pid":546},{"id":866,"n":"L. Caldirola","c":"Monza","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":425},{"id":867,"n":"A. Izzo","c":"Monza","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":303},{"id":868,"n":"Dany Mota","c":"Monza","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":426},{"id":869,"n":"S. Birindelli","c":"Monza","s":"2022-23","r":"RW","rt":74,"rg":["RB","RW"],"pid":305},{"id":870,"n":"A. Colpani","c":"Monza","s":"2022-23","r":"CM","rt":74,"rg":["CAM","CM","ST"],"pid":390},{"id":871,"n":"A. Pinamonti","c":"Sassuolo","s":"2022-23","r":"ST","rt":74,"rg":["ST"],"pid":428},{"id":872,"n":"M. Erlić","c":"Sassuolo","s":"2022-23","r":"CB","rt":74,"rg":["CB"],"pid":314},{"id":873,"n":"R. Højlund","c":"Atalanta","s":"2022-23","r":"ST","rt":73,"rg":["ST"],"pid":547},{"id":874,"n":"G. Scalvini","c":"Atalanta","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":394},{"id":875,"n":"R. Bellanova","c":"Inter","s":"2022-23","r":"RW","rt":73,"rg":["RW"],"pid":69},{"id":876,"n":"Marcos Antonio","c":"Lazio","s":"2022-23","r":"CM","rt":73,"rg":["CDM","CM"],"pid":548},{"id":877,"n":"M. Cancellieri","c":"Lazio","s":"2022-23","r":"RW","rt":73,"rg":["RW","ST"],"pid":449},{"id":878,"n":"T. Bakayoko","c":"AC Milan","s":"2022-23","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":549},{"id":879,"n":"M. Gabbia","c":"AC Milan","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":550},{"id":880,"n":"Y. Adli","c":"AC Milan","s":"2022-23","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":268},{"id":881,"n":"A. Vranckx","c":"AC Milan","s":"2022-23","r":"CM","rt":73,"rg":["CDM","CM"],"pid":551},{"id":882,"n":"L. Østigård","c":"Napoli","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":438},{"id":883,"n":"O. Solbakken","c":"Roma","s":"2022-23","r":"RW","rt":73,"rg":["LW","RW"],"pid":552},{"id":884,"n":"K. Djidji","c":"Torino","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":441},{"id":885,"n":"O. Aina","c":"Torino","s":"2022-23","r":"LW","rt":73,"rg":["LW"],"pid":553},{"id":886,"n":"Y. Karamoh","c":"Torino","s":"2022-23","r":"ST","rt":73,"rg":["RW","ST"],"pid":554},{"id":887,"n":"A. Buongiorno","c":"Torino","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":41},{"id":888,"n":"D. Zima","c":"Torino","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":555},{"id":889,"n":"A. Masina","c":"Udinese","s":"2022-23","r":"LW","rt":73,"rg":["CB","LB","LW"],"pid":442},{"id":890,"n":"L. De Silvestri","c":"Bologna","s":"2022-23","r":"RB","rt":73,"rg":["RB","RW"],"pid":186},{"id":891,"n":"G. Medel","c":"Bologna","s":"2022-23","r":"CB","rt":73,"rg":["CB","CDM"],"pid":556},{"id":892,"n":"A. Soumaoro","c":"Bologna","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":557},{"id":893,"n":"J. Zirkzee","c":"Bologna","s":"2022-23","r":"ST","rt":73,"rg":["ST"],"pid":558},{"id":894,"n":"G. Kyriakopoulos","c":"Bologna","s":"2022-23","r":"LB","rt":73,"rg":["LB","LW"],"pid":326},{"id":895,"n":"P. Dawidowicz","c":"Hellas Verona FC","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":417},{"id":896,"n":"F. Depaoli","c":"Hellas Verona FC","s":"2022-23","r":"RW","rt":73,"rg":["RW"],"pid":559},{"id":897,"n":"G. Magnani","c":"Hellas Verona FC","s":"2022-23","r":"CB","rt":73,"rg":["CB"],"pid":560},{"id":898,"n":"C. Ngonge","c":"Hellas Verona FC","s":"2022-23","r":"ST","rt":73,"rg":["RW","ST"],"pid":309},{"id":899,"n":"G. Pezzella","c":"Lecce","s":"2022-23","r":"LB","rt":73,"rg":["LB","LW"],"pid":203},{"id":900,"n":"D. Vásquez","c":"AC Milan","s":"2022-23","r":"GK","rt":71,"rg":["GK"],"pid":360},{"id":901,"n":"G. Gaetano","c":"Napoli","s":"2022-23","r":"CAM","rt":71,"rg":["CAM","CM"],"pid":171},{"id":902,"n":"M. Svilar","c":"Roma","s":"2022-23","r":"GK","rt":71,"rg":["GK"],"pid":20},{"id":903,"n":"E. Berisha","c":"Torino","s":"2022-23","r":"GK","rt":71,"rg":["GK"],"pid":561},{"id":904,"n":"Ronaldo Vieira","c":"Torino","s":"2022-23","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":562},{"id":905,"n":"D. Padelli","c":"Udinese","s":"2022-23","r":"GK","rt":71,"rg":["GK"],"pid":563},{"id":906,"n":"I. Nestorovski","c":"Udinese","s":"2022-23","r":"ST","rt":71,"rg":["ST"],"pid":564},{"id":907,"n":"K. Ehizibue","c":"Udinese","s":"2022-23","r":"RW","rt":71,"rg":["RB","RW"],"pid":182},{"id":908,"n":"E. Ebosse","c":"Udinese","s":"2022-23","r":"CB","rt":71,"rg":["CB","LW"],"pid":215},{"id":909,"n":"L. Ferguson","c":"Bologna","s":"2022-23","r":"CM","rt":71,"rg":["CAM","CDM","CM"],"pid":63},{"id":910,"n":"K. Lasagna","c":"Hellas Verona FC","s":"2022-23","r":"ST","rt":71,"rg":["ST"],"pid":565},{"id":911,"n":"A. Hrustić","c":"Hellas Verona FC","s":"2022-23","r":"CM","rt":71,"rg":["CM","ST"],"pid":566},{"id":912,"n":"D. Coppola","c":"Hellas Verona FC","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":459},{"id":913,"n":"S. Romagnoli","c":"Lecce","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":471},{"id":914,"n":"P. Ceccaroni","c":"Lecce","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":567},{"id":915,"n":"A. Blin","c":"Lecce","s":"2022-23","r":"CDM","rt":71,"rg":["CB","CDM","CM"],"pid":568},{"id":916,"n":"R. Oudin","c":"Lecce","s":"2022-23","r":"LW","rt":71,"rg":["CM","LW","RW"],"pid":569},{"id":917,"n":"A. Gallo","c":"Lecce","s":"2022-23","r":"LB","rt":71,"rg":["LB"],"pid":290},{"id":918,"n":"L. Tonelli","c":"Empoli","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":570},{"id":919,"n":"N. Haas","c":"Empoli","s":"2022-23","r":"CM","rt":71,"rg":["CM"],"pid":571},{"id":920,"n":"L. Cacace","c":"Empoli","s":"2022-23","r":"LB","rt":71,"rg":["LB","LW"],"pid":464},{"id":921,"n":"N. Cambiaghi","c":"Empoli","s":"2022-23","r":"ST","rt":71,"rg":["CAM","LW","ST"],"pid":107},{"id":922,"n":"Jesé","c":"Sampdoria","s":"2022-23","r":"ST","rt":71,"rg":["ST"],"pid":572},{"id":923,"n":"A. Conti","c":"Sampdoria","s":"2022-23","r":"RB","rt":71,"rg":["RB"],"pid":573},{"id":924,"n":"A. Sabiri","c":"Sampdoria","s":"2022-23","r":"CAM","rt":71,"rg":["CAM","CM"],"pid":574},{"id":925,"n":"A. Zanoli","c":"Sampdoria","s":"2022-23","r":"RB","rt":71,"rg":["RB"],"pid":161},{"id":926,"n":"F. Fazio","c":"US Salernitana 1919","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":466},{"id":927,"n":"W. Troost-Ekong","c":"US Salernitana 1919","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":575},{"id":928,"n":"J. Sambia","c":"US Salernitana 1919","s":"2022-23","r":"RW","rt":71,"rg":["RB","RW"],"pid":468},{"id":929,"n":"E. Bohinen","c":"US Salernitana 1919","s":"2022-23","r":"CM","rt":71,"rg":["CDM","CM"],"pid":470},{"id":930,"n":"D. Bronn","c":"US Salernitana 1919","s":"2022-23","r":"CB","rt":71,"rg":["CB","RB"],"pid":576},{"id":931,"n":"M. Lovato","c":"US Salernitana 1919","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":454},{"id":932,"n":"A. Terzić","c":"Fiorentina","s":"2022-23","r":"LB","rt":71,"rg":["LB"],"pid":577},{"id":933,"n":"J. Zoet","c":"Spezia","s":"2022-23","r":"GK","rt":71,"rg":["GK"],"pid":578},{"id":934,"n":"M. Bourabia","c":"Spezia","s":"2022-23","r":"CM","rt":71,"rg":["CDM","CM"],"pid":579},{"id":935,"n":"V. Kovalenko","c":"Spezia","s":"2022-23","r":"CM","rt":71,"rg":["CAM","CM"],"pid":359},{"id":936,"n":"K. Agudelo","c":"Spezia","s":"2022-23","r":"CAM","rt":71,"rg":["CAM","CM"],"pid":580},{"id":937,"n":"M. Bianchetti","c":"Cremonese","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":201},{"id":938,"n":"V. Chiricheș","c":"Cremonese","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":581},{"id":939,"n":"C. Buonaiuto","c":"Cremonese","s":"2022-23","r":"CAM","rt":71,"rg":["CAM"],"pid":582},{"id":940,"n":"M. Castagnetti","c":"Cremonese","s":"2022-23","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":583},{"id":941,"n":"J. Vásquez","c":"Cremonese","s":"2022-23","r":"CB","rt":71,"rg":["CB","LB"],"pid":584},{"id":942,"n":"E. Valeri","c":"Cremonese","s":"2022-23","r":"LB","rt":71,"rg":["LB","LW"],"pid":311},{"id":943,"n":"G. Donati","c":"Monza","s":"2022-23","r":"CB","rt":71,"rg":["CB"],"pid":475},{"id":944,"n":"M. Valoti","c":"Monza","s":"2022-23","r":"CM","rt":71,"rg":["CM","ST"],"pid":585},{"id":945,"n":"José Machín","c":"Monza","s":"2022-23","r":"CM","rt":71,"rg":["CM"],"pid":586},{"id":946,"n":"M. Müldür","c":"Sassuolo","s":"2022-23","r":"RB","rt":71,"rg":["RB"],"pid":587},{"id":947,"n":"Dalbert","c":"Inter","s":"2022-23","r":"LW","rt":70,"rg":["LW"],"pid":588},{"id":948,"n":"D. Zeefuik","c":"Hellas Verona FC","s":"2022-23","r":"RW","rt":70,"rg":["RB","RW"],"pid":589},{"id":949,"n":"Y. Kallon","c":"Hellas Verona FC","s":"2022-23","r":"ST","rt":70,"rg":["RW","ST"],"pid":590},{"id":950,"n":"A. Ceesay","c":"Lecce","s":"2022-23","r":"ST","rt":70,"rg":["ST"],"pid":591},{"id":951,"n":"Joan González","c":"Lecce","s":"2022-23","r":"CM","rt":70,"rg":["CM"],"pid":462},{"id":952,"n":"L. Banda","c":"Lecce","s":"2022-23","r":"LW","rt":70,"rg":["LW"],"pid":223},{"id":953,"n":"S. Walukiewicz","c":"Empoli","s":"2022-23","r":"CB","rt":70,"rg":["CB"],"pid":330},{"id":954,"n":"T. Rincón","c":"Sampdoria","s":"2022-23","r":"CM","rt":70,"rg":["CDM","CM"],"pid":592},{"id":955,"n":"I. Pussetto","c":"Sampdoria","s":"2022-23","r":"ST","rt":70,"rg":["ST"],"pid":593},{"id":956,"n":"S. Lammers","c":"Sampdoria","s":"2022-23","r":"ST","rt":70,"rg":["ST"],"pid":594},{"id":957,"n":"B. Amione","c":"Sampdoria","s":"2022-23","r":"CB","rt":70,"rg":["CB"],"pid":595},{"id":958,"n":"D. Črnigoj","c":"US Salernitana 1919","s":"2022-23","r":"CM","rt":70,"rg":["CM"],"pid":596},{"id":959,"n":"G. Kastanos","c":"US Salernitana 1919","s":"2022-23","r":"CAM","rt":70,"rg":["CAM","CM","ST"],"pid":597},{"id":960,"n":"P. Dybala","c":"Juventus","s":"2021-22","r":"ST","rt":87,"rg":["RW","ST"],"pid":15},{"id":961,"n":"M. Škriniar","c":"Inter","s":"2021-22","r":"CB","rt":86,"rg":["CB"],"pid":493},{"id":962,"n":"W. Szczęsny","c":"Juventus","s":"2021-22","r":"GK","rt":86,"rg":["GK"],"pid":491},{"id":963,"n":"C. Immobile","c":"Lazio","s":"2021-22","r":"ST","rt":86,"rg":["ST"],"pid":367},{"id":964,"n":"K. Koulibaly","c":"Napoli","s":"2021-22","r":"CB","rt":86,"rg":["CB"],"pid":598},{"id":965,"n":"S. Handanovič","c":"Inter","s":"2021-22","r":"GK","rt":85,"rg":["GK"],"pid":501},{"id":966,"n":"N. Barella","c":"Inter","s":"2021-22","r":"CM","rt":85,"rg":["CM"],"pid":0},{"id":967,"n":"L. Martínez","c":"Inter","s":"2021-22","r":"ST","rt":85,"rg":["ST"],"pid":1},{"id":968,"n":"L. Bonucci","c":"Juventus","s":"2021-22","r":"CB","rt":85,"rg":["CB"],"pid":502},{"id":969,"n":"M. de Ligt","c":"Juventus","s":"2021-22","r":"CB","rt":85,"rg":["CB"],"pid":599},{"id":970,"n":"S. Milinković-Savić","c":"Lazio","s":"2021-22","r":"CM","rt":85,"rg":["CAM","CDM","CM"],"pid":492},{"id":971,"n":"M. Maignan","c":"AC Milan","s":"2021-22","r":"GK","rt":85,"rg":["GK"],"pid":3},{"id":972,"n":"D. Zapata","c":"Atalanta","s":"2021-22","r":"ST","rt":84,"rg":["ST"],"pid":249},{"id":973,"n":"E. Džeko","c":"Inter","s":"2021-22","r":"ST","rt":84,"rg":["ST"],"pid":498},{"id":974,"n":"S. de Vrij","c":"Inter","s":"2021-22","r":"CB","rt":84,"rg":["CB"],"pid":23},{"id":975,"n":"M. Brozović","c":"Inter","s":"2021-22","r":"CDM","rt":84,"rg":["CDM"],"pid":494},{"id":976,"n":"F. Chiesa","c":"Juventus","s":"2021-22","r":"RW","rt":84,"rg":["LW","RW"],"pid":366},{"id":977,"n":"F. Kessié","c":"AC Milan","s":"2021-22","r":"CDM","rt":84,"rg":["CAM","CDM","CM"],"pid":600},{"id":978,"n":"T. Hernández","c":"AC Milan","s":"2021-22","r":"LB","rt":84,"rg":["LB"],"pid":240},{"id":979,"n":"D. Mertens","c":"Napoli","s":"2021-22","r":"ST","rt":84,"rg":["CAM","ST"],"pid":601},{"id":980,"n":"R. Gosens","c":"Inter","s":"2021-22","r":"LW","rt":83,"rg":["LB","LW"],"pid":602},{"id":981,"n":"A. Bastoni","c":"Inter","s":"2021-22","r":"CB","rt":83,"rg":["CB"],"pid":2},{"id":982,"n":"J. Cuadrado","c":"Juventus","s":"2021-22","r":"RB","rt":83,"rg":["RB"],"pid":504},{"id":983,"n":"D. Vlahović","c":"Juventus","s":"2021-22","r":"ST","rt":83,"rg":["ST"],"pid":52},{"id":984,"n":"Luis Alberto","c":"Lazio","s":"2021-22","r":"CAM","rt":83,"rg":["CAM","CM","ST"],"pid":368},{"id":985,"n":"F. Acerbi","c":"Lazio","s":"2021-22","r":"CB","rt":83,"rg":["CB"],"pid":24},{"id":986,"n":"Z. Ibrahimović","c":"AC Milan","s":"2021-22","r":"ST","rt":83,"rg":["ST"],"pid":603},{"id":987,"n":"S. Kjær","c":"AC Milan","s":"2021-22","r":"CB","rt":83,"rg":["CB"],"pid":375},{"id":988,"n":"L. Spinazzola","c":"Roma","s":"2021-22","r":"LB","rt":83,"rg":["LB","LW"],"pid":506},{"id":989,"n":"L. Pellegrini","c":"Roma","s":"2021-22","r":"CAM","rt":83,"rg":["CAM","CDM","CM"],"pid":252},{"id":990,"n":"D. Berardi","c":"Sassuolo","s":"2021-22","r":"RW","rt":83,"rg":["RW"],"pid":45},{"id":991,"n":"L. Muriel","c":"Atalanta","s":"2021-22","r":"ST","rt":82,"rg":["ST"],"pid":604},{"id":992,"n":"J. Iličić","c":"Atalanta","s":"2021-22","r":"ST","rt":82,"rg":["ST"],"pid":605},{"id":993,"n":"R. Malinovskyi","c":"Atalanta","s":"2021-22","r":"ST","rt":82,"rg":["CM","ST"],"pid":405},{"id":994,"n":"I. Perišić","c":"Inter","s":"2021-22","r":"LW","rt":82,"rg":["LW"],"pid":606},{"id":995,"n":"H. Çalhanoğlu","c":"Inter","s":"2021-22","r":"CM","rt":82,"rg":["CAM","CM"],"pid":6},{"id":996,"n":"M. Locatelli","c":"Juventus","s":"2021-22","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":17},{"id":997,"n":"F. Tomori","c":"AC Milan","s":"2021-22","r":"CB","rt":82,"rg":["CB"],"pid":56},{"id":998,"n":"S. Tonali","c":"AC Milan","s":"2021-22","r":"CDM","rt":82,"rg":["CDM","CM"],"pid":497},{"id":999,"n":"Rafael Leão","c":"AC Milan","s":"2021-22","r":"LW","rt":82,"rg":["LW","ST"],"pid":18},{"id":1000,"n":"P. Zieliński","c":"Napoli","s":"2021-22","r":"CM","rt":82,"rg":["CAM","CM"],"pid":47},{"id":1001,"n":"Fabián","c":"Napoli","s":"2021-22","r":"CM","rt":82,"rg":["CDM","CM"],"pid":607},{"id":1002,"n":"V. Osimhen","c":"Napoli","s":"2021-22","r":"ST","rt":82,"rg":["ST"],"pid":364},{"id":1003,"n":"Rui Patrício","c":"Roma","s":"2021-22","r":"GK","rt":82,"rg":["GK"],"pid":608},{"id":1004,"n":"Rafael Tolói","c":"Atalanta","s":"2021-22","r":"CB","rt":81,"rg":["CB"],"pid":503},{"id":1005,"n":"J. Musso","c":"Atalanta","s":"2021-22","r":"GK","rt":81,"rg":["GK"],"pid":609},{"id":1006,"n":"A. Vidal","c":"Inter","s":"2021-22","r":"CM","rt":81,"rg":["CM"],"pid":610},{"id":1007,"n":"J. Correa","c":"Inter","s":"2021-22","r":"ST","rt":81,"rg":["ST"],"pid":517},{"id":1008,"n":"D. Dumfries","c":"Inter","s":"2021-22","r":"RW","rt":81,"rg":["RB","RW"],"pid":16},{"id":1009,"n":"Alex Sandro","c":"Juventus","s":"2021-22","r":"LB","rt":81,"rg":["LB"],"pid":395},{"id":1010,"n":"Morata","c":"Juventus","s":"2021-22","r":"ST","rt":81,"rg":["ST"],"pid":611},{"id":1011,"n":"A. Rabiot","c":"Juventus","s":"2021-22","r":"CM","rt":81,"rg":["CM","LB"],"pid":13},{"id":1012,"n":"D. Zakaria","c":"Juventus","s":"2021-22","r":"CDM","rt":81,"rg":["CB","CDM"],"pid":612},{"id":1013,"n":"Arthur","c":"Juventus","s":"2021-22","r":"CM","rt":81,"rg":["CM"],"pid":387},{"id":1014,"n":"O. Giroud","c":"AC Milan","s":"2021-22","r":"ST","rt":81,"rg":["ST"],"pid":500},{"id":1015,"n":"A. Romagnoli","c":"AC Milan","s":"2021-22","r":"CB","rt":81,"rg":["CB"],"pid":39},{"id":1016,"n":"A. Rebić","c":"AC Milan","s":"2021-22","r":"LW","rt":81,"rg":["LW","ST"],"pid":319},{"id":1017,"n":"I. Bennacer","c":"AC Milan","s":"2021-22","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":369},{"id":1018,"n":"M. Politano","c":"Napoli","s":"2021-22","r":"RW","rt":81,"rg":["RW"],"pid":58},{"id":1019,"n":"G. Di Lorenzo","c":"Napoli","s":"2021-22","r":"RB","rt":81,"rg":["RB"],"pid":30},{"id":1020,"n":"D. Praet","c":"Torino","s":"2021-22","r":"CAM","rt":78,"rg":["CAM","CM","ST"],"pid":613},{"id":1021,"n":"J. Brekalo","c":"Torino","s":"2021-22","r":"ST","rt":78,"rg":["LW","ST"],"pid":614},{"id":1022,"n":"R. Pereyra","c":"Udinese","s":"2021-22","r":"CM","rt":78,"rg":["CAM","CM"],"pid":615},{"id":1023,"n":"Nani","c":"Venezia","s":"2021-22","r":"LW","rt":78,"rg":["LW"],"pid":616},{"id":1024,"n":"S. Romero","c":"Venezia","s":"2021-22","r":"GK","rt":78,"rg":["GK"],"pid":617},{"id":1025,"n":"F. Caputo","c":"Sampdoria","s":"2021-22","r":"ST","rt":78,"rg":["ST"],"pid":448},{"id":1026,"n":"F. Ribéry","c":"US Salernitana 1919","s":"2021-22","r":"ST","rt":78,"rg":["CAM","LW","ST"],"pid":618},{"id":1027,"n":"G. Bonaventura","c":"Fiorentina","s":"2021-22","r":"CM","rt":78,"rg":["CAM","CM"],"pid":619},{"id":1028,"n":"Odriozola","c":"Fiorentina","s":"2021-22","r":"RB","rt":78,"rg":["RB"],"pid":620},{"id":1029,"n":"J. Ikoné","c":"Fiorentina","s":"2021-22","r":"RW","rt":78,"rg":["RW"],"pid":281},{"id":1030,"n":"N. González","c":"Fiorentina","s":"2021-22","r":"LW","rt":78,"rg":["LW","RW"],"pid":379},{"id":1031,"n":"G. Scamacca","c":"Sassuolo","s":"2021-22","r":"ST","rt":78,"rg":["ST"],"pid":621},{"id":1032,"n":"J. Boga","c":"Atalanta","s":"2021-22","r":"LW","rt":77,"rg":["LW"],"pid":92},{"id":1033,"n":"J. Mæhle","c":"Atalanta","s":"2021-22","r":"RW","rt":77,"rg":["RW"],"pid":514},{"id":1034,"n":"M. Demiral","c":"Atalanta","s":"2021-22","r":"CB","rt":77,"rg":["CB"],"pid":515},{"id":1035,"n":"M. Pessina","c":"Atalanta","s":"2021-22","r":"CAM","rt":77,"rg":["CAM","CM","ST"],"pid":259},{"id":1036,"n":"R. Gagliardini","c":"Inter","s":"2021-22","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":325},{"id":1037,"n":"F. Dimarco","c":"Inter","s":"2021-22","r":"LW","rt":77,"rg":["LB","LW"],"pid":7},{"id":1038,"n":"M. De Sciglio","c":"Juventus","s":"2021-22","r":"RB","rt":77,"rg":["LB","RB"],"pid":408},{"id":1039,"n":"D. Rugani","c":"Juventus","s":"2021-22","r":"CB","rt":77,"rg":["CB"],"pid":622},{"id":1040,"n":"Jovane Cabral","c":"Lazio","s":"2021-22","r":"LW","rt":77,"rg":["LW","RW"],"pid":623},{"id":1041,"n":"A. Saelemaekers","c":"AC Milan","s":"2021-22","r":"RW","rt":77,"rg":["RW"],"pid":382},{"id":1042,"n":"D. Demme","c":"Napoli","s":"2021-22","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":437},{"id":1043,"n":"Mário Rui","c":"Napoli","s":"2021-22","r":"LB","rt":77,"rg":["LB"],"pid":377},{"id":1044,"n":"R. Soriano","c":"Bologna","s":"2021-22","r":"CAM","rt":77,"rg":["CAM","CM","ST"],"pid":522},{"id":1045,"n":"M. Barrow","c":"Bologna","s":"2021-22","r":"CAM","rt":77,"rg":["CAM","ST"],"pid":524},{"id":1046,"n":"J. Nsame","c":"Venezia","s":"2021-22","r":"ST","rt":77,"rg":["ST"],"pid":624},{"id":1047,"n":"M. Faraoni","c":"Hellas Verona FC","s":"2021-22","r":"RW","rt":77,"rg":["RB","RW"],"pid":625},{"id":1048,"n":"G. Caprari","c":"Hellas Verona FC","s":"2021-22","r":"ST","rt":77,"rg":["LW","ST"],"pid":530},{"id":1049,"n":"G. Simeone","c":"Hellas Verona FC","s":"2021-22","r":"ST","rt":77,"rg":["ST"],"pid":102},{"id":1050,"n":"F. Quagliarella","c":"Sampdoria","s":"2021-22","r":"ST","rt":77,"rg":["ST"],"pid":626},{"id":1051,"n":"E. Audero","c":"Sampdoria","s":"2021-22","r":"GK","rt":77,"rg":["GK"],"pid":627},{"id":1052,"n":"José Callejón","c":"Fiorentina","s":"2021-22","r":"RW","rt":77,"rg":["RW"],"pid":628},{"id":1053,"n":"C. Biraghi","c":"Fiorentina","s":"2021-22","r":"LB","rt":77,"rg":["LB","LW"],"pid":80},{"id":1054,"n":"G. Castrovilli","c":"Fiorentina","s":"2021-22","r":"CM","rt":77,"rg":["CM"],"pid":386},{"id":1055,"n":"N. Milenković","c":"Fiorentina","s":"2021-22","r":"CB","rt":77,"rg":["CB","RB"],"pid":629},{"id":1056,"n":"Arthur Cabral","c":"Fiorentina","s":"2021-22","r":"ST","rt":77,"rg":["ST"],"pid":630},{"id":1057,"n":"M. Sportiello","c":"Atalanta","s":"2021-22","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":1058,"n":"F. Caicedo","c":"Inter","s":"2021-22","r":"ST","rt":76,"rg":["ST"],"pid":631},{"id":1059,"n":"Ș. Radu","c":"Lazio","s":"2021-22","r":"CB","rt":76,"rg":["CB"],"pid":632},{"id":1060,"n":"E. Hysaj","c":"Lazio","s":"2021-22","r":"LB","rt":76,"rg":["LB","RB"],"pid":307},{"id":1061,"n":"D. Cataldi","c":"Lazio","s":"2021-22","r":"CDM","rt":76,"rg":["CDM","CM"],"pid":266},{"id":1062,"n":"C. Tătărușanu","c":"AC Milan","s":"2021-22","r":"GK","rt":76,"rg":["GK"],"pid":633},{"id":1063,"n":"T. Bakayoko","c":"AC Milan","s":"2021-22","r":"CDM","rt":76,"rg":["CDM","CM"],"pid":549},{"id":1064,"n":"A. Petagna","c":"Napoli","s":"2021-22","r":"ST","rt":76,"rg":["ST"],"pid":346},{"id":1065,"n":"A. Maitland-Niles","c":"Roma","s":"2021-22","r":"RW","rt":76,"rg":["RB","RW"],"pid":634},{"id":1066,"n":"M. Viña","c":"Roma","s":"2021-22","r":"LB","rt":76,"rg":["LB"],"pid":635},{"id":1067,"n":"C. Ansaldi","c":"Torino","s":"2021-22","r":"LW","rt":76,"rg":["LB","LW"],"pid":636},{"id":1068,"n":"S. Lukić","c":"Torino","s":"2021-22","r":"CM","rt":76,"rg":["CAM","CDM","CM"],"pid":637},{"id":1069,"n":"J. Larsen","c":"Udinese","s":"2021-22","r":"LW","rt":76,"rg":["LW","RW"],"pid":638},{"id":1070,"n":"N. Molina","c":"Udinese","s":"2021-22","r":"RW","rt":76,"rg":["RB","RW"],"pid":639},{"id":1071,"n":"L. De Silvestri","c":"Bologna","s":"2021-22","r":"RW","rt":76,"rg":["RB","RW"],"pid":186},{"id":1072,"n":"R. Orsolini","c":"Bologna","s":"2021-22","r":"CAM","rt":76,"rg":["CAM","RW"],"pid":33},{"id":1073,"n":"N. Domínguez","c":"Bologna","s":"2021-22","r":"CM","rt":76,"rg":["CDM","CM"],"pid":523},{"id":1074,"n":"Miguel Veloso","c":"Hellas Verona FC","s":"2021-22","r":"CM","rt":76,"rg":["CDM","CM"],"pid":537},{"id":1075,"n":"K. Günter","c":"Hellas Verona FC","s":"2021-22","r":"CB","rt":76,"rg":["CB"],"pid":541},{"id":1076,"n":"D. Lazović","c":"Hellas Verona FC","s":"2021-22","r":"LB","rt":76,"rg":["LB","RB"],"pid":316},{"id":1077,"n":"S. Giovinco","c":"Sampdoria","s":"2021-22","r":"CAM","rt":76,"rg":["CAM","ST"],"pid":640},{"id":1078,"n":"M. Damsgaard","c":"Sampdoria","s":"2021-22","r":"LW","rt":76,"rg":["LW"],"pid":641},{"id":1079,"n":"K. Baldé","c":"Cagliari","s":"2021-22","r":"ST","rt":76,"rg":["ST"],"pid":642},{"id":1080,"n":"Rodrigo Becão","c":"Udinese","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":520},{"id":1081,"n":"N. Pérez","c":"Udinese","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":643},{"id":1082,"n":"A. Soumaoro","c":"Bologna","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":557},{"id":1083,"n":"J. Schouten","c":"Bologna","s":"2021-22","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":644},{"id":1084,"n":"T. Henry","c":"Venezia","s":"2021-22","r":"ST","rt":74,"rg":["ST"],"pid":539},{"id":1085,"n":"F. Ceccherini","c":"Hellas Verona FC","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":202},{"id":1086,"n":"L. Montipò","c":"Hellas Verona FC","s":"2021-22","r":"GK","rt":74,"rg":["GK"],"pid":108},{"id":1087,"n":"I. Ilić","c":"Hellas Verona FC","s":"2021-22","r":"CM","rt":74,"rg":["CM"],"pid":264},{"id":1088,"n":"F. Di Francesco","c":"Empoli","s":"2021-22","r":"ST","rt":74,"rg":["LW","ST"],"pid":645},{"id":1089,"n":"P. Stojanović","c":"Empoli","s":"2021-22","r":"RB","rt":74,"rg":["RB"],"pid":540},{"id":1090,"n":"A. Pinamonti","c":"Empoli","s":"2021-22","r":"ST","rt":74,"rg":["ST"],"pid":428},{"id":1091,"n":"M. Thorsby","c":"Sampdoria","s":"2021-22","r":"CM","rt":74,"rg":["CDM","CM","LB"],"pid":646},{"id":1092,"n":"G. Magnani","c":"Sampdoria","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":560},{"id":1093,"n":"L. Pavoletti","c":"Cagliari","s":"2021-22","r":"ST","rt":74,"rg":["ST"],"pid":482},{"id":1094,"n":"F. Fazio","c":"US Salernitana 1919","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":466},{"id":1095,"n":"D. Perotti","c":"US Salernitana 1919","s":"2021-22","r":"LW","rt":74,"rg":["LW"],"pid":647},{"id":1096,"n":"L. Sepe","c":"US Salernitana 1919","s":"2021-22","r":"GK","rt":74,"rg":["GK"],"pid":436},{"id":1097,"n":"S. Verdi","c":"US Salernitana 1919","s":"2021-22","r":"ST","rt":74,"rg":["CAM","ST"],"pid":538},{"id":1098,"n":"M. Nastasić","c":"Fiorentina","s":"2021-22","r":"CB","rt":74,"rg":["CB"],"pid":648},{"id":1099,"n":"A. Duncan","c":"Fiorentina","s":"2021-22","r":"CM","rt":74,"rg":["CDM","CM"],"pid":285},{"id":1100,"n":"R. Sottil","c":"Fiorentina","s":"2021-22","r":"LW","rt":74,"rg":["LW","RW"],"pid":135},{"id":1101,"n":"S. Hefti","c":"Genoa","s":"2021-22","r":"RB","rt":74,"rg":["RB"],"pid":649},{"id":1102,"n":"D. Verde","c":"Spezia","s":"2021-22","r":"RW","rt":74,"rg":["CAM","RW"],"pid":544},{"id":1103,"n":"K. Amian","c":"Spezia","s":"2021-22","r":"RB","rt":74,"rg":["CB","RB"],"pid":650},{"id":1104,"n":"G. Maggiore","c":"Spezia","s":"2021-22","r":"CM","rt":74,"rg":["CM"],"pid":420},{"id":1105,"n":"Matheus Henrique","c":"Sassuolo","s":"2021-22","r":"CM","rt":74,"rg":["CDM","CM"],"pid":651},{"id":1106,"n":"G. Pezzella","c":"Atalanta","s":"2021-22","r":"LW","rt":73,"rg":["LB","LW"],"pid":203},{"id":1107,"n":"A. Ounas","c":"Napoli","s":"2021-22","r":"RW","rt":73,"rg":["RW","ST"],"pid":652},{"id":1108,"n":"E. Shomurodov","c":"Roma","s":"2021-22","r":"ST","rt":73,"rg":["LW","RW","ST"],"pid":312},{"id":1109,"n":"E. Berisha","c":"Torino","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":561},{"id":1110,"n":"V. Milinković-Savić","c":"Torino","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":401},{"id":1111,"n":"W. Singo","c":"Torino","s":"2021-22","r":"RW","rt":73,"rg":["RB","RW"],"pid":653},{"id":1112,"n":"T. Arslan","c":"Udinese","s":"2021-22","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":654},{"id":1113,"n":"Walace","c":"Udinese","s":"2021-22","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":655},{"id":1114,"n":"F. Bardi","c":"Bologna","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":656},{"id":1115,"n":"K. Bonifazi","c":"Bologna","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":472},{"id":1116,"n":"A. Hickey","c":"Bologna","s":"2021-22","r":"LW","rt":73,"rg":["LB","LW"],"pid":657},{"id":1117,"n":"A. Theate","c":"Bologna","s":"2021-22","r":"CB","rt":73,"rg":["CB","LB"],"pid":658},{"id":1118,"n":"K. Lasagna","c":"Hellas Verona FC","s":"2021-22","r":"ST","rt":73,"rg":["ST"],"pid":565},{"id":1119,"n":"N. Casale","c":"Hellas Verona FC","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":127},{"id":1120,"n":"S. Romagnoli","c":"Empoli","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":471},{"id":1121,"n":"L. Tonelli","c":"Empoli","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":570},{"id":1122,"n":"V. Verre","c":"Empoli","s":"2021-22","r":"CAM","rt":73,"rg":["CAM","CM","ST"],"pid":659},{"id":1123,"n":"F. Bandinelli","c":"Empoli","s":"2021-22","r":"CM","rt":73,"rg":["CM"],"pid":660},{"id":1124,"n":"N. Bajrami","c":"Empoli","s":"2021-22","r":"CAM","rt":73,"rg":["CAM","CM","ST"],"pid":429},{"id":1125,"n":"P. Cutrone","c":"Empoli","s":"2021-22","r":"ST","rt":73,"rg":["ST"],"pid":661},{"id":1126,"n":"S. Żurkowski","c":"Empoli","s":"2021-22","r":"CM","rt":73,"rg":["CM","ST"],"pid":342},{"id":1127,"n":"M. Yoshida","c":"Sampdoria","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":662},{"id":1128,"n":"B. Bereszyński","c":"Sampdoria","s":"2021-22","r":"RB","rt":73,"rg":["RB"],"pid":663},{"id":1129,"n":"A. Conti","c":"Sampdoria","s":"2021-22","r":"RB","rt":73,"rg":["RB"],"pid":573},{"id":1130,"n":"G. Pereiro","c":"Cagliari","s":"2021-22","r":"CAM","rt":73,"rg":["CAM","RW"],"pid":664},{"id":1131,"n":"R. Marin","c":"Cagliari","s":"2021-22","r":"CM","rt":73,"rg":["CM"],"pid":296},{"id":1132,"n":"M. Lovato","c":"Cagliari","s":"2021-22","r":"CB","rt":73,"rg":["CB"],"pid":454},{"id":1133,"n":"I. Radovanović","c":"US Salernitana 1919","s":"2021-22","r":"CB","rt":73,"rg":["CB","CDM","CM"],"pid":665},{"id":1134,"n":"A. Kokorin","c":"Fiorentina","s":"2021-22","r":"ST","rt":73,"rg":["RW","ST"],"pid":666},{"id":1135,"n":"P. Terracciano","c":"Fiorentina","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":667},{"id":1136,"n":"M. Badelj","c":"Genoa","s":"2021-22","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":668},{"id":1137,"n":"Hernani","c":"Genoa","s":"2021-22","r":"CM","rt":73,"rg":["CDM","CM"],"pid":273},{"id":1138,"n":"A. Šemper","c":"Genoa","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":199},{"id":1139,"n":"J. Zoet","c":"Spezia","s":"2021-22","r":"GK","rt":73,"rg":["GK"],"pid":578},{"id":1140,"n":"A. Ismajli","c":"Empoli","s":"2021-22","r":"CB","rt":71,"rg":["CB"],"pid":122},{"id":1141,"n":"Ronaldo Vieira","c":"Sampdoria","s":"2021-22","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":562},{"id":1142,"n":"V. Supriaha","c":"Sampdoria","s":"2021-22","r":"ST","rt":71,"rg":["ST"],"pid":669},{"id":1143,"n":"E. Goldaniga","c":"Cagliari","s":"2021-22","r":"CB","rt":71,"rg":["CB"],"pid":670},{"id":1144,"n":"N. Gyömbér","c":"US Salernitana 1919","s":"2021-22","r":"CB","rt":71,"rg":["CB"],"pid":467},{"id":1145,"n":"P. Galdames","c":"Genoa","s":"2021-22","r":"CM","rt":71,"rg":["CM"],"pid":671},{"id":1146,"n":"L. Østigård","c":"Genoa","s":"2021-22","r":"CB","rt":71,"rg":["CB"],"pid":438},{"id":1147,"n":"M. Frendrup","c":"Genoa","s":"2021-22","r":"CDM","rt":71,"rg":["CDM","CM"],"pid":422},{"id":1148,"n":"J. Vásquez","c":"Genoa","s":"2021-22","r":"CB","rt":71,"rg":["CB","LB"],"pid":584},{"id":1149,"n":"R. Manaj","c":"Spezia","s":"2021-22","r":"ST","rt":71,"rg":["ST"],"pid":672},{"id":1150,"n":"M. Erlić","c":"Spezia","s":"2021-22","r":"CB","rt":71,"rg":["CB"],"pid":314},{"id":1151,"n":"M. Müldür","c":"Sassuolo","s":"2021-22","r":"RB","rt":71,"rg":["CB","RB"],"pid":587},{"id":1152,"n":"V. Mihăilă","c":"Atalanta","s":"2021-22","r":"LW","rt":70,"rg":["LW"],"pid":310},{"id":1153,"n":"N. Zalewski","c":"Roma","s":"2021-22","r":"LB","rt":70,"rg":["LB"],"pid":71},{"id":1154,"n":"J. Makengo","c":"Udinese","s":"2021-22","r":"CM","rt":70,"rg":["CM"],"pid":673},{"id":1155,"n":"M. Dijks","c":"Bologna","s":"2021-22","r":"LB","rt":70,"rg":["LB"],"pid":674},{"id":1156,"n":"L. Lezzerini","c":"Venezia","s":"2021-22","r":"GK","rt":70,"rg":["GK"],"pid":675},{"id":1157,"n":"T. Ebuehi","c":"Venezia","s":"2021-22","r":"RB","rt":70,"rg":["RB"],"pid":295},{"id":1158,"n":"E. Ampadu","c":"Venezia","s":"2021-22","r":"CDM","rt":70,"rg":["CB","CDM","CM"],"pid":545},{"id":1159,"n":"D. Johnsen","c":"Venezia","s":"2021-22","r":"LW","rt":70,"rg":["LW","RW"],"pid":676},{"id":1160,"n":"A. Sigurðsson","c":"Venezia","s":"2021-22","r":"ST","rt":70,"rg":["CM","ST"],"pid":677},{"id":1161,"n":"G. Frabotta","c":"Hellas Verona FC","s":"2021-22","r":"LW","rt":70,"rg":["LB","LW"],"pid":678},{"id":1162,"n":"A. La Mantia","c":"Empoli","s":"2021-22","r":"ST","rt":70,"rg":["ST"],"pid":679},{"id":1163,"n":"N. Haas","c":"Empoli","s":"2021-22","r":"CM","rt":70,"rg":["CDM","CM"],"pid":571},{"id":1164,"n":"A. Ferrari","c":"Sampdoria","s":"2021-22","r":"CB","rt":70,"rg":["CB","RB"],"pid":680},{"id":1165,"n":"Dalbert","c":"Cagliari","s":"2021-22","r":"LB","rt":70,"rg":["LB"],"pid":588},{"id":1166,"n":"S. Walukiewicz","c":"Cagliari","s":"2021-22","r":"CB","rt":70,"rg":["CB"],"pid":330},{"id":1167,"n":"R. Bellanova","c":"Cagliari","s":"2021-22","r":"RB","rt":70,"rg":["RB"],"pid":69},{"id":1168,"n":"V. Belec","c":"US Salernitana 1919","s":"2021-22","r":"GK","rt":70,"rg":["GK"],"pid":681},{"id":1169,"n":"L. Mousset","c":"US Salernitana 1919","s":"2021-22","r":"ST","rt":70,"rg":["ST"],"pid":682},{"id":1170,"n":"F. Bonazzoli","c":"US Salernitana 1919","s":"2021-22","r":"ST","rt":70,"rg":["ST"],"pid":455},{"id":1171,"n":"A. Masiello","c":"Genoa","s":"2021-22","r":"CB","rt":70,"rg":["CB"],"pid":683},{"id":1172,"n":"M. Bani","c":"Genoa","s":"2021-22","r":"CB","rt":70,"rg":["CB"],"pid":684},{"id":1173,"n":"J. Sala","c":"Spezia","s":"2021-22","r":"CDM","rt":70,"rg":["CDM","LB","RB"],"pid":685},{"id":1174,"n":"E. Gyasi","c":"Spezia","s":"2021-22","r":"RW","rt":70,"rg":["LW","RW","ST"],"pid":294},{"id":1175,"n":"A. Reca","c":"Spezia","s":"2021-22","r":"LB","rt":70,"rg":["LB"],"pid":686},{"id":1176,"n":"D. Nikolaou","c":"Spezia","s":"2021-22","r":"CB","rt":70,"rg":["CB"],"pid":687},{"id":1177,"n":"G. Pegolo","c":"Sassuolo","s":"2021-22","r":"GK","rt":70,"rg":["GK"],"pid":688},{"id":1178,"n":"F. Peluso","c":"Sassuolo","s":"2021-22","r":"CB","rt":70,"rg":["CB","LB"],"pid":689},{"id":1179,"n":"Rogério","c":"Sassuolo","s":"2021-22","r":"LB","rt":70,"rg":["LB"],"pid":690},{"id":1180,"n":"Kaio Jorge","c":"Juventus","s":"2021-22","r":"ST","rt":69,"rg":["ST"],"pid":489},{"id":1181,"n":"M. Gabbia","c":"AC Milan","s":"2021-22","r":"CB","rt":69,"rg":["CB"],"pid":550},{"id":1182,"n":"F. Santander","c":"Bologna","s":"2021-22","r":"ST","rt":69,"rg":["ST"],"pid":691},{"id":1183,"n":"L. Binks","c":"Bologna","s":"2021-22","r":"CB","rt":69,"rg":["CB"],"pid":692},{"id":1184,"n":"D. Črnigoj","c":"Venezia","s":"2021-22","r":"CM","rt":69,"rg":["CM","RW"],"pid":596},{"id":1185,"n":"S. Ujkani","c":"Empoli","s":"2021-22","r":"GK","rt":69,"rg":["GK"],"pid":693},{"id":1186,"n":"R. Fiamozzi","c":"Empoli","s":"2021-22","r":"RB","rt":69,"rg":["RB"],"pid":694},{"id":1187,"n":"R. Marchizza","c":"Empoli","s":"2021-22","r":"LB","rt":69,"rg":["CB","LB"],"pid":487},{"id":1188,"n":"A. Carboni","c":"Cagliari","s":"2021-22","r":"CB","rt":69,"rg":["CB","LB"],"pid":348},{"id":1189,"n":"V. Fiorillo","c":"US Salernitana 1919","s":"2021-22","r":"GK","rt":69,"rg":["GK"],"pid":695},{"id":1190,"n":"J. Obi","c":"US Salernitana 1919","s":"2021-22","r":"CM","rt":69,"rg":["CM","LB"],"pid":696},{"id":1191,"n":"R. Gagliolo","c":"US Salernitana 1919","s":"2021-22","r":"CB","rt":69,"rg":["CB","LB"],"pid":697},{"id":1192,"n":"E. Bohinen","c":"US Salernitana 1919","s":"2021-22","r":"CM","rt":69,"rg":["CDM","CM"],"pid":470},{"id":1193,"n":"Éderson","c":"US Salernitana 1919","s":"2021-22","r":"CM","rt":69,"rg":["CM"],"pid":36},{"id":1194,"n":"A. Rosati","c":"Fiorentina","s":"2021-22","r":"GK","rt":69,"rg":["GK"],"pid":698},{"id":1195,"n":"P. Ghiglione","c":"Genoa","s":"2021-22","r":"RB","rt":69,"rg":["RB"],"pid":699},{"id":1196,"n":"L. Czyborra","c":"Genoa","s":"2021-22","r":"LB","rt":69,"rg":["LB"],"pid":700},{"id":1197,"n":"K. Yeboah","c":"Genoa","s":"2021-22","r":"ST","rt":69,"rg":["ST"],"pid":701},{"id":1198,"n":"A. Cambiaso","c":"Genoa","s":"2021-22","r":"LW","rt":69,"rg":["LB","LW","RB"],"pid":396},{"id":1199,"n":"S. Bastoni","c":"Spezia","s":"2021-22","r":"LB","rt":69,"rg":["CM","LB"],"pid":463},{"id":1200,"n":"Cristiano Ronaldo","c":"Juventus","s":"2020-21","r":"ST","rt":92,"rg":["LW","ST"],"pid":702},{"id":1201,"n":"K. Koulibaly","c":"Napoli","s":"2020-21","r":"CB","rt":88,"rg":["CB"],"pid":598},{"id":1202,"n":"S. Handanovič","c":"Inter","s":"2020-21","r":"GK","rt":87,"rg":["GK"],"pid":501},{"id":1203,"n":"W. Szczęsny","c":"Juventus","s":"2020-21","r":"GK","rt":87,"rg":["GK"],"pid":491},{"id":1204,"n":"P. Dybala","c":"Juventus","s":"2020-21","r":"ST","rt":87,"rg":["CAM","ST"],"pid":15},{"id":1205,"n":"C. Immobile","c":"Lazio","s":"2020-21","r":"ST","rt":87,"rg":["ST"],"pid":367},{"id":1206,"n":"R. Lukaku","c":"Inter","s":"2020-21","r":"ST","rt":86,"rg":["ST"],"pid":28},{"id":1207,"n":"M. Škriniar","c":"Inter","s":"2020-21","r":"CB","rt":86,"rg":["CB"],"pid":493},{"id":1208,"n":"G. Chiellini","c":"Juventus","s":"2020-21","r":"CB","rt":86,"rg":["CB"],"pid":703},{"id":1209,"n":"G. Donnarumma","c":"AC Milan","s":"2020-21","r":"GK","rt":86,"rg":["GK"],"pid":704},{"id":1210,"n":"S. de Vrij","c":"Inter","s":"2020-21","r":"CB","rt":85,"rg":["CB"],"pid":23},{"id":1211,"n":"M. de Ligt","c":"Juventus","s":"2020-21","r":"CB","rt":85,"rg":["CB"],"pid":599},{"id":1212,"n":"Luis Alberto","c":"Lazio","s":"2020-21","r":"CAM","rt":85,"rg":["CAM","CM","ST"],"pid":368},{"id":1213,"n":"S. Milinković-Savić","c":"Lazio","s":"2020-21","r":"CM","rt":85,"rg":["CAM","CDM","CM"],"pid":492},{"id":1214,"n":"D. Mertens","c":"Napoli","s":"2020-21","r":"ST","rt":85,"rg":["CAM","ST"],"pid":601},{"id":1215,"n":"L. Insigne","c":"Napoli","s":"2020-21","r":"LW","rt":85,"rg":["LW","ST"],"pid":705},{"id":1216,"n":"J. Iličić","c":"Atalanta","s":"2020-21","r":"ST","rt":84,"rg":["ST"],"pid":605},{"id":1217,"n":"M. Brozović","c":"Inter","s":"2020-21","r":"CDM","rt":84,"rg":["CDM","CM"],"pid":494},{"id":1218,"n":"L. Martínez","c":"Inter","s":"2020-21","r":"ST","rt":84,"rg":["ST"],"pid":1},{"id":1219,"n":"L. Bonucci","c":"Juventus","s":"2020-21","r":"CB","rt":84,"rg":["CB"],"pid":502},{"id":1220,"n":"Alex Sandro","c":"Juventus","s":"2020-21","r":"LB","rt":84,"rg":["LB"],"pid":395},{"id":1221,"n":"Arthur","c":"Juventus","s":"2020-21","r":"CM","rt":84,"rg":["CM"],"pid":387},{"id":1222,"n":"Z. Ibrahimović","c":"AC Milan","s":"2020-21","r":"ST","rt":84,"rg":["ST"],"pid":603},{"id":1223,"n":"D. Zapata","c":"Atalanta","s":"2020-21","r":"ST","rt":83,"rg":["ST"],"pid":249},{"id":1224,"n":"R. Gosens","c":"Atalanta","s":"2020-21","r":"LB","rt":83,"rg":["LB"],"pid":602},{"id":1225,"n":"C. Eriksen","c":"Inter","s":"2020-21","r":"CAM","rt":83,"rg":["CAM","CM"],"pid":706},{"id":1226,"n":"A. Hakimi","c":"Inter","s":"2020-21","r":"RB","rt":83,"rg":["RB"],"pid":707},{"id":1227,"n":"Morata","c":"Juventus","s":"2020-21","r":"ST","rt":83,"rg":["ST"],"pid":611},{"id":1228,"n":"Lucas Leiva","c":"Lazio","s":"2020-21","r":"CDM","rt":83,"rg":["CDM"],"pid":708},{"id":1229,"n":"F. Acerbi","c":"Lazio","s":"2020-21","r":"CB","rt":83,"rg":["CB"],"pid":24},{"id":1230,"n":"K. Manolas","c":"Napoli","s":"2020-21","r":"CB","rt":83,"rg":["CB"],"pid":709},{"id":1231,"n":"E. Džeko","c":"Roma","s":"2020-21","r":"ST","rt":83,"rg":["ST"],"pid":498},{"id":1232,"n":"S. Sirigu","c":"Torino","s":"2020-21","r":"GK","rt":83,"rg":["GK"],"pid":710},{"id":1233,"n":"L. Muriel","c":"Atalanta","s":"2020-21","r":"ST","rt":82,"rg":["ST"],"pid":604},{"id":1234,"n":"N. Barella","c":"Inter","s":"2020-21","r":"CM","rt":82,"rg":["CM"],"pid":0},{"id":1235,"n":"G. Buffon","c":"Juventus","s":"2020-21","r":"GK","rt":82,"rg":["GK"],"pid":711},{"id":1236,"n":"A. Ramsey","c":"Juventus","s":"2020-21","r":"CM","rt":82,"rg":["CAM","CM"],"pid":712},{"id":1237,"n":"J. Cuadrado","c":"Juventus","s":"2020-21","r":"RB","rt":82,"rg":["RB"],"pid":504},{"id":1238,"n":"T. Strakosha","c":"Lazio","s":"2020-21","r":"GK","rt":82,"rg":["GK"],"pid":713},{"id":1239,"n":"S. Kjær","c":"AC Milan","s":"2020-21","r":"CB","rt":82,"rg":["CB"],"pid":375},{"id":1240,"n":"A. Romagnoli","c":"AC Milan","s":"2020-21","r":"CB","rt":82,"rg":["CB"],"pid":39},{"id":1241,"n":"T. Hernández","c":"AC Milan","s":"2020-21","r":"LB","rt":82,"rg":["LB"],"pid":240},{"id":1242,"n":"Fabián","c":"Napoli","s":"2020-21","r":"CM","rt":82,"rg":["CM"],"pid":607},{"id":1243,"n":"H. Mkhitaryan","c":"Roma","s":"2020-21","r":"ST","rt":82,"rg":["RW","ST"],"pid":22},{"id":1244,"n":"R. Nainggolan","c":"Cagliari","s":"2020-21","r":"CAM","rt":82,"rg":["CAM","CM","ST"],"pid":714},{"id":1245,"n":"D. Godín","c":"Cagliari","s":"2020-21","r":"CB","rt":82,"rg":["CB"],"pid":715},{"id":1246,"n":"A. Cragno","c":"Cagliari","s":"2020-21","r":"GK","rt":82,"rg":["GK"],"pid":427},{"id":1247,"n":"M. Perin","c":"Genoa","s":"2020-21","r":"GK","rt":82,"rg":["GK"],"pid":716},{"id":1248,"n":"M. de Roon","c":"Atalanta","s":"2020-21","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":46},{"id":1249,"n":"P. Gollini","c":"Atalanta","s":"2020-21","r":"GK","rt":81,"rg":["GK"],"pid":411},{"id":1250,"n":"I. Perišić","c":"Inter","s":"2020-21","r":"LW","rt":81,"rg":["LW"],"pid":606},{"id":1251,"n":"A. Vidal","c":"Inter","s":"2020-21","r":"CM","rt":81,"rg":["CM"],"pid":610},{"id":1252,"n":"A. Rabiot","c":"Juventus","s":"2020-21","r":"CM","rt":81,"rg":["CDM","CM"],"pid":13},{"id":1253,"n":"J. Correa","c":"Lazio","s":"2020-21","r":"ST","rt":81,"rg":["CAM","ST"],"pid":517},{"id":1254,"n":"M. Lazzari","c":"Lazio","s":"2020-21","r":"RB","rt":81,"rg":["RB"],"pid":95},{"id":1255,"n":"H. Çalhanoğlu","c":"AC Milan","s":"2020-21","r":"CAM","rt":81,"rg":["CAM"],"pid":6},{"id":1256,"n":"F. Kessié","c":"AC Milan","s":"2020-21","r":"CDM","rt":81,"rg":["CDM","CM"],"pid":600},{"id":1257,"n":"P. Zieliński","c":"Napoli","s":"2020-21","r":"CM","rt":81,"rg":["CAM","CM"],"pid":47},{"id":1258,"n":"M. Politano","c":"Napoli","s":"2020-21","r":"RW","rt":81,"rg":["RW"],"pid":58},{"id":1259,"n":"H. Lozano","c":"Napoli","s":"2020-21","r":"RW","rt":81,"rg":["LW","RW"],"pid":505},{"id":1260,"n":"S. El Shaarawy","c":"Roma","s":"2020-21","r":"LW","rt":78,"rg":["LW"],"pid":510},{"id":1261,"n":"B. Cristante","c":"Roma","s":"2020-21","r":"CDM","rt":78,"rg":["CB","CDM","CM"],"pid":378},{"id":1262,"n":"C. Ansaldi","c":"Torino","s":"2020-21","r":"LB","rt":78,"rg":["LB"],"pid":636},{"id":1263,"n":"N. Nkoulou","c":"Torino","s":"2020-21","r":"CB","rt":78,"rg":["CB"],"pid":717},{"id":1264,"n":"R. Soriano","c":"Bologna","s":"2020-21","r":"CAM","rt":78,"rg":["CAM","CM"],"pid":522},{"id":1265,"n":"A. Barák","c":"Hellas Verona FC","s":"2020-21","r":"ST","rt":78,"rg":["CM","ST"],"pid":388},{"id":1266,"n":"A. Candreva","c":"Sampdoria","s":"2020-21","r":"RB","rt":78,"rg":["RB"],"pid":384},{"id":1267,"n":"E. Audero","c":"Sampdoria","s":"2020-21","r":"GK","rt":78,"rg":["GK"],"pid":627},{"id":1268,"n":"D. Rugani","c":"Cagliari","s":"2020-21","r":"CB","rt":78,"rg":["CB"],"pid":622},{"id":1269,"n":"D. Zappacosta","c":"Genoa","s":"2020-21","r":"RW","rt":78,"rg":["RW"],"pid":254},{"id":1270,"n":"J. Palomino","c":"Atalanta","s":"2020-21","r":"CB","rt":77,"rg":["CB"],"pid":532},{"id":1271,"n":"M. Pašalić","c":"Atalanta","s":"2020-21","r":"CM","rt":77,"rg":["CAM","CM"],"pid":255},{"id":1272,"n":"M. Pessina","c":"Atalanta","s":"2020-21","r":"CAM","rt":77,"rg":["CAM","CM","ST"],"pid":259},{"id":1273,"n":"D. D'Ambrosio","c":"Inter","s":"2020-21","r":"CB","rt":77,"rg":["CB","RB"],"pid":516},{"id":1274,"n":"W. McKennie","c":"Juventus","s":"2020-21","r":"CM","rt":77,"rg":["CM","LB","RB"],"pid":718},{"id":1275,"n":"M. Musacchio","c":"Lazio","s":"2020-21","r":"CB","rt":77,"rg":["CB"],"pid":719},{"id":1276,"n":"G. Escalante","c":"Lazio","s":"2020-21","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":720},{"id":1277,"n":"Samu Castillejo","c":"AC Milan","s":"2020-21","r":"RB","rt":77,"rg":["RB"],"pid":721},{"id":1278,"n":"F. Tomori","c":"AC Milan","s":"2020-21","r":"CB","rt":77,"rg":["CB"],"pid":56},{"id":1279,"n":"S. Tonali","c":"AC Milan","s":"2020-21","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":497},{"id":1280,"n":"F. Ghoulam","c":"Napoli","s":"2020-21","r":"LB","rt":77,"rg":["LB"],"pid":722},{"id":1281,"n":"S. Lobotka","c":"Napoli","s":"2020-21","r":"CM","rt":77,"rg":["CDM","CM"],"pid":29},{"id":1282,"n":"G. Di Lorenzo","c":"Napoli","s":"2020-21","r":"RB","rt":77,"rg":["RB"],"pid":30},{"id":1283,"n":"J. Kucka","c":"Parma","s":"2020-21","r":"CM","rt":77,"rg":["CDM","CM"],"pid":723},{"id":1284,"n":"L. Sepe","c":"Parma","s":"2020-21","r":"GK","rt":77,"rg":["GK"],"pid":436},{"id":1285,"n":"G. Mancini","c":"Roma","s":"2020-21","r":"CB","rt":77,"rg":["CB","CDM"],"pid":19},{"id":1286,"n":"Miguel Veloso","c":"Hellas Verona FC","s":"2020-21","r":"CM","rt":77,"rg":["CDM","CM"],"pid":537},{"id":1287,"n":"M. Zaccagni","c":"Hellas Verona FC","s":"2020-21","r":"ST","rt":77,"rg":["ST"],"pid":26},{"id":1288,"n":"N. Nández","c":"Cagliari","s":"2020-21","r":"CM","rt":77,"rg":["CDM","CM","RB"],"pid":724},{"id":1289,"n":"A. Kokorin","c":"Fiorentina","s":"2020-21","r":"ST","rt":77,"rg":["RW","ST"],"pid":666},{"id":1290,"n":"G. Pezzella","c":"Fiorentina","s":"2020-21","r":"CB","rt":77,"rg":["CB"],"pid":203},{"id":1291,"n":"B. Drągowski","c":"Fiorentina","s":"2020-21","r":"GK","rt":77,"rg":["GK"],"pid":529},{"id":1292,"n":"S. Amrabat","c":"Fiorentina","s":"2020-21","r":"CM","rt":77,"rg":["CDM","CM"],"pid":512},{"id":1293,"n":"D. Criscito","c":"Genoa","s":"2020-21","r":"CB","rt":77,"rg":["CB","LB"],"pid":725},{"id":1294,"n":"G. Defrel","c":"Sassuolo","s":"2020-21","r":"CAM","rt":77,"rg":["CAM","LW","ST"],"pid":726},{"id":1295,"n":"J. Boga","c":"Sassuolo","s":"2020-21","r":"LW","rt":77,"rg":["LW"],"pid":92},{"id":1296,"n":"M. Sportiello","c":"Atalanta","s":"2020-21","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":1297,"n":"M. Caldara","c":"Atalanta","s":"2020-21","r":"CB","rt":76,"rg":["CB"],"pid":727},{"id":1298,"n":"J. Mæhle","c":"Atalanta","s":"2020-21","r":"RB","rt":76,"rg":["RB"],"pid":514},{"id":1299,"n":"M. Demiral","c":"Juventus","s":"2020-21","r":"CB","rt":76,"rg":["CB"],"pid":515},{"id":1300,"n":"S. Lulić","c":"Lazio","s":"2020-21","r":"LB","rt":76,"rg":["LB"],"pid":728},{"id":1301,"n":"Andreas Pereira","c":"Lazio","s":"2020-21","r":"CAM","rt":76,"rg":["CAM"],"pid":729},{"id":1302,"n":"S. Meïté","c":"AC Milan","s":"2020-21","r":"CM","rt":76,"rg":["CDM","CM"],"pid":546},{"id":1303,"n":"Brahim","c":"AC Milan","s":"2020-21","r":"CAM","rt":76,"rg":["CAM"],"pid":730},{"id":1304,"n":"Diogo Dalot","c":"AC Milan","s":"2020-21","r":"RB","rt":76,"rg":["LB","RB"],"pid":731},{"id":1305,"n":"Rafael Leão","c":"AC Milan","s":"2020-21","r":"ST","rt":76,"rg":["ST"],"pid":18},{"id":1306,"n":"A. Saelemaekers","c":"AC Milan","s":"2020-21","r":"RB","rt":76,"rg":["RB"],"pid":382},{"id":1307,"n":"N. Maksimović","c":"Napoli","s":"2020-21","r":"CB","rt":76,"rg":["CB"],"pid":732},{"id":1308,"n":"A. Petagna","c":"Napoli","s":"2020-21","r":"ST","rt":76,"rg":["ST"],"pid":346},{"id":1309,"n":"A. Rrahmani","c":"Napoli","s":"2020-21","r":"CB","rt":76,"rg":["CB"],"pid":32},{"id":1310,"n":"Gervinho","c":"Parma","s":"2020-21","r":"LW","rt":76,"rg":["LW","RW"],"pid":733},{"id":1311,"n":"A. Conti","c":"Parma","s":"2020-21","r":"RB","rt":76,"rg":["RB"],"pid":573},{"id":1312,"n":"R. Karsdorp","c":"Roma","s":"2020-21","r":"RB","rt":76,"rg":["RB"],"pid":399},{"id":1313,"n":"Borja Mayoral","c":"Roma","s":"2020-21","r":"ST","rt":76,"rg":["ST"],"pid":734},{"id":1314,"n":"N. Zaniolo","c":"Roma","s":"2020-21","r":"CAM","rt":76,"rg":["CAM"],"pid":267},{"id":1315,"n":"R. Rodríguez","c":"Torino","s":"2020-21","r":"LB","rt":76,"rg":["LB"],"pid":400},{"id":1316,"n":"S. Verdi","c":"Torino","s":"2020-21","r":"ST","rt":76,"rg":["CAM","ST"],"pid":538},{"id":1317,"n":"S. Zaza","c":"Torino","s":"2020-21","r":"ST","rt":76,"rg":["ST"],"pid":735},{"id":1318,"n":"D. Baselli","c":"Torino","s":"2020-21","r":"CM","rt":76,"rg":["CM"],"pid":736},{"id":1319,"n":"A. Soumaoro","c":"Bologna","s":"2020-21","r":"CB","rt":76,"rg":["CB"],"pid":557},{"id":1320,"n":"Y. Osorio","c":"Parma","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":737},{"id":1321,"n":"D. Man","c":"Parma","s":"2020-21","r":"RW","rt":74,"rg":["RW"],"pid":274},{"id":1322,"n":"Carles Pérez","c":"Roma","s":"2020-21","r":"RW","rt":74,"rg":["RW"],"pid":738},{"id":1323,"n":"Gonzalo Villar","c":"Roma","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":739},{"id":1324,"n":"Ibañez","c":"Roma","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":507},{"id":1325,"n":"K. Linetty","c":"Torino","s":"2020-21","r":"CM","rt":74,"rg":["CM"],"pid":740},{"id":1326,"n":"A. Sanabria","c":"Torino","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":263},{"id":1327,"n":"R. Mandragora","c":"Torino","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":118},{"id":1328,"n":"Bremer","c":"Torino","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":8},{"id":1329,"n":"Llorente","c":"Udinese","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":741},{"id":1330,"n":"S. De Maio","c":"Udinese","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":742},{"id":1331,"n":"M. Jajalo","c":"Udinese","s":"2020-21","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":743},{"id":1332,"n":"I. Pussetto","c":"Udinese","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":593},{"id":1333,"n":"Danilo","c":"Bologna","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":372},{"id":1334,"n":"G. Medel","c":"Bologna","s":"2020-21","r":"CDM","rt":74,"rg":["CB","CDM"],"pid":556},{"id":1335,"n":"N. Sansone","c":"Bologna","s":"2020-21","r":"CAM","rt":74,"rg":["CAM","LW","ST"],"pid":338},{"id":1336,"n":"N. Domínguez","c":"Bologna","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":523},{"id":1337,"n":"K. Lasagna","c":"Hellas Verona FC","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":565},{"id":1338,"n":"F. Dimarco","c":"Hellas Verona FC","s":"2020-21","r":"LB","rt":74,"rg":["CB","LB"],"pid":7},{"id":1339,"n":"G. Magnani","c":"Hellas Verona FC","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":560},{"id":1340,"n":"L. Tonelli","c":"Sampdoria","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":570},{"id":1341,"n":"V. Verre","c":"Sampdoria","s":"2020-21","r":"CAM","rt":74,"rg":["CAM","CM","ST"],"pid":659},{"id":1342,"n":"O. Colley","c":"Sampdoria","s":"2020-21","r":"CB","rt":74,"rg":["CB"],"pid":744},{"id":1343,"n":"J. Jankto","c":"Sampdoria","s":"2020-21","r":"LB","rt":74,"rg":["CM","LB"],"pid":362},{"id":1344,"n":"M. Damsgaard","c":"Sampdoria","s":"2020-21","r":"LW","rt":74,"rg":["LW"],"pid":641},{"id":1345,"n":"K. Asamoah","c":"Cagliari","s":"2020-21","r":"LB","rt":74,"rg":["LB"],"pid":745},{"id":1346,"n":"L. Pavoletti","c":"Cagliari","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":482},{"id":1347,"n":"A. Duncan","c":"Cagliari","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":285},{"id":1348,"n":"R. Marin","c":"Cagliari","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":296},{"id":1349,"n":"M. Rog","c":"Cagliari","s":"2020-21","r":"CM","rt":74,"rg":["CDM","CM"],"pid":746},{"id":1350,"n":"C. Kouamé","c":"Fiorentina","s":"2020-21","r":"ST","rt":74,"rg":["ST"],"pid":178},{"id":1351,"n":"I. Radovanović","c":"Genoa","s":"2020-21","r":"CB","rt":74,"rg":["CB","CDM","CM"],"pid":665},{"id":1352,"n":"A. Ounas","c":"Crotone","s":"2020-21","r":"RW","rt":74,"rg":["CAM","RW"],"pid":652},{"id":1353,"n":"R. Saponara","c":"Spezia","s":"2020-21","r":"CAM","rt":74,"rg":["CAM","ST"],"pid":526},{"id":1354,"n":"M. Lopez","c":"Sassuolo","s":"2020-21","r":"CM","rt":74,"rg":["CM"],"pid":385},{"id":1355,"n":"V. Kovalenko","c":"Atalanta","s":"2020-21","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":359},{"id":1356,"n":"D. Padelli","c":"Inter","s":"2020-21","r":"GK","rt":73,"rg":["GK"],"pid":563},{"id":1357,"n":"D. Cataldi","c":"Lazio","s":"2020-21","r":"CM","rt":73,"rg":["CDM","CM"],"pid":266},{"id":1358,"n":"E. Elmas","c":"Napoli","s":"2020-21","r":"CM","rt":73,"rg":["CM"],"pid":77},{"id":1359,"n":"R. Inglese","c":"Parma","s":"2020-21","r":"ST","rt":73,"rg":["ST"],"pid":747},{"id":1360,"n":"A. Cornelius","c":"Parma","s":"2020-21","r":"ST","rt":73,"rg":["ST"],"pid":748},{"id":1361,"n":"W. Cyprien","c":"Parma","s":"2020-21","r":"CM","rt":73,"rg":["CDM","CM"],"pid":749},{"id":1362,"n":"R. Gagliolo","c":"Parma","s":"2020-21","r":"LB","rt":73,"rg":["CB","LB"],"pid":697},{"id":1363,"n":"A. Grassi","c":"Parma","s":"2020-21","r":"CM","rt":73,"rg":["CM"],"pid":232},{"id":1364,"n":"D. Santon","c":"Roma","s":"2020-21","r":"RB","rt":73,"rg":["LB","RB"],"pid":750},{"id":1365,"n":"Juan Jesus","c":"Roma","s":"2020-21","r":"CB","rt":73,"rg":["CB","LB"],"pid":535},{"id":1366,"n":"M. Vojvoda","c":"Torino","s":"2020-21","r":"RB","rt":73,"rg":["RB"],"pid":112},{"id":1367,"n":"T. Arslan","c":"Udinese","s":"2020-21","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":654},{"id":1368,"n":"I. Nestorovski","c":"Udinese","s":"2020-21","r":"ST","rt":73,"rg":["ST"],"pid":564},{"id":1369,"n":"Samir","c":"Udinese","s":"2020-21","r":"CB","rt":73,"rg":["CB","LB"],"pid":751},{"id":1370,"n":"Walace","c":"Udinese","s":"2020-21","r":"CDM","rt":73,"rg":["CDM","CM"],"pid":655},{"id":1371,"n":"Rodrigo Becão","c":"Udinese","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":520},{"id":1372,"n":"M. Svanberg","c":"Bologna","s":"2020-21","r":"CM","rt":73,"rg":["CDM","CM","RB"],"pid":752},{"id":1373,"n":"K. Günter","c":"Hellas Verona FC","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":541},{"id":1374,"n":"D. Bessa","c":"Hellas Verona FC","s":"2020-21","r":"CAM","rt":73,"rg":["CAM","CM"],"pid":753},{"id":1375,"n":"F. Ceccherini","c":"Hellas Verona FC","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":202},{"id":1376,"n":"P. Dawidowicz","c":"Hellas Verona FC","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":417},{"id":1377,"n":"M. Yoshida","c":"Sampdoria","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":662},{"id":1378,"n":"L. Ceppitelli","c":"Cagliari","s":"2020-21","r":"CB","rt":73,"rg":["CB"],"pid":754},{"id":1379,"n":"G. Pereiro","c":"Cagliari","s":"2020-21","r":"CAM","rt":73,"rg":["CAM","RW"],"pid":664},{"id":1380,"n":"R. Klavan","c":"Cagliari","s":"2020-21","r":"CB","rt":71,"rg":["CB"],"pid":755},{"id":1381,"n":"P. Terracciano","c":"Fiorentina","s":"2020-21","r":"GK","rt":71,"rg":["GK"],"pid":667},{"id":1382,"n":"A. Barreca","c":"Fiorentina","s":"2020-21","r":"LW","rt":71,"rg":["LB","LW"],"pid":756},{"id":1383,"n":"A. Benali","c":"Crotone","s":"2020-21","r":"CM","rt":71,"rg":["CDM","CM"],"pid":757},{"id":1384,"n":"K. Djidji","c":"Crotone","s":"2020-21","r":"CB","rt":71,"rg":["CB"],"pid":441},{"id":1385,"n":"S. Luperto","c":"Crotone","s":"2020-21","r":"CB","rt":71,"rg":["CB"],"pid":282},{"id":1386,"n":"Eduardo Henrique","c":"Crotone","s":"2020-21","r":"CM","rt":71,"rg":["CM"],"pid":758},{"id":1387,"n":"Junior Messias","c":"Crotone","s":"2020-21","r":"CAM","rt":71,"rg":["CAM","CM","ST"],"pid":406},{"id":1388,"n":"Rafael","c":"Spezia","s":"2020-21","r":"GK","rt":71,"rg":["GK"],"pid":759},{"id":1389,"n":"Diego Farías","c":"Spezia","s":"2020-21","r":"ST","rt":71,"rg":["LW","ST"],"pid":760},{"id":1390,"n":"M. Ricci","c":"Spezia","s":"2020-21","r":"CM","rt":71,"rg":["CM"],"pid":761},{"id":1391,"n":"F. Mattiello","c":"Spezia","s":"2020-21","r":"RB","rt":71,"rg":["LB","RB"],"pid":762},{"id":1392,"n":"L. Haraslín","c":"Sassuolo","s":"2020-21","r":"LB","rt":71,"rg":["LB","RB"],"pid":763},{"id":1393,"n":"H. Traorè","c":"Sassuolo","s":"2020-21","r":"CAM","rt":71,"rg":["CAM","CM"],"pid":412},{"id":1394,"n":"M. Müldür","c":"Sassuolo","s":"2020-21","r":"RB","rt":71,"rg":["CB","RB"],"pid":587},{"id":1395,"n":"P. Hetemaj","c":"Benevento","s":"2020-21","r":"CM","rt":71,"rg":["CM"],"pid":764},{"id":1396,"n":"N. Viola","c":"Benevento","s":"2020-21","r":"CM","rt":71,"rg":["CDM","CM"],"pid":324},{"id":1397,"n":"P. Schiattarella","c":"Benevento","s":"2020-21","r":"CM","rt":71,"rg":["CDM","CM"],"pid":765},{"id":1398,"n":"G. Lapadula","c":"Benevento","s":"2020-21","r":"ST","rt":71,"rg":["ST"],"pid":450},{"id":1399,"n":"F. Barba","c":"Benevento","s":"2020-21","r":"CB","rt":71,"rg":["CB","LB"],"pid":766},{"id":1400,"n":"S. Iacoponi","c":"Parma","s":"2020-21","r":"CB","rt":70,"rg":["CB","RB"],"pid":767},{"id":1401,"n":"S. Colombi","c":"Parma","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":768},{"id":1402,"n":"J. Brunetta","c":"Parma","s":"2020-21","r":"ST","rt":70,"rg":["CAM","ST"],"pid":769},{"id":1403,"n":"L. Valenti","c":"Parma","s":"2020-21","r":"CB","rt":70,"rg":["CB"],"pid":239},{"id":1404,"n":"V. Mihăilă","c":"Parma","s":"2020-21","r":"LW","rt":70,"rg":["LW"],"pid":310},{"id":1405,"n":"J. Makengo","c":"Udinese","s":"2020-21","r":"CM","rt":70,"rg":["CM"],"pid":673},{"id":1406,"n":"F. Santander","c":"Bologna","s":"2020-21","r":"ST","rt":70,"rg":["ST"],"pid":691},{"id":1407,"n":"P. Faragò","c":"Bologna","s":"2020-21","r":"CM","rt":70,"rg":["CM","RB"],"pid":770},{"id":1408,"n":"A. Ferrari","c":"Sampdoria","s":"2020-21","r":"CB","rt":70,"rg":["CB","RB"],"pid":680},{"id":1409,"n":"K. Letica","c":"Sampdoria","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":771},{"id":1410,"n":"A. Cerri","c":"Cagliari","s":"2020-21","r":"ST","rt":70,"rg":["ST"],"pid":772},{"id":1411,"n":"G. Vicario","c":"Cagliari","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":773},{"id":1412,"n":"S. Walukiewicz","c":"Cagliari","s":"2020-21","r":"CB","rt":70,"rg":["CB"],"pid":330},{"id":1413,"n":"L. Venuti","c":"Fiorentina","s":"2020-21","r":"RW","rt":70,"rg":["LB","RB","RW"],"pid":460},{"id":1414,"n":"M. Olivera","c":"Fiorentina","s":"2020-21","r":"LB","rt":70,"rg":["LB"],"pid":76},{"id":1415,"n":"E. Goldaniga","c":"Genoa","s":"2020-21","r":"CB","rt":70,"rg":["CB"],"pid":670},{"id":1416,"n":"P. Ghiglione","c":"Genoa","s":"2020-21","r":"RB","rt":70,"rg":["RB"],"pid":699},{"id":1417,"n":"A. Paleari","c":"Genoa","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":213},{"id":1418,"n":"L. Marrone","c":"Crotone","s":"2020-21","r":"CB","rt":70,"rg":["CB","CDM"],"pid":774},{"id":1419,"n":"A. Reca","c":"Crotone","s":"2020-21","r":"LB","rt":70,"rg":["LB"],"pid":686},{"id":1420,"n":"J. Sala","c":"Spezia","s":"2020-21","r":"RB","rt":70,"rg":["LB","RB"],"pid":685},{"id":1421,"n":"I. Provedel","c":"Spezia","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":27},{"id":1422,"n":"J. Chabot","c":"Spezia","s":"2020-21","r":"CB","rt":70,"rg":["CB"],"pid":775},{"id":1423,"n":"M. Nzola","c":"Spezia","s":"2020-21","r":"ST","rt":70,"rg":["RW","ST"],"pid":389},{"id":1424,"n":"G. Pegolo","c":"Sassuolo","s":"2020-21","r":"GK","rt":70,"rg":["GK"],"pid":688},{"id":1425,"n":"F. Peluso","c":"Sassuolo","s":"2020-21","r":"CB","rt":70,"rg":["CB","LB"],"pid":689},{"id":1426,"n":"Rogério","c":"Sassuolo","s":"2020-21","r":"LB","rt":70,"rg":["LB"],"pid":690},{"id":1427,"n":"R. Improta","c":"Benevento","s":"2020-21","r":"LW","rt":70,"rg":["CM","LW"],"pid":776},{"id":1428,"n":"R. Insigne","c":"Benevento","s":"2020-21","r":"ST","rt":70,"rg":["RW","ST"],"pid":777},{"id":1429,"n":"A. Gaich","c":"Benevento","s":"2020-21","r":"ST","rt":70,"rg":["ST"],"pid":778},{"id":1430,"n":"P. Kalulu","c":"AC Milan","s":"2020-21","r":"RB","rt":69,"rg":["CB","RB"],"pid":779},{"id":1431,"n":"M. Busi","c":"Parma","s":"2020-21","r":"RB","rt":69,"rg":["RB"],"pid":780},{"id":1432,"n":"S. Ujkani","c":"Torino","s":"2020-21","r":"GK","rt":69,"rg":["GK"],"pid":693},{"id":1433,"n":"A. Gojak","c":"Torino","s":"2020-21","r":"CM","rt":69,"rg":["CAM","CM"],"pid":781},{"id":1434,"n":"Ewandro","c":"Udinese","s":"2020-21","r":"CAM","rt":69,"rg":["CAM"],"pid":782},{"id":1435,"n":"A. Hickey","c":"Bologna","s":"2020-21","r":"LB","rt":69,"rg":["LB","RB"],"pid":657},{"id":1436,"n":"I. Pandur","c":"Hellas Verona FC","s":"2020-21","r":"GK","rt":69,"rg":["GK"],"pid":783},{"id":1437,"n":"A. Calabresi","c":"Cagliari","s":"2020-21","r":"RB","rt":69,"rg":["CB","RB"],"pid":784},{"id":1438,"n":"A. Rosati","c":"Fiorentina","s":"2020-21","r":"GK","rt":69,"rg":["GK"],"pid":698},{"id":1439,"n":"F. Marchetti","c":"Genoa","s":"2020-21","r":"GK","rt":69,"rg":["GK"],"pid":785},{"id":1440,"n":"Cristiano Ronaldo","c":"Juventus","s":"2019-20","r":"ST","rt":93,"rg":["LW","ST"],"pid":702},{"id":1441,"n":"S. Handanovič","c":"Inter","s":"2019-20","r":"GK","rt":88,"rg":["GK"],"pid":501},{"id":1442,"n":"G. Chiellini","c":"Juventus","s":"2019-20","r":"CB","rt":88,"rg":["CB"],"pid":703},{"id":1443,"n":"K. Koulibaly","c":"Napoli","s":"2019-20","r":"CB","rt":88,"rg":["CB"],"pid":598},{"id":1444,"n":"D. Godín","c":"Inter","s":"2019-20","r":"CB","rt":87,"rg":["CB"],"pid":715},{"id":1445,"n":"C. Eriksen","c":"Inter","s":"2019-20","r":"CAM","rt":87,"rg":["CAM","CM"],"pid":706},{"id":1446,"n":"W. Szczęsny","c":"Juventus","s":"2019-20","r":"GK","rt":87,"rg":["GK"],"pid":491},{"id":1447,"n":"P. Dybala","c":"Juventus","s":"2019-20","r":"ST","rt":87,"rg":["CAM","ST"],"pid":15},{"id":1448,"n":"C. Immobile","c":"Lazio","s":"2019-20","r":"ST","rt":87,"rg":["ST"],"pid":367},{"id":1449,"n":"D. Mertens","c":"Napoli","s":"2019-20","r":"ST","rt":87,"rg":["ST"],"pid":601},{"id":1450,"n":"A. Gómez","c":"Atalanta","s":"2019-20","r":"CAM","rt":86,"rg":["CAM","ST"],"pid":786},{"id":1451,"n":"R. Lukaku","c":"Inter","s":"2019-20","r":"ST","rt":86,"rg":["ST"],"pid":28},{"id":1452,"n":"M. Škriniar","c":"Inter","s":"2019-20","r":"CB","rt":86,"rg":["CB"],"pid":493},{"id":1453,"n":"M. Pjanić","c":"Juventus","s":"2019-20","r":"CM","rt":86,"rg":["CDM","CM"],"pid":787},{"id":1454,"n":"L. Bonucci","c":"Juventus","s":"2019-20","r":"CB","rt":86,"rg":["CB"],"pid":502},{"id":1455,"n":"L. Insigne","c":"Napoli","s":"2019-20","r":"ST","rt":86,"rg":["LW","ST"],"pid":705},{"id":1456,"n":"S. de Vrij","c":"Inter","s":"2019-20","r":"CB","rt":85,"rg":["CB"],"pid":23},{"id":1457,"n":"G. Higuaín","c":"Juventus","s":"2019-20","r":"ST","rt":85,"rg":["ST"],"pid":788},{"id":1458,"n":"M. de Ligt","c":"Juventus","s":"2019-20","r":"CB","rt":85,"rg":["CB"],"pid":599},{"id":1459,"n":"Luis Alberto","c":"Lazio","s":"2019-20","r":"CAM","rt":85,"rg":["CAM","CM","ST"],"pid":368},{"id":1460,"n":"S. Milinković-Savić","c":"Lazio","s":"2019-20","r":"CM","rt":85,"rg":["CAM","CDM","CM"],"pid":492},{"id":1461,"n":"Z. Ibrahimović","c":"AC Milan","s":"2019-20","r":"ST","rt":85,"rg":["ST"],"pid":603},{"id":1462,"n":"G. Donnarumma","c":"AC Milan","s":"2019-20","r":"GK","rt":85,"rg":["GK"],"pid":704},{"id":1463,"n":"J. Iličić","c":"Atalanta","s":"2019-20","r":"ST","rt":84,"rg":["ST"],"pid":605},{"id":1464,"n":"L. Martínez","c":"Inter","s":"2019-20","r":"ST","rt":84,"rg":["ST"],"pid":1},{"id":1465,"n":"B. Matuidi","c":"Juventus","s":"2019-20","r":"CDM","rt":84,"rg":["CDM","CM"],"pid":789},{"id":1466,"n":"Douglas Costa","c":"Juventus","s":"2019-20","r":"RW","rt":84,"rg":["LW","RW"],"pid":790},{"id":1467,"n":"Alex Sandro","c":"Juventus","s":"2019-20","r":"LB","rt":84,"rg":["LB"],"pid":395},{"id":1468,"n":"Lucas Leiva","c":"Lazio","s":"2019-20","r":"CDM","rt":84,"rg":["CDM"],"pid":708},{"id":1469,"n":"F. Acerbi","c":"Lazio","s":"2019-20","r":"CB","rt":84,"rg":["CB"],"pid":24},{"id":1470,"n":"José Callejón","c":"Napoli","s":"2019-20","r":"RW","rt":84,"rg":["RW"],"pid":628},{"id":1471,"n":"K. Manolas","c":"Napoli","s":"2019-20","r":"CB","rt":84,"rg":["CB"],"pid":709},{"id":1472,"n":"Allan","c":"Napoli","s":"2019-20","r":"CM","rt":84,"rg":["CM"],"pid":791},{"id":1473,"n":"E. Džeko","c":"Roma","s":"2019-20","r":"ST","rt":84,"rg":["ST"],"pid":498},{"id":1474,"n":"S. Sirigu","c":"Torino","s":"2019-20","r":"GK","rt":84,"rg":["GK"],"pid":710},{"id":1475,"n":"R. Nainggolan","c":"Cagliari","s":"2019-20","r":"CAM","rt":84,"rg":["CAM","CM","ST"],"pid":714},{"id":1476,"n":"D. Zapata","c":"Atalanta","s":"2019-20","r":"ST","rt":83,"rg":["ST"],"pid":249},{"id":1477,"n":"M. Brozović","c":"Inter","s":"2019-20","r":"CDM","rt":83,"rg":["CDM","CM"],"pid":494},{"id":1478,"n":"G. Buffon","c":"Juventus","s":"2019-20","r":"GK","rt":83,"rg":["GK"],"pid":711},{"id":1479,"n":"S. Khedira","c":"Juventus","s":"2019-20","r":"CM","rt":83,"rg":["CDM","CM"],"pid":792},{"id":1480,"n":"A. Ramsey","c":"Juventus","s":"2019-20","r":"CM","rt":83,"rg":["CAM","CM"],"pid":712},{"id":1481,"n":"J. Cuadrado","c":"Juventus","s":"2019-20","r":"RW","rt":83,"rg":["RB","RW"],"pid":504},{"id":1482,"n":"T. Strakosha","c":"Lazio","s":"2019-20","r":"GK","rt":83,"rg":["GK"],"pid":713},{"id":1483,"n":"A. Romagnoli","c":"AC Milan","s":"2019-20","r":"CB","rt":83,"rg":["CB"],"pid":39},{"id":1484,"n":"A. Milik","c":"Napoli","s":"2019-20","r":"ST","rt":83,"rg":["ST"],"pid":373},{"id":1485,"n":"Fabián","c":"Napoli","s":"2019-20","r":"CM","rt":83,"rg":["CM"],"pid":607},{"id":1486,"n":"Pau López","c":"Roma","s":"2019-20","r":"GK","rt":83,"rg":["GK"],"pid":793},{"id":1487,"n":"A. Rabiot","c":"Juventus","s":"2019-20","r":"CM","rt":82,"rg":["CDM","CM"],"pid":13},{"id":1488,"n":"M. Politano","c":"Napoli","s":"2019-20","r":"RW","rt":82,"rg":["RW","ST"],"pid":58},{"id":1489,"n":"A. Kolarov","c":"Roma","s":"2019-20","r":"LB","rt":82,"rg":["LB"],"pid":794},{"id":1490,"n":"A. Belotti","c":"Torino","s":"2019-20","r":"ST","rt":82,"rg":["ST"],"pid":138},{"id":1491,"n":"F. Ribéry","c":"Fiorentina","s":"2019-20","r":"ST","rt":82,"rg":["LW","ST"],"pid":618},{"id":1492,"n":"M. Perin","c":"Genoa","s":"2019-20","r":"GK","rt":82,"rg":["GK"],"pid":716},{"id":1493,"n":"A. Sánchez","c":"Inter","s":"2019-20","r":"LW","rt":81,"rg":["LW"],"pid":257},{"id":1494,"n":"D. Rugani","c":"Juventus","s":"2019-20","r":"CB","rt":81,"rg":["CB"],"pid":622},{"id":1495,"n":"F. Bernardeschi","c":"Juventus","s":"2019-20","r":"CAM","rt":81,"rg":["CAM"],"pid":795},{"id":1496,"n":"J. Correa","c":"Lazio","s":"2019-20","r":"ST","rt":81,"rg":["CAM","ST"],"pid":517},{"id":1497,"n":"M. Lazzari","c":"Lazio","s":"2019-20","r":"RB","rt":81,"rg":["RB"],"pid":95},{"id":1498,"n":"S. Kjær","c":"AC Milan","s":"2019-20","r":"CB","rt":81,"rg":["CB"],"pid":375},{"id":1499,"n":"G. Bonaventura","c":"AC Milan","s":"2019-20","r":"CM","rt":81,"rg":["CM"],"pid":619},{"id":1500,"n":"Gervinho","c":"Parma","s":"2019-20","r":"LW","rt":78,"rg":["LW","RW"],"pid":733},{"id":1501,"n":"J. Kucka","c":"Parma","s":"2019-20","r":"CM","rt":78,"rg":["CDM","CM"],"pid":723},{"id":1502,"n":"A. Mirante","c":"Roma","s":"2019-20","r":"GK","rt":78,"rg":["GK"],"pid":796},{"id":1503,"n":"F. Fazio","c":"Roma","s":"2019-20","r":"CB","rt":78,"rg":["CB"],"pid":466},{"id":1504,"n":"N. Kalinić","c":"Roma","s":"2019-20","r":"ST","rt":78,"rg":["ST"],"pid":797},{"id":1505,"n":"J. Pastore","c":"Roma","s":"2019-20","r":"CAM","rt":78,"rg":["CAM","CM"],"pid":798},{"id":1506,"n":"B. Cristante","c":"Roma","s":"2019-20","r":"CDM","rt":78,"rg":["CAM","CDM","CM"],"pid":378},{"id":1507,"n":"D. Zappacosta","c":"Roma","s":"2019-20","r":"RB","rt":78,"rg":["RB","RW"],"pid":254},{"id":1508,"n":"C. Ünder","c":"Roma","s":"2019-20","r":"RW","rt":78,"rg":["RW"],"pid":799},{"id":1509,"n":"S. Verdi","c":"Torino","s":"2019-20","r":"ST","rt":78,"rg":["LW","ST"],"pid":538},{"id":1510,"n":"D. Baselli","c":"Torino","s":"2019-20","r":"CM","rt":78,"rg":["CM"],"pid":736},{"id":1511,"n":"R. De Paul","c":"Udinese","s":"2019-20","r":"CM","rt":78,"rg":["CM","ST"],"pid":800},{"id":1512,"n":"R. Soriano","c":"Bologna","s":"2019-20","r":"CAM","rt":78,"rg":["CAM","CM"],"pid":522},{"id":1513,"n":"Miguel Veloso","c":"Hellas Verona FC","s":"2019-20","r":"CM","rt":78,"rg":["CDM","CM"],"pid":537},{"id":1514,"n":"G. Ramírez","c":"Sampdoria","s":"2019-20","r":"CAM","rt":78,"rg":["CAM"],"pid":801},{"id":1515,"n":"João Pedro","c":"Cagliari","s":"2019-20","r":"ST","rt":78,"rg":["CAM","ST"],"pid":802},{"id":1516,"n":"R. Olsen","c":"Cagliari","s":"2019-20","r":"GK","rt":78,"rg":["GK"],"pid":803},{"id":1517,"n":"N. Nández","c":"Cagliari","s":"2019-20","r":"CM","rt":78,"rg":["CDM","CM","RB"],"pid":724},{"id":1518,"n":"F. Chiesa","c":"Fiorentina","s":"2019-20","r":"ST","rt":78,"rg":["RW","ST"],"pid":366},{"id":1519,"n":"D. Criscito","c":"Genoa","s":"2019-20","r":"LB","rt":78,"rg":["CB","LB"],"pid":725},{"id":1520,"n":"Iago Falqué","c":"Genoa","s":"2019-20","r":"ST","rt":78,"rg":["RW","ST"],"pid":804},{"id":1521,"n":"G. Defrel","c":"Sassuolo","s":"2019-20","r":"ST","rt":78,"rg":["RW","ST"],"pid":726},{"id":1522,"n":"A. Petagna","c":"SPAL","s":"2019-20","r":"ST","rt":78,"rg":["ST"],"pid":346},{"id":1523,"n":"J. Palomino","c":"Atalanta","s":"2019-20","r":"CB","rt":77,"rg":["CB"],"pid":532},{"id":1524,"n":"D. D'Ambrosio","c":"Inter","s":"2019-20","r":"RB","rt":77,"rg":["CB","LB","RB"],"pid":516},{"id":1525,"n":"M. De Sciglio","c":"Juventus","s":"2019-20","r":"RB","rt":77,"rg":["LB","RB"],"pid":408},{"id":1526,"n":"M. Demiral","c":"Juventus","s":"2019-20","r":"CB","rt":77,"rg":["CB"],"pid":515},{"id":1527,"n":"A. Marušić","c":"Lazio","s":"2019-20","r":"RB","rt":77,"rg":["RB"],"pid":73},{"id":1528,"n":"D. Laxalt","c":"AC Milan","s":"2019-20","r":"LB","rt":77,"rg":["LB"],"pid":805},{"id":1529,"n":"T. Hernández","c":"AC Milan","s":"2019-20","r":"LB","rt":77,"rg":["LB"],"pid":240},{"id":1530,"n":"Lucas Paquetá","c":"AC Milan","s":"2019-20","r":"CM","rt":77,"rg":["CAM","CM"],"pid":806},{"id":1531,"n":"K. Malcuit","c":"Napoli","s":"2019-20","r":"RB","rt":77,"rg":["RB"],"pid":807},{"id":1532,"n":"G. Mancini","c":"Roma","s":"2019-20","r":"CB","rt":77,"rg":["CB","CDM"],"pid":19},{"id":1533,"n":"N. Zaniolo","c":"Roma","s":"2019-20","r":"CAM","rt":77,"rg":["CAM"],"pid":267},{"id":1534,"n":"T. Rincón","c":"Torino","s":"2019-20","r":"CM","rt":77,"rg":["CDM","CM"],"pid":592},{"id":1535,"n":"S. Meïté","c":"Torino","s":"2019-20","r":"CM","rt":77,"rg":["CDM","CM"],"pid":546},{"id":1536,"n":"Alex Berenguer","c":"Torino","s":"2019-20","r":"ST","rt":77,"rg":["LW","ST"],"pid":808},{"id":1537,"n":"G. Medel","c":"Bologna","s":"2019-20","r":"CDM","rt":77,"rg":["CB","CDM"],"pid":556},{"id":1538,"n":"N. Sansone","c":"Bologna","s":"2019-20","r":"CAM","rt":77,"rg":["CAM","LW","ST"],"pid":338},{"id":1539,"n":"S. Tonali","c":"Brescia","s":"2019-20","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":497},{"id":1540,"n":"M. Silvestri","c":"Hellas Verona FC","s":"2019-20","r":"GK","rt":77,"rg":["GK"],"pid":293},{"id":1541,"n":"A. Rrahmani","c":"Hellas Verona FC","s":"2019-20","r":"CB","rt":77,"rg":["CB","LB"],"pid":32},{"id":1542,"n":"E. Audero","c":"Sampdoria","s":"2019-20","r":"GK","rt":77,"rg":["GK"],"pid":627},{"id":1543,"n":"V. Birsa","c":"Cagliari","s":"2019-20","r":"CAM","rt":77,"rg":["CAM","RW"],"pid":809},{"id":1544,"n":"L. Pavoletti","c":"Cagliari","s":"2019-20","r":"ST","rt":77,"rg":["ST"],"pid":482},{"id":1545,"n":"G. Simeone","c":"Cagliari","s":"2019-20","r":"ST","rt":77,"rg":["ST"],"pid":102},{"id":1546,"n":"M. Cáceres","c":"Fiorentina","s":"2019-20","r":"CB","rt":77,"rg":["CB","RB"],"pid":810},{"id":1547,"n":"M. Badelj","c":"Fiorentina","s":"2019-20","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":668},{"id":1548,"n":"E. Pulgar","c":"Fiorentina","s":"2019-20","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":811},{"id":1549,"n":"P. Cutrone","c":"Fiorentina","s":"2019-20","r":"ST","rt":77,"rg":["ST"],"pid":661},{"id":1550,"n":"A. Soumaoro","c":"Genoa","s":"2019-20","r":"CB","rt":77,"rg":["CB"],"pid":557},{"id":1551,"n":"Pedro Obiang","c":"Sassuolo","s":"2019-20","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":476},{"id":1552,"n":"M. Locatelli","c":"Sassuolo","s":"2019-20","r":"CDM","rt":77,"rg":["CDM","CM"],"pid":17},{"id":1553,"n":"M. Sportiello","c":"Atalanta","s":"2019-20","r":"GK","rt":76,"rg":["GK"],"pid":88},{"id":1554,"n":"T. Castagne","c":"Atalanta","s":"2019-20","r":"LB","rt":76,"rg":["LB","RB"],"pid":812},{"id":1555,"n":"C. Biraghi","c":"Inter","s":"2019-20","r":"LB","rt":76,"rg":["LB"],"pid":80},{"id":1556,"n":"J. Lukaku","c":"Lazio","s":"2019-20","r":"LB","rt":76,"rg":["LB"],"pid":813},{"id":1557,"n":"A. Conti","c":"AC Milan","s":"2019-20","r":"RB","rt":76,"rg":["RB"],"pid":573},{"id":1558,"n":"D. Calabria","c":"AC Milan","s":"2019-20","r":"RB","rt":76,"rg":["RB"],"pid":814},{"id":1559,"n":"Llorente","c":"Napoli","s":"2019-20","r":"ST","rt":76,"rg":["ST"],"pid":741},{"id":1560,"n":"E. Badu","c":"Hellas Verona FC","s":"2019-20","r":"CM","rt":75,"rg":["CDM","CM"],"pid":815},{"id":1561,"n":"M. Faraoni","c":"Hellas Verona FC","s":"2019-20","r":"RB","rt":75,"rg":["RB"],"pid":625},{"id":1562,"n":"V. Verre","c":"Hellas Verona FC","s":"2019-20","r":"CAM","rt":75,"rg":["CAM","CM","ST"],"pid":659},{"id":1563,"n":"D. Lazović","c":"Hellas Verona FC","s":"2019-20","r":"LB","rt":75,"rg":["LB","RB"],"pid":316},{"id":1564,"n":"O. Colley","c":"Sampdoria","s":"2019-20","r":"CB","rt":75,"rg":["CB"],"pid":744},{"id":1565,"n":"R. Klavan","c":"Cagliari","s":"2019-20","r":"CB","rt":75,"rg":["CB"],"pid":755},{"id":1566,"n":"L. Cigarini","c":"Cagliari","s":"2019-20","r":"CM","rt":75,"rg":["CDM","CM"],"pid":816},{"id":1567,"n":"A. Ioniță","c":"Cagliari","s":"2019-20","r":"CM","rt":75,"rg":["CAM","CM"],"pid":817},{"id":1568,"n":"A. Duncan","c":"Fiorentina","s":"2019-20","r":"CM","rt":75,"rg":["CM"],"pid":285},{"id":1569,"n":"B. Drągowski","c":"Fiorentina","s":"2019-20","r":"GK","rt":75,"rg":["GK"],"pid":529},{"id":1570,"n":"V. Behrami","c":"Genoa","s":"2019-20","r":"CDM","rt":75,"rg":["CDM","CM"],"pid":818},{"id":1571,"n":"A. Sanabria","c":"Genoa","s":"2019-20","r":"ST","rt":75,"rg":["ST"],"pid":263},{"id":1572,"n":"V. Chiricheș","c":"Sassuolo","s":"2019-20","r":"CB","rt":75,"rg":["CB"],"pid":581},{"id":1573,"n":"J. Boga","c":"Sassuolo","s":"2019-20","r":"LW","rt":75,"rg":["LW","ST"],"pid":92},{"id":1574,"n":"A. Tameze","c":"Atalanta","s":"2019-20","r":"CM","rt":74,"rg":["CDM","CM"],"pid":120},{"id":1575,"n":"D. Padelli","c":"Inter","s":"2019-20","r":"GK","rt":74,"rg":["GK"],"pid":563},{"id":1576,"n":"I. Bennacer","c":"AC Milan","s":"2019-20","r":"CM","rt":74,"rg":["CDM","CM"],"pid":369},{"id":1577,"n":"R. Krunić","c":"AC Milan","s":"2019-20","r":"CM","rt":74,"rg":["CM"],"pid":819},{"id":1578,"n":"G. Caprari","c":"Parma","s":"2019-20","r":"ST","rt":74,"rg":["ST"],"pid":530},{"id":1579,"n":"A. Grassi","c":"Parma","s":"2019-20","r":"CM","rt":74,"rg":["CM"],"pid":232},{"id":1580,"n":"Hernani","c":"Parma","s":"2019-20","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":273},{"id":1581,"n":"D. Kulusevski","c":"Parma","s":"2019-20","r":"RW","rt":74,"rg":["CAM","RW"],"pid":820},{"id":1582,"n":"L. De Silvestri","c":"Torino","s":"2019-20","r":"RB","rt":74,"rg":["RB"],"pid":186},{"id":1583,"n":"O. Aina","c":"Torino","s":"2019-20","r":"LB","rt":74,"rg":["LB","RB"],"pid":553},{"id":1584,"n":"J. Larsen","c":"Udinese","s":"2019-20","r":"RB","rt":74,"rg":["CB","RB"],"pid":638},{"id":1585,"n":"I. Nestorovski","c":"Udinese","s":"2019-20","r":"ST","rt":74,"rg":["ST"],"pid":564},{"id":1586,"n":"Rodrigo Becão","c":"Udinese","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":520},{"id":1587,"n":"F. Santander","c":"Bologna","s":"2019-20","r":"ST","rt":74,"rg":["ST"],"pid":691},{"id":1588,"n":"S. Denswil","c":"Bologna","s":"2019-20","r":"CB","rt":74,"rg":["CB","LB"],"pid":821},{"id":1589,"n":"A. Donnarumma","c":"Brescia","s":"2019-20","r":"ST","rt":74,"rg":["ST"],"pid":822},{"id":1590,"n":"S. Bocchetti","c":"Hellas Verona FC","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":823},{"id":1591,"n":"M. Zaccagni","c":"Hellas Verona FC","s":"2019-20","r":"CAM","rt":74,"rg":["CAM","CM","ST"],"pid":26},{"id":1592,"n":"M. Kumbulla","c":"Hellas Verona FC","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":824},{"id":1593,"n":"M. Yoshida","c":"Sampdoria","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":662},{"id":1594,"n":"A. Bertolacci","c":"Sampdoria","s":"2019-20","r":"CM","rt":74,"rg":["CDM","CM"],"pid":825},{"id":1595,"n":"J. Jankto","c":"Sampdoria","s":"2019-20","r":"CM","rt":74,"rg":["CM","LB"],"pid":362},{"id":1596,"n":"A. Paloschi","c":"Cagliari","s":"2019-20","r":"ST","rt":74,"rg":["ST"],"pid":826},{"id":1597,"n":"F. Pisacane","c":"Cagliari","s":"2019-20","r":"CB","rt":74,"rg":["CB","RB"],"pid":827},{"id":1598,"n":"L. Ceppitelli","c":"Cagliari","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":754},{"id":1599,"n":"R. Ghezzal","c":"Fiorentina","s":"2019-20","r":"RW","rt":74,"rg":["RW"],"pid":828},{"id":1600,"n":"Dalbert","c":"Fiorentina","s":"2019-20","r":"LB","rt":74,"rg":["LB"],"pid":588},{"id":1601,"n":"I. Radovanović","c":"Genoa","s":"2019-20","r":"CDM","rt":74,"rg":["CDM","CM"],"pid":665},{"id":1602,"n":"L. Lerager","c":"Genoa","s":"2019-20","r":"CM","rt":74,"rg":["CM"],"pid":829},{"id":1603,"n":"C. Romero","c":"Genoa","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":830},{"id":1604,"n":"F. Magnanelli","c":"Sassuolo","s":"2019-20","r":"CDM","rt":74,"rg":["CDM"],"pid":831},{"id":1605,"n":"F. Đuričić","c":"Sassuolo","s":"2019-20","r":"CAM","rt":74,"rg":["CAM","LW"],"pid":832},{"id":1606,"n":"Marlon","c":"Sassuolo","s":"2019-20","r":"CB","rt":74,"rg":["CB"],"pid":833},{"id":1607,"n":"S. Missiroli","c":"SPAL","s":"2019-20","r":"CM","rt":74,"rg":["CDM","CM"],"pid":834},{"id":1608,"n":"B. Dabo","c":"SPAL","s":"2019-20","r":"CM","rt":74,"rg":["CDM","CM"],"pid":835},{"id":1609,"n":"Patric","c":"Lazio","s":"2019-20","r":"CB","rt":73,"rg":["CB","RB"],"pid":270},{"id":1610,"n":"E. Elmas","c":"Napoli","s":"2019-20","r":"CM","rt":73,"rg":["CM"],"pid":77},{"id":1611,"n":"Bruno Alves","c":"Parma","s":"2019-20","r":"CB","rt":73,"rg":["CB"],"pid":836},{"id":1612,"n":"G. Brugman","c":"Parma","s":"2019-20","r":"CM","rt":73,"rg":["CDM","CM"],"pid":837},{"id":1613,"n":"Carles Pérez","c":"Roma","s":"2019-20","r":"RW","rt":73,"rg":["RW"],"pid":738},{"id":1614,"n":"K. Djidji","c":"Torino","s":"2019-20","r":"CB","rt":73,"rg":["CB"],"pid":441},{"id":1615,"n":"Lyanco","c":"Torino","s":"2019-20","r":"CB","rt":73,"rg":["CB"],"pid":838},{"id":1616,"n":"S. Prödl","c":"Udinese","s":"2019-20","r":"CB","rt":73,"rg":["CB"],"pid":839},{"id":1617,"n":"B. Nuytinck","c":"Udinese","s":"2019-20","r":"CB","rt":73,"rg":["CB"],"pid":840},{"id":1618,"n":"Ł. Teodorczyk","c":"Udinese","s":"2019-20","r":"ST","rt":73,"rg":["ST"],"pid":841},{"id":1619,"n":"K. Sema","c":"Udinese","s":"2019-20","r":"LB","rt":73,"rg":["LB","RB"],"pid":842},{"id":1620,"n":"M. Valdifiori","c":"SPAL","s":"2019-20","r":"CDM","rt":72,"rg":["CDM","CM"],"pid":843},{"id":1621,"n":"E. Zukanović","c":"SPAL","s":"2019-20","r":"CB","rt":72,"rg":["CB"],"pid":844},{"id":1622,"n":"A. Cerri","c":"SPAL","s":"2019-20","r":"ST","rt":72,"rg":["ST"],"pid":772},{"id":1623,"n":"F. Vicari","c":"SPAL","s":"2019-20","r":"CB","rt":72,"rg":["CB"],"pid":845},{"id":1624,"n":"A. Murgia","c":"SPAL","s":"2019-20","r":"CM","rt":72,"rg":["CDM","CM"],"pid":846},{"id":1625,"n":"A. Saelemaekers","c":"AC Milan","s":"2019-20","r":"RW","rt":71,"rg":["CAM","LW","RW"],"pid":382},{"id":1626,"n":"G. Pezzella","c":"Parma","s":"2019-20","r":"LB","rt":71,"rg":["LB"],"pid":203},{"id":1627,"n":"S. Sabelli","c":"Brescia","s":"2019-20","r":"RB","rt":71,"rg":["RB"],"pid":193},{"id":1628,"n":"F. Ayé","c":"Brescia","s":"2019-20","r":"ST","rt":71,"rg":["ST"],"pid":847},{"id":1629,"n":"G. Pazzini","c":"Hellas Verona FC","s":"2019-20","r":"ST","rt":71,"rg":["ST"],"pid":848},{"id":1630,"n":"P. Tachtsidis","c":"Lecce","s":"2019-20","r":"CM","rt":71,"rg":["CM"],"pid":849},{"id":1631,"n":"M. Calderoni","c":"Lecce","s":"2019-20","r":"LB","rt":71,"rg":["LB"],"pid":850},{"id":1632,"n":"E. Barreto","c":"Sampdoria","s":"2019-20","r":"CM","rt":71,"rg":["CM"],"pid":851},{"id":1633,"n":"B. Bereszyński","c":"Sampdoria","s":"2019-20","r":"RB","rt":71,"rg":["RB"],"pid":663},{"id":1634,"n":"A. Ferrari","c":"Sampdoria","s":"2019-20","r":"CB","rt":71,"rg":["CB","RB"],"pid":680},{"id":1635,"n":"P. Faragò","c":"Cagliari","s":"2019-20","r":"CM","rt":71,"rg":["CM","RB"],"pid":770},{"id":1636,"n":"F. Mattiello","c":"Cagliari","s":"2019-20","r":"RB","rt":71,"rg":["LB","RB"],"pid":762},{"id":1637,"n":"L. Pellegrini","c":"Cagliari","s":"2019-20","r":"LB","rt":71,"rg":["LB"],"pid":252},{"id":1638,"n":"C. Théréau","c":"Fiorentina","s":"2019-20","r":"LW","rt":71,"rg":["LW","ST"],"pid":852},{"id":1639,"n":"P. Terracciano","c":"Fiorentina","s":"2019-20","r":"GK","rt":71,"rg":["GK"],"pid":667},{"id":1640,"n":"F. Ceccherini","c":"Fiorentina","s":"2019-20","r":"CB","rt":71,"rg":["CB"],"pid":202},{"id":1641,"n":"M. Pajač","c":"Genoa","s":"2019-20","r":"LB","rt":71,"rg":["LB"],"pid":853},{"id":1642,"n":"M. Bourabia","c":"Sassuolo","s":"2019-20","r":"CM","rt":71,"rg":["CAM","CDM","CM"],"pid":579},{"id":1643,"n":"F. Romagna","c":"Sassuolo","s":"2019-20","r":"CB","rt":71,"rg":["CB"],"pid":233},{"id":1644,"n":"L. Haraslín","c":"Sassuolo","s":"2019-20","r":"LB","rt":71,"rg":["LB","RB"],"pid":763},{"id":1645,"n":"H. Traorè","c":"Sassuolo","s":"2019-20","r":"CAM","rt":71,"rg":["CAM","CM"],"pid":412},{"id":1646,"n":"Thiago Cionek","c":"SPAL","s":"2019-20","r":"CB","rt":71,"rg":["CB"],"pid":854},{"id":1647,"n":"N. Tomović","c":"SPAL","s":"2019-20","r":"CB","rt":71,"rg":["CB","RB"],"pid":855},{"id":1648,"n":"J. Sala","c":"SPAL","s":"2019-20","r":"RB","rt":71,"rg":["RB"],"pid":685},{"id":1649,"n":"M. Fares","c":"SPAL","s":"2019-20","r":"LB","rt":71,"rg":["LB","LW"],"pid":856},{"id":1650,"n":"K. Bonifazi","c":"SPAL","s":"2019-20","r":"CB","rt":71,"rg":["CB"],"pid":472},{"id":1651,"n":"K. Letica","c":"SPAL","s":"2019-20","r":"GK","rt":71,"rg":["GK"],"pid":771},{"id":1652,"n":"M. Scozzarella","c":"Parma","s":"2019-20","r":"CM","rt":70,"rg":["CDM","CM"],"pid":857},{"id":1653,"n":"L. Siligardi","c":"Parma","s":"2019-20","r":"RW","rt":70,"rg":["LW","RW"],"pid":858},{"id":1654,"n":"S. Colombi","c":"Parma","s":"2019-20","r":"GK","rt":70,"rg":["GK"],"pid":768},{"id":1655,"n":"V. Regini","c":"Parma","s":"2019-20","r":"CB","rt":70,"rg":["CB","LB"],"pid":859},{"id":1656,"n":"Y. Çetin","c":"Roma","s":"2019-20","r":"CB","rt":70,"rg":["CB"],"pid":860},{"id":1657,"n":"Gonzalo Villar","c":"Roma","s":"2019-20","r":"CM","rt":70,"rg":["CDM","CM"],"pid":739},{"id":1658,"n":"M. Barrow","c":"Bologna","s":"2019-20","r":"ST","rt":70,"rg":["ST"],"pid":524},{"id":1659,"n":"E. Alfonso","c":"Brescia","s":"2019-20","r":"GK","rt":70,"rg":["GK"],"pid":861},{"id":1660,"n":"D. Dessena","c":"Brescia","s":"2019-20","r":"CM","rt":70,"rg":["CDM","CM"],"pid":862},{"id":1661,"n":"B. Martella","c":"Brescia","s":"2019-20","r":"LB","rt":70,"rg":["LB"],"pid":863},{"id":1662,"n":"J. Chancellor","c":"Brescia","s":"2019-20","r":"CB","rt":70,"rg":["CB"],"pid":864},{"id":1663,"n":"J. Petriccione","c":"Lecce","s":"2019-20","r":"CM","rt":70,"rg":["CM"],"pid":865},{"id":1664,"n":"C. Dell'Orco","c":"Lecce","s":"2019-20","r":"CB","rt":70,"rg":["CB","LB"],"pid":866},{"id":1665,"n":"A. Seculin","c":"Sampdoria","s":"2019-20","r":"GK","rt":70,"rg":["GK"],"pid":867},{"id":1666,"n":"M. Thorsby","c":"Sampdoria","s":"2019-20","r":"CM","rt":70,"rg":["CAM","CM"],"pid":646},{"id":1667,"n":"G. Maroni","c":"Sampdoria","s":"2019-20","r":"CAM","rt":70,"rg":["CAM","LW"],"pid":868},{"id":1668,"n":"F. Depaoli","c":"Sampdoria","s":"2019-20","r":"RB","rt":70,"rg":["RB"],"pid":559},{"id":1669,"n":"J. Chabot","c":"Sampdoria","s":"2019-20","r":"CB","rt":70,"rg":["CB"],"pid":775},{"id":1670,"n":"C. Oliva","c":"Cagliari","s":"2019-20","r":"CM","rt":70,"rg":["CDM","CM"],"pid":869},{"id":1671,"n":"A. Pinamonti","c":"Genoa","s":"2019-20","r":"ST","rt":70,"rg":["ST"],"pid":428},{"id":1672,"n":"G. Pegolo","c":"Sassuolo","s":"2019-20","r":"GK","rt":70,"rg":["GK"],"pid":688},{"id":1673,"n":"Rogério","c":"Sassuolo","s":"2019-20","r":"LB","rt":70,"rg":["LB"],"pid":690},{"id":1674,"n":"G. Magnani","c":"Sassuolo","s":"2019-20","r":"CB","rt":70,"rg":["CB"],"pid":560},{"id":1675,"n":"B. Salamon","c":"SPAL","s":"2019-20","r":"CB","rt":70,"rg":["CB"],"pid":870},{"id":1676,"n":"K. Dermaku","c":"Parma","s":"2019-20","r":"CB","rt":69,"rg":["CB"],"pid":871},{"id":1677,"n":"A. Rosati","c":"Torino","s":"2019-20","r":"GK","rt":69,"rg":["GK"],"pid":698},{"id":1678,"n":"S. Ujkani","c":"Torino","s":"2019-20","r":"GK","rt":69,"rg":["GK"],"pid":693},{"id":1679,"n":"Nicolas","c":"Udinese","s":"2019-20","r":"GK","rt":69,"rg":["GK"],"pid":872}];


// ================== PALETTE + STILI OGGETTO ==================
const S = {
  field: "#0a3d2c", fieldHi: "#0e5138", line: "#1d6b4a",
  gold: "#ffd24a", cream: "#f4ecd8", ink: "#06241a",
};
const wrap = {
  minHeight:"100vh", background:`radial-gradient(circle at 50% 0%, #0e5138 0%, #06241a 60%)`,
  fontFamily:"'Helvetica Neue', Arial, sans-serif", paddingBottom:50,
};
const panel = {
  background:"rgba(0,0,0,.28)", border:`2px solid ${S.line}`, borderRadius:14,
  padding:18, backdropFilter:"blur(4px)",
};
const pitchLines = { position:"absolute", inset:0,
  background:"repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 38px, transparent 38px 76px)" };
const Label = ({children}) => (
  <div style={{color:S.cream, fontSize:12, letterSpacing:2, textTransform:"uppercase",
    opacity:.7, margin:"18px 0 8px"}}>{children}</div>
);
const chipRow = { display:"flex", gap:8, flexWrap:"wrap" };
const chip = (on) => ({
  flex:"1 1 auto", padding:"12px 10px", borderRadius:10, cursor:"pointer",
  border:`2px solid ${on?S.gold:"rgba(255,255,255,.2)"}`,
  background: on?"rgba(255,210,74,.15)":"rgba(0,0,0,.2)",
  color: on?S.gold:S.cream, fontWeight:700, fontSize:14, transition:"all .15s",
});
const bigBtn = {
  width:"100%", marginTop:28, padding:"16px", borderRadius:12, border:"none",
  background:`linear-gradient(135deg, ${S.gold}, #e0a82e)`, color:S.ink,
  fontSize:18, fontWeight:900, letterSpacing:1, cursor:"pointer",
  boxShadow:"0 6px 20px rgba(255,210,74,.3)",
};
const bigBtnSm = { ...bigBtn, width:"auto", marginTop:0, padding:"13px 26px", fontSize:15 };
const spinBtn = { ...bigBtn, marginTop:4 };
const spinningBox = { textAlign:"center", padding:"20px", color:S.gold, fontWeight:700, fontSize:16 };
const cardBtn = {
  background:S.cream, border:"none", borderRadius:10, padding:"10px 8px", cursor:"pointer",
  textAlign:"left", transition:"transform .1s", boxShadow:"0 2px 6px rgba(0,0,0,.2)",
};
const ratBadge = {
  display:"inline-block", marginLeft:6, background:S.ink, color:S.gold,
  borderRadius:5, padding:"1px 5px", fontSize:11, fontWeight:900,
};
const rerollBtn = {
  width:"100%", marginTop:12, padding:"10px", borderRadius:10, cursor:"pointer",
  background:"transparent", border:`2px solid ${S.line}`, color:S.cream, fontWeight:700, fontSize:13,
};

// ---------------- CONFIG ----------------
const FORMATIONS = {
  "4-3-3": { key:"4-3-3", label: "4-3-3", slots: ["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"] },
  "4-4-2": { key:"4-4-2", label: "4-4-2", slots: ["GK","RB","CB","CB","LB","RW","CM","CM","LW","ST","ST"] },
  "3-5-2": { key:"3-5-2", label: "3-5-2", slots: ["GK","CB","CB","CB","RB","CM","CM","CM","LB","ST","ST"] },
  "4-2-3-1": { key:"4-2-3-1", label: "4-2-3-1", slots: ["GK","RB","CB","CB","LB","CDM","CDM","CAM","RW","LW","ST"] },
  "3-4-3": { key:"3-4-3", label: "3-4-3", slots: ["GK","CB","CB","CB","RB","CM","CM","LB","RW","ST","LW"] },
  "4-3-1-2": { key:"4-3-1-2", label: "4-3-1-2", slots: ["GK","RB","CB","CB","LB","CM","CDM","CM","CAM","ST","ST"] },
  "5-3-2": { key:"5-3-2", label: "5-3-2", slots: ["GK","RB","CB","CB","CB","LB","CM","CM","CM","ST","ST"] },
  "4-1-4-1": { key:"4-1-4-1", label: "4-1-4-1", slots: ["GK","RB","CB","CB","LB","CDM","RW","CM","CM","LW","ST"] },
};

// quali ruoli accettati in ogni slot
// Regole strette: ogni slot accetta SOLO il proprio ruolo.
// Eccezioni realistiche: terzini dx/sx intercambiabili (RB<->LB); mediano/mezzala (CDM<->CM).
const SLOT_ACCEPTS = {
  GK: ["GK"],
  RB: ["RB","LB"], LB: ["LB","RB"],
  CB: ["CB"],
  CDM: ["CDM","CM"], CM: ["CM","CDM"], CAM: ["CAM"],
  RW: ["RW"], LW: ["LW"],
  ST: ["ST"],
};

const DIFFICULTY = {
  easy:   { label: "Facile",  rerolls: 3, hideRatings: false },
  normal: { label: "Normale", rerolls: 0, hideRatings: false },
  hard:   { label: "Difficile", rerolls: 0, hideRatings: true },
};

const CLUBS = [...new Set(PLAYERS.map(p => p.c))].sort();
const SEASONS = [...new Set(PLAYERS.map(p => p.s))].sort();

// ---------------- UTIL ----------------
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rnd(arr.length)];

function eligibleFor(player, slotRole) {
  const accepts = SLOT_ACCEPTS[slotRole] || [slotRole];
  const roles = player.rg && player.rg.length ? player.rg : [player.r];
  return roles.some(r => accepts.includes(r)) || accepts.includes(player.r);
}

// ---------------- SIMULAZIONE RECORD ----------------
// Calcola un punteggio squadra 0-100 e proietta record 38 partite
function simulate(squad) {
  const filled = squad.filter(Boolean);
  if (filled.length === 0) return null;

  const avg = filled.reduce((s,p)=>s+p.rt,0) / filled.length;

  // Penalità di sicurezza: se manca il portiere (non dovrebbe mai capitare).
  const gk = filled.filter(p=>p.slot==="GK").length;
  const penalty = gk === 1 ? 0 : -8;

  // ---- CHIMICA "scegliibile": premia blocchi di stesso club e stessa stagione ----
  // Per ogni club, il blocco di n giocatori vale n*(n-1)/2 "legami" (più grande il blocco, più cresce).
  const clubCount = {}, seasonCount = {};
  filled.forEach(p => {
    clubCount[p.c] = (clubCount[p.c]||0)+1;
    seasonCount[p.s] = (seasonCount[p.s]||0)+1;
  });
  const links = (counts) => Object.values(counts)
    .reduce((s,n)=> s + (n>=2 ? n*(n-1)/2 : 0), 0);
  const clubLinks   = links(clubCount);     // max 55 (tutti stesso club)
  const seasonLinks = links(seasonCount);   // max 55 (tutti stessa stagione)

  // chimica club pesa di più (legame più forte) della stagione.
  // peso MEDIO: vale qualche punto e può spostare il tier, ma non è risolutiva.
  // blocco 2≈0.3, 4≈1.7, 6≈3.2, 8+≈4.5 (cap)
  const chemRaw = clubLinks * 0.14 + seasonLinks * 0.06;
  const chem = Math.min(4.5, chemRaw);

  // forza = media reale + chimica (niente più bonus bilanciamento fittizio)
  const strength = avg + penalty + chem;

  const t = Math.max(0, Math.min(1, (strength - 72) / 13));
  const winRate = Math.pow(t, 2.6);
  const wins = Math.round(38 * winRate);
  const remaining = 38 - wins;
  const drawShare = 0.32 + 0.13 * (1 - winRate);
  const draws = Math.round(remaining * drawShare);
  const losses = 38 - wins - draws;
  const points = wins*3 + draws;

  return {
    strength: Math.round(strength*10)/10,
    avg: Math.round(avg*10)/10,
    wins, draws, losses, points,
    chem: Math.round(chem*10)/10,
    tier: tierFor(points, wins),
  };
}

function tierFor(points, wins) {
  if (wins === 38) return { name: "38-0 LEGGENDARIO", color: "#ffd24a", emoji: "🏆" };
  if (points >= 100) return { name: "Stagione Storica", color: "#ffd24a", emoji: "👑" };
  if (points >= 86) return { name: "Campioni d'Italia", color: "#6ee7a8", emoji: "🥇" };
  if (points >= 72) return { name: "Champions League", color: "#7ec8ff", emoji: "⭐" };
  if (points >= 58) return { name: "Europa League", color: "#b6e36e", emoji: "✨" };
  if (points >= 45) return { name: "Metà Classifica", color: "#e0e0e0", emoji: "➖" };
  return { name: "Lotta Salvezza", color: "#ff8e8e", emoji: "⚠️" };
}

// tier basato sulla POSIZIONE in classifica (coerente con la tabella finale)
// posizioni Serie A: 1 scudetto · 2-4 Champions · 5-6 Europa · 7 Conference · 8-15 metà · 18-20 retrocessione
function tierForPosition(pos, wins) {
  if (wins === 38) return { name: "38-0 LEGGENDARIO", color: "#ffd24a", emoji: "🏆" };
  if (pos === 1)  return { name: "Campioni d'Italia", color: "#ffd24a", emoji: "🏆" };
  if (pos <= 4)   return { name: "Champions League", color: "#7ec8ff", emoji: "⭐" };
  if (pos <= 6)   return { name: "Europa League", color: "#b6e36e", emoji: "✨" };
  if (pos === 7)  return { name: "Conference League", color: "#a0e07e", emoji: "🌍" };
  if (pos <= 15)  return { name: "Metà Classifica", color: "#e0e0e0", emoji: "➖" };
  if (pos <= 17)  return { name: "Bassa Classifica", color: "#ffb38e", emoji: "🔻" };
  return { name: "Retrocessione", color: "#ff8e8e", emoji: "⚠️" };
}

// ---------------- SIMULAZIONE GIORNATA PER GIORNATA ----------------
// 38 partite con gol estratti da Poisson, calibrati sulla forza della squadra.
// Seed deterministico: lo stesso XI produce sempre lo stesso calendario.

// generatore pseudo-casuale deterministico (mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// estrae k da Poisson(lambda) con generatore rng
function poisson(lambda, rng) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= rng(); } while (p > L);
  return k - 1;
}

// Forza di ogni club in OGNI stagione = media top-11 rating di quella rosa.
// Se la rosa ha meno di 11 giocatori con dati, i mancanti contano come overall 69.
const CLUB_STRENGTH_BY_SEASON = (() => {
  const byCS = {};
  PLAYERS.forEach(p => { const k = p.c+"|"+p.s; (byCS[k] = byCS[k] || []).push(p); });
  const out = {};
  for (const [k, arr] of Object.entries(byCS)) {
    const top = arr.map(p=>p.rt).sort((a,b)=>b-a).slice(0,11);
    while (top.length < 11) top.push(69);           // riempi i buchi con 69
    out[k] = top.reduce((s,r)=>s+r,0)/11;
  }
  return out;
})();

const ALL_SEASONS = [...new Set(PLAYERS.map(p=>p.s))].sort();

// avversarie reali di una stagione: tutti i club dell'annata, poi tieni le 19 più forti
// (così con la tua squadra il campionato è sempre a 20). Toglie le più deboli se necessario.
function opponentsForSeason(season) {
  return Object.entries(CLUB_STRENGTH_BY_SEASON)
    .filter(([k]) => k.endsWith("|"+season))
    .map(([k, str]) => ({ club: k.split("|")[0], str, season }))
    .sort((a,b)=>b.str-a.str)
    .slice(0, 19);
}

// Calendario: ogni avversaria affrontata 2 volte (andata/ritorno), una casa una trasferta.
function buildFixtures(rng, opponents) {
  const order = [...opponents];
  for (let i=order.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); [order[i],order[j]]=[order[j],order[i]]; }
  const fixtures = [];
  const n = order.length;
  order.forEach((o, i) => fixtures.push({ ...o, home: i % 2 === 0, round: i+1 }));
  order.forEach((o, i) => fixtures.push({ ...o, home: i % 2 !== 0, round: i+1+n }));
  return fixtures;
}

// converte un rating-forza club (~70-86) in scala 0..1 usata dal motore gol
const strToT = (s) => Math.max(0, Math.min(1, (s - 72) / 13));

function simulateSeason(squad, baseSim) {
  const filled = squad.filter(Boolean);
  const strength = baseSim.strength;
  // forza relativa 0..1 (stesso mapping del record)
  const tStr = Math.max(0, Math.min(1, (strength - 72) / 13));
  // attacco/difesa attesi: la forza pesa molto (top team segna tanto e subisce pochissimo)
  const teamAtt = 0.8 + tStr * 2.6;      // gol fatti attesi (0.8 .. 3.4)
  const teamDef = 2.0 - tStr * 1.85;     // gol subiti attesi (2.0 .. 0.15)

  const seed = filled.reduce((s,p)=>s + p.pid*7 + p.rt, filled.length*1000);
  const rng = mulberry32(seed);

  // pesi marcatori: attaccanti molto probabili, poi ali/trequartisti, poi centrocampo, raramente difesa
  const scorerWeight = (p) => {
    if (["ST"].includes(p.slot)) return 10;
    if (["RW","LW","CAM"].includes(p.slot)) return 6;
    if (["CM","CDM"].includes(p.slot)) return 2.5;
    if (["RB","LB"].includes(p.slot)) return 1;
    if (p.slot === "CB") return 0.7;
    return 0; // GK
  };
  const pool = filled.filter(p=>scorerWeight(p)>0);
  const totW = pool.reduce((s,p)=>s+scorerWeight(p),0);
  const pickScorer = () => {
    let r = rng()*totW;
    for (const p of pool){ r -= scorerWeight(p); if (r<=0) return p.n; }
    return pool[0].n;
  };
  const minutes = (n) => {
    const arr = [];
    for (let i=0;i<n;i++) arr.push(1 + Math.floor(rng()*90));
    return arr.sort((a,b)=>a-b);
  };

  // STAGIONE pescata casualmente (deterministica dal seed): definisce le avversarie reali
  const seasonIdx = Math.floor(mulberry32(seed ^ 0x5bf03635)() * ALL_SEASONS.length);
  const playedSeason = ALL_SEASONS[seasonIdx];
  const opponents = opponentsForSeason(playedSeason);

  // calendario: avversarie reali della stagione, andata e ritorno
  const fixtures = buildFixtures(rng, opponents);
  const nGames = fixtures.length;

  let W=0,D=0,L=0,GF=0,GA=0;
  const matches = fixtures.map((f) => {
    const oppT = strToT(f.str);                 // forza avversario 0..1
    const homeAdv = f.home ? 1.10 : 0.93;
    const lamFor = Math.max(0.12, teamAtt * homeAdv * (1.15 - oppT*0.95));
    const lamAga = Math.max(0.06, (teamDef / homeAdv) * (0.45 + oppT*1.15));
    const gf = Math.min(8, poisson(lamFor, rng));
    const ga = Math.min(8, poisson(lamAga, rng));
    GF += gf; GA += ga;
    let res;
    if (gf > ga) { W++; res="W"; } else if (gf === ga) { D++; res="D"; } else { L++; res="L"; }
    const ourMin = minutes(gf);
    const scorers = ourMin.map(min => ({ name: pickScorer(), min }));
    const oppMin = minutes(ga);
    return { round: f.round, opp: f.club, home: f.home, gf, ga, res, scorers, oppMin };
  }).sort((a,b)=>a.round-b.round);

  const points = W*3 + D;

  // ---- CLASSIFICA: le avversarie reali della stagione + la tua squadra ----
  // punti attesi di un club dalla sua forza — stessa scala usata dalla squadra del giocatore
  const expectedPoints = (t) => Math.round(19 + t * 75 + Math.pow(t, 2) * 7);
  const myT = tStr;

  // posizione ATTESA: confronto i punti attesi mio vs avversarie (deterministico)
  const expectedTable = [
    { club: "LA TUA SQUADRA", t: myT, pts: expectedPoints(myT), me: true },
    ...opponents.map(o => ({ club: o.club, t: strToT(o.str), pts: expectedPoints(strToT(o.str)), me: false })),
  ].sort((a,b)=>b.pts-a.pts);
  const expectedPos = expectedTable.findIndex(r => r.me) + 1;

  // posizione REALE: i miei punti veri + punti simulati delle avversarie (con casualità)
  const rng2 = mulberry32(seed ^ 0x9e3779b9);
  const oppResults = opponents.map(o => {
    const t = strToT(o.str);
    const base = expectedPoints(t);
    const noise = Math.round((rng2()-0.5) * 22); // ±11 punti di varianza
    return { club: o.club, pts: Math.max(0, Math.min(114, base + noise)), me: false };
  });
  const realTable = [
    { club: "LA TUA SQUADRA", pts: points, gd: GF-GA, me: true },
    ...oppResults.map(o => ({ ...o, gd: 0 })),
  ].sort((a,b)=> b.pts-a.pts || b.gd-a.gd);
  const realPos = realTable.findIndex(r => r.me) + 1;

  return {
    matches, W, D, L, GF, GA,
    points,
    gd: GF - GA,
    season: playedSeason,
    nTeams: opponents.length + 1,
    tier: tierForPosition(realPos, W),
    expectedPos, realPos,
    expectedTable, realTable,
  };
}

// ================== CAMPO + POSIZIONI ==================
// layout posizioni per ogni formazione (x%, y%) — y dal basso (porta propria) all'alto
const POS = {
  "4-3-3": [[50,92],[82,72],[62,76],[38,76],[18,72],[50,55],[28,50],[72,50],[80,24],[50,16],[20,24]],
  "4-4-2": [[50,92],[82,72],[62,76],[38,76],[18,72],[80,46],[58,50],[42,50],[20,46],[60,18],[40,18]],
  "3-5-2": [[50,92],[66,78],[50,80],[34,78],[85,52],[64,52],[50,56],[36,52],[15,52],[60,20],[40,20]],
  "4-2-3-1": [[50,92],[82,72],[62,76],[38,76],[18,72],[62,56],[38,56],[50,38],[80,32],[20,32],[50,16]],
  "3-4-3": [[50,92],[68,76],[50,79],[32,76],[84,52],[60,54],[40,54],[16,52],[80,24],[50,18],[20,24]],
  "4-3-1-2": [[50,92],[82,72],[62,76],[38,76],[18,72],[30,52],[50,58],[70,52],[50,36],[62,18],[38,18]],
  "5-3-2": [[50,92],[88,68],[68,76],[50,79],[32,76],[12,68],[50,52],[30,50],[70,50],[60,20],[40,20]],
  "4-1-4-1": [[50,92],[82,72],[62,76],[38,76],[18,72],[50,60],[82,42],[60,44],[40,44],[18,42],[50,18]],
};

function Pitch({ formation, squad, activeIdx, highlightSlots = [], hideRatings }) {
  const layout = POS[formation.key] || POS["4-3-3"];
  return (
    <div style={{
      position:"relative", width:"100%", aspectRatio:"3/4", maxHeight:480, margin:"0 auto",
      background:`linear-gradient(${S.field},${S.fieldHi})`,
      borderRadius:14, border:`2px solid ${S.line}`, overflow:"hidden",
    }}>
      {/* righe campo */}
      <div style={pitchLines}/>
      <div style={{position:"absolute", top:"50%", left:0, right:0, height:2, background:"rgba(255,255,255,.15)"}}/>
      <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:90, height:90, border:"2px solid rgba(255,255,255,.15)", borderRadius:"50%"}}/>

      {formation.slots.map((role, i) => {
        const [x,y] = layout[i];
        const p = squad[i];
        const active = i === activeIdx;
        const hl = highlightSlots.includes(i);
        return (
          <div key={i} style={{position:"absolute", left:`${x}%`, top:`${y}%`,
            transform:"translate(-50%,-50%)", textAlign:"center", width:74}}>
            <div style={{
              width:50, height:50, margin:"0 auto", borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
              background: p ? S.cream : (hl ? "rgba(255,210,74,.25)" : "rgba(255,255,255,.08)"),
              border: (active||hl) ? `3px solid ${S.gold}` : `2px solid ${p?S.gold:"rgba(255,255,255,.25)"}`,
              boxShadow: (active||hl) ? `0 0 16px ${S.gold}` : "none",
              fontWeight:900, fontSize:p?13:11, color: p?S.ink:"rgba(255,255,255,.5)",
            }}>
              {p && !hideRatings ? p.rt : role}
            </div>
            {p && <div style={{fontSize:10, color:S.cream, fontWeight:700, marginTop:3,
              textShadow:"0 1px 2px #000", lineHeight:1.1}}>{p.n}</div>}
            {!p && <div style={{fontSize:9, color:"rgba(255,255,255,.4)", marginTop:3}}>{role}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ================== HEADER ==================
function Header({ small }) {
  return (
    <div style={{textAlign:"center", padding: small?"18px 0 14px":"34px 0 22px"}}>
      <div style={{display:"inline-flex", alignItems:"center", gap:10}}>
        <span style={{fontSize:small?26:38, fontWeight:900, color:S.gold,
          letterSpacing:2, fontFamily:"Georgia, serif"}}>38</span>
        <span style={{fontSize:small?26:38, fontWeight:900, color:S.cream}}>-</span>
        <span style={{fontSize:small?26:38, fontWeight:900, color:S.cream, letterSpacing:2,
          fontFamily:"Georgia, serif"}}>0</span>
      </div>
      <div style={{fontSize:small?10:13, color:S.cream, opacity:.6, letterSpacing:4,
        textTransform:"uppercase", marginTop:2}}>Serie A · Greatest XI</div>
    </div>
  );
}

// ================== SCHERMATA SETUP ==================
function Setup({ formationKey, setFormationKey, difficulty, setDifficulty, draftMode, setDraftMode, startGame }) {
  return (
    <div style={wrap}>
      <Header />
      <div style={{maxWidth:520, margin:"0 auto", padding:"0 20px"}}>
        <p style={{textAlign:"center", color:S.cream, opacity:.85, fontSize:15, lineHeight:1.5, marginBottom:28}}>
          Gira la ruota, pesca club e stagione, scegli un giocatore reale della Serie A.
          Costruisci il tuo XI e scopri se può chiudere una stagione perfetta: <b style={{color:S.gold}}>38 vittorie, 0 sconfitte.</b>
        </p>

        <Label>Formazione</Label>
        <div style={chipRow}>
          {Object.keys(FORMATIONS).map(k => (
            <button key={k} onClick={()=>setFormationKey(k)}
              style={chip(formationKey===k)}>{FORMATIONS[k].label}</button>
          ))}
        </div>

        <Label>Modalità di draft</Label>
        <div style={chipRow}>
          <button onClick={()=>setDraftMode("position")} style={chip(draftMode==="position")}>
            Position First
            <span style={{display:"block", fontSize:10, opacity:.7, fontWeight:400}}>slot fisso, poi giri</span>
          </button>
          <button onClick={()=>setDraftMode("squad")} style={chip(draftMode==="squad")}>
            Squad First
            <span style={{display:"block", fontSize:10, opacity:.7, fontWeight:400}}>giri, scegli, poi piazzi</span>
          </button>
        </div>

        <Label>Difficoltà</Label>
        <div style={chipRow}>
          {Object.keys(DIFFICULTY).map(k => (
            <button key={k} onClick={()=>setDifficulty(k)} style={chip(difficulty===k)}>
              {DIFFICULTY[k].label}
              <span style={{display:"block", fontSize:10, opacity:.7, fontWeight:400}}>
                {k==="easy"?"3 reroll":k==="normal"?"0 reroll":"rating nascosti"}
              </span>
            </button>
          ))}
        </div>

        <button onClick={startGame} style={bigBtn}>⚽ INIZIA IL DRAFT</button>
        <p style={{textAlign:"center", color:S.cream, opacity:.45, fontSize:12, marginTop:18}}>
          1680 giocatori · 31 club · 7 stagioni (2019-20 → 2025-26)
        </p>
      </div>
    </div>
  );
}

// medie per reparto (per l'infografica OVERALL)
function deptStats(squad) {
  const filled = squad.filter(Boolean);
  const avg = (arr) => arr.length ? Math.round(arr.reduce((s,p)=>s+p.rt,0)/arr.length) : null;
  const att = filled.filter(p=>["RW","LW","ST","CAM"].includes(p.slot));
  const mid = filled.filter(p=>["CM","CDM"].includes(p.slot));
  const def = filled.filter(p=>["RB","LB","CB"].includes(p.slot));
  const gk  = filled.filter(p=>p.slot==="GK");
  return {
    overall: avg(filled),
    att: avg(att), mid: avg(mid), def: avg(def), gk: avg(gk),
  };
}

function SquadStats({ squad, hidden }) {
  const st = deptStats(squad);
  const rows = [
    { k:"Attacco",     v:st.att, c:"#ff9e54", icon:"⚡" },
    { k:"Centrocampo", v:st.mid, c:"#6ee7a8", icon:"🎯" },
    { k:"Difesa",      v:st.def, c:"#7ec8ff", icon:"🛡️" },
    { k:"Portiere",    v:st.gk,  c:"#d6b3ff", icon:"🧤" },
  ];
  return (
    <div style={panel}>
      <div style={{color:S.cream, opacity:.6, fontSize:11, letterSpacing:2, textTransform:"uppercase"}}>Overall</div>
      <div style={{fontSize:40, fontWeight:900, color:S.cream, lineHeight:1}}>
        {hidden ? "—" : (st.overall ?? "—")}
      </div>
      <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:9}}>
        {rows.map(r => (
          <div key={r.k}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:S.cream, marginBottom:3}}>
              <span>{r.icon} {r.k}</span>
              <span style={{fontWeight:800}}>{hidden ? "—" : (r.v ?? "—")}</span>
            </div>
            <div style={{height:7, background:"rgba(255,255,255,.1)", borderRadius:4, overflow:"hidden"}}>
              <div style={{height:"100%", borderRadius:4,
                width: (hidden||r.v==null) ? "0%" : `${Math.max(0,Math.min(100,(r.v-60)/35*100))}%`,
                background:r.c, transition:"width .4s"}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ruota animata mostrata durante lo spin
function SpinningWheel() {
  const segs = 8;
  const colors = ["#0a3d2c","#0e5138","#127a52","#0e5138","#0a3d2c","#127a52","#0e5138","#0a3d2c"];
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"14px 0"}}>
      <div style={{position:"relative", width:120, height:120}}>
        <svg viewBox="0 0 100 100" style={{width:"100%", height:"100%",
          animation:"spin360 .5s linear infinite", filter:"drop-shadow(0 4px 12px rgba(0,0,0,.4))"}}>
          {Array.from({length:segs}).map((_,i)=>{
            const a0 = (i/segs)*2*Math.PI, a1=((i+1)/segs)*2*Math.PI;
            const x0=50+45*Math.cos(a0), y0=50+45*Math.sin(a0);
            const x1=50+45*Math.cos(a1), y1=50+45*Math.sin(a1);
            return <path key={i} d={`M50 50 L${x0} ${y0} A45 45 0 0 1 ${x1} ${y1} Z`}
              fill={colors[i]} stroke="#ffd24a" strokeWidth="0.5"/>;
          })}
          <circle cx="50" cy="50" r="10" fill="#ffd24a"/>
          <text x="50" y="54" textAnchor="middle" fontSize="10" fontWeight="900" fill="#06241a">⚽</text>
        </svg>
        {/* indicatore */}
        <div style={{position:"absolute", top:-4, left:"50%", transform:"translateX(-50%)",
          width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent",
          borderTop:`12px solid ${S.gold}`}}/>
      </div>
      <div style={{color:S.gold, fontWeight:700, fontSize:14, marginTop:10}}>Estrazione…</div>
      <style>{`@keyframes spin360{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ================== SCHERMATA DRAFT ==================
function Draft({ formation, squad, round, filledCount, spin, spinning, doSpin, reroll, rerolls,
                 choose, hideRatings, difficulty, draftMode, pendingPlayer, placeIn, cancelPending }) {
  const slotRole = formation.slots[round];           // usato solo in Position First
  const total = formation.slots.length;
  return (
    <div style={wrap}>
      <Header small />
      <div style={{maxWidth:920, margin:"0 auto", padding:"0 16px", display:"grid",
        gridTemplateColumns:"1fr", gap:18}}>

        <div style={{display:"grid", gridTemplateColumns:"minmax(0,1.6fr) minmax(0,1fr)", gap:14, alignItems:"start"}}>
          <Pitch formation={formation} squad={squad}
            activeIdx={draftMode==="position" ? round : -1}
            highlightSlots={pendingPlayer ? pendingPlayer.options.map(o=>o.i) : []}
            hideRatings={hideRatings} />
          <SquadStats squad={squad} hidden={hideRatings} />
        </div>

        <div style={panel}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
            <span style={{color:S.gold, fontWeight:800, letterSpacing:1}}>
              {filledCount}/{total} SCELTI
            </span>
            <span style={{color:S.cream, fontSize:13}}>
              {draftMode==="position"
                ? <>Slot: <b style={{color:S.gold}}>{slotRole}</b></>
                : <b style={{color:S.gold}}>Squad First</b>}
              {rerolls>0 && <span style={{marginLeft:12, opacity:.7}}>🎲 {rerolls}</span>}
            </span>
          </div>

          {/* Squad First: scelta slot per il giocatore pescato */}
          {pendingPlayer ? (
            <div>
              <div style={{textAlign:"center", marginBottom:12}}>
                <div style={{color:S.cream, opacity:.7, fontSize:13}}>Dove schieri</div>
                <div style={{color:S.gold, fontSize:20, fontWeight:900}}>
                  {pendingPlayer.player.n}
                  {!hideRatings && <span style={ratBadge}>{pendingPlayer.player.rt}</span>}
                </div>
                <div style={{color:S.cream, opacity:.6, fontSize:12}}>Scegli la posizione</div>
              </div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(90px,1fr))", gap:8}}>
                {pendingPlayer.options.map(({r,i}) => (
                  <button key={i} onClick={()=>placeIn(pendingPlayer.player, i)} style={cardBtn}>
                    <div style={{fontWeight:900, fontSize:15, color:S.ink, textAlign:"center"}}>{r}</div>
                  </button>
                ))}
              </div>
              <button onClick={cancelPending} style={rerollBtn}>← Scegli un altro giocatore</button>
            </div>
          ) : (
            <>
              {!spin && !spinning && (
                <button onClick={doSpin} style={spinBtn}>🎡 GIRA LA RUOTA</button>
              )}
              {spinning && <SpinningWheel />}

              {spin && (
                <div>
                  <div style={{textAlign:"center", marginBottom:14}}>
                    <div style={{color:S.cream, opacity:.7, fontSize:13}}>Hai pescato</div>
                    <div style={{color:S.gold, fontSize:22, fontWeight:900}}>
                      {spin.club} <span style={{opacity:.6, fontSize:15}}>· {spin.season}</span>
                    </div>
                    <div style={{color:S.cream, opacity:.6, fontSize:12}}>
                      {draftMode==="position"
                        ? `Scegli un giocatore per lo slot ${slotRole}`
                        : "Scegli un giocatore da inserire nel tuo XI"}
                    </div>
                  </div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:8}}>
                    {spin.candidates.map(p => (
                      <button key={p.id} onClick={()=>choose(p)} style={cardBtn}>
                        <div style={{fontWeight:700, fontSize:14, color:S.ink}}>{p.n}</div>
                        <div style={{fontSize:11, color:"#2c5f48", marginTop:2}}>
                          {draftMode==="squad" ? p.rg.join("/") : p.r}
                          {!hideRatings && <span style={ratBadge}>{p.rt}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                  {rerolls>0 && (
                    <button onClick={reroll} style={rerollBtn}>🎲 Rigira ({rerolls} rimasti)</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ================== SIMULAZIONE LIVE PARTITA PER PARTITA ==================
function SeasonLive({ squad, formation, onDone }) {
  const sim = useMemo(()=>simulate(squad), [squad]);
  const season = useMemo(()=>simulateSeason(squad, sim), [squad, sim]);
  const [shown, setShown] = useState(0);   // quante partite mostrate
  const listRef = useRef(null);

  // avanza automaticamente di una partita ogni ~700ms
  useEffect(() => {
    if (shown >= season.matches.length) return;
    const t = setTimeout(()=>setShown(s=>s+1), shown===0?400:700);
    return () => clearTimeout(t);
  }, [shown, season.matches.length]);

  // autoscroll all'ultima partita
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [shown]);

  const visible = season.matches.slice(0, shown);
  const W = visible.filter(m=>m.res==="W").length;
  const D = visible.filter(m=>m.res==="D").length;
  const L = visible.filter(m=>m.res==="L").length;
  const pts = W*3+D;
  const done = shown >= season.matches.length;

  const resColor = { W:"#6ee7a8", D:"#ffd24a", L:"#ff8e8e" };
  const resBg = { W:"rgba(110,231,168,.08)", D:"rgba(255,210,74,.06)", L:"rgba(255,142,142,.08)" };

  return (
    <div style={wrap}>
      <Header small />
      <div style={{maxWidth:620, margin:"0 auto", padding:"0 16px"}}>
        {/* contatore live */}
        <div style={{...panel, marginBottom:14, position:"sticky", top:8, zIndex:5}}>
          <div style={{textAlign:"center", color:S.cream, opacity:.6, fontSize:11, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6}}>
            Serie A {season.season}
          </div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <span style={{color:S.gold, fontWeight:900, letterSpacing:1, fontSize:14}}>
              GIORNATA {Math.min(shown, season.matches.length)}/{season.matches.length}
            </span>
            <span style={{color:S.cream, fontSize:14, fontWeight:700}}>
              <span style={{color:resColor.W}}>{W}V</span> · <span style={{color:resColor.D}}>{D}N</span> · <span style={{color:resColor.L}}>{L}P</span>
              <span style={{marginLeft:10, color:S.gold}}>{pts} pti</span>
            </span>
          </div>
          <div style={{height:6, background:"rgba(255,255,255,.1)", borderRadius:3, marginTop:8, overflow:"hidden"}}>
            <div style={{height:"100%", width:`${shown/season.matches.length*100}%`, background:S.gold, transition:"width .3s"}}/>
          </div>
        </div>

        {/* lista risultati */}
        <div ref={listRef} style={{maxHeight:"52vh", overflowY:"auto", display:"flex", flexDirection:"column", gap:8, paddingRight:4}}>
          {visible.map(m => (
            <div key={m.round} style={{
              padding:"10px 14px", borderRadius:10, background:resBg[m.res],
              border:`1px solid ${resColor[m.res]}33`, borderLeft:`4px solid ${resColor[m.res]}`,
              animation:"fadeIn .3s ease",
            }}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <span style={{
                    width:22, height:22, borderRadius:5, fontSize:12, fontWeight:900,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:resColor[m.res], color:S.ink,
                  }}>{m.res==="W"?"V":m.res==="D"?"N":"P"}</span>
                  <span style={{color:S.cream, fontWeight:700, fontSize:15}}>
                    {m.home ? "" : "✈️ "}{m.opp}
                  </span>
                </div>
                <span style={{color:resColor[m.res], fontWeight:900, fontSize:17}}>{m.gf}-{m.ga}</span>
              </div>
              {(m.scorers.length>0 || m.oppMin.length>0) && (
                <div style={{marginTop:5, fontSize:11, color:S.cream, opacity:.65, display:"flex", gap:14, flexWrap:"wrap"}}>
                  {m.scorers.length>0 && (
                    <span>⚽ {m.scorers.map(s=>`${s.name} ${s.min}'`).join("  ")}</span>
                  )}
                  {m.oppMin.length>0 && (
                    <span style={{opacity:.7}}>· {m.oppMin.map(mn=>`${mn}'`).join(" ")}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* controlli */}
        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16}}>
          {!done ? (
            <>
              <button onClick={()=>setShown(season.matches.length)} style={{...bigBtnSm, background:"transparent", border:`2px solid ${S.gold}`, color:S.gold}}>
                ⏭ Salta al risultato
              </button>
              <button onClick={()=>setShown(s=>Math.min(s+1, season.matches.length))} style={bigBtnSm}>
                ▶ Avanti
              </button>
            </>
          ) : (
            <button onClick={onDone} style={bigBtn}>🏆 VEDI IL RISULTATO FINALE</button>
          )}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ================== SCHERMATA RISULTATO ==================
// helper: rettangolo con angoli arrotondati su canvas (compatibilità ampia)
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y,   x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x,   y+h, r);
  ctx.arcTo(x,   y+h, x,   y,   r);
  ctx.arcTo(x,   y,   x+w, y,   r);
  ctx.closePath();
}

function Result({ squad, formation, onRestart }) {
  const sim = useMemo(()=>simulate(squad), [squad]);
  const season = useMemo(()=>simulateSeason(squad, sim), [squad, sim]);
  const [copied, setCopied] = useState(false);
  const [showSeason, setShowSeason] = useState(false);
  const [showStandings, setShowStandings] = useState(false);

  const ordinale = (n) => `${n}°`;
  const share = () => {
    const txt = `🏟️ Il mio Serie A 38-0 — stagione ${season.season} (${formation.label}):\n` +
      `🏆 ${ordinale(season.realPos)} posto — ${season.points} pti (${season.W}V ${season.D}N ${season.L}P)\n` +
      `⚽ ${season.GF}:${season.GA} · ${season.tier.emoji} ${season.tier.name}\n` +
      `(atteso: ${ordinale(season.expectedPos)})\n` +
      squad.filter(Boolean).map(p=>`${p.slot}: ${p.n}`).join("\n");
    navigator.clipboard?.writeText(txt);
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  // ---- CARD IMMAGINE 1080x1350 su canvas, scaricabile ----
  const [genState, setGenState] = useState("idle"); // idle | done
  const downloadCard = () => {
    const W = 1080, H = 1350;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    const filled = squad.filter(Boolean);
    const pos = POS[formation.key] || POS["4-3-3"];

    // sfondo
    const bg = ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0, "#06241a"); bg.addColorStop(1, "#04140e");
    ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

    // header
    ctx.textAlign = "center";
    ctx.fillStyle = S.gold;
    ctx.font = "900 64px Arial";
    ctx.fillText("SERIE A 38-0", W/2, 96);
    ctx.fillStyle = S.cream;
    ctx.font = "600 30px Arial";
    ctx.fillText(`Stagione ${season.season}  ·  ${formation.label}`, W/2, 142);

    // tier + posizione (banner)
    ctx.fillStyle = season.tier.color;
    ctx.font = "900 58px Arial";
    ctx.fillText(`${season.tier.emoji} ${season.tier.name.toUpperCase()}`, W/2, 220);
    ctx.fillStyle = S.cream;
    ctx.font = "700 38px Arial";
    ctx.fillText(`${ordinale(season.realPos)} posto  ·  ${season.points} punti`, W/2, 272);
    ctx.font = "500 28px Arial";
    ctx.fillStyle = "rgba(244,236,216,.6)";
    ctx.fillText(`${season.W}V  ${season.D}N  ${season.L}P   ·   ⚽${season.GF}:${season.GA}`, W/2, 314);

    // CAMPO
    const fx = 70, fy = 360, fw = W - 140, fh = 820;
    ctx.fillStyle = S.field;
    roundRect(ctx, fx, fy, fw, fh, 24); ctx.fill();
    // strisce campo
    ctx.fillStyle = S.fieldHi;
    for (let i=0;i<6;i+=2) ctx.fillRect(fx, fy + i*fh/6, fw, fh/6);
    // linee
    ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 3;
    ctx.strokeRect(fx+14, fy+14, fw-28, fh-28);
    ctx.beginPath(); ctx.moveTo(fx+14, fy+fh/2); ctx.lineTo(fx+fw-14, fy+fh/2); ctx.stroke();
    ctx.beginPath(); ctx.arc(fx+fw/2, fy+fh/2, 70, 0, 2*Math.PI); ctx.stroke();
    // aree
    ctx.strokeRect(fx+fw/2-110, fy+14, 220, 90);
    ctx.strokeRect(fx+fw/2-110, fy+fh-104, 220, 90);

    // giocatori (y POS è dal basso = porta nostra in basso)
    filled.forEach((p, i) => {
      const [px, py] = pos[i] || [50,50];
      const cx = fx + (px/100)*fw;
      const cy = fy + (py/100)*fh;
      // disco
      ctx.beginPath(); ctx.arc(cx, cy, 38, 0, 2*Math.PI);
      ctx.fillStyle = S.gold; ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,.3)"; ctx.lineWidth = 2; ctx.stroke();
      // ruolo
      ctx.fillStyle = S.ink; ctx.font = "900 22px Arial"; ctx.textAlign = "center";
      ctx.fillText(p.slot, cx, cy+7);
      // nome (riquadro scuro sotto)
      const name = p.n.length > 16 ? p.n.slice(0,15)+"…" : p.n;
      ctx.font = "700 22px Arial";
      const tw = ctx.measureText(name).width;
      ctx.fillStyle = "rgba(0,0,0,.6)";
      roundRect(ctx, cx - tw/2 - 10, cy+46, tw+20, 32, 8); ctx.fill();
      ctx.fillStyle = S.cream;
      ctx.fillText(name, cx, cy+68);
    });

    // footer
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(244,236,216,.45)";
    ctx.font = "500 26px Arial";
    ctx.fillText("universosportivo.com", W/2, H-40);

    cv.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `serie-a-38-0-${season.season}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setGenState("done"); setTimeout(()=>setGenState("idle"), 2000);
    }, "image/png");
  };

  return (
    <div style={wrap}>
      <Header small />
      <div style={{maxWidth:920, margin:"0 auto", padding:"0 16px"}}>
        <div style={{...panel, textAlign:"center", borderColor:season.tier.color}}>
          <div style={{fontSize:48}}>{season.tier.emoji}</div>
          <div style={{color:season.tier.color, fontSize:30, fontWeight:900, letterSpacing:1}}>{season.tier.name}</div>
          <div style={{color:S.cream, opacity:.55, fontSize:12, letterSpacing:1, marginTop:2}}>Serie A {season.season}</div>
          <div style={{display:"flex", justifyContent:"center", gap:24, margin:"16px 0", flexWrap:"wrap"}}>
            <Stat n={season.W} l="Vittorie" c="#6ee7a8" />
            <Stat n={season.D} l="Pareggi" c="#e0e0e0" />
            <Stat n={season.L} l="Sconfitte" c="#ff8e8e" />
            <Stat n={season.points} l="Punti" c={S.gold} />
          </div>
          <div style={{color:S.cream, opacity:.75, fontSize:14, marginBottom:4}}>
            ⚽ {season.GF} fatti · 🥅 {season.GA} subiti · DR {season.gd>=0?"+":""}{season.gd}
          </div>
          <div style={{color:S.cream, opacity:.6, fontSize:12}}>
            Media squadra <b>{sim.avg}</b> · Forza <b>{sim.strength}</b> · Chimica <b>+{sim.chem}</b>
          </div>
        </div>

        <PositionSummary season={season} />

        {!showSeason && (
          <Pitch formation={formation} squad={squad} activeIdx={-1} hideRatings={false} />
        )}

        {showSeason && <SeasonTable season={season} />}
        {showStandings && <StandingsTable season={season} />}

        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:16, flexWrap:"wrap"}}>
          <button onClick={()=>{setShowSeason(s=>!s); setShowStandings(false);}} style={bigBtnSm}>
            {showSeason ? "👥 Vedi la rosa" : "📅 Calendario"}
          </button>
          <button onClick={()=>{setShowStandings(s=>!s); setShowSeason(false);}} style={bigBtnSm}>
            {showStandings ? "👥 Vedi la rosa" : "📊 Classifica"}
          </button>
          <button onClick={share} style={bigBtnSm}>{copied?"✓ Copiato!":"📲 Condividi"}</button>
          <button onClick={downloadCard} style={{...bigBtnSm, background:S.gold, color:S.ink}}>
            {genState==="done" ? "✓ Scaricata!" : "🖼️ Scarica immagine"}
          </button>
          <button onClick={onRestart} style={{...bigBtnSm, background:"transparent", border:`2px solid ${S.gold}`, color:S.gold}}>↻ Rigioca</button>
        </div>
      </div>
    </div>
  );
}

// posizione attesa vs reale + commento sullo scarto
function PositionSummary({ season }) {
  const exp = season.expectedPos, real = season.realPos;
  const diff = exp - real; // positivo = ha reso SOPRA le attese
  let comment, ccolor;
  if (diff >= 3) { comment = "Hai reso ben oltre le attese! 🚀"; ccolor = "#6ee7a8"; }
  else if (diff >= 1) { comment = "Leggermente sopra le attese 👍"; ccolor = "#b6e36e"; }
  else if (diff === 0) { comment = "Esattamente come da pronostico 🎯"; ccolor = "#e0e0e0"; }
  else if (diff >= -2) { comment = "Un filo sotto le attese 😕"; ccolor = "#ffd24a"; }
  else { comment = "Stagione deludente rispetto ai valori 📉"; ccolor = "#ff8e8e"; }
  const ord = (n) => `${n}°`;
  return (
    <div style={{...panel, marginTop:14}}>
      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", textAlign:"center", flexWrap:"wrap", gap:12}}>
        <div>
          <div style={{color:S.cream, opacity:.55, fontSize:11, letterSpacing:1.5, textTransform:"uppercase"}}>Posizione attesa</div>
          <div style={{fontSize:34, fontWeight:900, color:S.cream, opacity:.85}}>{ord(exp)}</div>
          <div style={{color:S.cream, opacity:.45, fontSize:11}}>sulla carta</div>
        </div>
        <div style={{fontSize:24, color:S.cream, opacity:.4}}>→</div>
        <div>
          <div style={{color:S.cream, opacity:.55, fontSize:11, letterSpacing:1.5, textTransform:"uppercase"}}>Posizione reale</div>
          <div style={{fontSize:40, fontWeight:900, color:S.gold}}>{ord(real)}</div>
          <div style={{color:S.cream, opacity:.45, fontSize:11}}>sul campo</div>
        </div>
      </div>
      <div style={{textAlign:"center", marginTop:10, color:ccolor, fontWeight:700, fontSize:14}}>{comment}</div>
    </div>
  );
}

// classifica finale completa (20 squadre)
function StandingsTable({ season }) {
  return (
    <div style={panel}>
      <div style={{textAlign:"center", color:S.gold, fontWeight:900, letterSpacing:1, marginBottom:12}}>
        CLASSIFICA FINALE
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:3}}>
        {season.realTable.map((r, i) => {
          const pos = i+1;
          const zone = pos<=4 ? "#7ec8ff" : pos<=6 ? "#b6e36e" : pos>=18 ? "#ff8e8e" : "transparent";
          return (
            <div key={r.club} style={{
              display:"flex", alignItems:"center", gap:10, padding:"7px 10px", borderRadius:7,
              background: r.me ? "rgba(255,210,74,.15)" : "rgba(0,0,0,.18)",
              border: r.me ? `1px solid ${S.gold}` : "1px solid transparent",
            }}>
              <span style={{width:20, textAlign:"center", fontWeight:800, fontSize:13,
                color: r.me ? S.gold : S.cream, borderLeft:`3px solid ${zone}`, paddingLeft:6}}>{pos}</span>
              <span style={{flex:1, color: r.me ? S.gold : S.cream, fontWeight: r.me?900:600, fontSize:14}}>
                {r.club}
              </span>
              <span style={{color: r.me ? S.gold : S.cream, opacity:r.me?1:.7, fontWeight:900, fontSize:14}}>{r.pts}</span>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex", justifyContent:"center", gap:14, marginTop:10, fontSize:11, color:S.cream, opacity:.6, flexWrap:"wrap"}}>
        <span><b style={{color:"#7ec8ff"}}>■</b> Champions</span>
        <span><b style={{color:"#b6e36e"}}>■</b> Europa</span>
        <span><b style={{color:"#ff8e8e"}}>■</b> Retrocessione</span>
      </div>
    </div>
  );
}

// tabellone 38 giornate
function SeasonTable({ season }) {
  const resColor = { W:"#6ee7a8", D:"#e0e0e0", L:"#ff8e8e" };
  const resLabel = { W:"V", D:"N", L:"P" };
  return (
    <div style={panel}>
      <div style={{textAlign:"center", color:S.gold, fontWeight:900, letterSpacing:1, marginBottom:12}}>
        CALENDARIO · SERIE A {season.season} · {season.matches.length} GIORNATE
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:6}}>
        {season.matches.map(m => (
          <div key={m.round} style={{
            display:"flex", alignItems:"center", gap:8, padding:"7px 9px",
            background:"rgba(0,0,0,.22)", borderRadius:8,
            borderLeft:`4px solid ${resColor[m.res]}`,
          }}>
            <span style={{color:S.cream, opacity:.45, fontSize:11, width:22, flexShrink:0}}>{m.round}ª</span>
            <span style={{fontSize:13, flexShrink:0}}>{m.home ? "🏠" : "✈️"}</span>
            <span style={{color:S.cream, fontSize:12, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
              {m.opp}
            </span>
            <span style={{color:resColor[m.res], fontWeight:900, fontSize:13, flexShrink:0}}>
              {m.gf}-{m.ga}
            </span>
          </div>
        ))}
      </div>
      <div style={{display:"flex", justifyContent:"center", gap:16, marginTop:12, fontSize:12, color:S.cream, opacity:.7}}>
        <span>🏠 casa</span><span>✈️ trasferta</span>
        <span><b style={{color:"#6ee7a8"}}>V</b>ittoria</span>
        <span><b style={{color:"#e0e0e0"}}>N</b> pari</span>
        <span><b style={{color:"#ff8e8e"}}>P</b>ersa</span>
      </div>
    </div>
  );
}

function Stat({n,l,c}) {
  return <div><div style={{fontSize:32, fontWeight:900, color:c}}>{n}</div>
    <div style={{fontSize:11, color:S.cream, opacity:.6, textTransform:"uppercase"}}>{l}</div></div>;
}


// ================== COMPONENTE PRINCIPALE ==================
export default function App() {
  const [phase, setPhase] = useState("setup"); // setup | draft | result
  const [formationKey, setFormationKey] = useState("4-3-3");
  const [difficulty, setDifficulty] = useState("normal");
  const [draftMode, setDraftMode] = useState("position"); // position | squad

  const formation = FORMATIONS[formationKey];
  const [squad, setSquad] = useState([]);        // array allineato a slots
  const [round, setRound] = useState(0);         // n. slot riempiti (Position First = indice slot)
  const [rerolls, setRerolls] = useState(0);
  const [spin, setSpin] = useState(null);        // {club, season, candidates}
  const [spinning, setSpinning] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set());
  const [pendingPlayer, setPendingPlayer] = useState(null); // Squad First: giocatore in attesa di slot

  // slot liberi (indici)
  const openSlots = useCallback((sq) =>
    formation.slots.map((r,i)=>({r,i})).filter(({i}) => !sq[i]),
    [formation]);

  // avvia partita
  const startGame = useCallback(() => {
    setSquad(new Array(formation.slots.length).fill(null));
    setRound(0);
    setRerolls(DIFFICULTY[difficulty].rerolls);
    setUsedIds(new Set());
    setSpin(null);
    setPendingPlayer(null);
    setPhase("draft");
  }, [formation, difficulty]);

  // ---- POSITION FIRST: spin con candidati validi per lo slot corrente ----
  const doSpinPosition = useCallback(() => {
    if (round >= formation.slots.length) return;
    const slotRole = formation.slots[round];
    setSpinning(true);
    let attempt = 0, found = null;
    while (attempt < 200 && !found) {
      const club = pick(CLUBS), season = pick(SEASONS);
      const pool = PLAYERS.filter(p => p.c===club && p.s===season &&
        !usedIds.has(p.pid) && eligibleFor(p, slotRole));
      if (pool.length > 0) found = { club, season, candidates: pool.sort((a,b)=>b.rt-a.rt).slice(0,6) };
      attempt++;
    }
    if (!found) {
      const pool = PLAYERS.filter(p => !usedIds.has(p.pid) && eligibleFor(p, slotRole));
      if (pool.length) {
        const p0 = pick(pool);
        const cand = PLAYERS.filter(p => p.c===p0.c && p.s===p0.s && !usedIds.has(p.pid) && eligibleFor(p,slotRole));
        found = { club: p0.c, season: p0.s, candidates: cand.sort((a,b)=>b.rt-a.rt).slice(0,6) };
      }
    }
    setTimeout(()=>{ setSpin(found); setSpinning(false); }, 1100);
  }, [round, formation, usedIds]);

  // ---- SQUAD FIRST: spin club+stagione, candidati = chi entra in QUALSIASI slot libero ----
  const doSpinSquad = useCallback(() => {
    const slots = formation.slots;
    const open = slots.map((r,i)=>({r,i})).filter(({i}) => !squad[i]);
    if (open.length === 0) return;
    const openRoles = [...new Set(open.map(o=>o.r))];
    const fitsAny = (p) => openRoles.some(role => eligibleFor(p, role));
    setSpinning(true);
    let attempt = 0, found = null;
    while (attempt < 200 && !found) {
      const club = pick(CLUBS), season = pick(SEASONS);
      const pool = PLAYERS.filter(p => p.c===club && p.s===season &&
        !usedIds.has(p.pid) && fitsAny(p));
      if (pool.length > 0) found = { club, season, candidates: pool.sort((a,b)=>b.rt-a.rt).slice(0,8) };
      attempt++;
    }
    if (!found) {
      const pool = PLAYERS.filter(p => !usedIds.has(p.pid) && fitsAny(p));
      if (pool.length) {
        const p0 = pick(pool);
        const cand = PLAYERS.filter(p => p.c===p0.c && p.s===p0.s && !usedIds.has(p.pid) && fitsAny(p));
        found = { club: p0.c, season: p0.s, candidates: cand.sort((a,b)=>b.rt-a.rt).slice(0,8) };
      }
    }
    setTimeout(()=>{ setSpin(found); setSpinning(false); }, 1100);
  }, [formation, squad, usedIds]);

  const doSpin = draftMode === "squad" ? doSpinSquad : doSpinPosition;

  const reroll = useCallback(() => {
    if (rerolls <= 0) return;
    setRerolls(r => r-1);
    setSpin(null);
    setPendingPlayer(null);
    setTimeout(doSpin, 50);
  }, [rerolls, doSpin]);

  // helper: piazza un giocatore in uno slot specifico
  const placeIn = useCallback((player, slotIdx) => {
    const slotRole = formation.slots[slotIdx];
    setSquad(prev => {
      const next = [...prev];
      next[slotIdx] = { ...player, slot: slotRole };
      const filled = next.filter(Boolean).length;
      if (filled >= formation.slots.length) setTimeout(()=>setPhase("season"), 300);
      return next;
    });
    setUsedIds(prev => new Set(prev).add(player.pid));
    setSpin(null);
    setPendingPlayer(null);
    setRound(r => r+1);
  }, [formation]);

  // POSITION FIRST: scelto il giocatore -> va nello slot del round
  // SQUAD FIRST: scelto il giocatore -> se entra in 1 solo slot libero piazza, altrimenti chiede lo slot
  const choose = useCallback((player) => {
    if (draftMode === "position") {
      placeIn(player, round);
      return;
    }
    // squad first
    const open = formation.slots.map((r,i)=>({r,i})).filter(({i}) => !squad[i]);
    const fitting = open.filter(({r}) => eligibleFor(player, r));
    if (fitting.length === 1) {
      placeIn(player, fitting[0].i);
    } else {
      setPendingPlayer({ player, options: fitting });
    }
  }, [draftMode, round, formation, squad, placeIn]);

  const hideRatings = DIFFICULTY[difficulty].hideRatings;
  const filledCount = squad.filter(Boolean).length;

  // ============ RENDER ============
  if (phase === "setup") return <Setup {...{formationKey,setFormationKey,difficulty,setDifficulty,draftMode,setDraftMode,startGame}} />;
  if (phase === "season") return <SeasonLive {...{squad, formation, onDone:()=>setPhase("result")}} />;
  if (phase === "result") return <Result {...{squad, formation, onRestart:()=>setPhase("setup")}} />;

  return (
    <Draft {...{formation, squad, round, filledCount, spin, spinning, doSpin, reroll, rerolls,
      choose, hideRatings, difficulty, draftMode, pendingPlayer, placeIn,
      cancelPending:()=>setPendingPlayer(null)}} />
  );
}

