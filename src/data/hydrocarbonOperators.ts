export type HydrocarbonActivity = "IMPORTATION" | "STOCKAGE" | "DISTRIBUTION" | "TRANSPORT"

export interface HydrocarbonOperator {
  activity: HydrocarbonActivity
  name: string
  address: string
}

export const hydrocarbonOperators: HydrocarbonOperator[] = [
  {
    "activity": "IMPORTATION",
    "name": "TotalEnergies Marketing Sénégal",
    "address": "Km 3, Bd du Centenaire de la Cme de Dkr"
  },
  {
    "activity": "IMPORTATION",
    "name": "VIVO ENERGY SENEGAL SA",
    "address": "Routes des Hydrocarbures-Quartier Bel Air"
  },
  {
    "activity": "IMPORTATION",
    "name": "ORYX SENEGAL",
    "address": "12 Bd Djily MBAYE, Immeuble Fondation Fahd"
  },
  {
    "activity": "IMPORTATION",
    "name": "API (ALANAU PETROLEUM INTERNATIONAL)",
    "address": "Sacré Cœur 3, Pyrothecnie lot B"
  },
  {
    "activity": "IMPORTATION",
    "name": "TOUBA OIL (GPL)",
    "address": "Km 10 Bd du Centenaire de la Cme de Dkr"
  },
  {
    "activity": "IMPORTATION",
    "name": "PUMA ENERGY SENEGAL (GPL)",
    "address": "Km 18 Route de Rufisque"
  },
  {
    "activity": "IMPORTATION",
    "name": "OLA ENERGY SENEGAL",
    "address": "Km 7,5 Boulevard du Centenaire"
  },
  {
    "activity": "IMPORTATION",
    "name": "SERIGNE GUEYE ET FILS",
    "address": "Touba Mosquée près du Marché Ocas"
  },
  {
    "activity": "IMPORTATION",
    "name": "SAR (Société Africaine de Raffinage)",
    "address": "15 Boulevard de la République"
  },
  {
    "activity": "IMPORTATION",
    "name": "ITOC",
    "address": "Place de l’Independance"
  },
  {
    "activity": "IMPORTATION",
    "name": "ELTON",
    "address": "Rond point Stèle Mermoz"
  },
  {
    "activity": "IMPORTATION",
    "name": "LOBBOU MAME DIARRA BOUSSO SA (LPG)",
    "address": "Km 18, route de Rufisque"
  },
  {
    "activity": "IMPORTATION",
    "name": "ETABLISSEMENT DEMBA KA SARL(EDK)",
    "address": "29, cité Télécom Ouest foire"
  },
  {
    "activity": "IMPORTATION",
    "name": "NEPTURNE Oil Sénégal SA",
    "address": "Ngor, route de l’aéroport"
  },
  {
    "activity": "IMPORTATION",
    "name": "W.M.S. OIL SA",
    "address": "20, boulevard de la répubique"
  },
  {
    "activity": "IMPORTATION",
    "name": "PUMA ENERGY SENEGAL (Liquide)",
    "address": "Km 18 Route de Rufisque"
  },
  {
    "activity": "IMPORTATION",
    "name": "MKA EXELLENCE",
    "address": "Rue Mangin X Blaise Diagne"
  },
  {
    "activity": "IMPORTATION",
    "name": "PETROSERVICES",
    "address": "Lotissement les Baobab"
  },
  {
    "activity": "IMPORTATION",
    "name": "EYDON SA",
    "address": "13, rue Dr Calmette"
  },
  {
    "activity": "IMPORTATION",
    "name": "STAR OIL",
    "address": "Ouest Foire, Cité Air Afrique"
  },
  {
    "activity": "IMPORTATION",
    "name": "SOS PETROLE",
    "address": "Sicap Liberte 1, villa 1031"
  },
  {
    "activity": "IMPORTATION",
    "name": "I.B.K OIL SARL",
    "address": "9, Av. Fedherbe Dakar Plateau"
  },
  {
    "activity": "IMPORTATION",
    "name": "LOBBOU MAME DIARRA BOUSSO SA (PPL)",
    "address": "Km 18, route de Rufisque"
  },
  {
    "activity": "IMPORTATION",
    "name": "SEDES SAU",
    "address": "Sacré Cœur 3, VDN"
  },
  {
    "activity": "IMPORTATION",
    "name": "MAACK PETROLEUM COMPANY SAS",
    "address": "97 HLM Mariste"
  },
  {
    "activity": "IMPORTATION",
    "name": "MOCOH",
    "address": "Dakar Plateau"
  },
  {
    "activity": "IMPORTATION",
    "name": "PETROSEN TRADING ET SERVICES",
    "address": "Dakar Fann Hock"
  },
  {
    "activity": "IMPORTATION",
    "name": "JAH OIL",
    "address": "Rue Dial Diop, X Blaise DIAGNE"
  },
  {
    "activity": "IMPORTATION",
    "name": "PETRODISS",
    "address": "78, Maristes DAKAR"
  },
  {
    "activity": "IMPORTATION",
    "name": "SAVANNAH",
    "address": "Cité des Magistrats, Ouakam"
  },
  {
    "activity": "IMPORTATION",
    "name": "GHAYA OIL AND GAS",
    "address": "12, Boulevard Djily MBAYE"
  },
  {
    "activity": "IMPORTATION",
    "name": "GYL OIL SA",
    "address": "Route des Almadies, rue Ngor 84"
  },
  {
    "activity": "IMPORTATION",
    "name": "ASHARAMI",
    "address": "Résidence Sea Side, Corniche"
  },
  {
    "activity": "IMPORTATION",
    "name": "PEGASUS",
    "address": "5, Av Georges Pompidou"
  },
  {
    "activity": "IMPORTATION",
    "name": "SAP",
    "address": "Dakar"
  },
  {
    "activity": "IMPORTATION",
    "name": "AFRICAN BUSINESS CONSORTIUM",
    "address": "Route de Ngor"
  },
  {
    "activity": "IMPORTATION",
    "name": "TANOU PETROLEUM CORPORATION",
    "address": "Scat Urbam, Grand Yoff"
  },
  {
    "activity": "IMPORTATION",
    "name": "FAYENNE SERVICES SARL",
    "address": "Cité mixta, ilot 27"
  },
  {
    "activity": "IMPORTATION",
    "name": "DER MOND OIL AND GAS AFRICA SA",
    "address": "Almadies, lot 22"
  },
  {
    "activity": "IMPORTATION",
    "name": "CORPORATION SIRIUS ENERGY",
    "address": "Sicap Fann Hock"
  },
  {
    "activity": "IMPORTATION",
    "name": "COMPAGNIE DES PETROLES DU SUD",
    "address": "Route de l’aéroport yoff"
  },
  {
    "activity": "IMPORTATION",
    "name": "BILAL OIL SARL",
    "address": "Sicap sacré cœur 3"
  },
  {
    "activity": "IMPORTATION",
    "name": "MAODO SAR",
    "address": "Parcelles Assainies, unité 5"
  },
  {
    "activity": "IMPORTATION",
    "name": "PUMA ENERGY STORAGE SENEGAL",
    "address": "Km 18, route de Rufisque"
  },
  {
    "activity": "IMPORTATION",
    "name": "ZENITH ENERGIE SA",
    "address": "Face Mbao, LGI Mbao"
  },
  {
    "activity": "IMPORTATION",
    "name": "KELIMANE ENTREPRISE SARL",
    "address": "Kaffrine Nganda"
  },
  {
    "activity": "IMPORTATION",
    "name": "ODYSSEE ENERGIE SAU",
    "address": "10, Sud Foire"
  },
  {
    "activity": "IMPORTATION",
    "name": "TotalEnergies (GPL)",
    "address": "Route de l’aéroport, station Total Ngor"
  },
  {
    "activity": "IMPORTATION",
    "name": "Direction Universal General Trading",
    "address": "Plateau Rue Mouhamed V"
  },
  {
    "activity": "STOCKAGE",
    "name": "VIVO ENERGY SENEGAL",
    "address": "Routes des Hydrocarbures-Quartier Bel Air"
  },
  {
    "activity": "STOCKAGE",
    "name": "TOTALEnergies Marketing Sénégal",
    "address": "Rte de l’aéroport,Station Ngor"
  },
  {
    "activity": "STOCKAGE",
    "name": "ORYX SENEGAL",
    "address": "12 Bd Djily MBAYE, Immeuble Fondation Fahd"
  },
  {
    "activity": "STOCKAGE",
    "name": "TOUBA OIL (GPL)",
    "address": "Km 10 Boulevard du Centenaire"
  },
  {
    "activity": "STOCKAGE",
    "name": "OLA ENERGY",
    "address": "Km 7,5 Boulevard du Centenaire"
  },
  {
    "activity": "STOCKAGE",
    "name": "SENSTOCK S.A.",
    "address": "Km 18 Boulevard du Centenaire"
  },
  {
    "activity": "STOCKAGE",
    "name": "PUMA ENERGY SENEGAL (GPL)",
    "address": "Km 18 Route de Rufisque"
  },
  {
    "activity": "STOCKAGE",
    "name": "LOBBOU MAME DIARRA BOUSSO (GPL)",
    "address": "Km 18, route de rufisque"
  },
  {
    "activity": "STOCKAGE",
    "name": "SEDES SAU",
    "address": "Sacré Cœur 3, VDN"
  },
  {
    "activity": "STOCKAGE",
    "name": "SAR (Société Africaine de Raffinage)",
    "address": "Mbao, Dakar"
  },
  {
    "activity": "STOCKAGE",
    "name": "SEN TERMINAL PETROLIER",
    "address": "VDN Pyrotechnie, Immeuble la Maison de l’Assurance"
  },
  {
    "activity": "STOCKAGE",
    "name": "TERANGAZ SA",
    "address": "Place de l’Indépendance, Dakar"
  },
  {
    "activity": "STOCKAGE",
    "name": "PETROSEN TRADING & SERVICES SA",
    "address": "104, SOTRAC Mermoz"
  },
  {
    "activity": "STOCKAGE",
    "name": "PETROVI SA",
    "address": "25, Yoff Hangar des pelerins"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "VIVO ENERGY SENEGAL SA",
    "address": "Quartier Bel Air, BP: 144"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ELTON OIL COMPANY",
    "address": "8, Avenue Léopold Sédar Senghor"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "TOTALEnergies Marketing Sénégal SA",
    "address": "Route de l’aéroport, station Total Ngor"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Ola Energy Senegal SA",
    "address": "Km 7,5 Boulevard du Centenaire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ORYX SENEGAL",
    "address": "12 Bd Djily MBAYE, Immeuble Fondation Fahd"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SERIGNE GUEYE ET FILS",
    "address": "Touba Mosquée près du Marché Ocas"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "API (ALANAU PETROLEUM INTERNATIONAL)",
    "address": "Sacré Cœur 3, lot B"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "STAR OIL",
    "address": "Ouest Foire, Cité Air Afrique"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PETRODIS OIL",
    "address": "96, Scat Urbam Marist"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SAHEL DISTRIBUTION SARL",
    "address": "Zone A Villa n°25 Dakar Fann"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PETROSERVICES SARL",
    "address": "Lotissement les Baobab"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Petrosen Trading et Services",
    "address": "Dakar Plateau"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "CIEL OIL",
    "address": "Km 4,5 route de rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "CLEAN OIL",
    "address": "Guédiawaye, face stade Amadou BARRY"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ETABLISSEMENTS DEMBA KA",
    "address": "29, cité Télécom Ouest foire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "HOLDING GUEYE",
    "address": "Km 9,5 route de rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "CO & CO INTERNATIONAL INVESTMENT SARL",
    "address": "Keur Massar"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "NEPTUNE OIL SA",
    "address": "Ngor-Route de l’Aéroport"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SDPP SURL",
    "address": "Quartier Ndorong Touba Kaolack"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ETS MOMAR LISSA NDIAYE",
    "address": "Villa n°19 Nord Foire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "EYDON PETROLEUM",
    "address": "13, rue du Dr CALMETTE"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "MKA EXELLENCE",
    "address": "Av. Cheikh A Bamba X rue 9 Bopp"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "TOUBA OIL",
    "address": "Km 10, Bd du Centenaire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "THOME OIL",
    "address": "Km 9, route de Rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Maack Pétroleum Company SA",
    "address": "Hann mariste 2, Immeuble T9"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PETROFLAMME SENEGAL SARL",
    "address": "Hann Maristes, lot n°39"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SAP SUARL",
    "address": "Yoff APECSY 1, n°212"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "S.O.S Pétroles SA",
    "address": "Sicap Liberté 1, villa 1031"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "LOBBOU M.D.BOUSSO",
    "address": "Km 18, route de rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ARAFAT BUSINESS COMPAGNIE",
    "address": "Kaolack, Quartier Sing Sing"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BILAL OIL",
    "address": "Sicap Sacré 3, Immeuble 23/B"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "DIAPANDAL OIL SARL",
    "address": "Parcelles Assainies, Unité 11"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Zenith Energie SA",
    "address": "Km 25, Route de Rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PERSOIL SA",
    "address": "Km 2,5 Blvrd du Centenaire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "W.M.S. OIL SA",
    "address": "VDN, Immeuble Graphi Plus"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BUSINESS SOLUTION SARL",
    "address": "OUEST Foire, villa n°21"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "OZMOZ SUARL",
    "address": "Route de l’aéroport lot n°8"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "OMEGA PETROLEUM",
    "address": "Ngor Almadie 417/c"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PUMA ENERGY SENEGAL SA",
    "address": "km 18, route de Rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ATLANTIC PETROLEUM AFRICA",
    "address": "Sicap Amitié 3 villa 4577"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "S.C.T.C SUARL",
    "address": "Pékesse, Tivaoune"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BAOL DISTRIBUTION OIL",
    "address": "Quartier Léona Bambey"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "KELIMANE ENTREPRISE",
    "address": "Nganda Kelimane"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Compagnie des Petrole du Sud",
    "address": "Liberté 6, n°6625"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "Global Oil SARL",
    "address": "N°577, quartier Grand Thiès"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "JAH OIL",
    "address": "Sacré coeur 1, villa n°8458"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PLUS OIL",
    "address": "Guediawaye, cité SHS"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SOGEP",
    "address": "Hann Mariste 2, immeuble R-118"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SENEINDIA",
    "address": "Route de Sebi Ponty Diamniadio"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GO GROUP",
    "address": "Sacré Cœur Pyrothenie"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "DG OIL SARL",
    "address": "Keur Ndiaye LO, Darou Salam"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "EMS Petroleum SA",
    "address": "Route de l’aéroport, Dakar"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "TAPS SUARL",
    "address": "Medina Fass Mbao"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GYL OIL SA",
    "address": "65 D, Hann Mariste"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "MOCOH SENEGAL SA",
    "address": "Allées Seydou Nourou TALL"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SEDES SAU",
    "address": "Sacré coeur 3 VDN"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "VELOX ENERGIES SAU",
    "address": "Comico VDN, n°25"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SAM OIL",
    "address": "Quartier Tawfekh Mbacké"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "IBK OIL",
    "address": "9, Av. Fedherbe Dakar Plateau"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "AMIN OIL",
    "address": "Point E, Dioubel rue 1"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ACD Ditribution",
    "address": "Liberté 6 Extension n°268"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "LLUMA",
    "address": "Sicap Sacré Cœur 1"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "CISSOIL",
    "address": "Point E, rue 5"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GUEDE OIL",
    "address": "Mbacké Baol"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SIRIUS ENERGY SUARL",
    "address": "Fann Résidence"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "FS OIL",
    "address": "Colobane 42X43"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "FALL & SENE OIL SARL",
    "address": "Dakar Hann Mariste"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "MARJAN OIL",
    "address": "Patte d’Oie, cité Impots"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "MASTER OIL",
    "address": "Touba Mosquée"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "DABAKH OIL SUARL",
    "address": "Cité Babacar Sy, Zac Mbao"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "WIN OIL",
    "address": "Cité Tacko, n°94 Rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GM OIL",
    "address": "Cité Mame Ciré 2 Zac Mbao"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BABOU OIL SARL",
    "address": "Keur Massar, unité 24"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SPEED ENERGY SARL",
    "address": "Avenue Caen, Thiès"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "KLEROS COMPANY SA",
    "address": "Liberté VI Extension"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ODYSSE ENERGIE SAU",
    "address": "10 Sud Foire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SENEGA-PETROLE",
    "address": "Mariste, Dakar"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BI OIL & ENERGY",
    "address": "Mermoz Pyrotechnie"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "SPL",
    "address": "Almadies, Zone 7"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "BUNKER PETROLEUM",
    "address": "Mamelles Renaissance"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "INNOVA OIL SARL",
    "address": "Point E, villa 208"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GENERAL SERVICES PETROLEUM",
    "address": "VDN, 146, Ouest Foire"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "GB OIL",
    "address": "Cité DJILY MBAYE"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "PUMA ENERGY STORAGE",
    "address": "Km 18, route de rufisque"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "ENTREPRISE KA & FRERES",
    "address": "Pikine Dakar"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "AD PETROLIEUM SARL",
    "address": "40, rue Galandou DIOUF"
  },
  {
    "activity": "DISTRIBUTION",
    "name": "DELTA OIL SUARL",
    "address": "Cité Fadia, Guediawaye"
  },
  {
    "activity": "TRANSPORT",
    "name": "SERIGNE NIANG dit ENTRACOM",
    "address": "Km 10, Boulevard du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORTS IBRAHIMA SAKHO S.A.",
    "address": "HLM Angle Mousse n°3016"
  },
  {
    "activity": "TRANSPORT",
    "name": "DANIEL HADDAD ET FILS",
    "address": "Rue 2, Km 3 du Bd. du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "SUNU KEUR SARL.",
    "address": "HLM Maristes M 10"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORTS DIEYE SARL",
    "address": "77, rue 21, cité Malick SY THIES"
  },
  {
    "activity": "TRANSPORT",
    "name": "GIE KEUR KHADIM",
    "address": "Zone Industrielle de Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSGAYE Sarl",
    "address": "Km 22, route de Rufisque"
  },
  {
    "activity": "TRANSPORT",
    "name": "Les Transports Ousmane DIAGNE",
    "address": "Km 4,5 Bd du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "KHOURY Transport SA",
    "address": "Km 3,5 Bd du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "Etablissement Galaye NDIAYE",
    "address": "Rue 7 prolongée zone industrielle"
  },
  {
    "activity": "TRANSPORT",
    "name": "SO.TRA.DHY",
    "address": "Hann Voile d’Or"
  },
  {
    "activity": "TRANSPORT",
    "name": "Groupe Fauzie LAYOUSSE SA",
    "address": "Km 23 Route de Rufisque"
  },
  {
    "activity": "TRANSPORT",
    "name": "Transport SADY LOGISTIC SARL",
    "address": "44, rue Lamy x Tolbiac"
  },
  {
    "activity": "TRANSPORT",
    "name": "Transport Cheikh Diaw sarl",
    "address": "Kaolack quartier Ndonrong"
  },
  {
    "activity": "TRANSPORT",
    "name": "AHMED DJOUMA GAZAL & FILS",
    "address": "Km 9 Boulevard du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "S.S.T.T.",
    "address": "Villa n°2589 HLM"
  },
  {
    "activity": "TRANSPORT",
    "name": "Transports Kab GUEYE",
    "address": "Rue Mangin X Blaise Diagne"
  },
  {
    "activity": "TRANSPORT",
    "name": "GEORGES THOMES",
    "address": "Km 9 Bd de la Commune"
  },
  {
    "activity": "TRANSPORT",
    "name": "Germano-Sénégalaise",
    "address": "Quartier Grand Standing"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANS INTER SARL",
    "address": "Dougar, route de Yenn"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANS-OIL SARL",
    "address": "Pikine Tally Bou Mack"
  },
  {
    "activity": "TRANSPORT",
    "name": "Transport Amadou Dièye SARL",
    "address": "Zone Industrielle de Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "SOTRAGUE",
    "address": "Zone industrielle de Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORTS ROUTIER EXPRESS",
    "address": "Zac Mboa Lot n°13"
  },
  {
    "activity": "TRANSPORT",
    "name": "Azimuts Entreprises SARL",
    "address": "Sacré cœur 3 extension"
  },
  {
    "activity": "TRANSPORT",
    "name": "LA SENEGALAISE DE TRANSPORT",
    "address": "rue Ely Manel Fall X Fleurus"
  },
  {
    "activity": "TRANSPORT",
    "name": "Groupe Sope NABY TRANSPORT",
    "address": "Quartier Escale, Thies"
  },
  {
    "activity": "TRANSPORT",
    "name": "GLOBAL TRANSPORTS& MINES",
    "address": "22, cité SIPRES 1"
  },
  {
    "activity": "TRANSPORT",
    "name": "PETROSERVICES TRANSPORTS",
    "address": "Lotissement les Baobabs"
  },
  {
    "activity": "TRANSPORT",
    "name": "DAROU KHOUDOSS SA",
    "address": "Km 10, Boulevard du Centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT TALLA DIAGNE SA",
    "address": "Touba Mosquée"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORTS AMAR",
    "address": "KM 2,5, Blvrd du centenaire"
  },
  {
    "activity": "TRANSPORT",
    "name": "GIE BOOK KHALATTE",
    "address": "Quartier Diamaguene II, Mbour"
  },
  {
    "activity": "TRANSPORT",
    "name": "SOGETRHI",
    "address": "Km7, blvrd du CCD"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT KEUR MALOU",
    "address": "Touba Kaolack"
  },
  {
    "activity": "TRANSPORT",
    "name": "Transport ARONA SY",
    "address": "Zone industrielle Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "S.T.V.M",
    "address": "Zone Industrielle de Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT MAMAN KINE",
    "address": "Route des Niayes, Grand yoff"
  },
  {
    "activity": "TRANSPORT",
    "name": "MODOU THIAO",
    "address": "Cité Fadia, n°293"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT KHADIM SECK",
    "address": "Ouest Foire"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT 2D SASU",
    "address": "Km 14, route de Rufisque"
  },
  {
    "activity": "TRANSPORT",
    "name": "PBK SUARL",
    "address": "Sacré cœur 3"
  },
  {
    "activity": "TRANSPORT",
    "name": "S.T.H.C",
    "address": "Ndiakhaté, Thiès"
  },
  {
    "activity": "TRANSPORT",
    "name": "Entreprise Baila SAKHO EBS",
    "address": "Dakar"
  },
  {
    "activity": "TRANSPORT",
    "name": "PLANET TRANSLO",
    "address": "Dakar"
  },
  {
    "activity": "TRANSPORT",
    "name": "LOGISTIQUE PETROLIERE",
    "address": "Route de front de terre"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORTS SERIGNE GUEYE",
    "address": "Touba Gouye Mbinde"
  },
  {
    "activity": "TRANSPORT",
    "name": "ALTIUM TRANSPORT",
    "address": "Dakar"
  },
  {
    "activity": "TRANSPORT",
    "name": "MAKARIMAL AKHLAQ",
    "address": "Guediawaye, Parcelles"
  },
  {
    "activity": "TRANSPORT",
    "name": "TRANSPORT MODOU MBAYE",
    "address": "Quartier Darou Marnane"
  },
  {
    "activity": "TRANSPORT",
    "name": "COSETAP",
    "address": "Km 9, en face Technopole"
  },
  {
    "activity": "TRANSPORT",
    "name": "THL",
    "address": "Darou Marnane, Diourbel"
  },
  {
    "activity": "TRANSPORT",
    "name": "CK-TRANS SAS",
    "address": "Km 24 Route de Rufisque"
  },
  {
    "activity": "TRANSPORT",
    "name": "KEUR SERIGNE SALIOU",
    "address": "Km 11,8, route de Rufisque"
  },
  {
    "activity": "TRANSPORT",
    "name": "ECO TRANSPORT",
    "address": "Quartier Médinatoul"
  },
  {
    "activity": "TRANSPORT",
    "name": "ELLITAARE TRANSPORT",
    "address": "Sicap Amitié 2, rue 10"
  },
  {
    "activity": "TRANSPORT",
    "name": "GIE FIDELE KELIMANE",
    "address": "Kelimane Nganda Kaffrine"
  },
  {
    "activity": "TRANSPORT",
    "name": "HYDROTRANS SARL",
    "address": "Dakar"
  }
]
