import React, { useRef } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Info as InfoIcon, MapPin, ExternalLink } from 'lucide-react-native';

import LocandinaImageSource from '../../assets/images/locandina.jpg';

export default function InfoScreen() {
  const scrollRef = useRef<ScrollView>(null);
  
  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );
  
  const teatroAddress = 'Teatro Domma, Via di Macchia Saponara 106, 00125 Roma';

  const openMaps = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const url = scheme + encodeURIComponent(teatroAddress);
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <LinearGradient
        colors={['#1A1A1A', '#c8151b']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <InfoIcon size={48} color="#D4AF37" />
          <Text style={styles.title}>Info Serata</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* MODIFICA CHIAVE: Aggiunto il contenitore con la logica corretta */}
        <View style={styles.imageContainer}>
          <Image
            source={LocandinaImageSource}
            style={styles.locandinaImage}
            resizeMode="contain"
          />
        </View>
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Il Teatro</Text>
          <View style={styles.infoCard}>
            <MapPin size={24} color="#c8151b" style={{ marginRight: 15 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.theaterName}>Teatro Domma</Text>
              <Text style={styles.theaterAddress}>Via di Macchia Saponara 106, 00125 Roma</Text>
              <TouchableOpacity style={styles.linkContainer} onPress={openMaps}>
                <Text style={styles.linkText}>👉 Apri in Google Maps</Text>
                <ExternalLink size={16} color="#c8151b" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContentContainer: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  // --- MODIFICHE APPLICATE QUI ---
  imageContainer: {
    width: '100%',
    // Usiamo il rapporto reale della locandina (1131/1600 ≈ 0.7) per un fit perfetto
    aspectRatio: 1131 / 1600,
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden', // Per sicurezza
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  locandinaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Applichiamo il raggio anche qui per essere sicuri
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  theaterName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
  },
  theaterAddress: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
    lineHeight: 22,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#c8151b',
    marginRight: 8,
  },
});