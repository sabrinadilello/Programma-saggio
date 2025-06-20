import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, Info, ClipboardList, Users } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';


function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) { 
  const activeColor = '#FFFFFF';
  const inactiveColor = '#FFFFFF80'; // Bianco con trasparenza

  // Il return deve stare DENTRO la funzione
  return (
    <LinearGradient
      colors={['#1A1A1A', '#c8151b']}
      style={styles.tabBarContainer}
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {/* Qui rendiamo l'icona corretta per ogni tab */}
            {label === 'Home' && <Home color={isFocused ? activeColor : inactiveColor} size={24} />}
            {label === 'Info' && <Info color={isFocused ? activeColor : inactiveColor} size={24} />}
            {label === 'Programma' && <ClipboardList color={isFocused ? activeColor : inactiveColor} size={24} />}
            {label === 'Contatti' && <Users color={isFocused ? activeColor : inactiveColor} size={24} />}
            
            <Text style={{ color: isFocused ? activeColor : inactiveColor, fontSize: 12, marginTop: 4 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
// La parentesi graffa di chiusura della funzione va qui, alla fine!
}


export default function TabsLayout() {
  return (
    <Tabs
      // La riga magica: usiamo il nostro componente personalizzato
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="info" options={{ title: 'Info' }} />
      <Tabs.Screen name="program" options={{ title: 'Programma' }} />
      <Tabs.Screen name="contacts" options={{ title: 'Contatti' }} />
    </Tabs>
  );
}

// --- 3. STILI PER LA NOSTRA TAB BAR PERSONALIZZATA ---

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 80, // Manteniamo l'altezza che volevi
    paddingBottom: 20, // Spazio per la barra home di iPhone
    paddingTop: 10,
    borderTopLeftRadius: 20, // Aggiungiamo un tocco di stile con bordi arrotondati
    borderTopRightRadius: 20,
    position: 'absolute', // La posizioniamo in modo che stia "sopra" il contenuto
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10, // Ombra per Android
    shadowColor: '#000', // Ombra per iOS
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});