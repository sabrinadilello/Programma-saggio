import React, { useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions, Easing, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';

// --- MODIFICA 1: Re-importata l'immagine del logo ---
import LogoImage from '../../assets/images/logo.jpeg'; 
import LeftCurtainImage from '../../assets/images/curtain-left.png';
import RightCurtainImage from '../../assets/images/curtain-right.png';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const curtainAnimation = useRef(new Animated.Value(0)).current;
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  // --- MODIFICA 2: Ripristinato lo stato e il calcolo per l'altezza dinamica del logo ---
  const [logoHeight, setLogoHeight] = useState(300); // Valore di fallback

  Image.getSize(String(LogoImage), (width, height) => {
    // Calcola l'altezza dell'immagine per adattarla alla larghezza dello schermo meno il padding
    const imageWidth = screenWidth - 40; // 20 di padding a sinistra e 20 a destra
    const calculatedHeight = (imageWidth / width) * height;
    setLogoHeight(calculatedHeight);
  });
  
  useFocusEffect(
    useCallback(() => {
      // Resetta l'animazione ogni volta che la schermata viene visualizzata
      
      curtainAnimation.setValue(0);
      setIsAnimationComplete(false);
      
      const animation = Animated.timing(curtainAnimation, {
        toValue: 1,
        duration: 2500,
        delay: 500,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      });

      animation.start(() => {
        setIsAnimationComplete(true);
      });

      // Funzione di pulizia per fermare l'animazione se si cambia schermata
      return () => {
        animation.stop(); 
        curtainAnimation.setValue(0);
        setIsAnimationComplete(false);
      };
    }, [])
  );

  const leftCurtainTranslateX = curtainAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -screenWidth / 2],
  });

  const rightCurtainTranslateX = curtainAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth / 2],
  });

  const curtainOpacity = curtainAnimation.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContentContainer}
        scrollEnabled={isAnimationComplete}
        removeClippedSubviews={false}
      >
    
        <View style={styles.content}>
          {/* --- MODIFICA 3: Aggiunto il componente Image per il logo --- */}
          <Image
            source={LogoImage}
            style={[styles.logoImage, { height: logoHeight }]}
            resizeMode="contain"
          />

          <View style={styles.textSection}>
            <Text style={styles.introText}>
              Ci sono momenti che si attendono a lungo.{'\n\n'}
              Momenti in cui il cuore batte più forte, le luci si abbassano, il silenzio avvolge la sala… e poi tutto inizia.{'\n\n'}
              Questa sera è uno di quei momenti.{'\n\n'}
              È con grande gioia che vi accogliamo al nostro saggio di fine anno: una celebrazione di ogni singolo passo compiuto dalle nostre allieve – dalle più piccole alle più grandi.{'\n\n'}
              Quello che vedrete sul palco è il risultato di mesi di impegno, disciplina, emozioni condivise.{'\n\n'}
              Quando si danza, si cresce. Si scopre sé stessi, si trova il coraggio di brillare davanti agli altri.{'\n\n'}
              Grazie per essere qui. Buon spettacolo!
            </Text>
          </View>

          <View style={styles.dedicationSection}>
            <Text style={styles.dedicationTitle}>Dediche</Text>
            <Text style={styles.dedicationText}>
              "A chi ha creduto in sé stesso per la prima volta."
            </Text>
            <Text style={styles.dedicationText}>
              "A chi ha scelto di brillare, nonostante la fatica."
            </Text>
            <Text style={styles.dedicationText}>
              "A chi ha danzato con il cuore e con l'anima."
            </Text>
            <Text style={styles.dedicationFooter}>
              Questo saggio è per voi.
            </Text>
          </View>

          <View style={styles.signatureSection}>
            <Text style={styles.signatureName}>Matteo D'Alessio</Text>
            <Text style={styles.signatureTitle}>Direzione Artistica – Centro Studi Arti Sceniche</Text>
          </View>
        </View>
      </ScrollView>

      {/* Il sipario animato */}
      {!isAnimationComplete && (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <Animated.Image 
            source={LeftCurtainImage}
            style={[
              styles.curtain,
              styles.leftCurtain,
              { 
                transform: [{ translateX: leftCurtainTranslateX }],
                opacity: curtainOpacity
              }
            ]}
            resizeMode="cover"
          /> 
          <Animated.Image
            source={RightCurtainImage} 
            style={[
              styles.curtain,
              styles.rightCurtain,
              { 
                transform: [{ translateX: rightCurtainTranslateX }],
                opacity: curtainOpacity
              }
            ]}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

// Gli stili rimangono gli stessi
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContentContainer: {
    paddingTop: 20, 
    paddingBottom: 120,
  },
  content: {
    paddingHorizontal: 20,
  },
  // --- MODIFICA 4: Aggiunto lo stile per il logo ---
  logoImage: {
    width: '100%',
    marginBottom: 40, // Spazio tra il logo e il testo successivo
  },
  textSection: {
    marginBottom: 40,
  },
  introText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  dedicationSection: {
    marginBottom: 40,
  },
  dedicationTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#c8151b',
    textAlign: 'center',
    marginBottom: 20,
  },
  dedicationText: {
    fontSize: 16,
    fontFamily: 'Inter-Italic', 
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  dedicationFooter: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#c8151b',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  signatureSection: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#E0E0E0',
  },
  signatureName: {
    fontSize: 20,
    fontFamily: 'Inter-BoldItalic',
    fontStyle: 'italic',
    fontWeight: 'bold', 
    color: '#1A1A1A',
    marginBottom: 8,
  },
  signatureTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
  curtain: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '51%',
    zIndex: 10,
  },
  leftCurtain: {
    left: 0,
  },
  rightCurtain: {
    right: 0,
  },
});