interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Platform Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Platform Owner', 'Skill Provider', 'Administrator'],
  tenantName: 'Platform',
  applicationName: 'The Tribal Box ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View profiles of Skill Providers',
    'Manage reservations',
    'Search for Skill Providers based on skill set',
  ],
  ownerAbilities: [
    'Invite Administrators and Skill Providers to the platform',
    'Manage user profiles, reservations, and skill set usage tracking',
    'View all user and skill set data',
    'Oversee the operations of the platform',
  ],
};
