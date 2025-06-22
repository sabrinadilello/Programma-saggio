import React, { useRef } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, ExternalLink } from 'lucide-react-native';

import StaffImage from '../../assets/images/staff.jpg';

export default function ContactsScreen() {
  const scrollRef = useRef<ScrollView>(null);
  
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
      contentContainerStyle={styles.scrollContentContainer}
      >
      <LinearGradient colors={['#1A1A1A', '#c8151b']} style={styles.header}>
        <View style={styles.headerContent}>
          <Phone size={48} color="#D4AF37" />
          <Text style={styles.title}>Contatti e Informazioni</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* MODIFICA: Rimosso il <View> contenitore. L'immagine ora vive da sola. */}
        <Image
          source={StaffImage}
          style={styles.mainImage}
          resizeMode="contain" 
        />

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
  // MODIFICA: Ora c'è solo uno stile per l'immagine, pulito e senza conflitti.
  mainImage: {
    width: '100%',
    aspectRatio: 1600 / 602, // Usa le dimensioni reali del tuo file
    borderRadius: 12,
    marginBottom: 30,
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
});