# Chakra UI v3 Migration Status

## Overview
This document tracks the progress of migrating from Chakra UI v2 to Chakra UI v3.

## Completed Work

### ✅ 1. Package Updates
- Updated `@chakra-ui/react` from v2.10.9 to v3.29.0
- Removed deprecated packages:
  - `@chakra-ui/anatomy` (now bundled in main package)
  - `@chakra-ui/icon` (now bundled in main package)
  - `@chakra-ui/system` (now bundled in main package)
  - `@chakra-ui/utils` (now bundled in main package)
  - `@chakra-ui/next-js` (integration built into v3)
- Updated `framer-motion` from v7.10.3 to v11.15.0 (required for v3 compatibility)

### ✅ 2. Theme System Migration
- Created new `system.ts` file using v3's `createSystem` and `defineConfig` APIs
- Migrated from `extendTheme` to `createSystem` with `defineConfig`
- Converted all component styles to use v3 recipe formats:
  - `defineStyleConfig` → `defineRecipe` (for single-part components)
  - `createMultiStyleConfigHelpers` → `defineSlotRecipe` (for multi-part components)

### ✅ 3. Component Recipe Updates
All component style definitions have been updated to v3 format:
- **Button**: Converted to `defineRecipe` with `base` and `variants`
- **Input**: Converted to `defineSlotRecipe` with slots for field, addon, element
- **Checkbox**: Converted to `defineSlotRecipe` with slots for root, control, label, indicator
- **Text**: Converted to `defineRecipe`
- **FormLabel**: Converted to `defineRecipe`
- **Alert**: Converted to `defineRecipe`
- **Menu**: Converted to `defineSlotRecipe` with trigger, content, item slots
- **Switch**: Converted to `defineSlotRecipe`
- **Table**: Converted to `defineRecipe` (kept simple structure for compatibility)

### ✅ 4. Provider Configuration
- Updated `_app.tsx` to use `ChakraProvider` with `value` prop instead of `theme` prop
- Changed from `<ChakraProvider theme={theme}>` to `<ChakraProvider value={system}>`

### ✅ 5. Icon Updates
- Updated all custom icon imports from `@chakra-ui/icon` to `@chakra-ui/react`
- `createIcon` is still available in v3 with the same API

### ✅ 6. Component API Updates (Partial)
- **IconButton**: Changed `icon` prop to use children instead
  - Before: `<IconButton icon={<MyIcon />} />`
  - After: `<IconButton><MyIcon /></IconButton>`
- **Text**: Changed `noOfLines` to `lineClamp`
  - Before: `<Text noOfLines={1}>`
  - After: `<Text lineClamp={1}>`
- **FormControl**: Migrated to Field API
  - `FormControl` → `Field.Root`
  - `FormErrorMessage` → `Field.ErrorText`
  - `isInvalid` → `invalid`

## Remaining Work

### ⚠️ 1. Component API Conversions (Major)
Many components in v3 use composition patterns instead of single components. The following need complete rewrites:

#### Checkbox Component
V2 API (single component):
```tsx
<Checkbox 
  isChecked={checked}
  isDisabled={disabled}
  isInvalid={invalid}
  icon={customIcon}
>
  Label text
</Checkbox>
```

V3 API (composition):
```tsx
<Checkbox.Root checked={checked} disabled={disabled} invalid={invalid}>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Label text</Checkbox.Label>
</Checkbox.Root>
```

Files needing update:
- `src/presentation/base/input/checkboxField.tsx` (PARTIALLY DONE)
- `src/presentation/base/input/customFillCheckbox.tsx` (PARTIALLY DONE)
- All form pages using checkboxes

#### Radio Component
Similar composition pattern as Checkbox:
```tsx
<RadioGroup.Root>
  <RadioGroup.Item value="1">
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
  </RadioGroup.Item>
</RadioGroup.Root>
```

Files needing update:
- `src/presentation/base/input/radioItem.tsx`
- `src/presentation/base/input/radioField.tsx`
- All form pages using radio buttons

#### Input Components
The Input component structure has changed, and InputRightElement has been renamed:
- `InputRightElement` → `InputElement` with `placement="end"`
- `InputLeftElement` → `InputElement` with `placement="start"`

Files needing update:
- `src/presentation/base/input/searchField.tsx`
- `src/presentation/base/input/textField.tsx`
- Any components using InputGroup with elements

#### Field API
Additional Field API changes needed:
- `FormHelperText` → `Field.HelperText`
- Field.ErrorText children handling changed
- Field variants may need adjustment

### ⚠️ 2. Missing Exports/APIs
The following v2 APIs are not available in v3 and need alternatives:

- `useTheme()` - May need to use `useChakra()` or different approach
- `sx` prop - Replaced with `css` prop
- `textColor` prop - Should use `color` directly
- Some component variants may no longer exist (e.g., "searchField" for Input)

### ⚠️ 3. Type Definitions
Many TypeScript interfaces have changed:
- `CheckboxProps` → Component-specific props for Checkbox.Root, Checkbox.Control, etc.
- `RadioProps` → Similar restructuring
- `FormControlProps` → Removed (use Field props)
- `InputProps`, `TextareaProps` may have changed

### ⚠️ 4. Custom Variants
Custom variants defined in theme may need adjustment to match v3's variant structure:
- Input "searchField" variant may not work out of the box
- Checkbox "customFill" variant needs verification
- Table variants using CSS selectors may need updates

### ⚠️ 5. Build and Runtime Testing
- TypeScript compilation currently has ~150 errors
- Need to fix all type errors before build can succeed
- Need runtime testing to verify components work correctly
- Need to test all forms and user interactions

## Migration Strategy

### Recommended Approach

1. **Option A: Complete V3 Migration (Recommended Long-term)**
   - Continue fixing all component API usages
   - Update all form components to use v3 composition patterns
   - Test thoroughly
   - Estimated effort: 2-3 days of development work

2. **Option B: Hybrid Approach**
   - Create wrapper components that expose v2-like APIs but use v3 internally
   - Gradually migrate forms one at a time
   - Estimated effort: 3-4 days initially, ongoing migration

3. **Option C: Stay on V2**
   - Revert all changes and stay on Chakra UI v2
   - V2 is stable and working
   - Migrate to v3 when there's a business need or security requirement

### Files Requiring Updates (Estimated)

- **Base Components**: ~15 files
  - Input components (textField, searchField, etc.)
  - Checkbox components
  - Radio components
  - Other form controls

- **Form Pages**: ~5-8 files
  - intake-vlos
  - intake-osa-vlos
  - new-client
  - old-client
  - Any other forms using affected components

- **Other Components**: ~10-15 files
  - Components using affected Chakra components
  - Layout components
  - Custom wrappers

## Key Differences: V2 vs V3

### Philosophy Change
- **V2**: Monolithic components with many props
- **V3**: Composition-based components with explicit structure

### Benefits of V3
- Better accessibility out of the box
- More flexible customization
- Smaller bundle sizes (tree-shakeable)
- Better TypeScript support
- Modern React patterns

### Challenges of V3
- Breaking changes across most components
- More verbose component usage
- Significant migration effort for existing codebases
- Learning curve for composition patterns

## Resources

- [Chakra UI v3 Documentation](https://www.chakra-ui.com/)
- [Migration Guide](https://www.chakra-ui.com/docs/get-started/migration)
- [Changelog](https://github.com/chakra-ui/chakra-ui/releases)

## Current Build Status

- **TypeScript Errors**: ~150
- **Build Status**: ❌ Failing
- **Main Blocker**: Component API incompatibilities

## Next Immediate Steps

1. Fix Checkbox component usage across all files
2. Fix Radio component usage
3. Fix Input components (InputElement usage)
4. Fix Field.ErrorText children handling
5. Remove/replace missing exports (useTheme, etc.)
6. Test compilation
7. Test runtime behavior
8. Test all forms manually

## Notes

- This is a significant migration requiring careful testing
- Consider the time investment vs staying on v2
- V3 is a ground-up rewrite, not just an incremental update
- Many patterns familiar from v2 no longer exist in v3
