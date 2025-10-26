
export type AspectRatio = '1:1' | '9:16' | '16:9' | '4:3' | '3:4';

export const aspectRatios: { value: AspectRatio; label: string }[] = [
  { value: '9:16', label: 'Phone' },
  { value: '16:9', label: 'Desktop' },
  { value: '4:3', label: 'Tablet' },
  { value: '1:1', label: 'Square' },
  { value: '3:4', label: 'Portrait' },
];
