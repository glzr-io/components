import { defineConfig } from 'tsup';
import * as preset from 'tsup-preset-solid';

const presetOptions: preset.PresetOptions = {
  entries: [
    {
      // Entries with a '.tsx' extension will have a generated `solid`
      // export condition.
      entry: 'src/index.tsx',
    },
  ],
};

export default defineConfig(config => {
  const parsedOptions = preset.parsePresetOptions(
    presetOptions,
    !!config.watch,
  );

  return preset.generateTsupOptions(parsedOptions);
});
