import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

// Import all garment illustrations
import {
  HeavyLayersIllustration,
  MediumLayersIllustration,
  LightLayersIllustration,
  SingleLayerIllustration,
  BlazerIllustration,
  DenimJacketIllustration,
  SunAccessoriesIllustration,
  WinterAccessoriesIllustration,
  BagIllustration,
  UmbrellaIllustration,
  JewelryIllustration,
  GlovesIllustration,
  BootsIllustration,
  SneakersIllustration,
  SandalsIllustration,
  LoafersIllustration,
  AnkleBootsIllustration,
  InsulatedBootsIllustration,
} from '@/components/illustrations/garment-illustrations';

// Import weather illustrations
import {
  ClearSkyIllustration,
  PartlyCloudyIllustration,
  OvercastIllustration,
  RainIllustration,
  SnowIllustration,
  ThunderstormIllustration,
  FoggyIllustration,
} from '@/components/illustrations/weather-illustrations';

// Import fashion illustrations
import { illustrations } from '@/components/illustrations/fashion-illustrations';

// Import lunar phase illustrations
import {
  NewMoonIllustration,
  WaxingCrescentIllustration,
  FirstQuarterIllustration,
  WaxingGibbousIllustration,
  FullMoonIllustration,
  WaningGibbousIllustration,
  LastQuarterIllustration,
  WaningCrescentIllustration,
} from '@/components/illustrations/lunar-illustrations';

export default function IllustrationPreviewScreen() {
  const illustrationColor = useThemeColor({}, 'text');

  const layersIllustrations = [
    { name: 'Heavy Layers', component: HeavyLayersIllustration },
    { name: 'Medium Layers', component: MediumLayersIllustration },
    { name: 'Light Layers', component: LightLayersIllustration },
    { name: 'Single Layer', component: SingleLayerIllustration },
    { name: 'Blazer', component: BlazerIllustration },
    { name: 'Denim Jacket', component: DenimJacketIllustration },
  ];

  const accessoriesIllustrations = [
    { name: 'Sun Accessories', component: SunAccessoriesIllustration },
    { name: 'Winter Accessories', component: WinterAccessoriesIllustration },
    { name: 'Bag', component: BagIllustration },
    { name: 'Umbrella', component: UmbrellaIllustration },
    { name: 'Jewelry', component: JewelryIllustration },
    { name: 'Gloves', component: GlovesIllustration },
  ];

  const footwearIllustrations = [
    { name: 'Boots', component: BootsIllustration },
    { name: 'Sneakers', component: SneakersIllustration },
    { name: 'Sandals', component: SandalsIllustration },
    { name: 'Loafers', component: LoafersIllustration },
    { name: 'Ankle Boots', component: AnkleBootsIllustration },
    { name: 'Insulated Boots', component: InsulatedBootsIllustration },
  ];

  const weatherIllustrations = [
    { name: 'Clear Sky', component: ClearSkyIllustration },
    { name: 'Partly Cloudy', component: PartlyCloudyIllustration },
    { name: 'Overcast', component: OvercastIllustration },
    { name: 'Rain', component: RainIllustration },
    { name: 'Snow', component: SnowIllustration },
    { name: 'Thunderstorm', component: ThunderstormIllustration },
    { name: 'Foggy', component: FoggyIllustration },
  ];

  const fashionIllustrations = [
    { name: 'Spy', component: illustrations.spy },
    { name: 'Ghost', component: illustrations.ghost },
    { name: 'Music', component: illustrations.music },
    { name: 'Socks', component: illustrations.socks },
    { name: 'Color', component: illustrations.color },
    { name: 'Necklaces', component: illustrations.necklaces },
    { name: 'Cowboy', component: illustrations.cowboy },
    { name: 'Dress', component: illustrations.dress },
    { name: 'Lipstick', component: illustrations.lipstick },
    { name: 'Rings', component: illustrations.rings },
    { name: 'Patterns', component: illustrations.patterns },
    { name: 'Sparkle', component: illustrations.sparkle },
    { name: 'High Heels', component: illustrations.highheels },
    { name: 'Handbag', component: illustrations.handbag },
    { name: 'Bow Tie', component: illustrations.bowtie },
    { name: 'Perfume', component: illustrations.perfume },
    { name: 'Sunhat', component: illustrations.sunhat },
    { name: 'Scarf', component: illustrations.scarf },
    { name: 'Ballet Flats', component: illustrations.balletflats },
    { name: 'Blazer', component: illustrations.blazericon },
    { name: 'Earrings', component: illustrations.earrings },
    { name: 'Clutch', component: illustrations.clutch },
    { name: 'Beret', component: illustrations.beret },
    { name: 'Watch', component: illustrations.watch },
    { name: 'Flower', component: illustrations.flower },
    { name: 'Trench Coat', component: illustrations.trenchcoat },
    { name: 'Sneaker', component: illustrations.sneaker },
    { name: 'Pocket Square', component: illustrations.pocketsquare },
    { name: 'Boots', component: illustrations.booticon },
    { name: 'Crown', component: illustrations.crown },
    { name: 'Button', component: illustrations.button },
    { name: 'Mirror', component: illustrations.mirror },
    { name: 'Feather', component: illustrations.feather },
    { name: 'Zipper', component: illustrations.zipper },
    { name: 'Pearl', component: illustrations.pearl },
    { name: 'Thread', component: illustrations.thread },
    { name: 'Lace', component: illustrations.lace },
    { name: 'Stiletto', component: illustrations.stiletto },
    { name: 'Tie', component: illustrations.tie },
    { name: 'Brooch', component: illustrations.brooch },
    { name: 'Glove', component: illustrations.glove },
    { name: 'Cufflinks', component: illustrations.cufflinks },
    { name: 'Kimono', component: illustrations.kimono },
    { name: 'Sandal', component: illustrations.sandalicon },
    { name: 'Vest', component: illustrations.vest },
    { name: 'Collar', component: illustrations.collar },
    { name: 'Pocket', component: illustrations.pocket },
    { name: 'Block Heel', component: illustrations.blockheel },
    { name: 'Belt', component: illustrations.belt },
    { name: 'Jumpsuit', component: illustrations.jumpsuit },
  ];

  const lunarIllustrations = [
    { name: 'New Moon', component: NewMoonIllustration },
    { name: 'Waxing Crescent', component: WaxingCrescentIllustration },
    { name: 'First Quarter', component: FirstQuarterIllustration },
    { name: 'Waxing Gibbous', component: WaxingGibbousIllustration },
    { name: 'Full Moon', component: FullMoonIllustration },
    { name: 'Waning Gibbous', component: WaningGibbousIllustration },
    { name: 'Last Quarter', component: LastQuarterIllustration },
    { name: 'Waning Crescent', component: WaningCrescentIllustration },
  ];

  const renderSection = (title: string, items: Array<{ name: string; component: any }>) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={styles.illustrationCard}>
            <View style={styles.illustrationContainer}>
              <item.component size={80} color={illustrationColor} />
            </View>
            <ThemedText style={styles.illustrationName}>{item.name}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Illustration Library</ThemedText>
          <ThemedText style={styles.subtitle}>Preview of all available illustrations</ThemedText>
        </View>

        {renderSection('Garment Layers', layersIllustrations)}
        {renderSection('Accessories', accessoriesIllustrations)}
        {renderSection('Footwear', footwearIllustrations)}
        {renderSection('Weather', weatherIllustrations)}
        {renderSection('Lunar Phases', lunarIllustrations)}
        {renderSection('Fashion / Zodiac', fashionIllustrations)}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    ...Typography.title,
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.subtitle,
    fontSize: 12,
    letterSpacing: 2,
    opacity: 0.6,
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  illustrationCard: {
    width: '30%',
    minWidth: 100,
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 4,
  },
  illustrationContainer: {
    marginBottom: 12,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationName: {
    ...Typography.caption,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
