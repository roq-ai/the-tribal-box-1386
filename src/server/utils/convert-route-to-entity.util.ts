const mapping: Record<string, string> = {
  'performance-assessments': 'performance_assessment',
  platforms: 'platform',
  reservations: 'reservation',
  skills: 'skill',
  'usage-trackings': 'usage_tracking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
