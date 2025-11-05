import AsyncStorage from '@react-native-async-storage/async-storage';
import { Capsule } from '@/types/capsule';

const CAPSULES_KEY = '@capsules';
const MAX_CAPSULES = 10;

/**
 * Get all saved capsules
 */
export async function getAllCapsules(): Promise<Capsule[]> {
  try {
    const capsulesJson = await AsyncStorage.getItem(CAPSULES_KEY);
    if (!capsulesJson) return [];
    return JSON.parse(capsulesJson);
  } catch (error) {
    console.error('Error loading capsules:', error);
    return [];
  }
}

/**
 * Get a specific capsule by ID
 */
export async function getCapsuleById(id: string): Promise<Capsule | null> {
  try {
    const capsules = await getAllCapsules();
    return capsules.find((c) => c.id === id) || null;
  } catch (error) {
    console.error('Error loading capsule:', error);
    return null;
  }
}

/**
 * Save a new capsule or update existing one
 */
export async function saveCapsule(capsule: Capsule): Promise<boolean> {
  try {
    const capsules = await getAllCapsules();
    const existingIndex = capsules.findIndex((c) => c.id === capsule.id);

    if (existingIndex >= 0) {
      // Update existing capsule
      capsules[existingIndex] = capsule;
    } else {
      // Add new capsule
      if (capsules.length >= MAX_CAPSULES) {
        throw new Error(`Maximum of ${MAX_CAPSULES} capsules allowed`);
      }
      capsules.push(capsule);
    }

    await AsyncStorage.setItem(CAPSULES_KEY, JSON.stringify(capsules));
    return true;
  } catch (error) {
    console.error('Error saving capsule:', error);
    return false;
  }
}

/**
 * Delete a capsule by ID
 */
export async function deleteCapsule(id: string): Promise<boolean> {
  try {
    const capsules = await getAllCapsules();
    const filtered = capsules.filter((c) => c.id !== id);
    await AsyncStorage.setItem(CAPSULES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting capsule:', error);
    return false;
  }
}

/**
 * Duplicate a capsule with a new name
 */
export async function duplicateCapsule(
  id: string,
  newName: string
): Promise<Capsule | null> {
  try {
    const original = await getCapsuleById(id);
    if (!original) return null;

    const duplicate: Capsule = {
      ...original,
      id: `capsule_${Date.now()}`,
      name: newName,
      createdDate: Date.now(),
    };

    const success = await saveCapsule(duplicate);
    return success ? duplicate : null;
  } catch (error) {
    console.error('Error duplicating capsule:', error);
    return null;
  }
}

/**
 * Generate a unique name for a capsule if duplicate exists
 */
export async function getUniqueCapsuleName(baseName: string): Promise<string> {
  const capsules = await getAllCapsules();
  const existingNames = capsules.map((c) => c.name);

  if (!existingNames.includes(baseName)) {
    return baseName;
  }

  let counter = 2;
  let newName = `${baseName} (${counter})`;

  while (existingNames.includes(newName)) {
    counter++;
    newName = `${baseName} (${counter})`;
  }

  return newName;
}
