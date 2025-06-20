import React, { useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, ExternalLink } from 'lucide-react-native';

// --- MODIFICA 1: Importa l'immagine come un modulo ---
// Questo è il metodo corretto che funziona sia su mobile che su web
import StaffImage from '../../assets/images/staff.jpg';

// --- MODIFICA 2: Calcoli dinamici per l'altezza ---
// Questo rimane invariato, useremo i dati dell'immagine in un altro modo
const screenWidth = Dimensions.get('window').width;

export default function ContactsScreen() {
  const scrollRef = useRef<ScrollView>(null);
  
  // --- MODIFICA 3: Usiamo lo state per gestire l'altezza dell'immagine ---
  const [imageHeight, setImageHeight] = useState(300); // Un valore di fallback

  // Calcoliamo l'altezza corretta solo dopo aver ottenuto le dimensioni dell'immagine
  Image.getSize(StaffImage, (width, height) => {
    // Calcoliamo l'altezza che l'immagine deve avere per mantenere le proporzioni
    // quando la sua larghezza è pari a quella dello schermo (meno il padding)
    const calculatedHeight = ((screenWidth - 40) / width) * height;
    if (imageHeight !== calculatedHeight) {
      setImageHeight(calculatedHeight);
    }
  });
  
  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );
  
  const openMaps = () => {
    const address = 'Via Mare di Bering 42, Ostia';
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const openPhone = () => { Linking.openURL('tel:+393922752576'); };
  const openEmail = () => { Linking.openURL('mailto:info@centrostudiartisceniche.it'); };
  const openWebsite = () => { Linking.openURL('https://www.centrostudiartisceniche.it'); };
  const openInstagram = () => { Linking.openURL('https://instagram.com/centrostudiartisceniche'); };
  const openFacebook = () => { Linking.openURL('https://facebook.com/centrostudiartisceniche'); };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}>
      <LinearGradient colors={['#1A1A1A', '#c8151b']} style={styles.header}>
        <View style={styles.headerContent}>
          <Phone size={48} color="#D4AF37" />
          <Text style={styles.title}>Contatti e Informazioni</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            // --- MODIFICA 4: Usiamo la variabile importata ---
            source={StaffImage}
            // Applichiamo lo stile con l'altezza calcolata dinamicamente
            style={[styles.mainImage, { height: imageHeight }]}
            resizeMode="contain"
          />
        </View>

        {/* ... il resto del tuo codice rimane identico ... */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={32} color="#c8151b" />
            <Text style={styles.sectionTitle}>Dove siamo</Text>
          </View>
          <TouchableOpacity style={styles.contactItem} onPress={openMaps}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Via Mare di Bering 42, Ostia</Text>
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>👉 Apri in Google Maps</Text>
                <ExternalLink size={16} color="#c8151b" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Phone size={32} color="#c8151b" />
            <Text style={styles.sectionTitle}>Contatti</Text>
          </View>
          <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Telefono:</Text>
              <Text style={styles.contactText}>392 2752576</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactText}>info@centrostudiartisceniche.it</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={32} color="#c8151b" />
            <Text style={styles.sectionTitle}>Online</Text>
          </View>
          <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
            <View style={styles.contactRow}>
              <Globe size={20} color="#666" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Sito web:</Text>
                <Text style={styles.contactText}>www.centrostudiartisceniche.it</Text>
              </View>
              <ExternalLink size={16} color="#c8151b" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={openInstagram}>
            <View style={styles.contactRow}>
              <Instagram size={20} color="#666" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Instagram:</Text>
                <Text style={styles.contactText}>@centrostudiartisceniche</Text>
              </View>
              <ExternalLink size={16} color="#c8151b" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={openFacebook}>
            <View style={styles.contactRow}>
              <Facebook size={20} color="#666" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Facebook:</Text>
                <Text style={styles.contactText}>Centro Studi Arti Sceniche</Text>
              </View>
              <ExternalLink size={16} color="#c8151b" />
            </View>
          </TouchableOpacity>
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
    paddingBottom: 90,
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
  imageContainer: {
    marginBottom: 30,
  },
  mainImage: {
    width: '100%',
    borderRadius: 12,
    // --- MODIFICA 5: L'altezza viene applicata dinamicamente ---
    // Rimuoviamo l'altezza da qui, perché la passiamo direttamente allo stile del componente
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  contactItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#c8151b',
    marginRight: 8,
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#D4AF37',
    textAlign: 'center',
    lineHeight: 24,
  },
});