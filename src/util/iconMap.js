import {
  Aim,
  Back,
  Bell,
  CirclePlus,
  Connection,
  CopyDocument,
  DataAnalysis,
  Delete,
  FullScreen,
  MagicStick,
  Operation,
  Pointer,
  Promotion,
  Right,
  Share,
  SwitchButton,
  Tickets,
  ZoomIn,
  ZoomOut,
} from '@element-plus/icons-vue'

export const iconComponentMap = {
  Aim,
  Back,
  Bell,
  CirclePlus,
  Connection,
  CopyDocument,
  DataAnalysis,
  Delete,
  FullScreen,
  MagicStick,
  Operation,
  Pointer,
  Promotion,
  Right,
  Share,
  SwitchButton,
  Tickets,
  ZoomIn,
  ZoomOut,
}

const legacyIconNameMap = {
  'data_load.png': 'DataAnalysis',
  'page_jump.png': 'Promotion',
  'data_trans.png': 'SwitchButton',
  'page_init.png': 'Connection',
  'tool_previous.png': 'Back',
  'tool_next.png': 'Right',
  'tool_zoom_in.png': 'ZoomIn',
  'tool_zoom_out.png': 'ZoomOut',
  'tool_fullscreen.png': 'FullScreen',
  'tool_selection.png': 'Pointer',
  'tool_beautify.png': 'MagicStick',
  'tool_location.png': 'Aim',
  'icon_anniu@2x.png': 'Operation',
}

export function normalizeIconName(iconName, fallback = 'Operation') {
  if (!iconName) return fallback
  if (iconComponentMap[iconName]) return iconName
  const filename = String(iconName).split('/').pop()
  return legacyIconNameMap[filename] || fallback
}

export function getIconComponent(iconName, fallback = 'Operation') {
  return iconComponentMap[normalizeIconName(iconName, fallback)] || iconComponentMap[fallback]
}
