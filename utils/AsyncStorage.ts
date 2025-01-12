import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageItem {
    [key: string]: any;
}

export class Storage {
    static async setItem(key: string, value: StorageItem): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting item:', error);
        }
    }

    static async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting item:', error);
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    static async mergeItem(key: string, value: StorageItem): Promise<void> {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error merging item:', error);
        }
    }

    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }

    static async getAllKeys(): Promise<string[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return [...keys]; // Convert readonly string[] to mutable string[]
        } catch (error) {
            console.error('Error getting all keys:', error);
            return [];
        }
    }

    static async getAllItems(): Promise<Record<string, StorageItem>> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const items = await AsyncStorage.multiGet(keys);
            return items.reduce((accumulator, [key, value]) => {
                if (value != null) {
                    accumulator[key] = JSON.parse(value);
                }
                return accumulator;
            }, {} as Record<string, StorageItem>);
        } catch (error) {
            console.error('Error getting all items:', error);
            return {};
        }
    }
}
