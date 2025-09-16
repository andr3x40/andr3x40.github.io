import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Humandroid (Default Theme)
export const HumandroidTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{neutral.50}',
                    100: '{neutral.100}',
                    200: '{neutral.200}',
                    300: '{neutral.300}',
                    400: '{neutral.400}',
                    500: '{neutral.500}',
                    600: '{neutral.600}',
                    700: '{neutral.700}',
                    800: '{neutral.800}',
                    900: '{neutral.900}',
                    950: '{neutral.950}'
                }
            }
        }
    },
    components: {
        panel: {
            root: {
                borderRadius: '16px',
            }
        },
        dataview: {
            colorScheme: {
                dark: {
                    header: {
                        background: '{surface.950}',
                    },
                    content: {
                        background: '{surface.950}',
                    },
                    footer: {
                        background: '{surface.950}',
                    }
                }
            }
        },
        paginator: {
            colorScheme: {
                dark: {
                    root: {
                        background: '{surface.950}'
                    }
                }
            }
        }
    }
});