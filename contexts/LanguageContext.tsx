import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Tab bar
    'tab.list': 'Events',
    'tab.map': 'Map',
    'tab.favorites': 'Saved',
    'tab.guide': 'Guide',

    // Events screen
    'events.today': 'Today',
    'events.tomorrow': 'Tomorrow',
    'events.thisWeek': 'This Week',
    'events.noEvents': 'No events scheduled',
    'events.checkLater': 'Check back later for upcoming events',
    'events.headerTitle': 'What\'s happening',

    // Headers
    'header.main': 'Fallas Valencia 2025',
    'header.map': 'Fallas Map',
    'header.guide': 'Practical Guide',
    'header.detail': 'Details',
    'header.fireworks': 'Fireworks',
    'header.transport': 'Transport',
    'header.exhibitions': 'Exhibitions & Museums',
    'header.fairs': 'Fairs',
    'header.nightlife': 'Nightlife',
    'header.bullfighting': 'Bullfighting',
    'header.glossary': 'Glossary',

    // Categories
    'category.special': 'Special Section',
    'category.firstA': 'First A',

    // Guide screen
    'guide.title': 'Useful Information',
    'guide.subtitle': 'Everything you need to know about Fallas',
    'guide.fireworks': 'Fireworks',
    'guide.transport': 'Transport',
    'guide.exhibitions': 'Exhibitions',
    'guide.fairs': 'Fairs',
    'guide.nightlife': 'Nightlife',
    'guide.bullfighting': 'Bullfighting',
    'guide.glossary': 'Glossary',
    'guide.history': 'History',
    'guide.crema': 'La Cremà',
    'guide.food': 'Traditional Food',
    'guide.artists': 'Fallero Artists',
    'guide.music': 'Music & Dance',
    'guide.tip1': 'Best viewing spots',
    'guide.tip1Desc': 'Top locations to experience the festivities',
    'guide.tip2': 'Avoid the crowds',
    'guide.tip2Desc': 'Timing tips for a better experience',
    'guide.tip3': 'Photo opportunities',
    'guide.tip3Desc': 'Most Instagrammable moments',

    // Guide section additional
    'guide.cultural': 'Cultural Guide',
    'guide.learn': 'Learn about Las Fallas',
    'guide.welcome': 'Welcome to Fallas!',
    'guide.welcomeDesc': 'Your complete guide to Valencia\'s biggest festival',
    'guide.exploreTopics': 'Explore Topics',
    'guide.quickTips': 'Quick Tips',
    'guide.commonTerms': 'Common Terms',

    // Saved screen - Progress
    'saved.progress': 'Progress',
    'saved.fallasVisited': 'Fallas Visited',
    'saved.personalJourney': 'Your personal festival journey',

    'guide.topic.history': 'Origins & Evolution',
    'guide.topic.crema': 'The Grand Finale',
    'guide.topic.fireworks': 'Firework Shows',
    'guide.topic.food': 'Gastronomy Guide',
    'guide.topic.artists': 'Meet the Creators',
    'guide.topic.music': 'Traditional Performances',
    'guide.streetClosures': 'Street Closures',
    'guide.topic.streetClosures': 'Traffic restrictions & zones',

    // Street Closures screen
    'closures.status.before': 'Closures start March 1',
    'closures.status.beforeDesc': 'Roads are open until the festival begins',
    'closures.status.mascleta': 'Daily closures 12:00-15:00',
    'closures.status.mascletaDesc': 'Center closed around Plaza del Ayuntamiento',
    'closures.status.main': 'Center fully closed',
    'closures.status.mainDesc': 'Full closure until 4:00 AM March 20',
    'closures.status.after': 'Closures ended',
    'closures.status.afterDesc': 'Roads are open again',
    'closures.mascleta': 'Mascletà Period',
    'closures.dates': 'Dates',
    'closures.mascletaInfo': 'Daily center closure from 12:00 to 15:00 for the mascletà pyrotechnic show.',
    'closures.mascletaZone': 'Area around Plaza del Ayuntamiento',
    'closures.mainDays': 'Main Festival Days',
    'closures.mainWarning': '⚠️ Complete center closure!',
    'closures.mainInfo': 'From 12:00 on March 16 until 4:00 AM on March 20, the center is completely closed to traffic.',
    'closures.zones': 'Closure Zones',
    'closures.zoneClosed': 'Fully closed',
    'closures.zoneControl': 'Possible control',
    'closures.redZone': 'Red Zone',
    'closures.redZoneDesc': 'Completely closed to all vehicles',
    'closures.yellowZone': 'Yellow Zone',
    'closures.yellowZoneDesc': 'Access control possible, residents only',
    'closures.fireworksZone': 'Fireworks Zones',
    'closures.fireworksZoneDesc': 'Bridges closed during Nit del Foc and major fireworks',
    'closures.recommendations': 'Recommendations',
    'closures.tipMetro': 'Use the metro',
    'closures.tipMetroDesc': 'Best way to get around during Fallas. 24h service March 15-19!',
    'closures.tipParking': 'Park outside center',
    'closures.tipParkingDesc': 'Use P+R at Beniferri, Ciudad de las Artes, or Mestalla',
    'closures.tipPlan': 'Plan ahead',
    'closures.tipPlanDesc': 'Check routes before leaving. Allow extra time.',
    'closures.openMetro': 'Open Metrovalencia website',

    // Map screen
    'map.title': '🗺️ Valencia Center',
    'map.legend.special': 'Special Section',
    'map.legend.firstA': 'First A',

    // Detail screen
    'detail.description': 'Description',
    'detail.events': 'Events',
    'detail.viewOnMap': '🗺️ View on map',
    'detail.addToFavorites': '⭐ Add to favorites',
    'detail.mascleta': 'Mascletà',
    'detail.crema': 'Cremà',

    // Fireworks screen
    'fireworks.banHours': 'Restricted hours',
    'fireworks.banText': 'Fireworks prohibited: 9:00-10:00 and 15:00-17:00',
    'fireworks.safetyRules': '🛡️ Safety Rules',
    'fireworks.rule1': 'Use earplugs — sound can reach 120 dB',
    'fireworks.rule2': 'Children must wear protective earmuffs',
    'fireworks.rule3': "Don't pick up unexploded fireworks",
    'fireworks.rule4': 'Keep distance from launch site',
    'fireworks.types': '💥 Types of Pyrotechnics',
    'fireworks.mascletaDesc': 'Daytime show at Plaza del Ayuntamiento. Every day at 14:00 from March 1-19. Volume matters more than visuals — it\'s about rhythm and power!',
    'fireworks.castilloDesc': 'Night fireworks. The most beautiful ones are in the last nights. La Nit del Foc (March 18) — the main show of the year.',
    'fireworks.troDesc': 'The loudest firecracker. Thrown on the ground. Be prepared — the sound is very sharp!',
    'fireworks.whereToBuy': '🛒 Where to Buy',
    'fireworks.kiosks': 'Street kiosks',
    'fireworks.kiosksInfo': 'Appear from March 1 in the center',
    'fireworks.tempKiosk': 'Mercado Central (temporary kiosk)',

    // Transport screen
    'transport.metro': 'Metro',
    'transport.hours': 'Operating hours',
    'transport.march15_19': 'March 15-19',
    'transport.allNight': '24 hours!',
    'transport.metroTip': '💡 Lines 3, 5, 7, 9 go to center (Xàtiva, Colón)',
    'transport.officialSite': 'Official Metrovalencia website',
    'transport.bus': 'EMT Buses',
    'transport.busWarning': '⚠️ Many routes changed due to road closures!',
    'transport.busInfo': 'During festival days, buses bypass the center. Use EMT Valencia app for current routes.',
    'transport.busApp': 'EMT Valencia App',
    'transport.parking': 'Parking',
    'transport.parkingRecommend': 'We recommend parking outside the center:',
    'transport.parkingArts': 'Near City of Arts — many spots, metro nearby',
    'transport.parkingMestalla': 'At stadium — if no match',
    'transport.parkingFree': 'Free with metro ticket',
    'transport.taxi': 'Taxi and Cabify',
    'transport.taxiInfo': "Taxis work, but the center is difficult — streets closed. Uber doesn't work in Valencia!",

    // Exhibitions screen
    'exhibitions.intro': 'Dive into Fallas culture through museums and exhibitions',
    'exhibitions.ninot': 'Ninot Exhibition',
    'exhibitions.ninotDesc': "Here all ninots saved from fire are displayed. Public votes for the best one — winner won't burn in cremà!",
    'exhibitions.fallero': 'Fallero Museum',
    'exhibitions.falleroDesc': 'Collection of ninots indultats (pardoned) since 1934. Festival history in figures.',
    'exhibitions.artist': 'Fallero Artist Museum',
    'exhibitions.artistDesc': 'Workshops where figures are created. You can see the work process!',
    'exhibitions.costume': 'Costume Exhibition',
    'exhibitions.costumeDesc': 'Traditional falleros/falleras costumes. Silk, embroidery, jewelry.',
    'exhibitions.address': '📍 Address',
    'exhibitions.hours': '🕐 Hours',
    'exhibitions.price': '💰 Price',
    'exhibitions.free': 'Free',
    'exhibitions.freeSunday': 'Free on Sunday',
    'exhibitions.showOnMap': '📍 Show on map',

    // Fairs screen
    'fairs.filter.all': 'All',
    'fairs.filter.food': 'Food',
    'fairs.filter.books': 'Books',
    'fairs.filter.souvenirs': 'Souvenirs',
    'fairs.book': 'Book Fair',
    'fairs.bookDesc': 'Books in Spanish, Catalan and Valencian. Many books about Fallas and local culture.',
    'fairs.horchata': 'Horchata Fest',
    'fairs.horchataDesc': 'Traditional horchata drink from chufa. Try it with fartons (sweet sticks)!',
    'fairs.ruzafa': 'Ruzafa Market',
    'fairs.ruzafaDesc': 'Neighborhood fair in trendy district. Handmade, vintage, street food.',
    'fairs.pyro': 'Pyrotechnics Fair',
    'fairs.pyroDesc': 'Kiosks with pyrotechnics. You can buy from small poppers to serious firecrackers.',

    // Saved screen
    'saved.title': 'Your Plan',
    'saved.subtitle': 'saved items',
    'saved.filter.all': 'All',
    'saved.filter.fallas': 'Fallas',
    'saved.filter.events': 'Events',
    'saved.emptyTitle': 'Nothing saved yet',
    'saved.emptySubtitle': 'Save fallas and events to plan your experience',
    'saved.navigate': 'Navigate',
    'saved.details': 'Details',
    'saved.loginTitle': 'Sign in to save your favorites',
    'saved.loginSubtitle': 'Create an account to save fallas and events',
    'saved.loginButton': 'Sign In',
    'fairs.attractions': 'Amusement Fair',
    'fairs.attractionsDesc': 'Huge amusement park. Ferris wheel, roller coasters, carousels.',
    'fairs.showOnMap': 'Show on map',
    'fairs.type.books': 'Books',
    'fairs.type.food': 'Food',
    'fairs.type.souvenirs': 'Souvenirs',
    'fairs.type.pyro': 'Pyro',
    'fairs.type.entertainment': 'Entertainment',

    // Nightlife screen
    'nightlife.info': 'During Fallas, clubs and bars are open until 4:00-5:00 AM!',
    'nightlife.verbenas': '💃 Verbenas',
    'nightlife.verbenasDesc': 'Street discos in every neighborhood. Free, fun, truly Valencian!',
    'nightlife.concerts': '🎵 Concerts',
    'nightlife.clubs': '🎧 Clubs and Bars',
    'nightlife.mapLink': '🗺️ Nightlife Map (Jacoveo)',

    // Bullfighting screen
    'bullfighting.hero': 'Plaza de Toros de Valencia',
    'bullfighting.heroSub': 'One of the oldest arenas in Spain (1851)',
    'bullfighting.info': "Bullfighting is part of Spanish culture, but not mandatory to visit. The decision is yours.",
    'bullfighting.schedule': '📅 Feria Taurina 2025 Schedule',
    'bullfighting.corrida': 'Corrida de Toros',
    'bullfighting.granCorrida': 'Gran Corrida de San José',
    'bullfighting.mainEvent': 'Main event',
    'bullfighting.tickets': '🎟️ Tickets',
    'bullfighting.sol': 'Sol (sun)',
    'bullfighting.sombra': 'Sombra (shade)',
    'bullfighting.barrera': 'Barrera (1st row)',
    'bullfighting.tip': '💡 Sombra is more expensive but comfortable — the sun is already hot in March',
    'bullfighting.buyTickets': 'Buy tickets at torosvalencia.com',
    'bullfighting.howToGet': '📍 How to Get There',
    'bullfighting.metro': 'Metro: Xàtiva (lines 3, 5, 9)',
    'bullfighting.walk': '5 min from Estación del Norte',
    'bullfighting.openMap': '🗺️ Open on map',

    // Glossary screen
    'glossary.search': 'Search term...',
    'glossary.notFound': 'Term not found',
    'glossary.mascleta': 'Mascletà',
    'glossary.mascletaDef': 'Daytime pyrotechnic show at Plaza del Ayuntamiento. Every day at 14:00 from March 1-19. Focus on volume and rhythm, not visual effects.',
    'glossary.crema': 'Cremà',
    'glossary.cremaDef': "Burning of figures on the night of March 19-20. Festival climax. First children's figures burn (22:00), then adults (00:00).",
    'glossary.planta': 'Plantà',
    'glossary.plantaDef': 'Installation of figures. Happens March 15-16. They work all night to finish by morning.',
    'glossary.ofrenda': 'Ofrenda',
    'glossary.ofrendaDef': 'Flower offering to the Virgin Mary. March 17-18, falleros walk to Plaza de la Virgen with bouquets, creating a huge cloak for the statue.',
    'glossary.ninot': 'Ninot',
    'glossary.ninotDef': 'Individual figurine/puppet in a falla. One ninot from all displayed will be "pardoned" (indultar) and saved from fire.',
    'glossary.falla': 'Falla',
    'glossary.fallaDef': 'Large satirical sculptural composition of wood, cardboard and styrofoam. Also the name of the neighborhood association that builds it.',
    'glossary.fallero': 'Fallero/Fallera',
    'glossary.falleroDef': 'Festival participant, member of falla community. They wear traditional costumes, especially women — dresses with jewelry and elaborate hairstyles.',
    'glossary.casal': 'Casal',
    'glossary.casalDef': 'Headquarters of a neighborhood falla. Here falleros gather, store costumes, prepare for festivals.',
    'glossary.verbena': 'Verbena',
    'glossary.verbenaDef': 'Street party/disco. Held in every neighborhood during Fallas. Free for everyone.',
    'glossary.correfoc': 'Correfoc',
    'glossary.correfocDef': '"Fire run" — procession with fireworks. Participants in demon costumes run with firecrackers. Very spectacular and very loud!',
    'glossary.desperta': 'Despertà',
    'glossary.despertaDef': '"Awakening" — at 8 AM falleros walk through streets and set off firecrackers to wake up neighbors. Tradition!',
    'glossary.nitDelFoc': 'Nit del Foc',
    'glossary.nitDelFocDef': '"Night of Fire" — main fireworks of the year, March 18. Lasts 20-25 minutes. Best spot — Paseo de la Alameda.',

    // Common
    'common.from': 'from',
    'common.until': 'until',
    'common.march': 'March',
    'common.event': 'Event',
  },
  es: {
    // Tab bar
    'tab.list': 'Eventos',
    'tab.map': 'Mapa',
    'tab.favorites': 'Guardado',
    'tab.guide': 'Guía',

    // Events screen
    'events.today': 'Hoy',
    'events.tomorrow': 'Mañana',
    'events.thisWeek': 'Esta Semana',
    'events.noEvents': 'No hay eventos programados',
    'events.checkLater': 'Vuelve más tarde para ver próximos eventos',
    'events.headerTitle': 'Qué pasa hoy',

    // Headers
    'header.main': 'Fallas Valencia 2025',
    'header.map': 'Mapa de Fallas',
    'header.guide': 'Guía Práctica',
    'header.detail': 'Detalle',
    'header.fireworks': 'Petardos',
    'header.transport': 'Transporte',
    'header.exhibitions': 'Exposiciones y Museos',
    'header.fairs': 'Ferias',
    'header.nightlife': 'Vida Nocturna',
    'header.bullfighting': 'Toros',
    'header.glossary': 'Glosario',

    // Categories
    'category.special': 'Sección Especial',
    'category.firstA': 'Primera A',

    // Guide screen
    'guide.title': 'Información Útil',
    'guide.subtitle': 'Todo lo que necesitas saber sobre las Fallas',
    'guide.fireworks': 'Petardos',
    'guide.transport': 'Transporte',
    'guide.exhibitions': 'Exposiciones',
    'guide.fairs': 'Ferias',
    'guide.nightlife': 'Vida nocturna',
    'guide.bullfighting': 'Toros',
    'guide.glossary': 'Glosario',
    'guide.history': 'Historia',
    'guide.crema': 'La Cremà',
    'guide.food': 'Gastronomía',
    'guide.artists': 'Artistas Falleros',
    'guide.music': 'Música y Baile',
    'guide.tip1': 'Mejores miradores',
    'guide.tip1Desc': 'Los mejores lugares para disfrutar de las fiestas',
    'guide.tip2': 'Evita las multitudes',
    'guide.tip2Desc': 'Consejos de horarios para una mejor experiencia',
    'guide.tip3': 'Oportunidades de foto',
    'guide.tip3Desc': 'Los momentos más instagrameables',

    // Guide section additional
    'guide.cultural': 'Guía Cultural',
    'guide.learn': 'Aprende sobre las Fallas',
    'guide.welcome': '¡Bienvenido a Fallas!',
    'guide.welcomeDesc': 'Tu guía completa del festival más grande de Valencia',
    'guide.exploreTopics': 'Explorar Temas',
    'guide.quickTips': 'Consejos Rápidos',
    'guide.commonTerms': 'Términos Comunes',

    // Saved screen - Progress
    'saved.progress': 'Progreso',
    'saved.fallasVisited': 'Fallas Visitadas',
    'saved.personalJourney': 'Tu viaje personal por las fiestas',

    'guide.topic.history': 'Orígenes y Evolución',
    'guide.topic.crema': 'El Gran Final',
    'guide.topic.fireworks': 'Espectáculos Pirotécnicos',
    'guide.topic.food': 'Guía Gastronómica',
    'guide.topic.artists': 'Conoce a los Creadores',
    'guide.topic.music': 'Actuaciones Tradicionales',
    'guide.streetClosures': 'Calles Cortadas',
    'guide.topic.streetClosures': 'Restricciones de tráfico y zonas',

    // Street Closures screen
    'closures.status.before': 'Los cortes empiezan el 1 de marzo',
    'closures.status.beforeDesc': 'Las calles están abiertas hasta que comience el festival',
    'closures.status.mascleta': 'Cortes diarios 12:00-15:00',
    'closures.status.mascletaDesc': 'Centro cerrado alrededor de la Plaza del Ayuntamiento',
    'closures.status.main': 'Centro totalmente cerrado',
    'closures.status.mainDesc': 'Cierre total hasta las 4:00 del 20 de marzo',
    'closures.status.after': 'Los cortes han terminado',
    'closures.status.afterDesc': 'Las calles están abiertas de nuevo',
    'closures.mascleta': 'Período de Mascletà',
    'closures.dates': 'Fechas',
    'closures.mascletaInfo': 'Cierre diario del centro de 12:00 a 15:00 para el espectáculo pirotécnico de la mascletà.',
    'closures.mascletaZone': 'Zona alrededor de la Plaza del Ayuntamiento',
    'closures.mainDays': 'Días Principales',
    'closures.mainWarning': '⚠️ ¡Cierre total del centro!',
    'closures.mainInfo': 'Desde las 12:00 del 16 de marzo hasta las 4:00 del 20 de marzo, el centro está completamente cerrado al tráfico.',
    'closures.zones': 'Zonas de Corte',
    'closures.zoneClosed': 'Totalmente cerrado',
    'closures.zoneControl': 'Posible control',
    'closures.redZone': 'Zona Roja',
    'closures.redZoneDesc': 'Completamente cerrada a todos los vehículos',
    'closures.yellowZone': 'Zona Amarilla',
    'closures.yellowZoneDesc': 'Posible control de acceso, solo residentes',
    'closures.fireworksZone': 'Zonas de Fuegos',
    'closures.fireworksZoneDesc': 'Puentes cerrados durante la Nit del Foc y fuegos principales',
    'closures.recommendations': 'Recomendaciones',
    'closures.tipMetro': 'Usa el metro',
    'closures.tipMetroDesc': 'La mejor forma de moverse durante Fallas. ¡Servicio 24h del 15-19 marzo!',
    'closures.tipParking': 'Aparca fuera del centro',
    'closures.tipParkingDesc': 'Usa P+R en Beniferri, Ciudad de las Artes, o Mestalla',
    'closures.tipPlan': 'Planifica con antelación',
    'closures.tipPlanDesc': 'Consulta las rutas antes de salir. Prevé tiempo extra.',
    'closures.openMetro': 'Abrir web de Metrovalencia',

    // Map screen
    'map.title': '🗺️ Valencia Centro',
    'map.legend.special': 'Sección Especial',
    'map.legend.firstA': 'Primera A',

    // Detail screen
    'detail.description': 'Descripción',
    'detail.events': 'Eventos',
    'detail.viewOnMap': '🗺️ Ver en el mapa',
    'detail.addToFavorites': '⭐ Añadir a favoritos',
    'detail.mascleta': 'Mascletà',
    'detail.crema': 'Cremà',

    // Fireworks screen
    'fireworks.banHours': 'Horas de prohibición',
    'fireworks.banText': 'Petardos prohibidos: 9:00-10:00 y 15:00-17:00',
    'fireworks.safetyRules': '🛡️ Reglas de Seguridad',
    'fireworks.rule1': 'Usa tapones — el sonido puede alcanzar 120 dB',
    'fireworks.rule2': 'Los niños deben usar protectores auditivos',
    'fireworks.rule3': 'No recojas petardos sin explotar',
    'fireworks.rule4': 'Mantén distancia del lugar de lanzamiento',
    'fireworks.types': '💥 Tipos de Pirotecnia',
    'fireworks.mascletaDesc': 'Espectáculo diurno en la Plaza del Ayuntamiento. Cada día a las 14:00 del 1 al 19 de marzo. ¡El volumen importa más que lo visual — es ritmo y potencia!',
    'fireworks.castilloDesc': 'Fuegos artificiales nocturnos. Los más bonitos son las últimas noches. La Nit del Foc (18 de marzo) — el espectáculo principal del año.',
    'fireworks.troDesc': 'El petardo más ruidoso. Se lanza al suelo. ¡Prepárate — el sonido es muy fuerte!',
    'fireworks.whereToBuy': '🛒 Dónde Comprar',
    'fireworks.kiosks': 'Quioscos en la calle',
    'fireworks.kiosksInfo': 'Aparecen desde el 1 de marzo en el centro',
    'fireworks.tempKiosk': 'Mercado Central (quiosco temporal)',

    // Transport screen
    'transport.metro': 'Metro',
    'transport.hours': 'Horario',
    'transport.march15_19': '15-19 marzo',
    'transport.allNight': '¡24 horas!',
    'transport.metroTip': '💡 Líneas 3, 5, 7, 9 van al centro (Xàtiva, Colón)',
    'transport.officialSite': 'Web oficial de Metrovalencia',
    'transport.bus': 'Autobuses EMT',
    'transport.busWarning': '⚠️ ¡Muchas rutas cambiadas por cortes de tráfico!',
    'transport.busInfo': 'Durante las fiestas, los autobuses rodean el centro. Usa la app EMT Valencia para rutas actualizadas.',
    'transport.busApp': 'App EMT Valencia',
    'transport.parking': 'Aparcamientos',
    'transport.parkingRecommend': 'Recomendamos aparcar fuera del centro:',
    'transport.parkingArts': 'Cerca de la Ciudad de las Artes — muchas plazas, metro cerca',
    'transport.parkingMestalla': 'En el estadio — si no hay partido',
    'transport.parkingFree': 'Gratis con billete de metro',
    'transport.taxi': 'Taxi y Cabify',
    'transport.taxiInfo': 'Los taxis funcionan, pero el centro es difícil — calles cortadas. ¡Uber no funciona en Valencia!',

    // Exhibitions screen
    'exhibitions.intro': 'Sumérgete en la cultura fallera a través de museos y exposiciones',
    'exhibitions.ninot': 'Exposición del Ninot',
    'exhibitions.ninotDesc': 'Aquí se exponen todos los ninots salvados del fuego. El público vota al mejor — ¡el ganador no arderá en la cremà!',
    'exhibitions.fallero': 'Museo Fallero',
    'exhibitions.falleroDesc': 'Colección de ninots indultats desde 1934. La historia de las fiestas en figuras.',
    'exhibitions.artist': 'Museo del Artista Fallero',
    'exhibitions.artistDesc': '¡Talleres donde se crean las figuras. Puedes ver el proceso de trabajo!',
    'exhibitions.costume': 'Exposición de Indumentaria',
    'exhibitions.costumeDesc': 'Trajes tradicionales de falleros/falleras. Seda, bordados, joyas.',
    'exhibitions.address': '📍 Dirección',
    'exhibitions.hours': '🕐 Horario',
    'exhibitions.price': '💰 Precio',
    'exhibitions.free': 'Gratis',
    'exhibitions.freeSunday': 'Gratis los domingos',
    'exhibitions.showOnMap': '📍 Ver en el mapa',

    // Fairs screen
    'fairs.filter.all': 'Todos',
    'fairs.filter.food': 'Comida',
    'fairs.filter.books': 'Libros',
    'fairs.filter.souvenirs': 'Souvenirs',
    'fairs.book': 'Fira del Llibre',
    'fairs.bookDesc': 'Libros en español, catalán y valenciano. Muchos libros sobre Fallas y cultura local.',
    'fairs.horchata': 'Feria de la Horchata',
    'fairs.horchataDesc': 'Bebida tradicional de chufa. ¡Pruébala con fartons!',
    'fairs.ruzafa': 'Mercadito de Ruzafa',
    'fairs.ruzafaDesc': 'Feria del barrio en zona trendy. Handmade, vintage, street food.',
    'fairs.pyro': 'Feria de Pirotecnia',
    'fairs.pyroDesc': 'Quioscos con pirotecnia. Puedes comprar desde pequeños petardos hasta los más potentes.',

    // Saved screen
    'saved.title': 'Tu Plan',
    'saved.subtitle': 'guardados',
    'saved.filter.all': 'Todos',
    'saved.filter.fallas': 'Fallas',
    'saved.filter.events': 'Eventos',
    'saved.emptyTitle': 'Nada guardado aún',
    'saved.emptySubtitle': 'Guarda fallas y eventos para planificar tu experiencia',
    'saved.navigate': 'Navegar',
    'saved.details': 'Detalles',
    'saved.loginTitle': 'Inicia sesión para guardar favoritos',
    'saved.loginSubtitle': 'Crea una cuenta para guardar fallas y eventos',
    'saved.loginButton': 'Iniciar Sesión',
    'fairs.attractions': 'Feria de Atracciones',
    'fairs.attractionsDesc': 'Enorme parque de atracciones. Noria, montañas rusas, carruseles.',
    'fairs.showOnMap': 'Ver en el mapa',
    'fairs.type.books': 'Libros',
    'fairs.type.food': 'Comida',
    'fairs.type.souvenirs': 'Souvenirs',
    'fairs.type.pyro': 'Pirotecnia',
    'fairs.type.entertainment': 'Ocio',

    // Nightlife screen
    'nightlife.info': '¡Durante las Fallas, clubs y bares abren hasta las 4:00-5:00!',
    'nightlife.verbenas': '💃 Verbenas',
    'nightlife.verbenasDesc': '¡Discotecas callejeras en cada barrio. Gratis, divertido, auténticamente valenciano!',
    'nightlife.concerts': '🎵 Conciertos',
    'nightlife.clubs': '🎧 Clubs y Bares',
    'nightlife.mapLink': '🗺️ Mapa de vida nocturna (Jacoveo)',

    // Bullfighting screen
    'bullfighting.hero': 'Plaza de Toros de Valencia',
    'bullfighting.heroSub': 'Una de las plazas más antiguas de España (1851)',
    'bullfighting.info': 'Los toros son parte de la cultura española, pero no es obligatorio visitarlos. La decisión es tuya.',
    'bullfighting.schedule': '📅 Programa Feria Taurina 2025',
    'bullfighting.corrida': 'Corrida de Toros',
    'bullfighting.granCorrida': 'Gran Corrida de San José',
    'bullfighting.mainEvent': 'Evento principal',
    'bullfighting.tickets': '🎟️ Entradas',
    'bullfighting.sol': 'Sol',
    'bullfighting.sombra': 'Sombra',
    'bullfighting.barrera': 'Barrera (1ª fila)',
    'bullfighting.tip': '💡 Sombra es más caro pero cómodo — el sol ya calienta en marzo',
    'bullfighting.buyTickets': 'Comprar entradas en torosvalencia.com',
    'bullfighting.howToGet': '📍 Cómo Llegar',
    'bullfighting.metro': 'Metro: Xàtiva (líneas 3, 5, 9)',
    'bullfighting.walk': '5 min de la Estación del Norte',
    'bullfighting.openMap': '🗺️ Abrir en el mapa',

    // Glossary screen
    'glossary.search': 'Buscar término...',
    'glossary.notFound': 'Término no encontrado',
    'glossary.mascleta': 'Mascletà',
    'glossary.mascletaDef': 'Espectáculo pirotécnico diurno en la Plaza del Ayuntamiento. Cada día a las 14:00 del 1 al 19 de marzo. El foco está en el volumen y ritmo, no en efectos visuales.',
    'glossary.crema': 'Cremà',
    'glossary.cremaDef': 'Quema de monumentos la noche del 19 al 20 de marzo. Clímax de las fiestas. Primero se queman las infantiles (22:00), luego las mayores (00:00).',
    'glossary.planta': 'Plantà',
    'glossary.plantaDef': 'Instalación de monumentos. Ocurre el 15-16 de marzo. Trabajan toda la noche para terminar por la mañana.',
    'glossary.ofrenda': 'Ofrenda',
    'glossary.ofrendaDef': 'Ofrenda floral a la Virgen de los Desamparados. 17-18 de marzo, los falleros van a la Plaza de la Virgen con ramos, creando un manto gigante para la estatua.',
    'glossary.ninot': 'Ninot',
    'glossary.ninotDef': 'Figura/muñeco individual en una falla. Uno de todos los expuestos será "indultado" y salvado del fuego.',
    'glossary.falla': 'Falla',
    'glossary.fallaDef': 'Gran composición escultórica satírica de madera, cartón y poliestireno. También el nombre de la asociación vecinal que la construye.',
    'glossary.fallero': 'Fallero/Fallera',
    'glossary.falleroDef': 'Participante de las fiestas, miembro de la comisión fallera. Llevan trajes tradicionales, especialmente las mujeres — vestidos con joyas y peinados elaborados.',
    'glossary.casal': 'Casal',
    'glossary.casalDef': 'Sede de una falla del barrio. Aquí los falleros se reúnen, guardan los trajes, preparan las fiestas.',
    'glossary.verbena': 'Verbena',
    'glossary.verbenaDef': 'Fiesta/discoteca callejera. Se celebra en cada barrio durante las Fallas. Gratis para todos.',
    'glossary.correfoc': 'Correfoc',
    'glossary.correfocDef': '"Correfoegos" — procesión con pirotecnia. Participantes disfrazados de demonios corren con petardos. ¡Muy espectacular y muy ruidoso!',
    'glossary.desperta': 'Despertà',
    'glossary.despertaDef': '"Despertar" — a las 8 de la mañana los falleros recorren las calles tirando petardos para despertar a los vecinos. ¡Tradición!',
    'glossary.nitDelFoc': 'Nit del Foc',
    'glossary.nitDelFocDef': '"Noche del Fuego" — fuegos artificiales principales del año, 18 de marzo. Dura 20-25 minutos. Mejor sitio — Paseo de la Alameda.',

    // Common
    'common.from': 'desde',
    'common.until': 'hasta',
    'common.march': 'marzo',
    'common.event': 'Evento',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Default to Spanish - primary audience
  const [language, setLanguage] = useState<Language>('es');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
