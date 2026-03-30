export type SettingsToggleKey =
   | 'pushNotifications'
   | 'emailNotifications'
   | 'darkMode';

export type SettingsToggleRow = {
   type: 'toggle';
   id: SettingsToggleKey;
   label: string;
   defaultChecked?: boolean;
};

export type SettingsActionRow = {
   type: 'action';
   id: string;
   label: string;
   destructive?: boolean;
};

export type SettingsRow = SettingsToggleRow | SettingsActionRow;

export type SettingsSection = {
   id: string;
   title: string;
   rows: SettingsRow[];
};

export type SettingsViewProps = {
   title?: string;
   sections?: SettingsSection[];
   onAction?: (id: string) => void;
   onToggleChange?: (id: SettingsToggleKey, checked: boolean) => void;
};

export type TogglePillProps = {
   checked: boolean;
   onChange: (checked: boolean) => void;
   label: string;
};

export type SettingsRowItemProps = {
   row: SettingsRow;
   checked?: boolean;
   onToggleChange?: (id: SettingsToggleKey, checked: boolean) => void;
   onAction?: (id: string) => void;
};
