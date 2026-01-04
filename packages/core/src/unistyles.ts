// Re-export theme configuration from @dreamstack-us/kaal-themes
// This ensures the module augmentation is applied
export { configureKaalThemes } from '@dreamstack-us/kaal-themes';

// Import to ensure type augmentation is applied during build
import '@dreamstack-us/kaal-themes';
