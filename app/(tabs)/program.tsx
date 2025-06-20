import React, { useState, useRef, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Heart, ChevronDown, ChevronUp } from 'lucide-react-native';

// --- MODIFICA 1: Importa TUTTE le immagini come moduli ---
import AliceImage from '../../assets/images/alice.jpg';
import ChicagoImage from '../../assets/images/chicago.jpg';


// --- TIPI E DATI (MODIFICATI) ---

interface Choreography {
  title: string;
  courses: string;
  choreographer: string;
  description: string;
}

interface ProgramSectionData {
  title: string;
  subtitle: string;
  image: ImageSourcePropType; // Il tipo rimane, ma il valore sarà la variabile importata
  description: string;
  choreographies: Choreography[];
}

const screenWidth = Dimensions.get('window').width;
const padding = 40;

const programData: Omit<ProgramSectionData, 'image'>[] = [
  // --- MODIFICA 2: Rimuoviamo le immagini dai dati statici, le aggiungeremo dinamicamente ---
  {
    title: '🎬 PRIMO TEMPO',
    subtitle: 'Alice nel Paese delle Meraviglie',
    description: "Un primo atto ispirato all’universo visionario di Alice nel Paese delle Meraviglie, tra simbolismi, follia e trasformazioni. In un mondo capovolto dove il tempo si perde, le identità si confondono e ogni incontro lascia un segno, la danza diventa il linguaggio per attraversare sogni, paure e meraviglie.",
    choreographies: [
      // ... coreografie del primo tempo ...
      { title: "ALICE – BALLETTO IN UN ATTO", courses: "Corsi: Gioco danza, Propedeutico, Accademico 1, 2 e 3", choreographer: "Coreografia: Matteo D’Alessio e Danila Valentini", description: "Alice, una bambina sognatrice e ribelle, è con la sorella in un giardino soleggiato, colmo di fiori e colori. Mentre la sorella legge un libro, Alice si distrae e si lascia trasportare dai pensieri: in lei nasce il desiderio di un mondo fatto solo di meraviglie, dove tutto è possibile. D’improvviso, un Coniglio Bianco vestito elegantemente le corre davanti, “È tardi, è tardi!” esclama agitato. Incuriosita, Alice lo segue e cade in una lunga tana, precipitando in un mondo assurdo e meraviglioso. Bevande misteriose e dolcetti la fanno rimpicciolire e ingrandire a dismisura.\n\nConfusa e sconvolta, Alice piange, e dalle sue lacrime nasce un vero e proprio mare. Nel mare di lacrime, Alice nuota insieme a strani animali: un topo filosofo, un pappagallo saputello, una lucertola nervosa e un giovane aquilotto. Una volta raggiunta la riva, decidono che il modo migliore per asciugarsi è… una maratona senza senso, in cui tutti corrono in tondo senza mai fermarsi.\n\nNel suo viaggio, Alice incontra creature stravaganti e ambienti sempre più bizzarri: Pinco Panco e Panco Pinco, due gemelli che parlano in rima, si contraddicono e raccontano storie senza capo né coda, lasciando Alice ancora più confusa, un bruco filosofico, un giardino in cui i fiori parlano e cantano, ma escludono Alice perché non è uno di loro. Poi, uno strano Gatto dal sorriso inquietante: lo Stregatto, che le appare e scompare indicando mille direzioni… senza darne nessuna. Al centro di questo mondo eccentrico c’è il tè senza fine del Cappellaio Matto e del Leprotto Marzolino, un banchetto surreale dove il tempo sembra essersi fermato. Ma le stranezze non sono finite.\n\nAlice si ritrova nella reggia della Regina di Cuori, una sovrana bizzarra e collerica che comanda un esercito di carte da gioco. Le carte, trasformate in soldati e guardiani, marciano e sorvegliano il giardino come se fosse un campo di battaglia. Alice, disorientata, non capisce dove sia finita e, per non dare nell’occhio, prova a mimetizzarsi tra le carte. La Regina però la scorge subito e, con un sorriso tanto curioso quanto inquietante, la invita a giocare a croquet. Ma non è un croquet qualunque: le mazze sono fenicotteri vivi, le palline sono ricci e il campo è un groviglio caotico di comandi e urla. Nonostante tutto, Alice riesce a vincere la partita, e la Regina, furiosa, urla il suo celebre verdetto: “Tagliatele la testa!” Per far le cose con ordine, viene indetto un processo. Al banco dei testimoni sfilano uno dopo l’altro tutti i personaggi che Alice ha incontrato nel suo viaggio: ciascuno porta strane accuse, racconti sconclusionati e versioni diverse dei fatti. Il tribunale è una farsa, ma la Regina è implacabile. “Tagliatele la testa!” grida di nuovo, al culmine della sua furia.\n\nAlice allora fugge. Corre via mentre le carte-soldato la inseguono, tutto le gira intorno, i volti, le voci, le risate… fino a quando, all’improvviso, si risveglia. È di nuovo nel giardino, accanto alla sorella, come se nulla fosse accaduto. Forse era solo un sogno. O forse no." },
      { title: "PURE IMAGINATION – TIMOTHÉE CHALAMET", courses: "Coro delle allievedel corso canto: Silvia Dotale, Iris Iannotta, Sophie D. Perrella, Talita Pizzurno", choreographer: "", description: "Un intermezzo vocale che accompagna lo spettatore in un mondo dove l’imagination è l’unico confine." },
      { title: "ALICE’S THEME – DANNY ELFMAN", courses: "Corso: Contemporaneo 2", choreographer: "Coreografia: Matteo D’Alessio", description: "Danza il sogno di Alice: un percorso tra meraviglia, smarrimento e trasformazione." },
      { title: "CRAZY – INTERPRETI VARI", courses: "Corso: Hip Hop 2", choreographer: "Coreografia: Andrea Sgarra", description: "Sono diventato matto... ma lascia che ti dica una cosa: nella mia follia ho trovato la mia verità." },
    ]
  },
  {
    title: '🎬 SECONDO TEMPO',
    subtitle: 'Chicago',
    description: "Tra paillettes, jazz e crimini a ritmo di danza...",
    choreographies: [
      // ... coreografie del secondo tempo ...
      { title: 'IERI COME OGGI: CALYPSO – ANALOG SOL', courses: "Corso: contemporaneo 3", choreographer: "Coreografia: Matteo D’Alessio", description: "L'energia e la seduzione..." },
      { title: '"Cell Block Tango"', courses: "Corso Pre-Professionale", choreographer: "Coreografia: Andrea Sgarra", description: "Un pezzo potente..." },
      { title: '"Razzle Dazzle"', courses: "Ensemble Avanzato", choreographer: "Coreografia: Andrea Sgarra", description: "Un numero scintillante..." },
      { title: '"Chicago Finale"', courses: "Tutti i Corsi", choreographer: "Coreografia: Matteo D’Alessio e Danila Valentini e le assistenti Matilde Colombi e Maria Letizia Galati", description: "Un gran finale..." },
    ]
  }
];

const ChoreographyItem = ({ title, courses, choreographer, description }: Choreography) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.7} style={styles.choreographyItem}>
      <View style={styles.choreographyHeader}>
        <View style={styles.choreographyTitleContainer}>
          <Text style={styles.choreographyTitle}>{title}</Text>
          <Text style={styles.choreographyDetails}>{courses}</Text>
          {choreographer ? <Text style={styles.choreographyDetails}>{choreographer}</Text> : null}
        </View>
        {isExpanded ? <ChevronUp color="#555555" size={24} /> : <ChevronDown color="#555555" size={24} />}
      </View>
      {isExpanded && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.choreographyDescription}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

interface ProgramSectionProps {
  section: ProgramSectionData;
  imageHeight: number;
}

const ProgramSection = ({ section, imageHeight }: ProgramSectionProps) => (
  <View style={styles.programSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={section.image}
        style={[styles.sectionImage, { height: imageHeight }]}
        resizeMode="contain"
      />
    </View>
    <View style={styles.descriptionCard}>
      <Text style={styles.description}>{section.description}</Text>
    </View>
    <View style={styles.choreographyList}>
      {section.choreographies.map((item, index) => <ChoreographyItem key={index} {...item} />)}
    </View>
  </View>
);

export default function ProgramScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [renderKey, setRenderKey] = useState(0);
  
  // --- MODIFICA 3: Calcolo dinamico delle altezze con useState e Image.getSize ---
  const [imageHeights, setImageHeights] = useState({ alice: 400, chicago: 400 });

  Image.getSize(AliceImage, (width, height) => {
    const calculatedHeight = ((screenWidth - padding) / width) * height;
    setImageHeights(prev => ({ ...prev, alice: calculatedHeight }));
  });
  Image.getSize(ChicagoImage, (width, height) => {
    const calculatedHeight = ((screenWidth - padding) / width) * height;
    setImageHeights(prev => ({ ...prev, chicago: calculatedHeight }));
  });

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      setRenderKey(prevKey => prevKey + 1);
    }, [])
  );

  const finalProgramData: ProgramSectionData[] = [
    { ...programData[0], image: AliceImage },
    { ...programData[1], image: ChicagoImage },
  ];

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <LinearGradient colors={['#1A1A1A', '#c8151b']} style={styles.header}>
        <View style={styles.headerContent}>
          <Clock size={48} color="#D4AF37" />
          <Text style={styles.title}>Programma di Sala</Text>
        </View>
      </LinearGradient>

      <View style={styles.content} key={renderKey}>
        <ProgramSection section={finalProgramData[0]} imageHeight={imageHeights.alice} />
        <ProgramSection section={finalProgramData[1]} imageHeight={imageHeights.chicago} />

        <View style={styles.thanksSection}>
          <View style={styles.thanksHeader}>
            <Heart size={36} color="#c8151b" />
            <Text style={styles.thanksTitle}>Saluti e Ringraziamenti Speciali</Text>
          </View>
          <View style={styles.thanksCard}>
            <Text style={styles.thanksText}>
                Un grazie sentito a tutte le allieve e gli allievi...{'\n\n'}
                Un grazie alle famiglie...{'\n\n'}
                E infine grazie a voi, pubblico...{'\n'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// ... GLI STILI RIMANGONO IDENTICI A QUELLI CHE AVEVI GIÀ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  scrollContentContainer: { paddingBottom: 90 },
  header: { paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 },
  headerContent: { alignItems: 'center' },
  title: { fontSize: 28, fontFamily: 'Inter-Bold', color: '#FFFFFF', textAlign: 'center', marginTop: 16 },
  content: { padding: 20 },
  programSection: { marginBottom: 40 },
  sectionHeader: { marginBottom: 20 },
  sectionTitle: { fontSize: 24, fontFamily: 'Inter-Bold', color: '#c8151b', textAlign: 'center', marginBottom: 8 },
  sectionSubtitle: { fontSize: 20, fontFamily: 'Inter-SemiBold', color: '#1A1A1A', textAlign: 'center' },
  imageContainer: { marginBottom: 20 },
  sectionImage: { width: '100%', borderRadius: 12 },
  descriptionCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  description: { fontSize: 16, fontFamily: 'Inter-Regular', color: '#333', lineHeight: 24, textAlign: 'center' },
  choreographyList: { gap: 12 },
  choreographyItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#D4AF37', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  choreographyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  choreographyTitleContainer: { flex: 1, marginRight: 10 },
  choreographyTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: '#1A1A1A', marginBottom: 4 },
  choreographyDetails: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#555555', lineHeight: 20 },
  descriptionContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  choreographyDescription: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#333333', lineHeight: 22 },
  thanksSection: { marginTop: 20 },
  thanksHeader: { alignItems: 'center', marginBottom: 20 },
  thanksTitle: { fontSize: 22, fontFamily: 'Inter-Bold', color: '#c8151b', textAlign: 'center', marginTop: 12 },
  thanksCard: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, borderWidth: 2, borderColor: '#D4AF37' },
  thanksText: { fontSize: 16, fontFamily: 'Inter-Regular', color: '#333', lineHeight: 24, textAlign: 'center' },
});