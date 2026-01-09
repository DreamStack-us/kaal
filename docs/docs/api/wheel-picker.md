---
sidebar_position: 4
---

# WheelPicker

The `WheelPicker` component provides an iOS-style spinning wheel for selecting values. It's used internally by DatePicker and TimePicker wheel variants.

## Import

```tsx
import { WheelPicker } from '@dreamstack-us/kaal';
```

## Props

### `items`

**Type:** `Array<{ label: string; value: string | number }>`
**Required:** Yes

The items to display in the wheel.

```tsx
const months = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  // ...
];
```

### `selectedIndex`

**Type:** `number`
**Required:** Yes

The index of the currently selected item.

### `onSelect`

**Type:** `(index: number) => void`
**Required:** Yes

Callback fired when an item is selected.

### `itemHeight`

**Type:** `number`
**Default:** `40`

The height of each item in pixels.

### `visibleItems`

**Type:** `number`
**Default:** `5`

The number of visible items in the wheel.

## Example

```tsx
import { WheelPicker } from '@dreamstack-us/kaal';
import { useState } from 'react';
import { View, Text } from 'react-native';

function MonthPicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const months = [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 },
  ];

  return (
    <View>
      <Text>Selected: {months[selectedIndex].label}</Text>
      <WheelPicker
        items={months}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        itemHeight={44}
        visibleItems={5}
      />
    </View>
  );
}
```

## Animation

WheelPicker uses `react-native-reanimated` for smooth, 60fps animations. The wheel physics simulate natural momentum and snapping behavior.
