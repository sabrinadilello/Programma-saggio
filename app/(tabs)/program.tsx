import React, { useState, useRef, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Heart, ChevronDown, ChevronUp } from 'lucide-react-native';

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
  image: ImageSourcePropType;
  aspectRatio: number; // L'aspect ratio della "finestra"
  description: string;
  choreographies: Choreography[];
}

const programData: ProgramSectionData[] = [
  {
    title: '🎬 PRIMO TEMPO',
    subtitle: 'Alice nel Paese delle Meraviglie',
    image: AliceImage,
    aspectRatio: 1.6, // Una buona forma per la finestra
    description: "Un primo atto ispirato all’universo visionario di Alice nel Paese delle Meraviglie, tra simbolismi, follia e trasformazioni. In un mondo capovolto dove il tempo si perde, le identità si confondono e ogni incontro lascia un segno, la danza diventa il linguaggio per attraversare sogni, paure e meraviglie.",
    choreographies: [
      { title: "ALICE – BALLETTO IN UN ATTO", courses: "Corsi: Gioco danza, Propedeutico, Accademico 1, 2 e 3", choreographer: "Coreografia: Matteo D’Alessio e Danila Valentini", description: "Alice, una bambina sognatrice e ribelle, è con la sorella in un giardino soleggiato, colmo di fiori e colori. Mentre la sorella legge un libro, Alice si distrae e si lascia trasportare dai pensieri: in lei nasce il desiderio di un mondo fatto solo di meraviglie, dove tutto è possibile. D’improvviso, un Coniglio Bianco vestito elegantemente le corre davanti, “È tardi, è tardi!” esclama agitato. Incuriosita, Alice lo segue e cade in una lunga tana, precipitando in un mondo assurdo e meraviglioso. Bevande misteriose e dolcetti la fanno rimpicciolire e ingrandire a dismisura.\n\nConfusa e sconvolta, Alice piange, e dalle sue lacrime nasce un vero e proprio mare. Nel mare di lacrime, Alice nuota insieme a strani animali: un topo filosofo, un pappagallo saputello, una lucertola nervosa e un giovane aquilotto. Una volta raggiunta la riva, decidono che il modo migliore per asciugarsi è… una maratona senza senso, in cui tutti corrono in tondo senza mai fermarsi.\n\nNel suo viaggio, Alice incontra creature stravaganti e ambienti sempre più bizzarri: Pinco Panco e Panco Pinco, due gemelli che parlano in rima, si contraddicono e raccontano storie senza capo né coda, lasciando Alice ancora più confusa, un bruco filosofico, un giardino in cui i fiori parlano e cantano, ma escludono Alice perché non è uno di loro. Poi, uno strano Gatto dal sorriso inquietante: lo Stregatto, che le appare e scompare indicando mille direzioni… senza darne nessuna. Al centro di questo mondo eccentrico c’è il tè senza fine del Cappellaio Matto e del Leprotto Marzolino, un banchetto surreale dove il tempo sembra essersi fermato. Ma le stranezze non sono finite.\n\nAlice si ritrova nella reggia della Regina di Cuori, una sovrana bizzarra e collerica che comanda un esercito di carte da gioco. Le carte, trasformate in soldati e guardiani, marciano e sorvegliano il giardino come se fosse un campo di battaglia. Alice, disorientata, non capisce dove sia finita e, per non dare nell’occhio, prova a mimetizzarsi tra le carte. La Regina però la scorge subito e, con un sorriso tanto curioso quanto inquietante, la invita a giocare a croquet. Ma non è un croquet qualunque: le mazze sono fenicotteri vivi, le palline sono ricci e il campo è un groviglio caotico di comandi e urla. Nonostante tutto, Alice riesce a vincere la partita, e la Regina, furiosa, urla il suo celebre verdetto: “Tagliatele la testa!” Per far le cose con ordine, viene indetto un processo. Al banco dei testimoni sfilano uno dopo l’altro tutti i personaggi che Alice ha incontrato nel suo viaggio: ciascuno porta strane accuse, racconti sconclusionati e versioni diverse dei fatti. Il tribunale è una farsa, ma la Regina è implacabile. “Tagliatele la testa!” grida di nuovo, al culmine della sua furia.\n\nAlice allora fugge. Corre via mentre le carte-soldato la inseguono, tutto le gira intorno, i volti, le voci, le risate… fino a quando, all’improvviso, si risveglia. È di nuovo nel giardino, accanto alla sorella, come se nulla fosse accaduto. Forse era solo un sogno. O forse no." },
      { title: "PURE IMAGINATION – TIMOTHÉE CHALAMET", courses: "Coro delle allievedel corso canto: Silvia Dotale, Iris Iannotta, Sophie D. Perrella, Talita Pizzurno", choreographer: "", description: "Un intermezzo vocale che accompagna lo spettatore in un mondo dove l’imagination è l’unico confine." },
      { title: "ALICE’S THEME – DANNY ELFMAN", courses: "Corso: Contemporaneo 2", choreographer: "Coreografia: Matteo D’Alessio", description: "Danza il sogno di Alice: un percorso tra meraviglia, smarrimento e trasformazione." },
      { title: "CRAZY – INTERPRETI VARI", courses: "Corso: Hip Hop 2", choreographer: "Coreografia: Andrea Sgarra", description: "Sono diventato matto... ma lascia che ti dica una cosa: nella mia follia ho trovato la mia verità." },
    ]
  },
  {
    title: '🎬 SECONDO TEMPO',
    subtitle: 'Chicago',
    image: ChicagoImage,
    aspectRatio: 3.5, // Molto largo per adattarsi a Chicago
    description: "Tra paillettes, jazz e crimini a ritmo di danza, il secondo tempo è un viaggio nell’anima ribelle del musical più iconico di Broadway. Uno spettacolo carico di grinta, ironia e glamour.",
    choreographies: [
      { title: 'IERI COME OGGI: CALYPSO – ANALOG SOL', courses: "Corso: contemporaneo 3", choreographer: "Coreografia: Matteo D’Alessio", description: "La città corre: tra folla, silenzi e relazioni che si sfiorano senza toccarsi." },
      { title: 'CHARLESTON – SAM LEVINE', courses: "Corso: propedeutico", choreographer: "Coreografia: Danila Valentini", description: "" },
      { title: 'WELCOME TO CHICAGO – INTERPRETI VARI', courses: "Corsi: Hip Hop 2 e 3", choreographer: "Coreografia: Andrea Sgarra", description: "" },
      { title: 'CHICAGO – La città, lo scandalo, lo spettacolo', courses: "Corsi: propedeutico e moderno 1,2 e 3", choreographer: "Coreografia: Matteo D’Alessio e Danila Valentini e le assistenti Matilde Colombi e Maria Letizia Galati", description: "Nella Chicago degli anni ’20, il confine tra giustizia e spettacolo è solo una questione di luci. Velma Kelly, diva del vaudeville, apre la scena con All That Jazz, in un’esplosione di ritmo, fumo epaillettes. La città si sveglia… e con lei le sue bugie. Ma dietro quei riflettori si nasconde il sangue: Velma ha appena commesso un omicidio.\n\nAnche Roxie Hart ha una storia da raccontare. Il suo amante le ha promesso una carriera da star, come la sua paladina Velma. Ma quando le rivela che era solo una bugia per sedurla, Roxie, accecata dalla rabbia, gli spara. Presa dal panico, convince il marito, ingenuo e devoto, che si è trattato di legittima difesa contro uno stupratore, e lo spinge ad addossarsi la colpa. Ma la verità viene presto a galla. Tradito, il marito confessa tutto alla polizia. Roxie finisce in prigione.\n\nLì conosce Mama Morton, matrona autoritaria e pragmatica che comanda il carcere con una sola regola: chi sa come trattarla, avrà i suoi favori.\n\nIn prigione, Roxie incontra altre donne accusate di omicidio, tutte convinte di essere vittime di uomini meschini. Sei di loro raccontano la propria storia nel feroce e ironico Cell Block Tango.\n\nFuori dalle sbarre, c’è Billy Flynn: il più famoso e ambito avvocato della città. Narcisista, brillante, manipolatore, capace di trasformare ogni processo in un numero da palcoscenico.\n\nGià avvocato di Velma, Billy prende in carico anche il caso di Roxie e ne fa un fenomeno mediatico. La stampa viene manipolata come un’orchestra, i giornalisti come burattini. Roxie diventa un personaggio creato a tavolino, e la città si innamora della sua immagine. Roxie sogna gli applausi, i riflettori, il successo. Ma Velma non è pronta a cederle la scena. Oscurata dalla nuova diva, cerca di recuperare terreno e, alle strette, propone a Roxie di prendere il posto della sorella Veronica, la sua ex partner sul palco. Il processo si avvicina. Roxie è spaventata, ma Billy le promette che andrà tutto secondo copione.\n\nE così sarà: trionfa lo spettacolo sull’etica, la coreografia sul codice penale. Quando il sipario della giustizia cala, se ne apre un altro: quello del teatro. Roxie e Velma, ormai libere, salgono finalmente sul palco. Fiere, indipendenti, immortali È il loro manifesto: la vita è un palcoscenico, e loro non smetteranno mai di danzare." },
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
}

const ProgramSection = ({ section }: ProgramSectionProps) => (
  <View style={styles.programSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
    </View>
    <View style={[styles.imageContainer, { aspectRatio: section.aspectRatio }]}>
      <Image
        source={section.image}
        style={styles.sectionImage}
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
  
  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

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

      <View style={styles.content}>
        <ProgramSection section={programData[0]} />
        <ProgramSection section={programData[1]} />

        <View style={styles.thanksSection}>
          <View style={styles.thanksHeader}>
            <Heart size={36} color="#c8151b" />
            <Text style={styles.thanksTitle}>Saluti e Ringraziamenti Speciali</Text>
          </View>
          <View style={styles.thanksCard}>
            <Text style={styles.thanksText}>
                Un grazie sentito a tutte le allieve e gli allievi, che ogni anno ci ricordano quanto sia potente la passione.{'\n\n'}
                Un grazie alle famiglie, che sostengono questo percorso
                con fiducia e affetto.{'\n\n'}
                Grazie a chi ha collaborato dietro le quinte, chi ha cucito un costume, montato una luce, offerto un sorriso.{'\n\n'}
                E infine grazie a voi, pubblico, perché ogni applauso accende qualcosa dentro.{'\n'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}


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
  imageContainer: { 
    width: '100%',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'F8F8F8',
  },
  sectionImage: { 
    width: '100%',
    height: '100%',
  },
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